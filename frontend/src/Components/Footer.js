import React, { Component } from 'react';
import FooterBlock from './SmallerComponents/FooterBlock';
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom';


class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="inner-container">
                    <div className="footer-logo-block">
                        <div className="logo-container">
                            <Link
                                onClick={() => window.smoothScroll("CTA")}
                                to="/">
                                <img className="logo" src={logo} alt="logo"></img>
                            </Link>
                        </div>
                        <p>
                            This service is in no way associated or affiliated
                            with the DVSA, DVLA or any government agencies.
                            You can book and change driving test dates for no
                            extra fee with the DVSA.
                        </p>
                    </div>
                    <FooterBlock
                        title="Explore"
                        items={[
                            {
                                text: "Home",
                                url: "/",
                                hash: ""
                            },
                            {
                                text: "How it Works?",
                                url: "/",
                                hash: "tutorial"
                            },
                            {
                                text: "Pricing",
                                url: "/",
                                hash: "pricing"
                            },
                            {
                                text: "FAQ",
                                url: "/",
                                hash: "faq"
                            },
                            {
                                text: "Contact Us",
                                url: "/",
                                hash: "contact-us"
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
                                url: "/password-reset"
                            }
                        ]}
                    />
                    <FooterBlock
                        title="Social"
                        items={[
                            {
                                text: "Instagram",
                                url: "/"
                            },
                            {
                                text: "Facebook",
                                url: "/"
                            },
                            {
                                text: "Youtube",
                                url: "/"
                            }
                        ]}
                    />
                </div>
            </footer>
        );
    }
}

export default Footer;
