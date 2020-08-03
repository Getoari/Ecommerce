import React, { useState } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import { connect } from 'react-redux'

function Register(props) {
 
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [errorKeys, setErrorKeys] = useState([])
    const [error, setError] = useState([])
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const handleClose = () => setShow(false)
    
    const handleShow = () => {
        setShow(true)
    }

    function handleSubmit(e) {
        
        e.preventDefault()
        setLoading(true)
        axios.post('/api/register', {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirm
        }).then(result => {
            localStorage.setItem('token', result.data.token)
            props.addUser(result.data.user)
        }).catch(err => {
            setErrorKeys(Object.keys(JSON.parse(err.response.data)))
            setError(JSON.parse(err.response.data))
            setLoading(false)
        })
    }

    function handleChange(e) {
        if(e.target.name == 'name')
            setName(e.target.value) 
        if(e.target.name == 'email')
            setEmail(e.target.value) 
        if(e.target.name == 'password')
            setPassword(e.target.value) 
        if(e.target.name == 'password_confirmation')
            setPasswordConfirm(e.target.value) 
    }

    return (
        <React.Fragment>
        <Button onClick={handleShow} bsPrefix="auth"><i className="fa fa-user-o"></i>Register</Button>
        <Modal show={show} onHide={handleClose}>
            
                <Modal.Header closeButton>
                    <Modal.Title className="auth-title">
                        User Registration
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="auth" onSubmit={handleSubmit}>
                        {(error && errorKeys) &&
                        errorKeys.map(key => (
                            <div className="form-alert">
                                <Alert key={key} variant='danger'>
                                    <i className="fa fa-exclamation-triangle"></i>
                                    {error[key]}
                                    {console.log(error[key])}
                                </Alert>
                            </div>
                        ))}

                        <div className="form-group">
                            <input type="name" required
                            className="form-control auth-input"
                            name="name"
                            placeholder="Enter Name"
                            onChange={handleChange}/>
                            <i className="fa fa-user"></i>
                        </div>
                        <div className="form-group">
                            <input type="email" required
                            className="form-control auth-input"
                            name="email"
                            placeholder="Enter Email"
                            onChange={handleChange}/>
                            <i className="fa fa-envelope"></i>
                        </div>
                        <div className="form-group">
                            <input type="password" required
                            className="form-control auth-input"
                            name="password"
                            placeholder="Enter Password"
                            onChange={handleChange}/>
                            <i className="fa fa-lock"></i>
                        </div>
                        <div className="form-group">
                            <input type="password" required
                            className="form-control auth-input"
                            name="password_confirmation"
                            placeholder="Enter Password Again"
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
                                <span>Registering...</span>
                            </div>
                            :
                            <span>Register</span>}
                        </button>
                    </form>
                </Modal.Body>
        </Modal>
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addUser: (user) => dispatch({type: 'USER', value: user})
    }
}

export default connect(null, mapDispatchToProps)(Register)