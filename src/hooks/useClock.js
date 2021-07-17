import { useEffect, useState } from 'react';
import { formatTime } from 'src/helpers/time';

const useClock = () => {
    const [timeString, setTimeString] = useState(() => {
        const now = new Date();
        return formatTime(now);
    });

    useEffect(() => {
        const timeInterval = setInterval(() => {
            const now = new Date();
            setTimeString(formatTime(now));
        }, 1000);
        return () => {
            clearInterval(timeInterval);
        };
    }, []);

    return { timeString };
};

export default useClock;
