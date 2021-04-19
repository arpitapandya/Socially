import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { signin, authenticate } from "../auth";

class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
        };
    }

    handleChange = name => (event) => {
        this.setState({error: ""})
        this.setState({ [name]: event.target.value });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const { email, password } = this.state;
        const user = {
            email,
            password
        };
        console.log(user);
        signin(user).then(data => {
            if (data.error) {
                this.setState({ error: data.error, loading: false });
            } else {
                // authenticate
                authenticate(data, () => {
                    this.setState({redirectToReferer: true});
                })
            }
        });
    };

    signinForm = (email, password) => (
        // <div className="card">
        // <div className="card-body">
        <form>
        <div className = "form-group">
            <label className="text-muted">Email</label>
            <input 
                onChange={this.handleChange("email")}
                type="email" 
                className="form-control"
                value={email} 
            />
        </div>
        <div className = "form-group">
            <label className="text-muted">Password</label>
            <input 
                onChange={this.handleChange("password")}
                type="password" 
                className="form-control" 
                value={password} 
            />
        </div>
        <br />
        <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
    </form>
    // </div>
    // </div>
    );

    render() {
        const { email, password, error, redirectToReferer, loading } = this.state;
        
        if(redirectToReferer) {
            return <Redirect to="/" />
        }

        return (
            <div className="container col-md-6 col-lg-4 offset-md-3 offset-lg-4">
                <h2 className="mt-5 mb-5">Sign In</h2>

                <div className="alert alert-danger" 
                    style={{ display: error ? "" : "none" }}>
                    {error}
                </div>

                { loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}
                    {this.signinForm(email, password)}
            </div>
        );
    }
}

export default Signin;