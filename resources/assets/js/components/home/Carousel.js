import React, { Component } from 'react'
import axios from 'axios'
import Slider from 'react-slick'

import QuickView from './QuickView'

class Carousel extends Component {
	constructor(props) {
		super(props)

		this.state = {
			currentCategory: 1,
			categories: [],
			products: []
		}

		this.handleClick = this.handleClick.bind(this)
	}

	componentDidMount() {
		this.getCategories()
		
		if(this.props.id == 1) {
			this.getNewProducts(1)
		} else {
			// this.getTopSelling()
		}

	}

	getCategories() {
		axios.get('api/product/categories').then((
            response 
        ) => {
            this.setState({
				categories: [...response.data]
            })
        }).catch(function (error) {
            console.log(error)
        })
	}

	handleClick(e) {
		e.preventDefault()

		const id = e.target.id
		this.getNewProducts(id)
		this.setState({currentCategory: id})
	}

	getNewProducts(categoryId) {
		axios.get(`api/product/categories/${categoryId}/new`).then((
            response 
        ) => {
            this.setState({
				products: [...response.data]
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
			speed: 300,
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
							<div id="product-container" className="col-md-12">
								<div className="row">
									<div className="products-tabs">
										{/* <!-- tab --> */}
										<div id={"tab" + this.props.id } className="tab-pane active">
											<div className="products-slick" data-nav={"#slick-nav-" + this.props.id}>
												
												<Slider {...settings}>
												{ this.state.products.length > 3 && this.state.products.map(product => (
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
																<button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
																<button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button>
																<QuickView productId={product.id} />
															</div>
														</div>
														<div className="add-to-cart">
															<button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to cart</button>
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
							</div>
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

export default Carousel