import { useEffect, useState } from 'react';

const useCountDown = (duration) => {
    const formatTime = () => {
        let seconds = Math.floor((duration / 1000) % 60);
        let minutes = Math.floor((duration / (1000 * 60)) % 60);
        minutes = minutes.toString().padStart(2, '0');
        seconds = seconds.toString().padStart(2, '0');
        return { seconds, minutes };
    };

    const [time, setSecond] = useState(formatTime);
    const [isCounting, setIsCounting] = useState(false);

    const startCount = (duration) => {
        setIsCounting(true);
    };

    const stopCount = () => {
        setIsCounting(false);
    };
    useEffect(() => {
        if (!isCounting || duration < 0) return;
        const timeInterval = setInterval(() => {
            duration = duration - 1000;
            setSecond(formatTime());
        }, 1000);
        return () => clearInterval(timeInterval);
    }, [isCounting, duration]);

    return { ...time, stopCount, startCount, isCounting };
};

export default useCountDown;
