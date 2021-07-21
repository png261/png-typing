export const randomNumber = (max) => Math.floor(Math.random() * max);

export const getRandomFromData = (data) => {
    if (!Array.isArray(data)) return data[0];
    return data[randomNumber(data.length)];
};
