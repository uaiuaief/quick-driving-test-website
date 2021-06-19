import React, { Component } from 'react';
import BlueButton2 from "../Buttons/BlueButton2"
import { Link } from 'react-router-dom';
import { Formik } from 'formik';


class NewPasswordPage extends Component {
    componentDidMount() {
        document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    render() {
        return (
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
                                // alert(JSON.stringify(values, null, 2))
                                
                                const ENDPOINT = "/api/unauthenticated-change-password/"
                                let payload = values;
                                payload.token = window.location.search.split('=')[1]

                                let res = await fetch(ENDPOINT, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-CSRFToken': window.getCookie('csrftoken')
                                    },
                                    body: JSON.stringify(payload)
                                })
                            }}
                        >
                            {props => (
                                <form onSubmit={props.handleSubmit}>
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
