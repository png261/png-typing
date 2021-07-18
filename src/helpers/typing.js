export const countWrong = (typed, origin) => {
    return [...typed].filter((c, i) => origin[i] !== c).length;
};
export const getAccuracy = (typed, origin) => {
    return Math.round(
        (1 - countWrong(typed, origin) / typed.length || 0) * 100
    );
};
export const getCPM = (origin, milliseconds) => {
    return Math.round((origin.length / (milliseconds / 1000)) * 60) || 0;
};
export const getWPM = (typed, origin, milliseconds) => {
    const words = typed
        .match(/\b\S+\b/g)
        .filter((w, i) => w === origin.match(/\b\S+\b/g)[i]);
    return Math.round((words.length / (milliseconds / 1000)) * 60) || 0;
};
