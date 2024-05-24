import React, { useState } from 'react';
import './FAQ.scss';

const FAQ = () => {
    const faqData = [
        {
            question: 'How do I create a new order?',
            answer: 'To create a new order, navigate to the "Sales" section on the main toolbar, then select "Create New Order". Fill in the customer information, select products, and click "Save" to complete.',
        },
        {
            question: 'How can I manage my inventory?',
            answer: 'You can manage your inventory by going to the "Inventory Management" section on the toolbar. Here, you can add new stock, remove stock, and check the inventory levels of products.',
        },
        {
            question: 'How do I add a new product?',
            answer: 'To add a new product, go to the "Products" section and click on "Add New Product". Fill in the product details such as name, category, price, and stock quantity, then click "Save" to add the product to your inventory.',
        },
        {
            question: 'How do I generate sales reports?',
            answer: 'To generate sales reports, navigate to the "Reports" section. Select the type of report you want to generate (e.g., daily sales, monthly sales, inventory reports), choose the date range, and click "Generate Report".',
        },
        {
            question: 'How can I manage customer information?',
            answer: 'You can manage customer information by going to the "Customers" section. Here, you can add new customers, edit existing customer information, and view the purchase history of each customer.',
        },
        {
            question: 'How do I set up payment methods?',
            answer: 'To set up payment methods, go to the "Settings" section and select "Payment Methods". You can add, edit, or remove payment methods such as credit card, cash, or online payments.',
        },
        {
            question: 'How can I track my sales performance?',
            answer: 'To track your sales performance, use the "Dashboard" section where you can view key metrics such as total sales, best-selling products, and sales trends over time.',
        },
        {
            question: 'How do I handle returns and refunds?',
            answer: 'To handle returns and refunds, go to the "Sales" section and select "Returns". Find the order to be returned, process the return, and issue a refund if necessary.',
        },
        {
            question: 'How do I update my store information?',
            answer: 'To update your store information, go to the "Settings" section and select "Store Information". Here, you can update details such as store name, address, contact information, and business hours.',
        },
        {
            question: 'How can I integrate with third-party services?',
            answer: 'To integrate with third-party services, go to the "Integrations" section in "Settings". Here, you can connect with various third-party services such as payment gateways, shipping providers, and marketing tools.',
        },
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
                            <div key={index} className="faq-item">
                                <button
                                    className={`collapse-button ${openIndex === index ? 'active' : ''}`}
                                    onClick={() => handleToggle(index)}
                                >
                                    {item.question}
                                </button>
                                {openIndex === index && (
                                    <div className="collapse-content">
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
