import { useEffect, useState } from 'react';

const useKeyBoard = () => {
    const [currentKey, setCurrentKey] = useState('');
    const keyboardEventListener = (e) => setCurrentKey(e.code);

    useEffect(() => {
        document.body.addEventListener('keydown', keyboardEventListener);
        return () => {
            document.body.removeEventListener('keydown', keyboardEventListener);
        };
    }, []);

    return { currentKey };
};

export default useKeyBoard;
