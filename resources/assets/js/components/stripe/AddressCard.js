import React, { Component } from 'react'


class AddressCard extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div id="address-card">
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                <p>{this.props.address.firstName} {this.props.address.lastName}</p>
                <p>{this.props.address.address}, {this.props.address.zip}</p>
                <p>{this.props.address.country}, {this.props.address.city}</p>
                <p>{this.props.address.telephone}</p>
            </div>
        )
    }
} 

export default AddressCard
