import React, { useState } from 'react';
import axios from 'axios';


class NewsLetter extends React.Component { 
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: '',
            emailRes: [],
          };
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmit(event) {
        event.preventDefault();

        axios.post('api/newsletter', {
                value: this.state.value
         }).then(response => {
            const email=response.data
            this.setState({emailRes: response.data});
       })
    }
    
  render() {    
        return(
    <div>
      
            {/* <!-- NEWSLETTER --> */}
            <div id="newsletter" className="section">
                {/* <!-- container --> */}
                <div className="container">
                    {/* <!-- row --> */}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="newsletter">
                                <p>Sign Up for the <strong>NEWSLETTER</strong></p>
                                <form onSubmit={this.handleSubmit} > 
                                    <input className="input" name="email" type="email" placeholder="Enter Your Email" value={this.state.value} onChange={this.handleChange} required/>
                                    <button className="newsletter-btn" type="submit"><i className="fa fa-envelope"></i> Subscribe</button>
                                </form>
                                <h5><b>{this.state.emailRes}</b></h5>
                                <ul className="newsletter-follow">
                                    <li>
                                        <a href="#"><i className="fa fa-facebook"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fa fa-twitter"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fa fa-instagram"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fa fa-pinterest"></i></a>
                                    </li>
                                </ul>
                            </div>
                    </div>
                </div>
                {/* <!-- /row --> */}
            </div>
            {/* <!-- /container --> */}
            </div>
            {/* <!-- /NEWSLETTER --> */}
            
            </div>
        );
    }
}
export default NewsLetter;