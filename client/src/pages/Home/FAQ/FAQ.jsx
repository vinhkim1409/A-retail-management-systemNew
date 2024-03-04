import React, { useState } from 'react';
import './FAQ.scss';


const FAQ = () => {
    const faqData = [
        {
            question: 'What is Lorem?',
            answer:
                'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        },
        {
            question: 'What is Lorem?',
            answer:
                'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        },
        {
            question: 'What is Lorem?',
            answer:
                'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        },
        {
            question: 'What is Lorem?',
            answer:
                'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        },
        {
            question: 'What is Lorem?',
            answer:
                'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        },
        {
            question: 'What is Lorem?',
            answer:
                'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        },
        {
            question: 'What is Lorem?',
            answer:
                'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        },
        {
            question: 'What is Lorem?',
            answer:
                'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        },
        {
            question: 'What is Lorem?',
            answer:
                'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        },
        {
            question: 'What is Lorem?',
            answer:
                'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        },
        {
            question: 'What is Lorem?',
            answer:
                'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        },

        // Thêm các câu hỏi và câu trả lời khác vào đây
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
        <div className="FAQ-container">
            <section id="faq" className="faq">
                <div className="container">
                    <div style={{ textAlign: 'center' }}>
                        <h1>Frequently Asked Questions</h1>
                    </div>
                    <div className="faq-list">
                        {faqData.map((item, index) => (
                            <div key={index + 1}>
                                <button
                                    className={`collapse ${openIndex === index ? 'show' : ''}`}
                                    onClick={() => handleToggle(index)}
                                >{item.question}
                                </button>
                                
                                {openIndex === index && (
                                    <div className="collapse show">
                                        <p>{item.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}

                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
