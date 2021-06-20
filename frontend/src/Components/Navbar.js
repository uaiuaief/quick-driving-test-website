import { Component } from "react";
import { Link } from 'react-router-dom';
// import { HashLink as Link } from 'react-router-hash-link';
import logo from "../assets/logo.png"
import closeIcon from "../assets/mobile-menu-close-icon.png"
import menuIcon from "../assets/mobile-menu-icon.png"


class Navbar extends Component {
    state = {
        user: false,
        isLoading: true,
        show_menu: false
    }

    componentDidMount() {
        window.getUser().then(user => {
            if (user !== 'AnonymousUser') {
                this.setState({
                    user: true
                })
            }

            this.setState({ isLoading: false })
        })
    }

    render() {
        return (
            this.state.isLoading
                ?
                <></>
                :
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
                            {this.state.user
                                ?
                                <>
                                    <li>
                                        <Link
                                            to="/account">
                                            My Account
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            to="#"
                                            onClick={(e) => {
                                                fetch('/api/logout')
                                                    .then(() => {
                                                        window.location.href = '/'
                                                    })
                                            }}
                                        >
                                            Logout
                                        </Link>
                                    </li>
                                </>
                                :
                                <li>
                                    <Link
                                        to="/login">
                                        Login
                                    </Link>
                                </li>

                            }
                        </ul>
                        <div id="mobile-menu-icon-wrapper">
                            <button
                                id="mobile-menu-icon"
                                onClick={() => {
                                    this.setState({
                                        show_menu: !this.state.show_menu
                                    })
                                }}
                            >
                                {this.state.show_menu
                                    ?
                                    <img src={closeIcon} />
                                    :
                                    <img src={menuIcon} />
                                }
                            </button>
                        </div>
                        <div
                            id="mobile-navbar-menu"
                            className={this.state.show_menu ? "open" : "closed"}>
                            <ul id="navbar-buttons">
                                <li>
                                    <Link
                                        onClick={() => {
                                            this.setState({
                                                show_menu: !this.state.show_menu
                                            })
                                            window.smoothScroll("tutorial")
                                        }}
                                        to="/#tutorial">
                                        How it Works
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => {
                                            this.setState({
                                                show_menu: !this.state.show_menu
                                            })
                                            window.smoothScroll("pricing")
                                        }}
                                        to="/#pricing">
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => {
                                            this.setState({
                                                show_menu: !this.state.show_menu
                                            })
                                            window.smoothScroll("faq")
                                        }}
                                        to="/#faq">
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => {
                                            this.setState({
                                                show_menu: !this.state.show_menu
                                            })
                                            window.smoothScroll("contact-us")
                                        }}
                                        to="/#contact-us">
                                        Contact Us
                                    </Link>
                                </li>
                                {this.state.user
                                    ?
                                    <>
                                        <li>
                                            <Link
                                                onClick={() => {
                                                    this.setState({
                                                        show_menu: !this.state.show_menu
                                                    })
                                                }}
                                                to="/account">
                                                My Account
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="#"
                                                onClick={(e) => {
                                                    this.setState({
                                                        show_menu: !this.state.show_menu
                                                    })
                                                    fetch('/api/logout')
                                                        .then(() => {
                                                            window.location.href = '/'
                                                        })
                                                }}
                                            >
                                                Logout
                                            </Link>
                                        </li>
                                    </>
                                    :
                                    <li>
                                        <Link
                                            onClick={() => {
                                                this.setState({
                                                    show_menu: !this.state.show_menu
                                                })
                                            }}
                                            to="/login">
                                            Login
                                        </Link>
                                    </li>

                                }
                            </ul>
                        </div>

                    </div>
                </div >

        )
    }
}

export default Navbar;