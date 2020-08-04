import React, { Component } from 'react'
import Redirect from 'react-router-dom/Redirect'
import { connect } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../stripe/CheckoutForm'
import AddressCard from '../stripe/AddressCard'

const promise = loadStripe(process.env.MIX_STRIPE_KEY);

class Checkout extends Component {
	constructor(props) {
		super(props)

		this.state = {
			presistAddress: true,
			firstName: '',
			lastName: '',
			email: '',
			address: '',
			city: '',
			country: '',
			zip: '',
			telephone: '',
			password: '',
			passwordConfirm: '',
			note: '',
			total: 0,
			redirect: false,
			checkoutList: []
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	componentDidMount() {
		if(localStorage.getItem('selectedList'))
			if(localStorage.getItem('token'))
				this.getShoppingCartList();
			else 
				this.getGuestShoppingCartList(localStorage.getItem('cartList'));
		else {
			if(!localStorage.getItem('checkoutList')) {
				this.setState({redirect: true})
			} else {
				const list = JSON.parse(localStorage.getItem('checkoutList'))
				this.setState({checkoutList: list})	
				this.calcTotal(list)
	
				if(localStorage.getItem('token') && !this.props.user)
					this.getAuth(localStorage.getItem('token'))
			}

		}
	}

	componentDidUpdate(prevProps) {
		if(this.props.user && this.props.user != 'guest')
			if(prevProps.user.id !== this.props.user.id) {
				this.getUserDefaultAddress()
			}
	}

	getAuth(token) {
        axios.get('/api/auth', {
            headers: { Authorization: `Bearer ${token}`}
        }).then(result => {
			this.props.addUser(result.data.user)
			if(result.data.user.address_id)
				this.getUserDefaultAddress()
        })
    }

	getShoppingCartList() {
		axios.get(`/api/product/cart-list/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        }).then(( response ) => {

            this.setState({
				checkoutList: [...response.data]
			})

			this.generateCheckoutList()
			this.getUserDefaultAddress()
        }).catch(function (error) {
            console.log(error)
        })
	}

	getGuestShoppingCartList(localCartList) {

		axios.post('/api/product/cart-list/guest', {
            cartList: localCartList,
        }).then(response => {
            this.setState({
				checkoutList: [...response.data],
			})
			this.generateCheckoutList()
        })		
	}

	generateCheckoutList() {
		
		let checkoutList = this.state.checkoutList
		let selectedList = JSON.parse(localStorage.getItem('selectedList'))

		if(localStorage.getItem('token')) 
			checkoutList = checkoutList.filter(item => selectedList.includes(item.id))
		else
			checkoutList = checkoutList.filter((item, index) => selectedList.includes(index+1))

		localStorage.setItem('checkoutList', JSON.stringify(checkoutList))
		localStorage.removeItem('selectedList')

		this.setState({checkoutList: [...checkoutList]})
		this.calcTotal(checkoutList)
	}

	calcTotal(list) {
		let subtotal = 0
		let shipping = 0

		list.map(item => {
			(subtotal += (item.stock.product.price * item.quantity))
		})

		this.setState({
			total: (subtotal + shipping)
		})
    }

	handleChange(event) {
		const {name, value} = event.target
        this.setState({
            [name]: value
        })
	}

	handleSubmit(e) {
		e.preventDefault()

		axios.post('/api/user/create-user-address', {
            firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			address: this.state.address,
			city: this.state.city,
			country: this.state.country,
			zip: this.state.zip,
			telephone: this.state.telephone,
			password: this.state.password,
			passwordConfirm: this.state.passwordConfirm,
			localCartList: localStorage.getItem('cartList')
        }).then(response => {
			localStorage.setItem('token', response.data.token)
			this.props.addUser(response.data.user)
			this.setState({presistAddress: false})
        });
	}

	getUserDefaultAddress() {
        axios.get('/api/user/default-address/', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        }).then(result => {
			if(result.status === 200 && result.data)
				this.setState({
					firstName: result.data.firstname,
					lastName: result.data.lastname,
					email: this.props.user.email,
					address: result.data.address,
					city: result.data.city,
					country: result.data.country,
					zip: result.data.zip,
					telephone: result.data.telephone,
					presistAddress: false
				})
        })
    }

	render() {

		const address={presistAddress: this.state.presistAddress,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			address: this.state.address,
			city: this.state.city,
			country: this.state.country,
			zip: this.state.zip,
			telephone: this.state.telephone}

		if (this.state.redirect) {
			return <Redirect to="/" />
		}

		return (
			<div className="section">
				
				<div className="container">
				
					<div className="row">
	
						<div className="col-md-7">
							{localStorage.getItem('token') &&
								!this.state.presistAddress ?
								<div className="section-title">
										<h3 className="title">Shiping address</h3>
										<AddressCard address={address} />	
								</div>
								:
								<form onSubmit={this.handleSubmit}>
								<div className="billing-details">
									<div className="section-title">
										<h3 className="title">Shiping address</h3>
									</div>
									<div className="form-group">
										<input className="input" onChange={this.handleChange} value={this.state.firstName} type="text" name="firstName" placeholder="First Name"/>
									</div>
									<div className="form-group">
										<input className="input" onChange={this.handleChange} value={this.state.lastName} type="text" name="lastName" placeholder="Last Name"/>
									</div>
									{!localStorage.getItem('token') &&
									<div className="form-group">
										<input className="input" onChange={this.handleChange} value={this.state.email} type="email" name="email" placeholder="Email"/>
									</div>}
									<div className="form-group">
										<input className="input" onChange={this.handleChange} value={this.state.address} type="text" name="address" placeholder="Address"/>
									</div>
									<div className="form-group">
										<input className="input" onChange={this.handleChange} value={this.state.city} type="text" name="city" placeholder="City"/>
									</div>
									<div className="form-group">
										<input className="input" onChange={this.handleChange} value={this.state.country} type="text" name="country" placeholder="Country"/>
									</div>
									<div className="form-group">
										<input className="input" onChange={this.handleChange} value={this.state.zip} type="text" name="zip" placeholder="ZIP Code"/>
									</div>
									<div className="form-group">
										<input className="input" onChange={this.handleChange} value={this.state.telephone} type="tel" name="telephone" placeholder="Telephone"/>
									</div>
									{!localStorage.getItem('token') &&
									<React.Fragment>
										<div className="form-group">
											<div className="caption">
												<p>Enter the password for your new account.</p>
												<div className="form-group">
													<input className="input" onChange={this.handleChange} value={this.state.password} type="password" name="password" placeholder="Enter Your Password"/>
												</div>
												<div className="form-group">
													<input className="input" onChange={this.handleChange} value={this.state.passwordConfirm} type="password" name="passwordConfirm" placeholder="Enter Password Again"/>
												</div>
											</div>
										</div>
										<button className="create-btn"><i className="fa fa-user-plus"></i> Create Account</button>
									</React.Fragment>}
								</div>	
								
								</form>}
								{localStorage.getItem('token') &&
								<div className="order-notes">
									<textarea className="input" value={this.state.note} name="note" onChange={this.handleChange} placeholder="Order Notes"></textarea>
								</div>
							}
						</div>
	
						
						<div className="col-md-5 order-details">
							<div className="section-title text-center">
								<h3 className="title">Your Order</h3>
							</div>
							<div className="order-summary">
								<div className="order-col">
									<div><strong>PRODUCT</strong></div>
									<div><strong>TOTAL</strong></div>
								</div>
								<div className="order-products">
									{this.state.checkoutList.map(item => (
										<div key={item.id} className="order-col">
											<div>{item.quantity}x {item.stock.product.name}</div>
											<div>${item.stock.product.price.toFixed(2)}</div>
										</div>
									))}
								</div>
								<div className="order-col">
									<div>Shipping</div>
									<div><strong>FREE</strong></div>
								</div>
								<div className="order-col">
									<div><strong>TOTAL</strong></div>
									<div><strong className="order-total">${this.state.total.toFixed(2)}</strong></div>
								</div>
							</div>
							{ localStorage.getItem('token') ?
							<div className="payment-method">
								<div className="order-col">
									{(this.state.total > 0 && localStorage.getItem('token')) &&
									<Elements stripe={promise}>
										<CheckoutForm 
											items={this.state.checkoutList}
											address={address}
											note={this.state.note}  />
									</Elements>}
								</div>
							</div>
							:
							<h4 id="login-warning">Please login or register to be able to place the order!</h4>
							}
						</div>
						
					</div>
				
				</div>
				
			</div>
		)
	}
}

const mapStateToProps = state => {
    return {
		user: state.user_data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addUser: (user) => dispatch({type: 'USER', value: user})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);