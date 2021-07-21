import { useEffect, useState } from 'react';

const useCountDown = (inputDuration) => {
    const [duration, setDuration] = useState(inputDuration);

    const formatTime = () => {
        let seconds = Math.floor((duration / 1000) % 60);
        let minutes = Math.floor((duration / (1000 * 60)) % 60);
        minutes = minutes.toString().padStart(2, '0');
        seconds = seconds.toString().padStart(2, '0');
        return `${seconds}:${minutes}`;
    };

    const [time, setSecond] = useState(formatTime(inputDuration));
    const [isCounting, setIsCounting] = useState(false);

    const startCount = (duration) => {
        setIsCounting(true);
    };

    const stopCount = () => {
        setIsCounting(false);
    };
    useEffect(() => {
        const timeInterval =
            isCounting && duration >= 0
                ? setInterval(() => {
                      setDuration((preState) => preState - 1000);
                      setSecond(formatTime());
                  }, 1000)
                : '';

        return () => clearInterval(timeInterval);
    }, [isCounting, duration]);

    return { time, stopCount, startCount, isCounting };
};

export default useCountDown;
