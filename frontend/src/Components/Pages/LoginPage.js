import React, { Component } from 'react';
import { Formik } from 'formik'
import BlueButton2 from "../Buttons/BlueButton2";
import { Link } from 'react-router-dom';


class LoginPage extends Component {
    componentDidMount() {
        document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     const URL = "/api/login/"

    //     let res = await fetch(URL, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-CSRFToken': window.getCookie('csrftoken')
    //         },
    //         body: JSON.stringify(this.state)
    //     })

    // }
    // }

    render() {
        return (
            <section id="login-page">
                <div className="inner-container">
                    <div id="login-box" className="auth-box">
                        <h1>Login to your account</h1>
                        <Formik
                            initialValues={{
                                email: "",
                                password: ""
                            }}

                            onSubmit={(values, actions) => {
                                // alert(JSON.stringify(values))
                                const ENDPOINT = "/api/login/"
                        
                                fetch(ENDPOINT, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-CSRFToken': window.getCookie('csrftoken')
                                    },
                                    body: JSON.stringify(values)
                                }).then(res => {
                                    return res.json();
                                }).then(data => {
                                    if(data.user && data.user !== 'AnonymousUser'){
                                        window.location.href = '/account'
                                    }
                                })
                            }}
                        >
                            {props => (
                                <form onSubmit={props.handleSubmit}>
                                    <input
                                        id="email"
                                        name="email"
                                        value={props.email}
                                        required
                                        placeholder="Email"
                                        type="email"
                                        onChange={props.handleChange}
                                    />
                                    <input
                                        id="password"
                                        name="password"
                                        value={props.password}
                                        required
                                        placeholder="Password"
                                        type="password"
                                        onChange={props.handleChange}
                                    />
                                    <div className="form-row-2">
                                        <div>
                                            <input
                                                id="keep-me-logged-in"
                                                type="checkbox"
                                            />
                                            <label for="keep-me-logged-in">Keep me logged in</label>
                                        </div>
                                        <Link to="/password-reset">Forgot password?</Link>
                                    </div>
                                    <BlueButton2
                                        id="login-button"
                                        text="Login" 
                                        type="submit"
                                    />
                                </form>
                            )}
                        </Formik>
                        <span className="auth-footer">Don't have an account? <Link to="/signup">Sign up</Link></span>
                    </div>
                </div>
            </section>
        );
    }
}


export default LoginPage;
