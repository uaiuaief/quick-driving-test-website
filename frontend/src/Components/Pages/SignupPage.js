import React, { Component, useState } from 'react';
import TestCenterOptions from '../SmallerComponents/TestCenterOptions';
import BlueButton2 from "../Buttons/BlueButton2"
import { Link } from 'react-router-dom';
import { useFormik, Formik, isEmptyArray } from 'formik'


class StepOne extends Component {
    componentDidMount() {
        document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    render() {
        const { handleChange, handleBlur, values, touched, errors } = this.props;

        let { driving_licence_number, theory_test_number,
            test_ref, test_after,
            test_before, earliest_time,
            latest_time, recent_failure,
            desired_test_center } = values;

        return (
            <>
                <h1>Signup it's very quick</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="form-inputs">
                    <div className="form-row form-row-1">
                        <div className="form-item">
                            <label htmlFor="driving_licence_number">Driving License Number *</label>
                            <input
                                required
                                id="driving_licence_number"
                                name="driving_licence_number"
                                type="text"
                                value={driving_licence_number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                            </input>
                            {touched.driving_licence_number && errors.driving_licence_number ? <div className="input-error">{errors.driving_licence_number}</div> : null}
                        </div>
                        <div className="form-item">
                            <label htmlFor="theory_test_number">Theory Test Number</label>
                            <input
                                id="theory_test_number"
                                name="theory_test_number"
                                type="text"
                                value={theory_test_number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                            </input>
                            {touched.theory_test_number && errors.theory_test_number ? <div className="input-error">{errors.theory_test_number}</div> : null}
                        </div>
                    </div>
                    <div className="form-row form-row-2">
                        <div className="form-item">
                            <label htmlFor="test_ref">Driving Test Reference Number *</label>
                            <input
                                required
                                id="test_ref"
                                name="test_ref"
                                type="text"
                                value={test_ref}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                            </input>
                            {touched.test_ref && errors.test_ref ? <div className="input-error">{errors.test_ref}</div> : null}
                        </div>
                    </div>
                    <div className="form-row form-row-3">
                        <div className="form-item">
                            <label htmlFor="test_after">Test after</label>
                            <input
                                id="test_after"
                                name="test_after"
                                type="date"
                                value={test_after}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                            </input>
                            {touched.test_after && errors.test_after ? <div className="input-error">{errors.test_after}</div> : null}
                        </div>

                        <div className="form-item">
                            <label htmlFor="test_before">Test before</label>
                            <input
                                id="test_before"
                                name="test_before"
                                type="date"
                                value={test_before}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                            </input>
                            {touched.test_before && errors.test_before ? <div className="input-error">{errors.test_before}</div> : null}
                        </div>
                    </div>
                    <div className="form-row form-row-4">
                        <div className="form-item">
                            <label htmlFor="earliest_time">Earliest time</label>
                            <select
                                id="earliest_time"
                                name="earliest_time"
                                type="time"
                                value={earliest_time}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="">Select</option>
                                <option value="07:00">07:00am</option>
                                <option value="08:00">08:00am</option>
                                <option value="09:00">09:00am</option>
                                <option value="10:00">10:00am</option>
                                <option value="11:00">11:00am</option>
                                <option value="12:00">12:00pm</option>
                                <option value="13:00">01:00pm</option>
                                <option value="14:00">02:00pm</option>
                                <option value="15:00">03:00pm</option>
                                <option value="16:00">04:00pm</option>
                                <option value="17:00">05:00pm</option>
                                <option value="18:00">06:00pm</option>
                            </select>
                            {touched.earliest_time && errors.earliest_time ? <div className="input-error">{errors.earliest_time}</div> : null}
                        </div>

                        <div className="form-item">
                            <label htmlFor="latest_time">Latest time</label>
                            <select
                                id="latest_time"
                                name="latest_time"
                                type="time"
                                value={latest_time}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="">Select</option>
                                <option value="07:00">07:00am</option>
                                <option value="08:00">08:00am</option>
                                <option value="09:00">09:00am</option>
                                <option value="10:00">10:00am</option>
                                <option value="11:00">11:00am</option>
                                <option value="12:00">12:00pm</option>
                                <option value="13:00">01:00pm</option>
                                <option value="14:00">02:00pm</option>
                                <option value="15:00">03:00pm</option>
                                <option value="16:00">04:00pm</option>
                                <option value="17:00">05:00pm</option>
                                <option value="18:00">06:00pm</option>
                            </select>
                            {touched.latest_time && errors.latest_time ? <div className="input-error">{errors.latest_time}</div> : null}

                        </div>
                    </div>
                    <div className="form-row form-row-5">
                        <div className="form-item">
                            <label htmlFor="recent_failure">Date of most recent failure (if any)</label>
                            <input
                                id="recent_failure"
                                name="recent_failure"
                                type="date"
                                value={recent_failure}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                            </input>
                            {touched.recent_failure && errors.recent_failure ? <div className="input-error">{errors.recent_failure}</div> : null}
                        </div>
                        <div className="form-item">
                            <label htmlFor="desired_test_center">Desired test centre *</label>
                            <select
                                required
                                id="desired_test_center"
                                name="desired_test_center"
                                type="text"
                                value={desired_test_center}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <TestCenterOptions />
                            </select>
                            {touched.desired_test_center && errors.desired_test_center ? <div className="input-error">{errors.desired_test_center}</div> : null}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class StepTwo extends Component {
    componentDidMount() {
        document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    render() {
        const { handleChange, handleBlur, values, touched, errors } = this.props;

        let { first_name, last_name,
            email, mobile_number,
            password, confirm_password } = values;

        return (
            <>
                <h1>One more step...</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="form-inputs">
                    <div className="form-row form-row-1">
                        <div className="form-item">
                            <label htmlFor="first_name">First Name *</label>
                            <input
                                required
                                id="first_name"
                                name="first_name"
                                type="text"
                                value={first_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                            </input>
                            {touched.first_name && errors.first_name ? <div className="input-error">{errors.first_name}</div> : null}
                        </div>
                        <div className="form-item">
                            <label htmlFor="last_name">Last Name *</label>
                            <input
                                required
                                id="last_name"
                                name="last_name"
                                type="text"
                                value={last_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                            </input>
                            {touched.last_name && errors.last_name ? <div className="input-error">{errors.last_name}</div> : null}
                        </div>
                    </div>
                    <div className="form-row form-row-2">
                        <div className="form-item">
                            <label htmlFor="email">Email *</label>
                            <input
                                required
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                            </input>
                            {touched.email && errors.email ? <div className="input-error">{errors.email}</div> : null}
                        </div>
                        <div className="form-item">
                            <label htmlFor="mobile_number">Mobile number</label>
                            <input
                                id="mobile_number"
                                name="mobile_number"
                                type=""
                                value={mobile_number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                            </input>
                            {touched.mobile_number && errors.mobile_number ? <div className="input-error">{errors.mobile_number}</div> : null}
                        </div>
                    </div>
                    <div className="form-row form-row-3">
                        <div className="form-item">
                            <label htmlFor="password">Password *</label>
                            <input
                                required
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                            </input>
                            {touched.password && errors.password ? <div className="input-error">{errors.password}</div> : null}
                        </div>
                    </div>
                    <div className="form-row form-row-4">
                        <div className="form-item">
                            <label htmlFor="confirm_password">Confirm password *</label>
                            <input
                                required
                                id="confirm_password"
                                name="confirm_password"
                                type="password"
                                value={confirm_password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                            </input>
                            {touched.confirm_password && errors.confirm_password ? <div className="input-error">{errors.confirm_password}</div> : null}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class SignupPage extends Component {
    state = {
        step: 1,

        // Step 1
        driving_licence_number: "",
        test_ref: "",
        theory_test_number: "",
        test_after: "",
        test_before: "",
        earliest_time: "",
        latest_time: "",
        recent_failure: "",
        desired_test_center: "",

        // Step 2
        first_name: "",
        last_name: "",
        email: "",
        mobile_number: "",
        password: "",
        confirm_password: "",
    }

    // handleSubmit = async e => {
    //     e.preventDefault();
    //     this.validateStep1();
    //     // let element = document.getElementById("driving-license-number-field")
    //     let element = document.getElementById("desired-test-center-field")
    //     // element.setCustomValidity("as");
    //     element.setAttribute("invalid", "true");


    // const URL = "/api/customers/"

    // let res = await fetch(URL, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'X-CSRFToken': window.getCookie('csrftoken')
    //     },
    //     body: JSON.stringify(this.state)
    // })

    // }

    render() {
        return (
            <section id="signup-page">
                <div className="inner-container">
                    <TestForm
                        step={this.state.step}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                    />
                    {/* <div className="form-buttons">
                        <BlueButton2
                            onClick={e => this.prevStep()}
                            id=""
                            text="Back"
                        />
                        <BlueButton2
                            onClick={e => this.nextStep()}
                            id=""
                            text="Next"
                        />
                    </div> */}
                </div>
            </section >
        );
    }
}



class TestForm extends Component {
    state = {
        stepOneInitialState: true,
        stepTwoInitialState: true,
        step: 1
    }

    validateStepOne = (values) => {
        if (this.state.step !== 1) return null
        let errors = {}

        if (!values.driving_licence_number) {
            errors.driving_licence_number = 'This field is required';
        }
        else if (values.driving_licence_number.length > 30) {
            errors.driving_licence_number = 'Must 30 be characters or less';
        }

        if (!values.desired_test_center) {
            errors.desired_test_center = 'This field is required';
        }

        if (!values.test_ref) {
            errors.test_ref = 'This field is required';
        }

        if (values.test_after && values.test_before) {
            let before = new Date(values.test_before)
            let after = new Date(values.test_after)

            if (after > before) {
                errors.test_after = `Date must be before ${values.test_before}`;
                errors.test_before = `Date must be after ${values.test_after}`;
            }
        }

        if (values.earliest_time && values.latest_time) {
            if (Date.parse(`01/01/1970 ${values.earliest_time}`) >= Date.parse(`01/01/1970 ${values.latest_time}`)) {
                errors.earliest_time = `Time must be before ${values.latest_time}`;
                errors.latest_time = `Time must be after ${values.earliest_time}`;
            }

        }

        return errors
    }

    validateStepTwo = (values) => {
        let errors = {}

        if (!values.first_name) {
            errors.first_name = 'This field is required';
        }
        else if (values.first_name.length > 20) {
            errors.first_name = 'Must be 20 characters or less';
        }

        if (!values.last_name) {
            errors.last_name = 'This field is required';
        }
        else if (values.last_name.length > 20) {
            errors.last_name = 'Must be 20 characters or less';
        }

        if (!values.email) {
            errors.email = 'This field is required';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        // if (!values.mobile_number) {
        //     errors.mobile_number = 'This field is required';
        // }

        if (!values.password) {
            errors.password = 'This field is required';
        }
        else if (values.password.length < 8) {
            errors.password = 'Must be at least 8 characters';
        }

        if (!values.confirm_password) {
            errors.confirm_password = 'This field is required';
        }
        else if (values.confirm_password.length < 8) {
            errors.confirm_password = 'Must be at least 8 characters';
        }
        else if (values.confirm_password !== values.password) {
            errors.confirm_password = 'Passwords don\'t match';
        }

        return errors
    }

    nextStep = (handleSubmit) => {
        // e.preventDefault();

        if (this.state.step >= 2) {
            return
        }

        this.setState({
            step: this.state.step + 1
        })
    }

    prevStep = () => {
        // e.preventDefault();
        // console.log(step);

        if (this.state.step <= 1) return

        this.setState({
            step: this.state.step - 1
        }, () => console.log(this.state))
    }


    render() {
        console.log(this.state.step);
        return (
            <Formik
                initialValues={{
                    // Step 1
                    driving_licence_number: "",
                    test_ref: "",
                    theory_test_number: "",
                    test_after: "",
                    test_before: "",
                    earliest_time: "",
                    latest_time: "",
                    recent_failure: "",
                    desired_test_center: "",

                    // Step 2
                    first_name: "",
                    last_name: "",
                    email: "",
                    mobile_number: "",
                    password: "",
                    confirm_password: "",
                }}

                onSubmit={(values, actions) => {
                    alert(JSON.stringify(values, null, 2));
                }}

                validate={values => {
                    if (this.state.stepOneInitialState){
                        this.setState({stepOneInitialState: false})
                    }
                    let errors = this.validateStepOne(values);

                    if (!window.isEmpty(errors) || this.state.step === 1) {
                        console.log(errors);

                        return errors
                    }
                    if (this.state.stepTwoInitialState){
                        this.setState({stepTwoInitialState: false})
                    }

                    errors = this.validateStepTwo(values);
                    console.log(errors);

                    return errors;
                }}
            >
                {props => (
                    <form
                        id="signup-form"
                        onSubmit={props.handleSubmit}
                    >
                        {this.state.step === 1 ?
                            <>
                                <StepOne
                                    handleSubmit={props.handleSubmit}
                                    handleChange={props.handleChange}
                                    handleBlur={props.handleBlur}
                                    values={props.values}
                                    errors={props.errors}
                                    touched={props.touched}
                                />
                                <div className="form-buttons">
                                    <BlueButton2
                                        onClick={e => {
                                            this.nextStep()
                                        }}
                                        id=""
                                        text="Next"
                                        type="button"
                                        disabled={this.state.stepOneInitialState || 
                                            !window.isEmpty(props.errors) ? true : false}
                                    />
                                </div>
                            </>
                            :
                            <>
                                <StepTwo
                                    handleSubmit={props.handleSubmit}
                                    handleChange={props.handleChange}
                                    handleBlur={props.handleBlur}
                                    values={props.values}
                                    errors={props.errors}
                                    touched={props.touched}
                                />
                                <div className="form-buttons">
                                    <BlueButton2
                                        onClick={e => this.prevStep()}
                                        id=""
                                        text="Back"
                                        type="button"
                                    />
                                    <BlueButton2
                                        onClick={e => this.nextStep()}
                                        id=""
                                        text="Next"
                                        type="submit"
                                        disabled={this.state.stepTwoInitialState || 
                                            !window.isEmpty(props.errors) ? true : false}
                                    />
                                </div>
                            </>
                        }
                    </form>
                )}
            </Formik>
        )
    }
}

export default SignupPage;