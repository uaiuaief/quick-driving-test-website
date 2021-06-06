import { Component } from "react";
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png"

class Navbar extends Component {
    render() {
        return (
            <div id="navbar">
                <div className="inner-container">
                    <div className="logo-container">
                        <Link to="/#">
                            <img className="logo" src={logo} alt="logo"></img>
                        </Link>
                    </div>
                    <ul id="navbar-buttons">
                        <li><Link to="/#tutorial">How it Works</Link></li>
                        <li><Link to="/#pricing">Pricing</Link></li>
                        <li><Link to="/#faq">FAQ</Link></li>
                        <li><Link to="/#contact-us">Contact Us</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </div>
            </div>

        )
    }
}

export default Navbar;