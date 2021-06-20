import React, { Component } from 'react';
import BlueButton1 from '../Buttons/BlueButton1';

class ContactForm extends Component {
    render() {
        return (
            <form id="contact-form">
                <div className="inner-container">
                    <div className="form-row-1">
                        <input
                            id="name-field"
                            placeholder="Your Name"
                            required
                        ></input>
                        <input
                            id="email-field"
                            placeholder="Your Email"
                            required
                        ></input>
                    </div>
                    <textarea
                        id="message-field"
                        placeholder="Your Message"
                        required
                    ></textarea>
                </div>
                    <BlueButton1
                        text="Submit" 
                    />
            </form>
        );
    }
}

export default ContactForm;
