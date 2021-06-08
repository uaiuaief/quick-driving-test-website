import React, { Component } from 'react';
import TestCenterOptions from '../SmallerComponents/TestCenterOptions';
import BlueButton2 from "../Buttons/BlueButton2"
import { Link } from 'react-router-dom';

class StepOne extends Component {
    componentDidMount() {
        document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    render() {
        const { handleChange } = this.props;
        let { driving_licence_number, theory_test_number,
            driving_test_reference_number, test_after,
            test_before, earliest_time,
            latest_time, recent_failure,
            desired_test_center } = this.props.parentState

        // console.log(parentState)

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
                            <label htmlFor="driving-license-number-field">Driving License Number</label>
                            <input
                                id="driving-license-number-field"
                                type="text"
                                defaultValue={driving_licence_number}
                                onChange={(e) => handleChange(e, 'driving_licence_number')}>
                            </input>
                        </div>
                        <div className="form-item">
                            <label htmlFor="theory-test-number-field">Theory Test Number</label>
                            <input
                                id="theory-test-number-field"
                                type="text"
                                defaultValue={theory_test_number}
                                onChange={(e) => handleChange(e, 'theory_test_number')}>
                            </input>
                        </div>
                    </div>
                    <div className="form-row form-row-2">
                        <div className="form-item">
                            <label htmlFor="driving-test-reference-number-field">Driving Test Reference Number</label>
                            <input
                                id="driving-test-reference-number-field"
                                type="text"
                                defaultValue={driving_test_reference_number}
                                onChange={(e) => handleChange(e, 'driving_test_reference_number')}>
                            </input>
                        </div>
                    </div>
                    <div className="form-row form-row-3">
                        <div className="form-item">
                            <label htmlFor="test-after-field">Test after</label>
                            <input
                                id="test-after-field"
                                type="date"
                                defaultValue={test_after}
                                onChange={(e) => handleChange(e, 'test_after')}>
                            </input>
                        </div>

                        <div className="form-item">
                            <label htmlFor="test-before-field">Test before</label>
                            <input
                                id="test-before-field"
                                type="date"
                                defaultValue={test_before}
                                onChange={(e) => handleChange(e, 'test_before')}>
                            </input>
                        </div>
                    </div>
                    <div className="form-row form-row-4">
                        <div className="form-item">
                            <label htmlFor="earliest-time-field">Earliest time</label>
                            <select
                                id="earliest-time-field"
                                type="time"
                                defaultValue={earliest_time}
                                onChange={(e) => handleChange(e, 'earliest_time')}>
                                <option value="">Select</option>
                                <option>07:00am</option>
                                <option>08:00am</option>
                                <option>09:00am</option>
                                <option>10:00am</option>
                                <option>11:00am</option>
                                <option>12:00pm</option>
                                <option>01:00pm</option>
                                <option>02:00pm</option>
                                <option>03:00pm</option>
                                <option>04:00pm</option>
                                <option>05:00pm</option>
                                <option>06:00pm</option>
                            </select>
                        </div>

                        <div className="form-item">
                            <label htmlFor="latest-time-field">Latest time</label>
                            <select
                                id="latest-time-field"
                                type="time"
                                defaultValue={latest_time}
                                onChange={(e) => handleChange(e, 'latest_time')}>
                                <option value="">Select</option>
                                <option>07:00am</option>
                                <option>08:00am</option>
                                <option>09:00am</option>
                                <option>10:00am</option>
                                <option>11:00am</option>
                                <option>12:00pm</option>
                                <option>01:00pm</option>
                                <option>02:00pm</option>
                                <option>03:00pm</option>
                                <option>04:00pm</option>
                                <option>05:00pm</option>
                                <option>06:00pm</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row form-row-5">
                        <div className="form-item">
                            <label htmlFor="recent-failure-field">Date of most recent failure (if any)</label>
                            <input
                                id="recent-failure-field"
                                type="date"
                                defaultValue={recent_failure}
                                onChange={(e) => handleChange(e, 'recent_failure')}>
                            </input>
                        </div>
                        <div className="form-item">
                            <label htmlFor="desired-test-center-field">Desired test centre</label>
                            <select
                                id="desired-test-center-field"
                                type="text"
                                defaultValue={desired_test_center}
                                onChange={(e) => handleChange(e, 'desired_test_center')}>
                                <TestCenterOptions/>
                            </select>
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
        const { handleChange } = this.props;
        let { first_name, last_name,
            email, mobile_number,
            password, confirm_password } = this.props.parentState;

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
                            <label htmlFor="first-name">First Name</label>
                            <input
                                id="first-name"
                                type="text"
                                defaultValue={first_name}
                                onChange={(e) => handleChange(e, 'first_name')}>
                            </input>
                        </div>
                        <div className="form-item">
                            <label htmlFor="last-name-field">Last Name</label>
                            <input
                                id="last-name-field"
                                type="text"
                                defaultValue={last_name}
                                onChange={(e) => handleChange(e, 'last_name')}>
                            </input>
                        </div>
                    </div>
                    <div className="form-row form-row-2">
                        <div className="form-item">
                            <label htmlFor="email-field">Email</label>
                            <input
                                id="email-field"
                                type="email"
                                defaultValue={email}
                                onChange={(e) => handleChange(e, 'email')}>
                            </input>
                        </div>
                        <div className="form-item">
                            <label htmlFor="mobile-number-field">Mobile number</label>
                            <input
                                id="mobile-number-field"
                                type=""
                                defaultValue={mobile_number}
                                onChange={(e) => handleChange(e, 'mobile_number')}>
                            </input>
                        </div>
                    </div>
                    <div className="form-row form-row-3">
                        <div className="form-item">
                            <label htmlFor="password-field">Password</label>
                            <input
                                id="password-field"
                                type="password"
                                defaultValue={password}
                                onChange={(e) => handleChange(e, 'password')}>
                            </input>
                        </div>
                    </div>
                    <div className="form-row form-row-4">
                        <div className="form-item">
                            <label htmlFor="confirm-password-field">Confirm password</label>
                            <input
                                id="confirm-password-field"
                                type="password"
                                defaultValue={confirm_password}
                                onChange={(e) => handleChange(e, 'confirm_password')}>
                            </input>
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
        theory_test_number: "",
        driving_test_reference_number: "",
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

    nextStep = () => {
        const { step } = this.state;
        if (step >= 2) return

        this.setState({
            step: step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state;
        if (step <= 1) return
        this.setState({
            step: step - 1
        })
    }

    handleChange = (e, field_name) => {
        this.setState({ [field_name]: e.target.value },
            () => console.log(field_name, this.state[field_name]))
    }

    render() {
        // console.log(this.state);
        let component = null;

        if (this.state.step === 1) {
            component = <StepOne
                handleChange={(e, field_name) => this.handleChange(e, field_name)}
                parentState={this.state}
            />;
        }
        else if (this.state.step === 2) {
            component = <StepTwo
                handleChange={(e, field_name) => this.handleChange(e, field_name)}
                parentState={this.state}
            />;
        }

        return (
            <section id="signup-page">
                <div className="inner-container">
                    <form id="signup-form">
                        {component}
                    </form>
                    <div className="form-buttons">
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
                    </div>
                </div>
            </section >
        );
    }
}

export default SignupPage;
