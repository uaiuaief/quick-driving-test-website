import React, { Component } from 'react';
import BlueButton2 from "../Buttons/BlueButton2"
import { Link, Redirect } from 'react-router-dom';
import { Formik } from 'formik';


class NewPasswordPage extends Component {
    state = {
        redirect: false,
        token: null
    }

    componentDidMount() {
        document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });
        let token = window.location.search.split('=')[1]

        if (typeof token === 'undefined' || token === null) {
            this.setState({
                redirect: '/'
            })
        }
        else {
            this.setState({
                token: token
            })
        }

    }

    render() {
        return (
            this.state.redirect
                ?
                <Redirect to={this.state.redirect} />
                :
                <section id="choose-new-password-page">
                    <div className="inner-container">
                        <div id="choose-new-password-box" className="auth-box">
                            <h1>Reset password</h1>
                            <Formik
                                initialValues={{
                                    new_password: "",
                                    confirm_new_password: ""
                                }}

                                validate={values => {
                                    let errors = {}
                                    if (values.new_password != values.confirm_new_password) {
                                        errors.confirm_new_password = "Passwords don't match";
                                    }

                                    return errors;
                                }}

                                onSubmit={async (values, actions) => {
                                    const ENDPOINT = "/api/unauthenticated-change-password/"
                                    let payload = values;
                                    payload.token = this.state.token

                                    let res = await fetch(ENDPOINT, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'X-CSRFToken': window.getCookie('csrftoken')
                                        },
                                        body: JSON.stringify(payload)
                                    })

                                    if (String(res.status).slice(0, 1) == 2) {
                                        this.setState({
                                            redirect: '/password-reset-success'
                                        })
                                    }
                                    else if (String(res.status).slice(0, 1) == 4) {
                                        let data = await res.json()
                                        actions.setErrors({
                                            token: data.error
                                        })

                                    }


                                }}
                            >
                                {props => (
                                    <form onSubmit={props.handleSubmit}>
                                        {props.errors.token ? <div className="form-error">{props.errors.token}</div> : null}
                                        {/* <div className="form-error">Invalid Token</div> */}
                                        <input
                                            required
                                            value={props.values.new_password}
                                            name="new_password"
                                            placeholder="New password"
                                            type="password"
                                            id="new-password-field"
                                            minLength="8"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                        {props.touched.new_password && props.errors.new_password ? <div className="input-error">{props.errors.new_password}</div> : null}
                                        <input
                                            required
                                            value={props.values.confirm_new_password}
                                            name="confirm_new_password"
                                            placeholder="Confirm new password"
                                            type="password"
                                            id="confirm-new-password-field"
                                            minLength="8"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                        {props.touched.confirm_new_password && props.errors.confirm_new_password ? <div className="input-error">{props.errors.confirm_new_password}</div> : null}
                                        <br />
                                        <BlueButton2
                                            id="password-reset-button"
                                            text="Reset" />
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

export default NewPasswordPage;
