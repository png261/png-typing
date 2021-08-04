import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeMode, updateModeValue } from 'src/slices/mode';
import ArrowSwitch from '../ArrowSwitch/ArrowSwitch';
import Switch from '../Switch/Switch';
import MODE_OPTIONS from 'src/constants/typingMode';
import { Wrapper } from './ModeSelector.styles';
import { formatMinute } from 'src/helpers/time';
import { resetResultAvg } from 'src/slices/results';
import useCountDown from 'src/hooks/useCountDown';

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

	const countDown = useCountDown();

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
		countDown.stopCount();
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
