import useClock from 'src/hooks/useClock';

const Clock = () => {
    const { timeString } = useClock();

    return <span>{timeString}</span>;
};

export default Clock;
