export const formatTime = (time: Date) => {
	return time
		.toLocaleString('en-US', { hour12: false })
		.replace(/,/gi, '')
		.replace(/\//g, '-');
};
export const formatMinute = (inputSeconds: number) => {
	const minutes = Math.trunc(inputSeconds / 60);
	const seconds = Math.floor(inputSeconds - minutes * 60);

	return `${minutes.toString().padStart(2, '0')}:${seconds
		.toString()
		.padStart(2, '0')}`;
};
