import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

class ShoppingCart extends Component {
	
	constructor(props) {
		super(props)

		this.state = {
			userId: '',
			loading: false,
			subtotal: 0,
			total: 0,
			cartList: [],
			selectedList: []
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleCheckout = this.handleCheckout.bind(this)
	}

	componentDidMount() {
		
		if(localStorage.getItem('token'))
			this.getAuth(localStorage.getItem('token'))
		else if(localStorage.getItem('cartList'))
			this.getGuestShoppingCartList(localStorage.getItem('cartList'))
	}

	componentDidUpdate() {

		if (this.props.user && this.props.user != 'guest' )
			if (this.props.user.id != this.state.userId)
				this.getAuth(localStorage.getItem('token'))

		if(this.props.user === 'guest' && this.state.userId != '') 
			this.getGuestShoppingCartList(localStorage.getItem('cartList'))
	}

	getAuth(token) {
        axios.get('/api/auth', {
            headers: { Authorization: `Bearer ${token}`}
        }).then(result => {
			this.setState({userId: result.data.user.id})

			if(localStorage.getItem('cartList'))
				this.saveToShopppingCart(localStorage.getItem('cartList'))
			else
				this.getShoppingCartList(result.data.user.id)

        }).catch(error => {
			console.log(error)
			if(localStorage.getItem('cartList') !== null)
				this.getGuestShoppingCartList(localStorage.getItem('cartList'))
		})
    }

	getShoppingCartList() {

		this.setState({loading: true})

		axios.get(`/api/product/cart-list/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        }).then(( response ) => {

			let localCartList = null
			if(localStorage.getItem('cartList') !== null)
				localCartList = localStorage.getItem('cartList')

            this.setState({
				cartList: [...response.data],
				localCartList: localCartList,
				loading: false
			})

			this.props.updateCartCount(this.state.cartList.length)
        }).catch(function (error) {
            console.log(error)
        })
	}

	getGuestShoppingCartList(localCartList) {

		this.setState({userId: '', loading: true})
		axios.post('/api/product/cart-list/guest', {
            cartList: localCartList,
        }).then(response => {
            this.setState({
				loading: false,
				cartList: [...response.data],
			})
			this.props.updateCartCount(this.state.cartList.length)
        })		
	}

	saveToShopppingCart(localCartList) {

		axios.post('/api/product/cart-list', {
			localCartList: localCartList
		}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
			this.getShoppingCartList(this.state.userId)
		}).catch(function (error) {
			console.log(error)
		})

	}

	handleChange(e) {

		if(e.target.type === 'checkbox') {
			let list = this.state.selectedList
			let id = parseInt(e.target.id)
	
			if(id === 0) {
				if(list.length === 0 || list.length < this.state.cartList.length)
					list = this.state.cartList.map(item => item.id)
				else
					list = []
			} else if(this.state.selectedList.includes(id)) {
				list = list.filter(item => item !== id)
			} else {
				list = [...list, id]
			}
	
			this.setState({
				selectedList: list,
			})

			this.calcTotal(list)

		} else {

			let item = this.state.cartList.filter(item => (item.id == e.target.id))
			let quantity = item[0].quantity 

			
			if (e.target.className === 'qty-up') {
				quantity += 1
			} else if(e.target.className === 'qty-down') {
				quantity -= 1
			} else if (e.target.type === 'number') {
				quantity = parseInt(e.target.value)
			}

			let list = this.state.cartList
			list.map(item => {
				if(item.id == e.target.id) {
					if(quantity > 0) {
						if(item.stock.quantity >= quantity) {
							item.quantity = quantity 
						} else {
							item.quantity = item.stock.quantity
						}
					} else {
						item.quantity = 1
					}
				}
			})

			this.setState({cartList: list})
			
			axios.put(`/api/product/cart-list/${e.target.id}`, {
				quantity: quantity
			}).then(response => {
				if (response.status === 200) {
					this.calcTotal(this.state.selectedList)
				}
			})
		}
	}

	calcTotal(list) {
		let subtotal = 0
		let shipping = 0

		this.state.cartList.map(item => {
			list.includes(item.id) && (subtotal += (item.stock.product.price * item.quantity))
		})

		this.setState({
			subtotal: subtotal,
			total: (subtotal + shipping)
		})
	}

	handleDelete(e) {

		let id = parseInt(e.target.id)

		if(this.state.userId) {
			axios.delete(`/api/product/cart-list/${id}`, {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
			}).then(response => {
				if(response.status === 200) {
					let list = this.state.selectedList
					list = list.filter(item => item !== id)
					this.calcTotal(list)
					this.setState({selectedList: list})
					
					if (localStorage.getItem('cartList')) {
						let items = JSON.parse(localStorage.getItem('cartList'))
						items = items.filter((item) => 
							(item[0].stock_id !== response.data.stock_id && item[0].userId !== response.data.user_id)
						)
						localStorage.setItem('cartList', JSON.stringify(items))
					}

					this.getShoppingCartList(this.state.userId)
				}
			})		
		} else {
			let items = JSON.parse(localStorage.getItem('cartList'))
			items = items.filter((item, index) => index+1 !== id)
			
			let selectedItems = this.state.selectedList
			selectedItems = selectedItems.filter(item => item != id)
			this.setState({selectedList: selectedItems})

			localStorage.setItem('cartList', JSON.stringify(items))
			this.getGuestShoppingCartList(JSON.stringify(items))

			this.calcTotal(selectedItems)
		}
	}

	handleCheckout(e) {
	
		const id = parseInt(e.target.id)
		
		let selectCheckout = []
		
		if(id !== 0)
			selectCheckout = [id]
		else
			selectCheckout = this.state.selectedList
		
		localStorage.setItem('selectedList', JSON.stringify(selectCheckout))

	} 

	render() {

		return (
            <React.Fragment>			
				{/* <!-- BREADCRUMB --> */}
				<div id="breadcrumb" className="section">
					{/* <!-- container --> */}
					<div className="container">
						{/* <!-- row --> */}
						<div className="row">
							<div className="col-md-12">
								<h3 className="breadcrumb-header">Shopping Cart</h3>
								<ul className="breadcrumb-tree">
									<li><a href="#">Home</a></li>
									<li className="active">Shopping Cart</li>
								</ul>
							</div>
						</div>
						{/* <!-- /row --> */}
					</div>
					{/* <!-- /container --> */}
				</div>
				{/* <!-- /BREADCRUMB --> */}

				{/* <!-- SECTION --> */}
				<div className="section">
					{/* <!-- container --> */}
					<div className="container">
						{/* <!-- row --> */}
						<div className="row">							
							{/* <!-- Orders --> */}
							<div className="col-md-7 cart-items"> 
								<div className="section-title cart-item">
									<h3 className="title">Shopping Cart {this.state.cartList.length > 0 && '(' + this.state.cartList.length + ')' }</h3>
									<div className="checkbox-select-all">
										<div className="input-checkbox">
											<input
												name="selectAll" 
												type="checkbox" 
												id={0}	
												checked={this.state.cartList.length > 0 && (this.state.selectedList.length == this.state.cartList.length)}
												onChange={this.handleChange} />
											<label htmlFor={0} className="px-4">
												<span></span>
												Select All
											</label>
										</div>
									</div>
								</div>
								{/* Cart Items */}
								{this.state.loading ? <div className="spinner-container"><Spinner animation="border" /></div> :
								this.state.cartList.map( (item) => (
									
									<div key={item.id} className="cart-item">
										<div className="media cart-item-box">
											<div className="input-checkbox">
												<input type="checkbox" 
													id={item.id} 
													checked={this.state.selectedList.includes(item.id)} 
													onChange={this.handleChange} />
												<label htmlFor={item.id}>
													<span></span>
												</label>
											</div>
											<img height="100" width="100" className="align-self-start mr-3" src={`./img/${JSON.parse(item.stock.product.photo)[0]}`} alt={JSON.parse(item.stock.product.photo)[0]} />
											<div className="media-body cart-item-body">
												<h5 className="mt-0 product-name">
													<Link to={`/products/${item.stock.product.id}`}>
														{item.stock.product.name}
													</Link>
												</h5>
												<div>
													<div>
														<strong>Size:</strong> {item.stock.size} <strong>Color:</strong> {item.stock.color}
														<div className="buy-item">
															<div className="qty-label">
																Qty
																<div className="input-number">
																	<input id={item.id} type="number" value={item.quantity} onChange={this.handleChange} />
																	<span id={item.id} className="qty-up" onClick={this.handleChange}>+</span>
																	<span id={item.id} className="qty-down" onClick={this.handleChange}>-</span>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div><sub><strong>Free Shipping</strong></sub></div>
												<h4 className="product-price">${item.stock.product.price}</h4>
											</div>
											<div className="delete-icon"><i id={item.id} onClick={this.handleDelete} className="fa fa-trash" aria-hidden="true"></i></div>
											<Link onClick={this.handleCheckout} to={'/checkout'}>
												<button id={item.id}  className="item-checkout-btn">checkout</button>
											</Link>
										</div>
									</div>
								))}
								{/* /Cart Items */}
							</div>
							{/* <!-- /Orders --> */}
							
							{/* <!-- Order Summary --> */}
							<div className="col-md-4 cart-details">
								<div className="section-title text-center">
									<h3 className="title">Order Summary</h3>
								</div>
								<div className="cart-summary">
									<div className="order-col">
										<div>Subtotal</div>
										<div>${this.state.subtotal.toFixed(2)}</div>
									</div>
									<div className="order-col">
										<div>Shipping</div>
										<div><strong>FREE</strong></div>
									</div>
									<hr/>
									<div className="order-col">
										<div><strong>TOTAL</strong></div>
										<div>
											<strong className={this.state.selectedList.length !== 0 ? "order-total" : "order-total-disabled"}>
												${this.state.total.toFixed(2)}
											</strong>
										</div>
									</div>
								</div>
								<Link id={0} 
									onClick={this.handleCheckout} 
									to={'/checkout'} 
									className={this.state.selectedList.length !== 0 ? "primary-btn order-submit" : "primary-btn order-submit-disabled"}
								>
									Checkout {this.state.selectedList.length !== 0 && '(' + this.state.selectedList.length + ')'}
								</Link>
							</div>
							{/* <!-- /Order Summary --> */}
						</div>
						{/* <!-- /row --> */}
					</div>
					{/* <!-- /container --> */}
				</div>
				{/* <!-- /SECTION --> */}
			</React.Fragment>
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
        updateCartCount: ( (cartCount) => dispatch({type: 'CART_COUNT', value: cartCount}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)