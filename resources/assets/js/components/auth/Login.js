import React, { useState } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import { connect } from 'react-redux'


function Login(props) {
 
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    
    const handleClose = () => {
        setShow(false)
        props.hideLogin()
    }
    
    const handleShow = () => {
        setShow(true)
    }

    function handleSubmit(e) {

        e.preventDefault()
        setLoading(true)
        axios.post('/api/login', {
            email: email,
            password: password
        }).then(result => {
            localStorage.setItem('token', result.data.token)
            props.addUser(result.data.user)
        }).catch(error => {
            setError(true)
            setLoading(false)
        })
    }

    function handleChange(e) {
        if(e.target.name == 'email')
            setEmail(e.target.value) 
        if(e.target.name == 'password')
            setPassword(e.target.value) 
    }

    return (
        <React.Fragment>
        <Button onClick={handleShow} bsPrefix="auth"><i className="fa fa-sign-in"></i>Login</Button>
        <Modal show={show || props.showLogin} onHide={handleClose}>
            
                <Modal.Header closeButton>
                    <Modal.Title className="auth-title">
                        User Login
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="auth" onSubmit={handleSubmit}>
                        {error && 
                        <div className="form-alert">
                            <Alert variant='danger'>
                                <i className="fa fa-exclamation-triangle"></i>
                                Invalid credentials!
                            </Alert>
                        </div>}
                        <div className="form-group">
                            <input type="email" required
                            className="form-control auth-input"
                            name="email"
                            placeholder="Enter Email"
                            onChange={handleChange}/>
                            <i className="fa fa-user"></i>
                        </div>
                        <div className="form-group">
                            <input type="password" required
                            className="form-control auth-input"
                            name="password"
                            placeholder="Enter Password"
                            onChange={handleChange}/>
                            <i className="fa fa-lock"></i>
                        </div>
                        <button type="submit" className="submit btn btn-danger">
                            { loading ?
                            <div className="align-middle">
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                <span>Logging in...</span>
                            </div>
                            :
                            <span>Login</span>}
                        </button>
                    </form>
                </Modal.Body>
        </Modal>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        showLogin: state.show_login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addUser: (user) => dispatch({type: 'USER', value: user}),
        hideLogin: () => dispatch({type: 'LOGIN_CONTROL', value: false})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)