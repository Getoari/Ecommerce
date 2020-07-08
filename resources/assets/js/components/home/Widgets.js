import React, { Component } from 'react'
import Slider from 'react-slick'

class WidgetColumn extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
			products: []
		}
    }

    componentDidMount() {

		this.getProducts()
	}

    getProducts() {

		axios.get(`/api/product/categories/1/top-selling`).then((
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
            infinite: true,
			autoplay: true,
			speed: 300,
			dots: true,
			arrows: false,    
        }

        return (
            <div>
                <div className="section-title">
                    <h4 className="title">{this.props.title}</h4>
                    <div className="section-nav">
                        <div id="slick-nav-1" className="products-slick-nav"></div>
                    </div>
                </div>

                <div className="products-widget-slick" data-nav="#slick-nav-1" >
                    <Slider {...settings}>
                    <div>
                    { this.state.products.map((product, index) => (
                        <React.Fragment key={product.id}>
                            { index < 3 && 
                            <div className="product-widget">
                                <div className="product-img">
                                    <img src={`./img/${JSON.parse(product.photo)[0]}`} alt={JSON.parse(product.photo)[0]} />
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
                                </div>
                            </div>}
                        </React.Fragment>
                    ))}
                    </div>
                    <div>
                    { this.state.products.map((product, index) => (
                        <React.Fragment key={product.id}>
                            { (index >= 3 && index < 6) && 
                            <div className="product-widget">
                                <div className="product-img">
                                    <img src={`./img/${JSON.parse(product.photo)[0]}`} alt={JSON.parse(product.photo)[0]} />
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
                                </div>
                            </div>}
                        </React.Fragment>
                    ))}
                    </div>    
                    </Slider>
                </div>
            </div>
        )
    }
}

class Widgets extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="section">
			{/* <!-- container --> */}
			<div className="container">
				{/* <!-- row --> */}
				<div className="row">

					<div className="col-md-4 col-xs-6">
						<WidgetColumn title="Top selling"/>
                    </div>					
					
					<div className="col-md-4 col-xs-6">
						<WidgetColumn title="Top selling"/>
					</div>

					<div className="col-md-4 col-xs-6">
						<WidgetColumn title="Top selling"/>	
					</div>

				</div>
				{/* <!-- /row --> */}
			</div>
			{/* <!-- /container --> */}
		</div>
        )
    }
} 

export default Widgets