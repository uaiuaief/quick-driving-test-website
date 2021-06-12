import { Component } from "react";
import { Link } from 'react-router-dom';
// import { HashLink as Link } from 'react-router-hash-link';
import logo from "../assets/logo.png"

class Navbar extends Component {
    state = {
        user: false
    }

    componentDidMount() {
        window.getUser().then(user => {
            if (user !== 'AnonymousUser') {
                this.setState({
                    user: true
                })
            }
        })
    }

    render() {
        return (
            <div id="navbar">
                <div className="inner-container">
                    <div className="logo-container">
                        <Link
                            onClick={() => window.smoothScroll("CTA")}
                            to="/">
                            <img className="logo" src={logo} alt="logo"></img>
                        </Link>
                    </div>
                    <ul id="navbar-buttons">
                        <li>
                            <Link
                                onClick={() => window.smoothScroll("tutorial")}
                                to="/#tutorial">
                                How it Works
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={() => window.smoothScroll("pricing")}
                                to="/#pricing">
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={() => window.smoothScroll("faq")}
                                to="/#faq">
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={() => window.smoothScroll("contact-us")}
                                to="/#contact-us">
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            {this.state.user
                                ?
                                <Link
                                    to="/account">
                                    Account
                                </Link>
                                :
                                <Link
                                    to="/login">
                                    Login
                                </Link>
                                
                            }
                        </li>
                    </ul>
                </div>
            </div>

        )
    }
}

export default Navbar;