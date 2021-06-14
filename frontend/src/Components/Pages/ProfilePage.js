import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { Transition } from 'react-transition-group';
import TestCenterOptions from '../SmallerComponents/TestCenterOptions';
import BlueButton2 from "../Buttons/BlueButton2"
import Sidebar from "../Sidebar"


class DashBoard extends Component {
    render() {
        const { parentState, fetchUserData } = this.props;

        return (
            parentState.isLoading
                ?
                null
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
                        desired_test_center: parentState.desired_test_center
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

                        if (!values.desired_test_center) {
                            errors.desired_test_center = 'This field is required';
                        }

                        if (!values.test_ref) {
                            errors.test_ref = 'This field is required';
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
                                        <div className="form-item">
                                            <label htmlFor="desired_test_center">Desired test centre</label>
                                            <select
                                                required
                                                id="desired_test_center"
                                                name="desired_test_center"
                                                type="text"
                                                value={props.values.desired_test_center}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            >
                                                <TestCenterOptions />
                                            </select>
                                            {props.touched.desired_test_center && props.errors.desired_test_center ? <div className="input-error">{props.errors.desired_test_center}</div> : null}
                                        </div>
                                    </div>
                                    <BlueButton2
                                        id=""
                                        text="Save"
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
        const { parentState, fetchUserData } = this.props;

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
                
                        if (!values.last_name) {
                            errors.last_name = 'This field is required';
                        }
                        else if (values.last_name.length > 20) {
                            errors.last_name = 'Must be 20 characters or less';
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
                                                type=""
                                                value={props.values.phone_number}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            >
                                            </input>
                                            {props.touched.mobile_number && props.errors.mobile_number ? <div className="input-error">{props.errors.mobile_number}</div> : null}
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
                                            {props.touched.email && props.errors.email ? <div className="input-error">{props.errors.email}</div> : null}
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
                                            {props.touched.password && props.errors.password ? <div className="input-error">{props.errors.password}</div> : null}
                                        </div>
                                    </div>
                                    <BlueButton2
                                        id=""
                                        text="Save"
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
            <>
                <h2>Plan I</h2>
                <h2>$ 49.00</h2>
                <BlueButton2
                    text="Upgrade"
                    type="button"
                />
            </>
        );
    }
}

class Support extends Component {
    render() {
        return (
            <>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna  Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut.
                </p>
                <Formik>
                    <form>
                        <textarea />
                        <BlueButton2
                            text="Submit"
                            type="submit"
                        />
                    </form>
                </Formik>
            </>
        );
    }
}

class ProfilePage extends Component {
    state = {
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
        desired_test_center: "",
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
                main_test_center

            } = data.profile

            this.setState({
                isLoading: false,

                email: email,
                first_name: first_name,
                last_name: last_name,
                phone_number: mobile_number,


                driving_licence_number: driving_licence_number,
                test_ref: test_ref,
                theory_test_number: theory_test_number,
                test_after: earliest_test_date ? earliest_test_date : "",
                test_before: latest_test_date ? latest_test_date : "",
                earliest_time: earliest_time ? earliest_time.slice(0, 5) : "",
                latest_time: latest_time ? latest_time.slice(0, 5) : "",
                recent_failure: recent_failure ? recent_failure : "",
                desired_test_center: main_test_center.name,
            });
        })

    }

    componentDidMount() {
        document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.fetchUserData()
    }

    render() {
        let component = null;

        switch (this.state.highlighted) {
            case 'dashboard':
                component = <>
                    <h1>My Driving Test Dashboard</h1>
                    <DashBoard
                        parentState={this.state}
                        fetchUserData={() => this.fetchUserData()}
                        
                        setParentState={(e) => this.setState(e)}
                    />

                </>
                break;
            case 'account':
                component = <>
                    <h1>{this.state.first_name} {this.state.last_name}</h1>
                    <Account
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

        }

        return (
            this.state.redirect
                ?
                <Redirect to="/" />
                :
                <section id="profile-page">
                    <div className="inner-container">
                        <Sidebar
                            highlighted={this.state.highlighted}
                            setParentState={(e) => this.setState(e)}
                        />
                        <div id="current-menu">
                            {component}
                            {/* <DashBoard
                            parentState={this.state}
                        /> */}
                        </div>
                    </div>
                </section>
        );
    }
}

export default ProfilePage;
