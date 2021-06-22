import React, { Component } from 'react';
import BlueButton1 from '../Buttons/BlueButton1';
import { Formik } from 'formik';

class ContactForm extends Component {
    render() {
        return (
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    message: "",
                }}

                onSubmit={async (values, actions) => {
                    const ENDPOINT = "/api/send-message/"

                    let res = await fetch(ENDPOINT, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': window.getCookie('csrftoken')
                        },
                        body: JSON.stringify(values)
                    })

                    if (String(res.status).slice(0, 1) == 2) {
                        actions.resetForm();
                    }
                    else if (String(res.status).slice(0, 1) == 4) {
                        let data = await res.json()
                        
                    }
                }}

                validate={values => {
                    let errors = {};

                    if (!values.email) {
                        errors.email = 'This field is required';
                    }
                    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }

                    return errors;
                }}
            >
                {props => (

                    <form
                        id="contact-form"
                        onSubmit={props.handleSubmit}
                    >
                        <div className="inner-container">
                            <div className="form-row-1">
                                <input
                                    id="name-field"
                                    placeholder="Your Name"
                                    required
                                    name="name"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.name}
                                ></input>
                                <input
                                    id="email-field"
                                    placeholder="Your Email"
                                    required
                                    name="email"
                                    type="email"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.email}
                                ></input>
                            </div>
                            <textarea
                                id="message-field"
                                placeholder="Your Message"
                                required
                                name="message"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.message}
                            ></textarea>
                        </div>
                        <BlueButton1
                            text={props.isSubmitting ? "Submiting...": "Submit"}
                            disabled={!props.isValid || !props.dirty || props.isSubmitting}
                            text="Submit"
                        />
                    </form>
                )}
            </Formik>
        );
    }
}


export default ContactForm;
