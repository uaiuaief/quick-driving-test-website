import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import success from '../../assets/payment-success.png'

class PaymentSuccessPage extends Component {
    state = {
        redirect: false
    }

    componentDidMount(){
        // setTimeout(() => {
        //     this.setState({
        //         redirect: true
        //     })
        // }, 3000);
    }

    render() {
        return (
            this.state.redirect
            ?
            <Redirect to="login"/>
            :
            <section id="payment-success-page">
                <div className="inner-container">
                    <img src={success}/>
                    <h1>
                        Your account was created successfully
                    </h1>
                </div>
            </section>
        );
    }
}

export default PaymentSuccessPage;
