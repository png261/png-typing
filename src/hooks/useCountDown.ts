import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	startCountDown,
	stopCountDown,
	updateCountDownSeconds,
} from 'src/slices/countDown';

const useCountDown = () => {
	const dispatch = useDispatch();
	const seconds = useSelector((state) => state.countDown.seconds);
	const isCounting = useSelector((state) => state.countDown.isCounting);

	const stopCount = () => dispatch(stopCountDown());
	const startCount = (duration: number) => dispatch(startCountDown(duration));

	useEffect(() => {
		const timeInterval = setInterval(() => {
			if (!isCounting) {
				clearInterval(timeInterval);
				return;
			}
			const action = updateCountDownSeconds();
			dispatch(action);
		}, 1000);
		return () => clearInterval(timeInterval);
	}, [isCounting]);

	useEffect(() => {
		if (seconds < 0) stopCount();
	}, [seconds]);

	return { seconds, stopCount, startCount, isCounting };
};

export default useCountDown;
