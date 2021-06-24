import React, { Component } from 'react';
import QuestionDropdown from './SmallerComponents/QuestionDropdown'

class FAQ extends Component {
    questions = [
        {
            question: "When can I book a new test after failling?",
            answer: "If you have unfortunately just failed your driving test, you will have to wait at least 10 working days before booking another test. Once the 10 working days have passed, you are free to book a test as you normally would, or use our test cancellation checker, to find a short notice driving test near you",
        },
        {
            question: "Is our driving cancellation test legit?",
            answer: "Our driving test cancellation checker is legitimate and not a scam. We offer concrete money-back guarantees and if we are unable to find you an earlier test date, we’ll happily refund you your money no questions asked. All you need to do to get your early test date is fill in the form and complete the booking process and we’ll do the rest.",
        },
        {
            question: "Is there a cancellation list for driving tests?",
            answer: `Unfortunately, there isn’t a DVSA driving test cancellation list that you can sign up or add your name to. It’s a question many learner drivers ask, however, the only way to find an earlier driving test is to search for a short notice test yourself or use our driving test cancellation service to find yourself a short notice driving test.

            The list of cancelled driving test dates on this page show recent test appointments we’ve found for learner drivers using our app.`,
        },
        {
            question: "What is the best time of day to find driving test cancellations?",
            answer: "The best time of day to find a driving test cancellation is between 9am and 11am in the morning. You are more likely to find a vacant spot at this time of the day as learner drivers who intend on cancelling or rescheduling their driving test often do so at the start of the day.",
        },
        {
            question: "How does driving test cancellations software work?",
            answer: "Our software works by automatically checking the DVSA’s driving test booking website multiple times a day, for recently cancelled driving test appointments. When a test slot matching your criteria is found, you’ll automatically be sent a text message with the details and the option of confirming the appointment.",
        },
        {
            question: "Can I get notifications for cancelled driving tests?",
            answer: "Yes, you can get notified when an early driving test becomes available. To do so, choose a date and a set of test centres and we’ll send you an alert when a suitable driving test appointment becomes available.",
        },
        {
            question: "How do I get notified of driving test cancellations?",
            answer: "You will be notified by text message when a driving test appointment matching your criteria becomes available. If you are happy with the time, date and location and wish to accept the appointment, simply reply to the message with the word Book. Once you have confirmed your attendance you will receive an email from the DVSA confirming the details of your driving test.",
        },
        {
            question: "Can you cancel an early driving test?",
            answer: "Yes, you can cancel the test and get a refund from the DVSA as long as you leave at least three clear working days between the date of the early test and the date you cancel. If you fail to give enough notice before you cancel, the DVSA will not issue a refund.",
        },
        {
            question: "I've booked my test already but it's 3 months away. Can you help me find one sooner?",
            answer: "Absolutely! We want you to get your license as soon as possible. We do this by scouting for people who cancel their driving test bookings and then we offer those spots to you so that you can get your test done within weeks, not months ",
        },
        {
            question: "How often do you check the DVSA's website?",
            answer: "Our driving test cancellation checker scans the DVSA’s website at 5-minute intervals. We check your chosen test centre every 5 minutes, as this gives us the best chance of finding a cancellation. Once we find a date that matches your preferences, we’ll send you a notification or reschedule your test automatically, if you’ve selected that option.",
        }  
    ]
    
    render() {
        return (
            <section id="faq">
                <div id="faq-bg"></div>
                <div className="inner-container">
                    <h1 id="faq-title">FAQ</h1>
                    <div id="questions">
                        {this.questions.map((each, index) => {
                            return (
                                <QuestionDropdown
                                    key={index}
                                    open={false}
                                    question={each.question}
                                    answer={each.answer}
                                    setParentState={() => this.setState({a: ""})}
                                />
                            )
                        })}
                    </div>
                </div>
            </section>
        );
    }
}

export default FAQ;
