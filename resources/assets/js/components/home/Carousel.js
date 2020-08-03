import React, { Component } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'

class Carousel extends Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: true,
			currentCategory: 1,
			categories: [],
			products: []
		}

		this.handleWishlist = this.handleWishlist.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	componentDidMount() {

		this.getCategories()
		this.getProducts(1)
	}

	getCategories() {
		axios.get('/api/product/categories').then((
            response 
        ) => {
            this.setState({
				categories: [...response.data]
            })
        }).catch(function (error) {
            console.log(error)
        })
	}

	handleWishlist(e) {

		if(!localStorage.getItem('token')) {
			this.props.showLogin()
		} else {
			axios.post('/api/product/wishlist', {
				productId: e.target.id
			}, {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
			}).then(response => {
				if(response.status === 200) {
					this.props.updateWishlistCount(response.data)
					this.props.showToast('Added to wishlist!')
				} 
			}).catch(error => {
				this.props.showToast('Product is already in the wishlist!')
			})
		}
	}

	handleClick(e) {

		const id = e.target.id
		
		if(e.target.className == 'add-to-cart-btn') {
			this.props.showQuickView(id)
		} else if(e.target.className == 'qucik-view q q-primary' || e.target.className == 'fa fa-eye') {
			this.props.showQuickView(id)
		} else {
			e.preventDefault()
	
			this.getProducts(id)
			this.setState({currentCategory: id})
		}
	}

	getProducts(categoryId) {

		var query;

		if(this.props.id == 1) 
			query = 'new'
		else
			query = 'top-selling'

		this.setState({loading: true})

		axios.get(`/api/product/categories/${categoryId}/${query}`).then((
            response 
        ) => {
            this.setState({
				products: [...response.data],
				loading: false
            })
        }).catch(function (error) {
            console.log(error)
        })
	}

	render() {

		var settings = {
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			infinite: true,
			dots: false,
			arrows: true,
			responsive: [{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
			  	breakpoint: 480,
			  	settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
			  	}
			}]
		}

		return (
			<div>
				<div className="section">
					{/* <!-- container --> */}
					<div className="container">
						{/* <!-- row --> */}
						<div className="row">
							{/* <!-- section title --> */}
							<div className="col-md-12">
								<div className="section-title">
									<h3 className="title">{this.props.title}</h3>
									<div className="section-nav">
										<ul className="section-tab-nav tab-nav">
											{this.state.categories.map(category => (
												<li key={category.id} className={ category.id == this.state.currentCategory ? "active" : ""}>
													<a id={category.id} onClick={this.handleClick} data-toggle="tab" href="">{category.name}</a>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
							{/* <!-- /section title -->
							
							<!-- Products tab & slick --> */}
							{this.state.loading ? <div className="spinner-container"><Spinner animation="border" /></div> :
							<div id="product-container" className="col-md-12">
								<div className="row">
									<div className="products-tabs">
										{/* <!-- tab --> */}
										<div id={"tab" + this.props.id } className="tab-pane active">
											<div className="products-slick" data-nav={"#slick-nav-" + this.props.id}>
												
												<Slider {...settings}>
												 {this.state.products.length > 3 && this.state.products.map(product => (
													<div key={product.id} className="product">
														<div className="product-img">
															<img src={`./img/${JSON.parse(product.photo)[0]}`} alt={JSON.parse(product.photo)[0]} />
															<div className="product-label">
																{ (new Date(product.sale_expires).getTime() > new Date().getTime()) && <span className="sale">-{product.sale*100}%</span>}
																{ (new Date(product.created_at).toDateString() == new Date().toDateString()) && <span className="new">NEW</span> }
															</div>
														</div>
														<div className="product-body">
															<p className="product-category">{product.category.name}</p>
															<h3 className="product-name"><a href="#">{product.name}</a></h3>
															{
																(new Date(product.sale_expires).getTime() > new Date().getTime()) ? 
																<h4 className="product-price">${product.price - (product.price * product.sale)} <del className="product-old-price">${product.price}</del></h4>
																:
																<h4 className="product-price">${product.price}</h4>
															}
															
															<div className="product-rating">
																<i className={ product.review >= 1 ? "fa fa-star" : (product.review > 0 && product.review < 1) ? "fa fa-star-half-o" : "fa fa-star-o"}></i>
																<i className={ product.review >= 2 ? "fa fa-star" : (product.review > 1 && product.review < 2) ? "fa fa-star-half-o" : "fa fa-star-o"}></i>
																<i className={ product.review >= 3 ? "fa fa-star" : (product.review > 2 && product.review < 3) ? "fa fa-star-half-o" : "fa fa-star-o"}></i>
																<i className={ product.review >= 4 ? "fa fa-star" : (product.review > 3 && product.review < 4) ? "fa fa-star-half-o" : "fa fa-star-o"}></i>
																<i className={ product.review == 5 ? "fa fa-star" : (product.review > 4 && product.review < 5) ? "fa fa-star-half-o" : "fa fa-star-o"}></i>
															</div>
															<div className="product-btns">
																<Button id={product.id} className="add-to-wishlist" onClick={this.handleWishlist} bsPrefix="q"><i id={product.id} className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></Button>
																<button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button>
																<Button id={product.id} className="qucik-view" onClick={this.handleClick} bsPrefix="q"><i id={product.id} onClick={this.handleClick} className="fa fa-eye"></i><span className="tooltipp">quick view</span></Button>
															</div>
														</div>
														<div className="add-to-cart">
															<button id={product.id} className="add-to-cart-btn" onClick={this.handleClick}><i id={product.id} onClick={this.handleClick} className="fa fa-shopping-cart"></i> add to cart</button>
														</div>
													</div>
												))}
												</Slider>

											</div>
											<div id={"slick-nav-" + this.props.id} className="products-slick-nav"></div>
										</div>
										{/* <!-- /tab --> */}
									</div>
								</div>
							</div>}
							{/* <!-- Products tab & slick --> */}
						</div>
						{/* <!-- /row --> */}
					</div>
					{/* <!-- /container --> */}
				</div>
				
			</div>
		)
	}
} 

const mapStateToProps = state => {
    return {
        productId: state.product_id,
        showModal: state.show_modal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showQuickView: ( (id) => dispatch({type: 'QUICKVIEW_CONTROL', value: id})),
        showLogin: ( () => dispatch({type: 'LOGIN_CONTROL', value: true})),
        updateWishlistCount: ( (count) => dispatch({type: 'WISHLIST_COUNT', value: count})),
        showToast: ( (msg) => dispatch({type: 'SHOW_TOAST', value: msg}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carousel)