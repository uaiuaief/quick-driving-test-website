import React, { Component } from 'react';
import {Step} from "./SmallerComponents/Step"

class Tutorial extends Component {
    render() {
        return (
            <section id="tutorial">
                <div id="tutorial-inner" className="inner-container">
                    <div id="title-wrapper">
                        <h1>How it Works?</h1>
                    </div>
                    <Step step="01"/>
                    <Step step="02"/>
                    <Step step="03"/>
                    {/* <h1 id='test'>Lorem ipsum dolor swit amt consecte adipsisc</h1> */}

                </div>
            </section>
        );
    }
}

export {Tutorial};
