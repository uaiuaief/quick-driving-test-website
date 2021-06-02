import { Component } from "react";

class Navbar extends Component {
    render() {
        return (
            <div id="navbar">
                <div className="inner-container">
                    <div id="logo-container">
                        <img alt="logo"></img>
                    </div>
                    <ul id="navbar-buttons">
                        <li><a href="#">How it Works</a></li>
                        <li><a href="#">Pricing</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Login</a></li>
                    </ul>
                </div>
            </div>

        )
    }
}

export { Navbar };