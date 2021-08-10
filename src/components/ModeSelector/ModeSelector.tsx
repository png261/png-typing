import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeMode, updateModeValue } from 'src/slices/mode';
import ArrowSwitch from '../ArrowSwitch/ArrowSwitch';
import Switch from '../Switch/Switch';
import MODE_OPTIONS from 'src/constants/typingMode';
import { Wrapper } from './ModeSelector.styles';
import { formatMinute } from 'src/helpers/time';
import { stopCountDown } from 'src/slices/countDown';
import { resetResultAvg } from 'src/slices/results';

const ModeSelector = () => {
	const dispatch = useDispatch();

	const mode = useSelector((state) => state.mode.mode);
	const setMode = (modeOption: 'times' | 'minutes') =>
		dispatch(changeMode(modeOption));

	const modeValue = useSelector((state) => state.mode.value);

	const changeModeValue = (modeValue: number) =>
		dispatch(updateModeValue({ [mode]: modeValue }));

	const [minutesFormatted, setMinutesFormatted] = useState(
		formatMinute(modeValue.minutes * 60)
	);

	const stopCountTime = () => dispatch(stopCountDown());
	const countDown = useSelector((state) => state.countDown);

	useEffect(() => {
		if (typeof modeValue.minutes !== 'number') {
			return setMinutesFormatted(modeValue.minutes);
		}
		if (countDown.isCounting) {
			return setMinutesFormatted(formatMinute(countDown.seconds));
		}

		setMinutesFormatted(formatMinute(modeValue.minutes * 60));
	}, [countDown, modeValue]);

	useEffect(() => {
		stopCountTime();
		dispatch(resetResultAvg());
	}, [mode, modeValue]);

	return (
		<Wrapper>
			<Switch
				options={{ Times: 'times', Minutes: 'minutes' }}
				currentOption={mode}
				onChange={setMode}
			/>
			<ArrowSwitch
				options={MODE_OPTIONS[mode]}
				currentOption={modeValue[mode]}
				onChange={changeModeValue}
				value={mode === 'minutes' && minutesFormatted}
			/>
		</Wrapper>
	);
};

export default ModeSelector;
