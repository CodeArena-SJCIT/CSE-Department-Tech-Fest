import React, { useState } from 'react';
import "./apply.css"
import Countdown from '../Countdown/countdown';

const Apply = () => {
    return (
        <>
            <div className="apply-container">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSezlhaGIiqCnrCR8_dUBz8koVMG5LFmIldInAra9KxXtgMyuw/viewform"><div className="apply-title">Register Now</div></a>
                <Countdown />
            </div>

        </>
    );
}

export default Apply;
