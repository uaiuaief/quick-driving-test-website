import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FooterBlock extends Component {
    render() {
        return (
            <div className="footer-column">
                <h1>{this.props.title}</h1>
                <ul>
                    {this.props.items.map(each => {
                        return (
                            <li>
                                <Link to={each.url}>
                                    {each.text}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default FooterBlock;
