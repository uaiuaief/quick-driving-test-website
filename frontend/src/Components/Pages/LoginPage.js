import React, { Component } from 'react';
import { Formik } from 'formik'
import BlueButton2 from "../Buttons/BlueButton2";
import { Link, Redirect } from 'react-router-dom';


class LoginPage extends Component {
    state = {
        redirect: false
    }
    componentDidMount() {
        document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

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

                            onSubmit={async (values, actions) => {
                                const ENDPOINT = "/api/login/"

                                let res = await fetch(ENDPOINT, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-CSRFToken': window.getCookie('csrftoken')
                                    },
                                    body: JSON.stringify(values)
                                })

                                if (String(res.status).slice(0, 1) == 2) {
                                    window.location = '/account'
                                }
                                else if (String(res.status).slice(0, 1) == 4) {
                                    let data = await res.json()
                                    actions.setErrors({
                                        login: data.error
                                    })
                                }
                            }}

                            validate={(values) => {
                                let errors = {}

                                return errors
                            }}
                        >
                            {props => (
                                <form onSubmit={props.handleSubmit}>
                                    {props.errors.login
                                        ?
                                        <div id="login-error">Incorrect username or password.</div>
                                        :
                                        null
                                    }
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
                                            <label htmlFor="keep-me-logged-in">Keep me logged in</label>
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
