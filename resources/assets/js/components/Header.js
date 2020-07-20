import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Authentfication from './auth/Authentification'
import CartPreview from './home/CartPreview'


class Header extends Component {
	constructor(props) {
		super(props)

		this.state = {
			cartItemCount: 0
		}
	}

	componentDidMount() {
		
		if(localStorage.getItem('token'))
			this.getShoppingCartCount()
		else if (localStorage.getItem('cartList')) 
			this.props.updateCartCount(JSON.parse(localStorage.getItem('cartList')).length)
	}

	componentDidUpdate() {
		if (this.props.cartCount != this.state.cartItemCount)
			if (localStorage.getItem('token'))
				this.getShoppingCartCount()
			else if (localStorage.getItem('cartList'))
				this.props.updateCartCount(JSON.parse(localStorage.getItem('cartList')).length)
	}

	getShoppingCartCount() {
		
		axios.get('/api/product/cart-list/count', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        }).then(result => {
			
			let localCartList = JSON.parse(localStorage.getItem('cartList'))
			let stockList = localCartList.map(list => list[0].stock_id)

			let cartList = [...stockList, ...result.data]
			let uniqueCartList = [...new Set(cartList)]; 

			this.setState({cartItemCount: uniqueCartList.length})
			this.props.updateCartCount(uniqueCartList.length)
      	})
	}	

	render() {
	
		return (
			<header>
				{/* <!-- TOP HEADER --> */}
				<div id="top-header">
					<div className="container">
						<ul className="header-links">
							<li><a href="#"><i className="fa fa-phone"></i> +111-11-11-11</a></li>
							<li><a href="#"><i className="fa fa-envelope-o"></i> bugbusters@email.com</a></li>
							<li><a href="#"><i className="fa fa-map-marker"></i> 10000 Pristina</a></li>
						</ul>
						<ul className="header-links">
							<li><a href="#"><i className="fa fa-euro"></i>EURO</a></li>
							<Authentfication />
						</ul>
					</div>
				</div>
				{/* <!-- /TOP HEADER -->
	
				<!-- MAIN HEADER --> */}
				<div id="header">
					{/* <!-- container --> */}
					<div className="container">
						{/* <!-- row --> */}
						<div className="row">
							{/* <!-- LOGO --> */}
							<div className="col-md-3">
								<div className="header-logo">
									<Link to="/" className="logo">
										<img src="./img/logo2.png" alt=""/>
									</Link>
								</div>
							</div>
							{/* <!-- /LOGO -->*/}
	
							{/*<!-- SEARCH BAR --> */}
							<div className="col-md-6">
								<div className="header-search">
									<form>
										<select className="input-select">
											<option value="0">All Categories</option>
											<option value="1">Laptops</option>
											<option value="1">Smartphones</option>
											<option value="1">Cameras</option>
											<option value="1">Accessories</option>
										</select>
										<input className="input" placeholder="Search here"/>
										<button className="search-btn">Search</button>
									</form>
								</div>
							</div>
							{/* <!-- /SEARCH BAR -->*/}
	
							{/*<!-- ACCOUNT --> */}
							<div className="col-md-3">
								<div className="header-ctn">
									{/* <!-- Wishlist --> */}
									<div>
										<a href="#">
											<i className="fa fa-heart-o"></i>
											<span>Your Wishlist</span>
											<div className="qty">2</div>
											
										</a>
									</div>
									{/* <!-- /Wishlist -->
	
									<!-- Cart --> */}
									<div className="dropdown">
										<Link className="dropdown-toggle" to={'/shopping-cart'}>
											<i className="fa fa-shopping-cart"></i>
											<span>Your Cart</span>
											{ this.props.cartCount > 0 && <div className="qty">{this.props.cartCount}</div>}
										</Link>
										<CartPreview />
									</div>
									{/* <!-- /Cart -->
	
									<!-- Menu Toogle --> */}
									<div className="menu-toggle">
										<a href="#">
											<i className="fa fa-bars"></i>
											<span>Menu</span>
										</a>
									</div>
									{/* <!-- /Menu Toogle --> */}
								</div>
							</div>
							{/* <!-- /ACCOUNT --> */}
						</div>
						{/* <!-- row --> */}
					</div>
					{/* <!-- container --> */}
				</div>
				{/* <!-- /MAIN HEADER --> */}
	
			</header>
		)
	}
} 

const mapStateToProps = state => {
    return {
		cartCount: state.cart_count,
		userData: state.user_data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateCartCount: ( (cartCount) => dispatch({type: 'CART_COUNT', value: cartCount}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
