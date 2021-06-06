import React, { Component } from 'react';
import {Step} from "./SmallerComponents/Step"
import MainButton from './Buttons/MainButton'
import tutorialImage from '../assets/tutorial-img.png'


class Tutorial extends Component {
    render() {
        return (
            <section id="tutorial">
                <div id="tutorial-inner" className="inner-container">
                    <div id="title-wrapper">
                        <h1>How it Works?</h1>
                    </div>
                    <Step 
                        image={tutorialImage}
                        step="01"/>
                    <Step 
                        image={tutorialImage}
                        step="02"/>
                    <Step 
                        image={tutorialImage}
                        step="03"/>
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
