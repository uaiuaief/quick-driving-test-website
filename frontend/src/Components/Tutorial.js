import React, { Component } from 'react';
import {Step} from "./SmallerComponents/Step"
import MainButton from './Buttons/MainButton'

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
                    <MainButton
                        id="tutorial-button"
                        text="Get Cancellations NOW!"
                    />
                  
                </div>
            </section>
        );
    }
}

export {Tutorial};
