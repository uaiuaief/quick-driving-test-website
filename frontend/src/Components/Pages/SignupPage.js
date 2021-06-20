import React, { Component, useState } from 'react';
import TestCenterOptions from '../SmallerComponents/TestCenterOptions';
import BlueButton2 from "../Buttons/BlueButton2"
import RoundButton from "../Buttons/RoundButton"
import { Link } from 'react-router-dom';
import { Formik, FieldArray } from 'formik'


class StepOne extends Component {
    componentDidMount() {
        document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    render() {
        const {
            setFieldValue, addTestCenter, 
            removeTestCenter, handleChange, handleBlur, 
            values, touched, errors
        } = this.props;

        let { 
            driving_licence_number, theory_test_number,
            test_ref, test_after,
            test_before, earliest_time,
            latest_time, recent_failure,
            desired_test_center_1,
            desired_test_center_2,
            desired_test_center_3,
            desired_test_center_4 
        } = values;

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
                                <option value="">---Select---</option>
                                <option value="07:00">07:00</option>
                                <option value="08:00">08:00</option>
                                <option value="09:00">09:00</option>
                                <option value="10:00">10:00</option>
                                <option value="11:00">11:00</option>
                                <option value="12:00">12:00</option>
                                <option value="13:00">13:00</option>
                                <option value="14:00">14:00</option>
                                <option value="15:00">15:00</option>
                                <option value="16:00">16:00</option>
                                <option value="17:00">17:00</option>
                                <option value="18:00">18:00</option>
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
                                <option value="">---Select---</option>
                                <option value="07:00">07:00</option>
                                <option value="08:00">08:00</option>
                                <option value="09:00">09:00</option>
                                <option value="10:00">10:00</option>
                                <option value="11:00">11:00</option>
                                <option value="12:00">12:00</option>
                                <option value="13:00">13:00</option>
                                <option value="14:00">14:00</option>
                                <option value="15:00">15:00</option>
                                <option value="16:00">16:00</option>
                                <option value="17:00">17:00</option>
                                <option value="18:00">18:00</option>
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
                        <div className="test-center-group">
                            <div className="form-item">
                                <label htmlFor="desired_test_center_1">Desired test centres *</label>
                                <div className="test-center-item">
                                    <select
                                        required
                                        id="desired_test_center_1"
                                        name="desired_test_center_1"
                                        type="text"
                                        value={desired_test_center_1}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <TestCenterOptions />
                                    </select>
                                    <RoundButton
                                        className="remove-button"
                                        text=""
                                        onClick={e => {
                                            setFieldValue(`desired_test_center_${this.props.test_center_count}`, "")
                                            removeTestCenter()
                                        }}
                                    />
                                    <RoundButton
                                        className="add-button"
                                        text=""
                                        onClick={e => addTestCenter()}
                                    />
                                </div>

                                {touched.desired_test_center_1 && errors.desired_test_center_1 ? <div className="input-error">{errors.desired_test_center_1}</div> : null}
                            </div>
                            <div className="form-item">
                                <select
                                    className={this.props.test_center_count >= 2 ? "" : "select-hidden"}
                                    id="desired_test_center_2"
                                    name="desired_test_center_2"
                                    type="text"
                                    value={desired_test_center_2}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <TestCenterOptions />
                                </select>
                            </div>
                            <div className="form-item">
                                <select
                                    className={this.props.test_center_count >= 3 ? "" : "select-hidden"}
                                    id="desired_test_center_3"
                                    name="desired_test_center_3"
                                    type="text"
                                    value={desired_test_center_3}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <TestCenterOptions />
                                </select>
                            </div>
                            <div className="form-item">
                                <select
                                    className={this.props.test_center_count >= 4 ? "" : "select-hidden"}
                                    id="desired_test_center_4"
                                    name="desired_test_center_4"
                                    type="text"
                                    value={desired_test_center_4}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <TestCenterOptions />
                                </select>
                            </div>
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
                                placeholder="Eg: 7912345678"
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
        desired_test_center_1: "",
        desired_test_center_2: "",
        desired_test_center_3: "",
        desired_test_center_4: "",

        // Step 2
        first_name: "",
        last_name: "",
        email: "",
        mobile_number: "",
        password: "",
        confirm_password: "",
    }

    render() {
        return (
            <section id="signup-page">
                <div className="inner-container">
                    <TestForm
                        step={this.state.step}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                    />
                </div>
            </section >
        );
    }
}



class TestForm extends Component {
    state = {
        stepOneValid: false,
        stepTwoValid: false,
        step: 1,
        test_center_count: 1
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

        if (values.theory_test_number) {
            if (!/^[0-9]+$/i.test(values.theory_test_number)) {
                errors.theory_test_number = 'Theory test number can only have numbers';
            }
            else if (values.theory_test_number.length > 30) {
                errors.theory_test_number = 'Must 30 be characters or less';
            }
        }

        if (!values.desired_test_center_1) {
            errors.desired_test_center_1 = 'This field is required';
        }

        if (!values.test_ref) {
            errors.test_ref = 'This field is required';
        }
        else {
            if (!/^[0-9]+$/i.test(values.test_ref)) {
                errors.test_ref = 'Driving test reference number can only have numbers';
            }
            else if (values.test_ref.length > 30) {
                errors.test_ref = 'Must 30 be characters or less';
            }
        }

        if (values.test_after && values.test_before) {
            let before = new Date(values.test_before)
            let after = new Date(values.test_after)

            if (after >= before) {
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

        if (window.isEmpty(errors)) {
            this.setState({ stepOneValid: true })
        }
        else {
            this.setState({ stepOneValid: false })
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
        else if (!/^[a-zA-Z][a-zA-Z\s\-\'\.]*[^\s\-\.\'\d]$/i.test(values.first_name)) {
            errors.first_name = "Invalid name";
        }

        if (!values.last_name) {
            errors.last_name = 'This field is required';
        }
        else if (values.last_name.length > 20) {
            errors.last_name = 'Must be 20 characters or less';
        }
        else if (!/^[a-zA-Z][a-zA-Z\s\-\'\.]*[^\s\-\.\'\d]$/i.test(values.last_name)) {
            errors.last_name = "Invalid name";
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

        if (values.mobile_number) {
            if (!/^[0-9]+$/i.test(values.mobile_number)) {
                errors.mobile_number = 'Phone number can only have numbers';
            }
            else if (values.mobile_number.length !== 10) {
                errors.mobile_number = 'Must have exactly 10 digits';
            }
        }

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

        if (window.isEmpty(errors)) {
            this.setState({ stepTwoValid: true })
        }
        else {
            this.setState({ stepTwoValid: false })
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

    addTestCenter = () => {
        if (this.state.test_center_count >= 4) return
        this.setState({
            test_center_count: this.state.test_center_count + 1
        })
    }

    removeTestCenter = () => {
        if (this.state.test_center_count <= 1) return
        this.setState({
            test_center_count: this.state.test_center_count - 1
        })
    }

    render() {
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
                    desired_test_center_1: "",
                    desired_test_center_2: "",
                    desired_test_center_3: "",
                    desired_test_center_4: "",

                    // Step 2
                    first_name: "",
                    last_name: "",
                    email: "",
                    mobile_number: "",
                    password: "",
                    confirm_password: "",
                }}

                onSubmit={async (values, actions) => {
                    // alert(JSON.stringify(values, null, 2))
                    // return

                    const ENDPOINT = "/api/create-account/"

                    let res = await fetch(ENDPOINT, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': window.getCookie('csrftoken')
                        },
                        body: JSON.stringify(values)
                    })

                    if (String(res.status).slice(0, 1) == 2) {
                        let session = await res.json();

                        const stripe = await window.stripePromise

                        const result = await stripe.redirectToCheckout({
                            sessionId: session.id
                        })

                        if (result.error) {
                            alert('error')
                        }
                    }
                    else if (String(res.status).slice(0, 1) == 4) {
                        let data = await res.json()
                        if (data.error) {
                            actions.setErrors({
                                email: data.error
                            })
                        }
                    }
                }}

                validate={values => {
                    if (this.state.stepOneInitialState) {
                        this.setState({ stepOneInitialState: false })
                    }
                    let errors = this.validateStepOne(values);

                    if (!window.isEmpty(errors) || this.state.step === 1) {

                        return errors
                    }
                    if (this.state.stepTwoInitialState) {
                        this.setState({ stepTwoInitialState: false })
                    }

                    errors = this.validateStepTwo(values);

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
                                    addTestCenter={e => this.addTestCenter()}
                                    removeTestCenter={e => this.removeTestCenter()}
                                    setFieldValue={props.setFieldValue}
                                    handleSubmit={props.handleSubmit}
                                    handleChange={props.handleChange}
                                    handleBlur={props.handleBlur}
                                    values={props.values}
                                    errors={props.errors}
                                    touched={props.touched}
                                    test_center_count={this.state.test_center_count}
                                />
                                <div className="form-buttons">
                                    <BlueButton2
                                        onClick={e => {
                                            this.nextStep()
                                        }}
                                        id=""
                                        text="Next"
                                        type="button"
                                        disabled={!this.state.stepOneValid ? true : false}
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
                                        disabled={!this.state.stepTwoValid ? true : false}
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
