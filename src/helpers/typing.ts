export const countWrong = (typed:string, origin:string) => {
    return [...typed].filter((c, i) => origin[i] !== c).length;
};
export const getAccuracy = (typed:string, origin:string) => {
    return Math.round(
        (1 - countWrong(typed, origin) / typed.length || 0) * 100
    );
};
export const getCPM = (origin:string, milliseconds:number) => {
    return Math.round((origin.length / (milliseconds / 1000)) * 60) || 0;
};
export const getWPM = (typed:string, origin:string, milliseconds:number) => {
    let words = typed.match(/\b\S+\b/g);
    const wordsOrigin = origin.match(/\b\S+\b/g);
    if(words === null || wordsOrigin === null){
        return 0;
    }

    words = words.filter((w, i) => w === wordsOrigin[i]);
    return Math.round((words.length / (milliseconds / 1000)) * 60) || 0;
};
