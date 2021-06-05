import React, { Component } from 'react';

class FooterBlock extends Component {
    render() {
        return (
            <div className="footer-column">
                <h1>{this.props.title}</h1>
                <ul>
                    {this.props.items.map(each => {
                        return (
                            <li>
                                <a href={each.url}>
                                    {each.text}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default FooterBlock;
