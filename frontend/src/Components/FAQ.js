import React, { Component } from 'react';
import QuestionDropdown from './SmallerComponents/QuestionDropdown'

class FAQ extends Component {
    render() {
        let questions = [
            {
                question: "When can I book a new test after failling?",
                answer: "sahduasdh",
            },
            {
                question: "Is our driving cancellation test legit?",
                answer: "sahduasdh",
            },
            {
                question: "Is there a cancellation list for driving tests?",
                answer: "sahduasdh",
            },
            {
                question: "What is the best time of day to find driving test cancellations?",
                answer: "sahduasdh",
            },
            {
                question: "How does driving test cancellations software work?",
                answer: "sahduasdh",
            },
            {
                question: "Can I get notifications for cancelled driving tests?",
                answer: "sahduasdh",
            },
            {
                question: "How do I get notified of driving test cancellations?",
                answer: "sahduasdh",
            },
            {
                question: "Can I automatically book a cancellation driving test?",
                answer: "sahduasdh",
            },
            {
                question: "What happens if I want to change my preferences?",
                answer: "sahduasdh",
            },
            {
                question: "Can you cancel an early driving test?",
                answer: "sahduasdh",
            },
            {
                question: "How many times can you change your driving test?",
                answer: "sahduasdh",
            },
            {
                question: "How long do I have to respond to notification?",
                answer: "sahduasdh",
            }  
        ]

        return (
            <section id="faq">
                <div className="inner-container">
                    <h1 id="faq-title">FAQ</h1>
                    <div id="questions">
                        {questions.map(each => {
                            return (
                                <QuestionDropdown
                                    question={each.question}
                                    answer={each.answer}
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
