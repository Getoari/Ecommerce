import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'


function QucikView(props) {
    
    const [productId] = useState(props.productId)
    const [product, setProduct] = useState('')
    const [stocks, setStocks] = useState([])
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [avaibleQuantity, setAvaibleQuantity] = useState('')
    const [settings] = useState({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
    })
 
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    
    const handleShow = () => {
        setShow(true)
        getProduct(productId)
    }

    function getProduct(id) {
        if(stocks.length == 0) 
            axios.get(`/api/products/${id}`).then((
                response
            ) => {
                setProduct(response.data)
                setStocks([...response.data.stocks])
            }).catch(function (error) {
                console.log(error)
            })
    }

    function handleChange(e) {

        const value = e.target.value
        
        if (e.target.className === 'input-select') {
            var found = false
            stocks.map( (stock) => {
                if (stock.size == value && !found) {
                    setSelectedSize(value)
                    setAvaibleQuantity(stock.quantity)
                    found = true
                }

                if (stock.color == value) {
                    setSelectedColor(value)
                    setAvaibleQuantity(stock.quantity)
                }
                
            })
        }

        if (e.target.className === 'qty-up') {
            setQuantity(quantity + 1)
        } else if(e.target.className === 'qty-down') {
            setQuantity(quantity - 1)
        }

        if(e.target.type == 'number') {
            setQuantity(value)
        }
    }


    return (
        <React.Fragment>
        <Button className="qucik-view" onClick={handleShow} bsPrefix="q"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></Button>
        <Modal size="lg" show={show} onHide={handleClose}>
            
                <Modal.Header closeButton>
                    <Modal.Title>
                        { product && product.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                { product && <React.Fragment>
                        <div>
                            <div id="product-img-container" className="col-md-6">
                            {/* <!-- Product thumb imgs --> */}
                            <div id="product-imgs">
                            <Slider {...settings}>
                                    {JSON.parse(product.photo).map( (photo, index) => (
                                        <div key={index} className="product-preview">
                                            <img height="300" width="300" src={`./img/${photo}`} alt={photo} />
                                        </div>
                                    ))}
                            </Slider>
                            </div>
                            {/* <!-- /Product thumb imgs -->*/}
                            </div>
                            <div id="product-detail-container" className="col-md-6">
                            {/*<!-- Product details -->*/}
  
                                <div className="product-details">
                                    <h2 className="product-name">{product.name}</h2>
                                    <div>
                                        <div className="product-rating">
                                            <i className={ product.review >= 1 ? "fa fa-star" : (product.review > 0 && product.review < 1) ? "fa fa-star-half-o" : "fa fa-star-o"}></i>
                                            <i className={ product.review >= 2 ? "fa fa-star" : (product.review > 1 && product.review < 2) ? "fa fa-star-half-o" : "fa fa-star-o"}></i>
                                            <i className={ product.review >= 3 ? "fa fa-star" : (product.review > 2 && product.review < 3) ? "fa fa-star-half-o" : "fa fa-star-o"}></i>
                                            <i className={ product.review >= 4 ? "fa fa-star" : (product.review > 3 && product.review < 4) ? "fa fa-star-half-o" : "fa fa-star-o"}></i>
                                            <i className={ product.review == 5 ? "fa fa-star" : (product.review > 4 && product.review < 5) ? "fa fa-star-half-o" : "fa fa-star-o"}></i>
                                        </div>
                                        <a className="review-link" href="">{product.num_reviews} Review(s) | Add your review</a>
                                    </div>
                                    <div>
                                        {
                                            (new Date(product.sale_expires).getTime() > new Date().getTime()) ? 
                                            <h3 className="product-price">${product.price - (product.price * product.sale)} <del className="product-old-price">${product.price}</del></h3>
                                            :
                                            <h3 className="product-price">${product.price}</h3>
                                        }                                        
                                        <span className="product-available">{avaibleQuantity ? 'In' : 'Out of'} Stock</span>
                                    </div>
                                    <p>{product.description}</p>

                                    <div className="product-options" >
                                        <label>
                                            Size
                                            <select className="input-select" onChange={handleChange}>
                                                { stocks.length && [...new Set(stocks.map(stock => stock.size))].map((stockSize,index) => (
                                                    <React.Fragment key={index}>
                                                        { (selectedSize == '' && index == 0) && setSelectedSize(stockSize)}
                                                        <option value={stockSize}>{stockSize}</option>
                                                    </React.Fragment>
                                                ))}
                                            </select>
                                        </label>
                                        <label>
                                            Color
                                            <select className="input-select" onChange={handleChange}>
                                                { stocks.length && stocks.map( (stock, index) => (
                                                    <React.Fragment key={stock.id}>
                                                        { (selectedColor === '' && index == 0) && setSelectedColor(stock.color)}
                                                        { (avaibleQuantity === '' && index == 0) && setAvaibleQuantity(stock.quantity)}
                                                        { selectedSize === stock.size && <option value={stock.color}>{stock.color}</option>}
                                                    </React.Fragment>
                                                ))}
                                            </select>
                                        </label>
                                    </div>

                                    <div className="add-to-cart">
                                        <div className="qty-label">
                                            Qty
                                            <div className="input-number">
                                                <input type="number" disabled={!avaibleQuantity} value={avaibleQuantity ? quantity : 0} onChange={handleChange} />
                                                <span className="qty-up" onClick={handleChange} >+</span>
                                                <span className="qty-down" onClick={handleChange} >-</span>
                                            </div>
                                        </div>
                                        <button className="add-to-cart-btn" disabled={!avaibleQuantity}><i className="fa fa-shopping-cart"></i> add to cart</button>
                                        <br/><sub>{(avaibleQuantity ? 'Only ' : 'There are ')} {avaibleQuantity} item(s) available!</sub>   
                                    </div>

                                    <ul className="product-btns">
                                        <li><a href="#"><i className="fa fa-heart-o"></i> add to wishlist</a></li>
                                        <li><a href="#"><i className="fa fa-exchange"></i> add to compare</a></li>
                                    </ul>

                                    <ul className="product-links">
                                        <li>Category:</li>
                                        <li><a href="#">{product.category.name}</a></li>
                                    </ul>

                                    <ul className="product-links">
                                        <li>Share:</li>
                                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                        <li><a href="#"><i className="fa fa-envelope"></i></a></li>
                                    </ul>

                                </div>
                                {/* <!-- /Product details --> */}
                                </div>
                            </div>
                            <Link to={`/products/${productId}`}>
                                <Button bsPrefix="qv">
                                        <span>View More</span>
                                </Button>
                            </Link>
                    </React.Fragment>}
                </Modal.Body>
        </Modal>
        </React.Fragment>
    )
}

export default QucikView