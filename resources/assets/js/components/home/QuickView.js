import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


function QucikView(props) {
    
    const [product, setProduct] = useState('')
    const [productId] = useState(props.productId)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    
    const handleShow = () => {
        setShow(true)
        getProduct(productId)
    }

    function getProduct(id) {
        axios.get(`api/products/${id}`).then((
            response
        ) => {
            setProduct(response.data)
        }).catch(function (error) {
            console.log(error)
        })
    }


    return (
        <React.Fragment>
        <Button className="qucik-view" onClick={handleShow} bsPrefix="q"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></Button>
        <Modal show={show} onHide={handleClose}>
            
                <Modal.Header closeButton>
                    <Modal.Title>
                        { product && product.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                { product && <React.Fragment>
                        <div className="p-3">
                            {/* <!-- Product thumb imgs --> */}

                                <div id="product-imgs">
                                    <div className="product-preview">
                                        <img height="300" width="300" src={`./img/${JSON.parse(product.photo)[0]}`} alt={JSON.parse(product.photo)[0]} />
                                    </div>


                                </div>

                            {/* <!-- /Product thumb imgs -->

                            <!-- Product details --> */}
  
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
                                        <span className="product-available">In Stock</span>
                                    </div>
                                    <p>{product.description}</p>

                                    <div className="product-options">
                                        <label>
                                            Size
                                            <select className="input-select">
                                                <option value="0">{product.size}</option>
                                            </select>
                                        </label>
                                        <label>
                                            Color
                                            <select className="input-select">
                                                <option value="0">{product.color}</option>
                                            </select>
                                        </label>
                                    </div>

                                    <div className="add-to-cart">
                                        <div className="qty-label">
                                            Qty
                                            <div className="input-number">
                                                <input type="number" />
                                                <span className="qty-up">+</span>
                                                <span className="qty-down">-</span>
                                            </div>
                                        </div>
                                        <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to cart</button>
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
                            <Button bsPrefix="qv">
                                <span>View More</span>
                            </Button>
                    </React.Fragment>}
                </Modal.Body>
        </Modal>
        </React.Fragment>
    )
}

export default QucikView