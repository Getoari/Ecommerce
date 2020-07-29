import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

class CartPreview extends Component {
    constructor() {
        super()
        this.state = {
            userId: '',
			loading: true,
			total: 0,
			cartList: []
        }
        
        this.handleToggle = this.handleToggle.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
    }
    
    getAuth(token) {
        this.setState({loading: true})
        axios.get('/api/auth', {
            headers: { Authorization: `Bearer ${token}`}
        }).then(result => {
			this.setState({userId: result.data.user.id})

			if(localStorage.getItem('cartList'))
				this.saveToShopppingCart(localStorage.getItem('cartList'))
			else
				this.getShoppingCartList()

        }).catch(error => {
			console.log(error)
			if(localStorage.getItem('cartList') !== null)
				this.getGuestShoppingCartList(localStorage.getItem('cartList'))
		})
    }

    getShoppingCartList() {

		axios.get(`/api/product/cart-list/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        }).then((
            response 
        ) => {

			let localCartList = null
			if(localStorage.getItem('cartList') !== null)
				localCartList = localStorage.getItem('cartList')

            this.setState({
				cartList: [...response.data],
				localCartList: localCartList,
				loading: false
            })
            
            this.update()
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
            this.update()
        })		
	}

    update() {
        this.calcTotal()
		this.props.updateCartCount(this.state.cartList.length)
    }

	saveToShopppingCart(localCartList) {

		axios.post('/api/product/cart-list', {
			localCartList: localCartList
		}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
			this.getShoppingCartList(this.state.userId)
		})
    }
    
    handleDelete(e) {

		let id = parseInt(e.target.id)

		if(this.state.userId) {
			axios.delete(`/api/product/cart-list/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            }).then(response => {
				if(response.status === 200) {

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

			localStorage.setItem('cartList', JSON.stringify(items))
            this.getGuestShoppingCartList(JSON.stringify(items))
        }
    }
    
    calcTotal() {
		let subtotal = 0
		let shipping = 0

		this.state.cartList.map(item => {
			(subtotal += (item.stock.product.price * item.quantity))
		})

		this.setState({
			total: (subtotal + shipping)
		})
    }
    
    handleToggle(isOpen) {
        if(isOpen)
            if(localStorage.getItem('token'))
                this.getAuth(localStorage.getItem('token'))
            else if(localStorage.getItem('cartList'))
                this.getGuestShoppingCartList(localStorage.getItem('cartList'))
    }

    render() {

        return (
            <Dropdown onToggle={this.handleToggle} bsPrefix='dropdown-arrow'>
                <Dropdown.Toggle variant="toggle" id="dropdown-basic">
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <div className="cart-dropdown">
                        <div className="cart-list">
                            {this.state.loading ? <div height="40px" className="loading-spinner"><Spinner animation="border" /></div> :
                            <React.Fragment>
                                {this.state.cartList.length === 0 && <p>No items in cart!</p>}
                                {this.state.cartList.map( (item) => (
                                    <div key={item.id} className="product-widget">
                                        <div className="product-img">
                                            <img src={`./img/${JSON.parse(item.stock.product.photo)[0]}`} alt={JSON.parse(item.stock.product.photo)[0]} />
                                        </div>
                                        <div className="product-body">
                                            <h3 className="product-name">
                                                <Link to={`/products/${item.stock.product.id}`}>
                                                    {item.stock.product.name}
                                                </Link>
                                            </h3>
                                            <h4 className="product-price"><span className="qty">{item.quantity}x</span>${item.stock.product.price}</h4>
                                        </div>
                                        <button id={item.id} className="delete" onClick={this.handleDelete} ><i id={item.id} className="fa fa-close"></i></button>
                                    </div>
                                ))}
                            </React.Fragment>}
                        </div>
                        <div className="cart-summary">
                            <small>{this.state.cartList.length} Item(s) selected</small>
                            <h5>SUBTOTAL: ${this.state.total}</h5>
                        </div>
                        <div className="cart-btns">
                            <Link to="/shopping-cart">
                                View Cart
                            </Link>
                            <Link to="/checkout">
                                Checkout  <i className="fa fa-arrow-circle-right"></i>
                            </Link>
                        </div>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateCartCount: ( (cartCount) => dispatch({type: 'CART_COUNT', value: cartCount}))
    }
}

export default connect(null, mapDispatchToProps)(CartPreview)