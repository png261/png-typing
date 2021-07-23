import { useEffect, useState } from 'react';

const useCountDown = (secondsInput) => {
    const [seconds, setSeconds] = useState(secondsInput);
    const [isCounting, setIsCounting] = useState(false);

    const stopCount = () => {
        setIsCounting(false);
    };
    const startCount = (duration) => {
        if (!duration) {
            stopCount();
        }
        setSeconds(10);
        setIsCounting(true);
    };

    useEffect(() => {
        if (!isCounting || seconds <= 0) return;

        const timeInterval = setInterval(() => {
            setSeconds((preState) => preState - 1);
        }, 1000);
        return () => clearInterval(timeInterval);
    }, [isCounting, seconds]);

    return { seconds, stopCount, startCount, isCounting };
};

export default useCountDown;
