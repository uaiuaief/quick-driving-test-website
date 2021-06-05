import { Component } from "react";

class Navbar extends Component {
    render() {
        return (
            <div id="navbar">
                <div className="inner-container">
                    <div className="logo-container">
                        <a href="#">
                            <img className="logo" src="images/logo.png" alt="logo"></img>
                        </a>
                    </div>
                    <ul id="navbar-buttons">
                        <li><a href="#tutorial">How it Works</a></li>
                        <li><a href="#pricing">Pricing</a></li>
                        <li><a href="#faq">FAQ</a></li>
                        <li><a href="#contact-us">Contact Us</a></li>
                        <li><a href="#">Login</a></li>
                    </ul>
                </div>
            </div>

        )
    }
}

export { Navbar };