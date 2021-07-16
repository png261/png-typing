import { useEffect, useState } from 'react';
import { formatTime } from 'src/helpers/time';

const useClock = () => {
    const [time, setTime] = useState(() => {
        const now = new Date();
        return formatTime(now);
    });

    useEffect(() => {
        const timeInterval = setInterval(() => {
            const now = new Date();
            setTime(formatTime(now));
        }, 1000);
        return () => {
            clearInterval(timeInterval);
        };
    }, []);

    return time;
};

export default useClock;
