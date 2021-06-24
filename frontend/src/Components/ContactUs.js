import React, { Component } from 'react';
import ContactForm from "./Forms/ContactForm"

class ContactUs extends Component {
    render() {
        return (
            <section id="contact-us">
                <div className="inner-container">
                    <h1 id="contact-us-title">CONTACT US</h1>
                    <h2>Please fill in the form and we will be in touch with lightning speed</h2>
                    <ContactForm/>
                </div>
            </section>
        );
    }
}

export default ContactUs;
