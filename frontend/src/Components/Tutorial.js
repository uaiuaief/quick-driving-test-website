import React, { Component } from 'react';
import {Step} from "./SmallerComponents/Step"
import MainButton from './Buttons/MainButton'
import signupImage from '../assets/signup.png'
import searchImage from '../assets/search.png'
import emailImage from '../assets/email.png'


class Tutorial extends Component {
    render() {
        return (
            <section id="tutorial">
                <div id="tutorial-inner" className="inner-container">
                    <div id="title-wrapper">
                        <h1>How it Works?</h1>
                    </div>
                    <Step
                        title="Quick Sign Up"
                        text="Signing up is easy. Signup in less than two minutes with your privacy in mind.
                         No home address, no names, no excess. Simple! Quick Driving Test is a market leader in finding cancelltations."
                        image={signupImage}
                        step="01"/>
                    <Step 
                        title="Search Begins"
                        text="All you need to do is sit back and wait whilst we search for driving test cancellations.
                         Don’t worry, it won’t be long as we search thousands of times a day."
                        image={searchImage}
                        step="02"/>
                    <Step 
                        title="Email Notification"
                        text="We have found you a cancellation! An email will be sent to you with the new date.
                         If you are using the auto-book feature, the test will automatically be booked for you."
                        image={emailImage}
                        step="03"/>
                    <MainButton
                        id="tutorial-button"
                        text="Get Cancellations NOW!"
                    />
                  
                </div>
            </section>
        );
    }
}

export {Tutorial};
