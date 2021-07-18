import { useEffect, useState } from 'react';

const useStopWatch = () => {
    const [isCounting, setIsCounting] = useState(false);
    const [timer, setTimer] = useState(0);

    const startCount = () => {
        setIsCounting(true);
    };
    const stopCount = () => {
        setIsCounting(false);
        setTimer(0);
    };

    useEffect(() => {
        if (!isCounting) return;
        const timeInterval = setInterval(() => {
            setTimer((state) => state + 100);
        }, 100);
        return () => {
            clearInterval(timeInterval);
        };
    }, [isCounting]);

    return { timer, stopCount, startCount, isCounting };
};

export default useStopWatch;
