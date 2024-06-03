import React, { useState } from 'react';
import './ReadMore.scss';

function ReadMore({ children, maxChareacterCount = 100 }) {
    const text = children;

    const [isTruncated, setIsTruncated] = useState(true)

    const resultString = isTruncated ? text.slice(0, 150) + "..." : text;

    function toggleIsTruncated() {
        setIsTruncated(!isTruncated)
    }

    return (
        <div className="ReadMore-container">
            {resultString}
            <div className="Xem_them_grid">
                <button onClick={toggleIsTruncated} className="Xem_them_button"> {isTruncated ? "See more" : "Compact"}</button>
            </div>
        </div>
    );
}

export default ReadMore;