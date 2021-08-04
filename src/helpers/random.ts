export const randomNumber = (max: number) => Math.floor(Math.random() * max);

export const getRandomFromData = (data: string[]) => {
	return data[randomNumber(data.length)];
};
