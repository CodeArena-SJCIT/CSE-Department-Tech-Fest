import React, { useState, useEffect, useRef } from "react";
import './countdown.css';

const Countdown = () => {

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timerEnded, setTimerEnded] = useState(false);
    const intervalRef = useRef(null);

    const calculateRemainingTime = () => {
        const targetDate = new Date("March 10, 2025 21:58:00 GMT+05:30");
        const now = new Date();
        const distance = targetDate - now;

        if (distance <= 0) {
            clearInterval(intervalRef.current);
            setTimerEnded(true);
        } else {
            setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
            setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
        }
    };

    useEffect(() => {
        intervalRef.current = setInterval(calculateRemainingTime, 1000);
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <>
            <p className="p-head">Registration Closes in</p>
            {/* Countdown Timer */}
            {!timerEnded ? (
                <div className="ls">
                    <div>
                        <p className="text-4xl font-bold">{days}<span style={{ opacity: "0" }}>.</span> D :</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold">{hours}<span style={{ opacity: "0" }}>.</span> H :</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold">{minutes}<span style={{ opacity: "0" }}>.</span> M :</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold">{seconds} S </p>
                    </div>
                </div >
            ) : (
                <p className="text-lg font-bold text-red-500">BGS ARPIT is in Space!!! <span style={{ color: "rgba(255, 0, 0, 0.5)" }}>(Amateur Radio Payload for Information Transmission)</span></p>
            )}

        </>
    );
}

export default Countdown;
