import { useEffect, useState } from 'react';

const useKeyBoard = () => {
	const [currentKey, setCurrentKey] = useState('');
	const keyboardEventListener = (e: KeyboardEvent) => setCurrentKey(e.code);
	const reset = () => setCurrentKey('');

	useEffect(() => {
		document.body.addEventListener('keydown', keyboardEventListener);
		document.body.addEventListener('keyup', reset);

		return () => {
			document.body.removeEventListener('keydown', keyboardEventListener);
			document.body.removeEventListener('keyup', reset);
		};
	}, []);

	return { currentKey };
};

export default useKeyBoard;
