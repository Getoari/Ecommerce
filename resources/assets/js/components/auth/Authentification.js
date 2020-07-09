import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom' 
import Dropdown from 'react-bootstrap/Dropdown'

import Login from './Login'
import Register from './Register'

class Authentification extends Component {
 
    constructor(props){
        super(props)

        this.state = {
            name: '',
            email: '',
            redirect: ''
        }

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {

        if(localStorage.token)
            this.getAuth(localStorage.token)
    }

    getAuth(token) {
        axios.get('/api/auth', {
            headers: { Authorization: `Bearer ${token}`}
        }).then(result => {
            this.setState({
                name: result.data.user.name,
                email: result.data.user.email
            })
        }).catch(error => {
            console.log(error)
            this.logout()
        })
    }

    logout() {
        localStorage.setItem('token', '')
        this.setState({
            name: '',
            email: ''
        })
        this.props.removeUser()
    }

    handleClick(e) {
        switch(e.target.id) {
            case '1':
                this.setState({redirect: 'my-account'})
                break;
            case '2':
                this.setState({redirect: 'track-my-order'})
                break;
            case '3': 
                this.logout()
                break;
        }
    }
   

    render() {

        const redirect = this.state.redirect

        if (redirect) {
            return <Redirect to={`/${redirect}`} />
        }

        return (
            (this.props.user || localStorage.token ?
                <li>
                <Dropdown>
                    <Dropdown.Toggle variant="toggle" id="dropdown-basic">
                            <i className="fa fa-user-o"></i>
                            <span>{localStorage.token && this.state.name}{this.props.user && this.props.user}</span>
                            <i className="fa fa-caret-down" aria-hidden="true"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu onClick={this.handleClick}>
                        <Dropdown.Item id="1" >My Account</Dropdown.Item>
                        <Dropdown.Item id="2" >Track My Order</Dropdown.Item>                          
                        <Dropdown.Divider />
                        <Dropdown.Item id="3" >
                            <i className="fa fa-sign-out" aria-hidden="true"></i>
                            Log Out
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </li>
            :
            <React.Fragment>
                <li><Login /></li>
                <li><Register /></li>
            </React.Fragment>)
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeUser: ( () => dispatch({type: 'USER', value: ''}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentification) 