import React, { Component } from 'react';
import BlueButton2 from "../Buttons/BlueButton2"
import { Link } from 'react-router-dom';

class StepOne extends Component {
    render() {
        return (
            <>
                <h1>Signup it's very quick</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                </p>

                <div className="form-row form-row-1">
                    <div className="form-item">
                        <label for="">Driving License Number</label>
                        <input id="" type=""></input>
                    </div>
                    <div className="form-item">
                        <label for="">Theory Test Number</label>
                        <input id="" type=""></input>
                    </div>
                </div>
                <div className="form-row form-row-2">
                    <div className="form-item">
                        <label for="">Driving Test Reference Number</label>
                        <input id="" type=""></input>
                    </div>
                </div>
                <div className="form-row form-row-3">
                    <div className="form-item">
                        <label for="">Test after</label>
                        <input id="" type=""></input>
                    </div>

                    <div className="form-item">
                        <label for="">Test before</label>
                        <input id="" type=""></input>
                    </div>
                </div>
                <div className="form-row form-row-4">
                    <div className="form-item">
                        <label for="">Earliest time</label>
                        <input id="" type=""></input>
                    </div>

                    <div className="form-item">
                        <label for="">Latest time</label>
                        <input id="" type=""></input>
                    </div>
                </div>
                <div className="form-row form-row-5">
                    <div className="form-item">
                        <label for="">Date of most recent failure (if any)</label>
                        <input id="" type=""></input>
                    </div>
                    <div className="form-item">
                        <label for="">Desired test centre</label>
                        <input id="" type=""></input>
                    </div>
                </div>
                <BlueButton2
                    id=""
                    text="Next"
                />
            </>
        );
    }
}

class StepTwo extends Component {
    render() {
        return (
            <>
                <h1>One more step...</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                </p>
            </>
        );
    }
}

class SignupPage extends Component {
    state = {
        current_step: 1
    }

    render() {
        let component = null;

        if (this.state.current_step === 1) {
            component = <StepOne />;
        }
        else if (this.state.current_step === 2) {
            component = <StepTwo />;
        }

        return (
            <section id="signup-page">
                <div className="inner-container">
                    <form id="signup-form">
                        {component}
                    </form>
                </div>
            </section >
        );
    }
}

export default SignupPage;
