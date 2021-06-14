import React, { Component } from 'react';
import { Formik } from 'formik';
import BlueButton2 from "../Buttons/BlueButton2"


class ChangePassword extends Component {
    render() {
        const { parentState, setParentState } = this.props

        return (
            <Formik
                initialValues={{
                    current_password: "",
                    new_password: "",
                    confirm_new_password: "",
                }}

                onSubmit={async (values, actions) => {
                    const ENDPOINT = "/api/change-password/"

                    let res = await fetch(ENDPOINT, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': window.getCookie('csrftoken')
                        },
                        body: JSON.stringify(values)
                    })

                    if (String(res.status).slice(0, 1) == 2) {
                        setParentState({ highlighted: 'success-password' })
                    }
                    else {
                    }
                }}

                validate={values => {
                    let errors = {};

                    if (!values.current_password) {
                        errors.current_password = 'This field is required';
                    }
                    else if (values.current_password.length < 8) {
                        errors.current_password = 'Must be at least 8 characters';
                    }

                    if (!values.new_password) {
                        errors.new_password = 'This field is required';
                    }
                    else if (values.new_password.length < 8) {
                        errors.new_password = 'Must be at least 8 characters';
                    }
                    
                    if (!values.confirm_new_password) {
                        errors.confirm_new_password = 'This field is required';
                    }
                    else if (values.confirm_new_password.length < 8) {
                        errors.confirm_new_password = 'Must be at least 8 characters';
                    }
                    else if (values.new_password != values.confirm_new_password) {
                        errors.confirm_new_password = "Passwords don't match";
                    }

                    return errors;
                }}
            >
                {props => {
                    return (
                        <form onSubmit={props.handleSubmit}>
                            <div className="form-inputs">
                                <div className="form-row">
                                    <div className="form-item">
                                        <label htmlFor="current_password">Current Password *</label>
                                        <input
                                            id="current_password"
                                            name="current_password"
                                            type="password"
                                            value={props.values.current_password}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                        {props.touched.current_password && props.errors.current_password ? <div className="input-error">{props.errors.current_password}</div> : null}
                                    </div>

                                </div>
                                <div className="form-row">
                                    <div className="form-item">
                                        <label htmlFor="new_password">New Password *</label>
                                        <input
                                            id="new_password"
                                            name="new_password"
                                            type="password"
                                            value={props.values.new_password}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                        {props.touched.new_password && props.errors.new_password ? <div className="input-error">{props.errors.new_password}</div> : null}
                                    </div>

                                </div>
                                <div className="form-row">
                                    <div className="form-item">
                                        <label htmlFor="confirm_new_password">Confirm New Password *</label>
                                        <input
                                            id="confirm_new_password"
                                            name="confirm_new_password"
                                            type="password"
                                            value={props.values.confirm_new_password}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                        {props.touched.confirm_new_password && props.errors.confirm_new_password ? <div className="input-error">{props.errors.confirm_new_password}</div> : null}
                                    </div>

                                </div>
                                <div className="form-buttons">
                                <BlueButton2
                                        onClick={() => {
                                            setParentState({
                                                highlighted: 'account'
                                            })
                                        }}
                                        text="Back"
                                        type="button"
                                    />
                                    <BlueButton2
                                        text="Save"
                                        type="submit"
                                        disabled={!props.isValid || !props.dirty}
                                    />
                                </div>
                            </div>
                        </form>
                    )
                }}
            </Formik>
        );
    }
}

export default ChangePassword;
