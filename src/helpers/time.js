export const formatTime = (time) => {
    return time
        .toLocaleString('en-US', { hour12: false })
        .replace(/,/gi, '')
        .replace(/\//g, '-');
};
export const formatMinute = (inputSeconds) => {
    const minutes = Math.trunc(inputSeconds / 60)
        .toString()
        .padStart(2, '0');
    const seconds = Math.floor(inputSeconds - minutes * 60)
        .toString()
        .padStart(2, '0');

    return `${minutes}:${seconds}`;
};
