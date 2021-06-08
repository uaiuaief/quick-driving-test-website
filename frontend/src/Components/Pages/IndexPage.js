import React, { Component } from 'react';
import { CTA } from "../CTA"
import { Tutorial } from "../Tutorial"
import { Pricing } from "../Pricing"
import FAQ from "../FAQ"
import ContactUs from "../ContactUs"


class IndexPage extends Component {
    componentDidMount(){
        let hash = window.location.hash; 
        if (hash){
            try {
                document.getElementById(hash.replace('#', '')).scrollIntoView({ behavior: 'smooth', block: 'start' })
            } catch (TypeError) {
                console.log('error');
            }
        }
        else {
            document.getElementById("CTA").scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    render() {
        return (
            <>
                <CTA />
                <Tutorial />
                <Pricing />
                <FAQ />
                <ContactUs />
                {/* <div style={{'height': '600px', 'backgroundColor': '#333'}}></div> */}
            </>
        );
    }
}

export default IndexPage;
