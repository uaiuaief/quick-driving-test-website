import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import TestCenterOptions from '../SmallerComponents/TestCenterOptions';
import BlueButton2 from "../Buttons/BlueButton2"
import RoundButton from "../Buttons/RoundButton"
import SubInputButton from "../Buttons/SubInputButton"
import Sidebar from "../Sidebar"
import ChangePassword from '../Forms/ChangePassword';
import ChangeEmail from '../Forms/ChangeEmail';
import loadingGif from '../../assets/loading.gif';


class DashBoard extends Component {
    render() {
        const {
            parentState, setParentState,
            fetchUserData, addTestCenter,
            removeTestCenter
        } = this.props;

        const { test_center_count } = parentState;

        return (
            parentState.isLoading
                ?
                <img src={loadingGif} />
                :
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        driving_licence_number: parentState.driving_licence_number,
                        test_ref: parentState.test_ref,
                        theory_test_number: parentState.theory_test_number,
                        test_after: parentState.test_after,
                        test_before: parentState.test_before,
                        earliest_time: parentState.earliest_time,
                        latest_time: parentState.latest_time,
                        recent_failure: parentState.recent_failure,
                        desired_test_center_1: parentState.desired_test_center_1,
                        desired_test_center_2: parentState.desired_test_center_2,
                        desired_test_center_3: parentState.desired_test_center_3,
                        desired_test_center_4: parentState.desired_test_center_4,
                    }}

                    onSubmit={async (values, actions) => {
                        const ENDPOINT = "/api/user-profile/"

                        let res = await fetch(ENDPOINT, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRFToken': window.getCookie('csrftoken')
                            },
                            body: JSON.stringify(values)
                        })

                        if (String(res.status).slice(0, 1) == 2) {
                            fetchUserData()
                            setParentState({ highlighted: 'success-profile' })
                        }
                        else {
                        }
                    }}

                    validate={values => {
                        let errors = {}

                        if (!values.driving_licence_number) {
                            errors.driving_licence_number = 'This field is required';
                        }
                        else if (values.driving_licence_number.length > 30) {
                            errors.driving_licence_number = 'Must 30 be characters or less';
                        }

                        if (!values.desired_test_center_1) {
                            errors.desired_test_center_1 = 'This field is required';
                        }

                        if (values.theory_test_number) {
                            if (!/^[0-9]+$/i.test(values.theory_test_number)) {
                                errors.theory_test_number = 'Theory test number can only have numbers';
                            }
                            else if (values.theory_test_number.length > 30) {
                                errors.theory_test_number = 'Must 30 be characters or less';
                            }
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

                        return errors
                    }}
                >
                    {props => {
                        return (
                            <form onSubmit={props.handleSubmit}>
                                <div className="form-inputs">
                                    <div className="form-row form-row-1">
                                        <div className="form-item">
                                            <label htmlFor="driving_licence_number">Driving License Number</label>
                                            <input
                                                id="driving_licence_number"
                                                name="driving_licence_number"
                                                type="text"
                                                value={props.values.driving_licence_number}
                                                disabled
                                            >
                                            </input>
                                            {props.touched.driving_licence_number && props.errors.driving_licence_number ? <div className="input-error">{props.errors.driving_licence_number}</div> : null}
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="theory_test_number">Theory Test Number</label>
                                            <input
                                                id="theory_test_number"
                                                name="theory_test_number"
                                                type="text"
                                                maxLength="30"
                                                value={props.values.theory_test_number}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            >
                                            </input>
                                            {props.touched.theory_test_number && props.errors.theory_test_number ? <div className="input-error">{props.errors.theory_test_number}</div> : null}
                                        </div>
                                    </div>
                                    <div className="form-row form-row-2">
                                        <div className="form-item">
                                            <label htmlFor="test_ref">Driving Test Reference Number</label>
                                            <input
                                                id="test_ref"
                                                name="test_ref"
                                                type="text"
                                                maxLength="30"
                                                value={props.values.test_ref}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            >
                                            </input>
                                            {props.touched.test_ref && props.errors.test_ref ? <div className="input-error">{props.errors.test_ref}</div> : null}
                                        </div>
                                    </div>
                                    <div className="form-row form-row-3">
                                        <div className="form-item">
                                            <label htmlFor="test_after">Test after</label>
                                            <input
                                                id="test_after"
                                                name="test_after"
                                                type="date"
                                                value={props.values.test_after}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            >
                                            </input>
                                            {props.touched.test_after && props.errors.test_after ? <div className="input-error">{props.errors.test_after}</div> : null}
                                        </div>

                                        <div className="form-item">
                                            <label htmlFor="test_before">Test before</label>
                                            <input
                                                id="test_before"
                                                name="test_before"
                                                type="date"
                                                value={props.values.test_before}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            >
                                            </input>
                                            {props.touched.test_before && props.errors.test_before ? <div className="input-error">{props.errors.test_before}</div> : null}
                                        </div>
                                    </div>
                                    <div className="form-row form-row-4">
                                        <div className="form-item">
                                            <label htmlFor="earliest_time">Earliest time</label>
                                            <select
                                                id="earliest_time"
                                                name="earliest_time"
                                                type="time"
                                                value={props.values.earliest_time}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            >
                                                <option value="">Select</option>
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
                                            {props.touched.earliest_time && props.errors.earliest_time ? <div className="input-error">{props.errors.earliest_time}</div> : null}
                                        </div>

                                        <div className="form-item">
                                            <label htmlFor="latest_time">Latest time</label>
                                            <select
                                                id="latest_time"
                                                name="latest_time"
                                                type="time"
                                                value={props.values.latest_time}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            >
                                                <option value="">Select</option>
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
                                            {props.touched.latest_time && props.errors.latest_time ? <div className="input-error">{props.errors.latest_time}</div> : null}

                                        </div>
                                    </div>
                                    <div className="form-row form-row-5">
                                        <div className="form-item">
                                            <label htmlFor="recent_failure">Date of most recent failure (if any)</label>
                                            <input
                                                id="recent_failure"
                                                name="recent_failure"
                                                type="date"
                                                value={props.values.recent_failure}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            >
                                            </input>
                                            {props.touched.recent_failure && props.errors.recent_failure ? <div className="input-error">{props.errors.recent_failure}</div> : null}
                                        </div>
                                        <div className="test-center-group">
                                            <div className="test-center-item">
                                                <div className="form-item">
                                                    <label htmlFor="desired_test_center_1">Desired test centres</label>
                                                    <select
                                                        required
                                                        id="desired_test_center_1"
                                                        name="desired_test_center_1"
                                                        type="text"
                                                        value={props.values.desired_test_center_1}
                                                        onChange={props.handleChange}
                                                        onBlur={props.handleBlur}
                                                    >
                                                        <TestCenterOptions />
                                                    </select>
                                                    <RoundButton
                                                        className="remove-button"
                                                        text="-"
                                                        onClick={e => {
                                                            if (test_center_count <= 1) return
                                                            props.setFieldValue(`desired_test_center_${test_center_count}`, "")
                                                            removeTestCenter()
                                                        }}
                                                    />
                                                    <RoundButton
                                                        className="add-button"
                                                        text="+"
                                                        onClick={e => addTestCenter()}
                                                    />
                                                </div>
                                                {props.touched.desired_test_center_1 && props.errors.desired_test_center_1 ? <div className="input-error">{props.errors.desired_test_center_1}</div> : null}
                                            </div>
                                            <div className="form-item">
                                                <select
                                                    className={test_center_count >= 2 ? "" : "select-hidden"}
                                                    id="desired_test_center_2"
                                                    name="desired_test_center_2"
                                                    type="text"
                                                    value={props.values.desired_test_center_2}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                >
                                                    <TestCenterOptions />
                                                </select>
                                            </div>
                                            <div className="form-item">
                                                <select
                                                    className={test_center_count >= 3 ? "" : "select-hidden"}
                                                    id="desired_test_center_3"
                                                    name="desired_test_center_3"
                                                    type="text"
                                                    value={props.values.desired_test_center_3}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                >
                                                    <TestCenterOptions />
                                                </select>
                                            </div>
                                            <div className="form-item">
                                                <select
                                                    className={test_center_count >= 4 ? "" : "select-hidden"}
                                                    id="desired_test_center_4"
                                                    name="desired_test_center_4"
                                                    type="text"
                                                    value={props.values.desired_test_center_4}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                >
                                                    <TestCenterOptions />
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <BlueButton2
                                        id=""
                                        text={props.isSubmitting ? "Saving..." : "Save"}
                                        type="submit"
                                        disabled={!props.isValid || !props.dirty}
                                    />
                                </div>
                            </form>
                        )
                    }}
                </Formik>
        );
    }
}

class Account extends Component {
    render() {
        const { parentState, setParentState, fetchUserData } = this.props;

        return (
            parentState.isLoading
                ?
                null
                :
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        email: parentState.email,
                        first_name: parentState.first_name,
                        last_name: parentState.last_name,
                        phone_number: parentState.phone_number,
                        password: "*********"
                    }}

                    onSubmit={async (values, actions) => {
                        const ENDPOINT = "/api/user-profile/"

                        let res = await fetch(ENDPOINT, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRFToken': window.getCookie('csrftoken')
                            },
                            body: JSON.stringify(values)
                        })

                        if (String(res.status).slice(0, 1) == 2) {
                            fetchUserData()
                            setParentState({
                                highlighted: "success-profile"
                            })
                        }
                        else {
                        }
                    }}

                    validate={values => {
                        let errors = {};

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

                        if (values.phone_number) {
                            if (!/^[0-9]+$/i.test(values.phone_number)) {
                                errors.phone_number = 'Phone number can only have numbers';
                            }
                            else if (values.phone_number.length !== 11) {
                                errors.phone_number = 'Must have exactly 11 digits';
                            }
                        }

                        return errors;
                    }}
                >
                    {props => {
                        return (
                            <form onSubmit={props.handleSubmit}>
                                <div className="form-inputs">
                                    <div className="form-row form-row-1">
                                        <div className="form-item">
                                            <label htmlFor="first_name">First Name *</label>
                                            <input
                                                id="first_name"
                                                name="first_name"
                                                type="text"
                                                maxLength="30"
                                                value={props.values.first_name}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            >
                                            </input>
                                            {props.touched.first_name && props.errors.first_name ? <div className="input-error">{props.errors.first_name}</div> : null}
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="last_name">Last Name *</label>
                                            <input
                                                id="last_name"
                                                name="last_name"
                                                type="text"
                                                maxLength="30"
                                                value={props.values.last_name}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            >
                                            </input>
                                            {props.touched.last_name && props.errors.last_name ? <div className="input-error">{props.errors.last_name}</div> : null}
                                        </div>
                                    </div>
                                    <div className="form-row form-row-2">

                                        <div className="form-item">
                                            <label htmlFor="phone_number">Mobile number</label>
                                            <input
                                                id="phone_number"
                                                name="phone_number"
                                                maxLength="11"
                                                type=""
                                                placeholder="Eg: 79123456789"
                                                value={props.values.phone_number}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            >
                                            </input>
                                            {props.touched.phone_number && props.errors.phone_number ? <div className="input-error">{props.errors.phone_number}</div> : null}
                                        </div>
                                    </div>
                                    <div className="form-row form-row-3">
                                        <div className="form-item">
                                            <label htmlFor="email">Email *</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={props.values.email}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                disabled
                                            >
                                            </input>
                                            <SubInputButton
                                                text="Change email"
                                                onClick={(e) => {
                                                    setParentState({
                                                        highlighted: 'change-email'
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="password">Password *</label>
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={props.values.password}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                disabled
                                            >
                                            </input>
                                            <SubInputButton
                                                text="Change password"
                                                onClick={(e) => {
                                                    setParentState({
                                                        highlighted: 'change-password'
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <BlueButton2
                                        id=""
                                        text={props.isSubmitting ? "Saving..." : "Save"}
                                        type="submit"
                                        disabled={!props.isValid || !props.dirty}
                                    />
                                </div>
                            </form>
                        )
                    }}
                </Formik>
        );
    }
}

class Plan extends Component {
    render() {
        return (
            <div id="account-plan">
                <h2>Plan II</h2>
                <h3>$ 19.00</h3>
                <BlueButton2
                    onClick={e => alert("not working yet")}
                    disabled={true}
                    text="Upgrade"
                    type="button"
                />
            </div>
        );
    }
}

class Support extends Component {
    render() {
        const { parentState, setParentState } = this.props;

        return (
            <div id="support-menu">
                <p>
                    Please fill out the form and we will be in touch with lightning speed
                </p>
                <Formik
                    initialValues={{
                        message: ""
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
                            setParentState({ highlighted: 'success-password' })
                        }
                        else if (String(res.status).slice(0, 1) == 5) {
                            let data = await res.json()
                            alert(data.error)
                        }
                    }}
                >
                    {props => {
                        return (
                            <form onSubmit={props.handleSubmit}>
                                <textarea
                                    name="message"
                                    values={props.values.message}
                                    placeholder="Enter your message here..."
                                    rows='8'
                                    maxLength='700'
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                                <BlueButton2
                                    text={props.isSubmitting ? "Submitting..." : "Submit"}
                                    type="submit"
                                    disabled={!props.dirty || props.isSubmitting}
                                />
                            </form>
                        )
                    }}
                </Formik>
            </div>
        );
    }
}

class Success extends Component {
    render() {
        return (
            <>
                <h1>{this.props.title}</h1>
                <BlueButton2
                    onClick={e => {
                        this.props.setParentState({
                            highlighted: this.props.back
                        })
                    }}
                    id="success-back-button"
                    text="Back"
                />
            </>
        );
    }
}

class ProfilePage extends Component {
    state = {
        test_center_count: 1,
        highlighted: 'dashboard',
        redirect: false,
        isLoading: true,

        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",

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
    }

    componentDidMount() {
        document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.fetchUserData()
    }

    fetchUserData() {
        window.fetchUserProfile().then(data => {
            if (data === null) {
                this.setState({ redirect: true })
                return
            }

            const email = data.email;
            const {
                first_name,
                last_name,
                mobile_number,

                driving_licence_number,
                test_ref,
                theory_test_number,
                earliest_test_date,
                latest_test_date,
                earliest_time,
                latest_time,
                recent_failure,
                test_centers

            } = data.profile

            this.setState({
                test_center_count: test_centers.length,
                isLoading: false,

                email: email,
                first_name: first_name,
                last_name: last_name,
                phone_number: mobile_number,


                driving_licence_number: driving_licence_number,
                test_ref: test_ref,
                theory_test_number: theory_test_number ? theory_test_number : "",
                test_after: earliest_test_date ? earliest_test_date : "",
                test_before: latest_test_date ? latest_test_date : "",
                earliest_time: earliest_time ? earliest_time.slice(0, 5) : "",
                latest_time: latest_time ? latest_time.slice(0, 5) : "",
                recent_failure: recent_failure ? recent_failure : "",
                desired_test_center_1: typeof test_centers[0] !== 'undefined' ? test_centers[0].name : "",
                desired_test_center_2: typeof test_centers[1] !== 'undefined' ? test_centers[1].name : "",
                desired_test_center_3: typeof test_centers[2] !== 'undefined' ? test_centers[2].name : "",
                desired_test_center_4: typeof test_centers[3] !== 'undefined' ? test_centers[3].name : "",

                // desired_test_center: main_test_center.name,
            });
        })

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

    getMenu(name) {
        let component = null;

        switch (name) {
            case 'dashboard':
                component = <>
                    <h1>My Driving Test Dashboard</h1>
                    <DashBoard
                        setParentState={(e) => this.setState(e)}
                        parentState={this.state}
                        fetchUserData={() => this.fetchUserData()}
                        addTestCenter={() => this.addTestCenter()}
                        removeTestCenter={() => this.removeTestCenter()}
                    />

                </>
                break;
            case 'account':
                component = <>
                    <h1>{this.state.first_name} {this.state.last_name}</h1>
                    <Account
                        setParentState={e => this.setState(e)}
                        parentState={this.state}
                        fetchUserData={() => this.fetchUserData()}
                    />
                </>
                break;
            case 'plan':
                component = <>
                    <h1>My Plan</h1>
                    <Plan
                        parentState={this.state}
                        fetchUserData={() => this.fetchUserData()}
                    />
                </>
                break;
            case 'support':
                component = <>
                    <h1>Support</h1>
                    <Support
                        parentState={this.state}
                        fetchUserData={() => this.fetchUserData()}
                    />
                </>
                break;
            case 'change-email':
                component = <>
                    <h1>Change Email</h1>
                    <ChangeEmail
                        setParentState={e => this.setState(e)}
                        parentState={this.state}
                        fetchUserData={() => this.fetchUserData()}
                    />
                </>
                break;
            case 'change-password':
                component = <>
                    <h1>Change Password</h1>
                    <ChangePassword
                        setParentState={e => this.setState(e)}
                        parentState={this.state}
                    />
                </>
                break;
            case 'success-email':
                component = <>
                    <Success
                        title="Email Changed Successfully!"
                        back="account"
                        setParentState={e => this.setState(e)}
                        parentState={this.state}
                    />
                </>
                break;
            case 'success-password':
                component = <>
                    <Success
                        title="Password Changed Successfully!"
                        back="account"
                        setParentState={e => this.setState(e)}
                        parentState={this.state}
                    />
                </>
                break;
            case 'success-message':
                component = <>
                    <Success
                        title="Message Sent Successfully!"
                        back="dashboard"
                        setParentState={e => this.setState(e)}
                        parentState={this.state}
                    />
                </>
                break;
            case 'success-profile':
                component = <>
                    <Success
                        title="Profile Updated Successfully"
                        back="dashboard"
                        setParentState={e => this.setState(e)}
                        parentState={this.state}
                    />
                </>
                break;
        }

        return component
    }

    render() {
        let menu = this.getMenu(this.state.highlighted)

        return (
            this.state.redirect
                ?
                <Redirect to="/login" />
                :
                <section id="profile-page">
                    <div className="inner-container">
                        <Sidebar
                            highlighted={this.state.highlighted}
                            setParentState={(e) => this.setState(e)}
                        />
                        <div id="current-menu">
                            {menu}
                        </div>
                    </div>
                </section>
        );
    }
}

export default ProfilePage;
