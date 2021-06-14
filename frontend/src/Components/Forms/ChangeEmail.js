import React, { Component } from 'react';
import { Formik } from 'formik';
import BlueButton2 from "../Buttons/BlueButton2"


class ChangeEmail extends Component {
    render() {
        const { parentState, setParentState, fetchUserData } = this.props

        return (
            <Formik
                initialValues={{
                    new_email: "",
                    confirm_email: "",
                    password: "",
                }}

                onSubmit={async (values, actions) => {
                    const ENDPOINT = "/api/change-email/"

                    let res = await fetch(ENDPOINT, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': window.getCookie('csrftoken')
                        },
                        body: JSON.stringify(values)
                    })

                    if (String(res.status).slice(0, 1) == 2) {
                        fetchUserData()
                        setParentState({ highlighted: 'success-email' })
                    }
                    else {
                    }
                }}

                validate={values => {
                    let errors = {};

                    if (!values.new_email) {
                        errors.new_email = 'This field is required';
                    }
                    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.new_email)) {
                        errors.new_email = 'Invalid email address';
                    }

                    if (!values.confirm_email) {
                        errors.confirm_email = 'This field is required';
                    }
                    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.confirm_email)) {
                        errors.confirm_email = 'Invalid email address';
                    }
                    else if (values.new_email != values.confirm_email) {
                        errors.confirm_email = "Fields don't match";
                    }

                    if (!values.password) {
                        errors.password = 'This field is required';
                    }
                    else if (values.password.length < 8) {
                        errors.password = 'Must be at least 8 characters';
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
                                        <label htmlFor="new_email">New Email *</label>
                                        <input
                                            id="new_email"
                                            name="new_email"
                                            type="email"
                                            value={props.values.new_email}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                        {props.touched.new_email && props.errors.new_email ? <div className="input-error">{props.errors.new_email}</div> : null}
                                    </div>

                                </div>
                                <div className="form-row">
                                    <div className="form-item">
                                        <label htmlFor="confirm_email">Confirm Email *</label>
                                        <input
                                            id="confirm_email"
                                            name="confirm_email"
                                            type="email"
                                            value={props.values.confirm_email}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                        {props.touched.confirm_email && props.errors.confirm_email ? <div className="input-error">{props.errors.confirm_email}</div> : null}
                                    </div>

                                </div>
                                <div className="form-row">
                                    <div className="form-item">
                                        <label htmlFor="password">Password *</label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={props.values.password}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                        {props.touched.password && props.errors.password ? <div className="input-error">{props.errors.password}</div> : null}
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


export default ChangeEmail;
