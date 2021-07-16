export const formatTime = (time) => {
    return time
        .toLocaleString('en-US', { hour12: false })
        .replace(/,/gi, '')
        .replace(/\//g, '-');
};
