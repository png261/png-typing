export const getRandomNumber = (max = 0, min = 0) =>
    Math.floor(Math.random() * (max - (min ? min + 1 : 0))) + min;

export const getRandomFromData = (data) => {
    if (!Array.isArray(data)) return data[0];
    return data[getRandomNumber(data.length)];
};
