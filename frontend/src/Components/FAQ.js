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
            answer: "Vel dignissimos temporibus adipisci libero vero. Temporibus et nisi asperiores. Velit quisquam quia iure explicabo. Officiis repudiandae praesentium cum labore aliquam blanditiis. Velit iure asperiores corrupti facere incidunt corrupti consequuntur aut. Similique ad aliquam ea.",
        },
        {
            question: "Is there a cancellation list for driving tests?",
            answer: "Vel dignissimos temporibus adipisci libero vero. Temporibus et nisi asperiores. Velit quisquam quia iure explicabo. Officiis repudiandae praesentium cum labore aliquam blanditiis. Velit iure asperiores corrupti facere incidunt corrupti consequuntur aut. Similique ad aliquam ea.",
        },
        {
            question: "What is the best time of day to find driving test cancellations?",
            answer: "Vel dignissimos temporibus adipisci libero vero. Temporibus et nisi asperiores. Velit quisquam quia iure explicabo. Officiis repudiandae praesentium cum labore aliquam blanditiis. Velit iure asperiores corrupti facere incidunt corrupti consequuntur aut. Similique ad aliquam ea.",
        },
        {
            question: "How does driving test cancellations software work?",
            answer: "Vel dignissimos temporibus adipisci libero vero. Temporibus et nisi asperiores. Velit quisquam quia iure explicabo. Officiis repudiandae praesentium cum labore aliquam blanditiis. Velit iure asperiores corrupti facere incidunt corrupti consequuntur aut. Similique ad aliquam ea.",
        },
        {
            question: "Can I get notifications for cancelled driving tests?",
            answer: "Vel dignissimos temporibus adipisci libero vero. Temporibus et nisi asperiores. Velit quisquam quia iure explicabo. Officiis repudiandae praesentium cum labore aliquam blanditiis. Velit iure asperiores corrupti facere incidunt corrupti consequuntur aut. Similique ad aliquam ea.",
        },
        {
            question: "How do I get notified of driving test cancellations?",
            answer: "Vel dignissimos temporibus adipisci libero vero. Temporibus et nisi asperiores. Velit quisquam quia iure explicabo. Officiis repudiandae praesentium cum labore aliquam blanditiis. Velit iure asperiores corrupti facere incidunt corrupti consequuntur aut. Similique ad aliquam ea.",
        },
        {
            question: "Can I automatically book a cancellation driving test?",
            answer: "Vel dignissimos temporibus adipisci libero vero. Temporibus et nisi asperiores. Velit quisquam quia iure explicabo. Officiis repudiandae praesentium cum labore aliquam blanditiis. Velit iure asperiores corrupti facere incidunt corrupti consequuntur aut. Similique ad aliquam ea.",
        },
        {
            question: "What happens if I want to change my preferences?",
            answer: "Vel dignissimos temporibus adipisci libero vero. Temporibus et nisi asperiores. Velit quisquam quia iure explicabo. Officiis repudiandae praesentium cum labore aliquam blanditiis. Velit iure asperiores corrupti facere incidunt corrupti consequuntur aut. Similique ad aliquam ea.",
        },
        {
            question: "Can you cancel an early driving test?",
            answer: "Vel dignissimos temporibus adipisci libero vero. Temporibus et nisi asperiores. Velit quisquam quia iure explicabo. Officiis repudiandae praesentium cum labore aliquam blanditiis. Velit iure asperiores corrupti facere incidunt corrupti consequuntur aut. Similique ad aliquam ea.",
        },
        {
            question: "How many times can you change your driving test?",
            answer: "Vel dignissimos temporibus adipisci libero vero. Temporibus et nisi asperiores. Velit quisquam quia iure explicabo. Officiis repudiandae praesentium cum labore aliquam blanditiis. Velit iure asperiores corrupti facere incidunt corrupti consequuntur aut. Similique ad aliquam ea.",
        },
        {
            question: "How long do I have to respond to notification?",
            answer: "Vel dignissimos temporibus adipisci libero vero. Temporibus et nisi asperiores. Velit quisquam quia iure explicabo. Officiis repudiandae praesentium cum labore aliquam blanditiis. Velit iure asperiores corrupti facere incidunt corrupti consequuntur aut. Similique ad aliquam ea.",
        }  
    ]
    
    render() {
        return (
            <section id="faq">
                <div id="faq-bg"></div>
                <div className="inner-container">
                    <h1 id="faq-title">FAQ</h1>
                    <div id="questions">
                        {this.questions.map(each => {
                            return (
                                <QuestionDropdown
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
