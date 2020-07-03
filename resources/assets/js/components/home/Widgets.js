import React, { Component } from 'react'
import Slider from 'react-slick'

class WidgetColumn extends Component {
    constructor(props) {
        super(props)
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
                    <div>
                    <Slider {...settings}>
                        <div>
                            {/* <!-- product widget --> */}
                            <div className="product-widget">
                                <div className="product-img">
                                    <img src="./img/product07.png" alt="" />
                                </div>
                                <div className="product-body">
                                    <p className="product-category">Category</p>
                                    <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                    <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                </div>
                            </div>
                            {/* <!-- /product widget -->

                            <!-- product widget --> */}
                            <div className="product-widget">
                                <div className="product-img">
                                    <img src="./img/product08.png" alt="" />
                                </div>
                                <div className="product-body">
                                    <p className="product-category">Category</p>
                                    <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                    <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                </div>
                            </div>
                            {/* <!-- /product widget -->

                            <!-- product widget --> */}
                            <div className="product-widget">
                                <div className="product-img">
                                    <img src="./img/product09.png" alt="" />
                                </div>
                                <div className="product-body">
                                    <p className="product-category">Category</p>
                                    <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                    <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                </div>
                            </div>
                            {/* <!-- product widget --> */}
                        </div>

                        <div>
                            {/* <!-- product widget --> */}
                            <div className="product-widget">
                                <div className="product-img">
                                    <img src="./img/product01.png" alt="" />
                                </div>
                                <div className="product-body">
                                    <p className="product-category">Category</p>
                                    <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                    <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                </div>
                            </div>
                            {/* <!-- /product widget -->

                            <!-- product widget --> */}
                            <div className="product-widget">
                                <div className="product-img">
                                    <img src="./img/product02.png" alt="" />
                                </div>
                                <div className="product-body">
                                    <p className="product-category">Category</p>
                                    <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                    <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                </div>
                            </div>
                            {/* <!-- /product widget -->

                            <!-- product widget --> */}
                            <div className="product-widget">
                                <div className="product-img">
                                    <img src="./img/product03.png" alt="" />
                                </div>
                                <div className="product-body">
                                    <p className="product-category">Category</p>
                                    <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                    <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                </div>
                            </div>
                            {/* <!-- product widget --> */}
                        </div>
                        </Slider>
                    </div>
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