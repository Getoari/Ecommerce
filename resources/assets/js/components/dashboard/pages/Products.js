import React, { Component } from 'react'
import Axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import Pagination from 'react-js-pagination'

import DeleteDialog from '../container/DeleteDialog'

class Products extends Component {
    constructor() {
        super()

        this.state = {
            loading: true,
            currentPage: 1,
            perPage: 0,
            total: 0,
            products: []
        }

        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        this.getProducts()
    }

    getProducts(pageNumber) {
        Axios.get(`/api/products?page=${pageNumber}`).then( result => {
            this.setState({
                currentPage: result.data.current_page, 
                perPage: result.data.per_page,
                total: result.data.total,
                products: [...result.data.data],
                loading: false
            })
        })
    }

    handleDelete() {
        
        let page = this.state.currentPage
        
        if((this.state.total - 1) % this.state.perPage == 0)
            page--
        
        this.getProducts(page)
    }

    render() {
        return (
            <div className="container-fluid">

                {/* <!-- DataTales Example --> */}
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">All Products</h6>
                    </div>
                    <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                            <th>Photo</th>
                            <th>Brand</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.loading ? 
                        <tr>
                            <td colSpan="7"><div style={{textAlign: 'center', marginTop: '20px'}}><Spinner animation="border" /></div></td>
                        </tr> 
                        :
                        this.state.products.map(product => (
                            <tr key={product.id}>
                                <td style={{textAlign: 'center'}}>
                                    <img height="30px" width="30px" src={`/img/${JSON.parse(product.photo)[0]}`} alt={JSON.parse(product.photo)[0]} />
                                </td>
                                <td>{product.brand}</td>
                                <td>{product.name}</td>
                                <td>{product.category.name}</td>
                                <td>${product.price}</td>
                                <td>Avaiable</td>
                                <td style={{textAlign: 'center'}}><DeleteDialog id={product.id} handleDelete={this.handleDelete} /></td>
                            </tr>

                        ))}
                        </tbody>
                        </table>
                    </div>
                    <div style={{float: 'right'}}>
                    { this.state.products.length > 0 && 
                        this.state.total > this.state.perPage &&
                        <div className="pagination-container"> 
                        <Pagination
                            activePage={this.state.currentPage}
                            itemsCountPerPage={this.state.perPage}
                            totalItemsCount={this.state.total}
                            pageRangeDisplayed={5}
                            onChange={(pageNumber) => this.getProducts(pageNumber)}
                            itemClass="page-item"
                            linkClass="page-link"
                            firstPageText="First"
                            lastPageText="Last"
                        />
                        </div>
                    }
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Products