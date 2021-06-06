import React, { Component } from 'react';
import FooterBlock from './SmallerComponents/FooterBlock';
import logo from "../assets/logo.png"


class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="inner-container">
                    <div className="footer-logo-block">
                        <div className="logo-container">
                            <a href="#">
                                <img className="logo" src={logo} alt="logo"></img>
                            </a>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore
                            magna
                        </p>
                    </div>
                    <FooterBlock
                        title="Explore"
                        items={[
                            {
                                text: "Home",
                                url: "#"
                            },
                            {
                                text: "How it Works?",
                                url: "#tutorial"
                            },
                            {
                                text: "Pricing",
                                url: "#pricing"
                            },
                            {
                                text: "FAQ",
                                url: "#faq"
                            },
                            {
                                text: "Contact Us",
                                url: "#contact-us"
                            },
                        ]}
                    />
                    <FooterBlock
                        title="Account"
                        items={[
                            {
                                text: "Sign up Now",
                                url: "/signup"
                            },
                            {
                                text: "Login",
                                url: "/login"
                            },
                            {
                                text: "Reset Password",
                                url: "/reset-password"
                            }
                        ]}
                    />
                    <FooterBlock
                        title="Social"
                        items={[
                            {
                                text: "Instagram",
                                url: "#"
                            },
                            {
                                text: "Facebook",
                                url: "#"
                            },
                            {
                                text: "Youtube",
                                url: "#"
                            }
                        ]}
                    />
                </div>
            </footer>
        );
    }
}

export default Footer;
