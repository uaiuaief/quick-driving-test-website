import React, { Component } from 'react';
import { CTA } from "../CTA"
import { Tutorial } from "../Tutorial"
import { Pricing } from "../Pricing"
import FAQ from "../FAQ"
import ContactUs from "../ContactUs"
import Footer from "../Footer"


class IndexPage extends Component {
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
