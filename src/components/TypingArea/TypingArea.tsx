import React, {
	ClipboardEvent,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccuracy, getCPM, getWPM } from 'src/helpers/typing';
import useCountDown from 'src/hooks/useCountDown';
import useGetSentences from 'src/hooks/useGetSentences';
import useStopWatch from 'src/hooks/useStopWatch';
import { updateACC, updateCPM } from 'src/slices/realTimeInfo';
import { addResult, addResultAvg } from 'src/slices/results';
import ValidArea from '../ValidArea/ValidArea';
import { GoalBar, Next, Wrapper } from './TypingArea.styles';

const TypingArea = () => {
	const dispatch = useDispatch();
	const ACC = useSelector((state) => state.realTimeInfo.acc);
	const CPM = useSelector((state) => state.realTimeInfo.cpm);

	const stopWatch = useStopWatch();
	const countDown = useCountDown();

	const mode = useSelector((state) => state.mode.mode);
	const modeValue = useSelector((state) => state.mode.value);

	const [typedText, setTypedText] = useState('');

	const resetTyping = () => {
		stopWatch.stopCount();
		setTypedText('');
	};

	const onChange = ({ target: { value } }) => {
		setTypedText(value);
	};
	const { currentSentence, nextSentence, goToNextSentence } =
		useGetSentences();

	const updateResult = () => {
		const goal = {
			wpm: getWPM(typedText, currentSentence, stopWatch.timer),
			cpm: CPM,
			acc: ACC,
		};
		dispatch(addResult(goal));
		if (
			(mode === 'minutes' && countDown.isCounting) ||
			(mode === 'times' && typeof modeValue.times === 'number')
		) {
			dispatch(addResultAvg(goal));
		}

		resetTyping();
		goToNextSentence();
	};

	useLayoutEffect(() => {
		const setCPM = (cpm: number) => dispatch(updateCPM(cpm));
		setCPM(getCPM(typedText, stopWatch.timer));
	}, [stopWatch.timer]);

	useEffect(() => {
		if (typedText.length === 0) {
			resetTyping();
		}
		const setACC = (acc: number) => dispatch(updateACC(acc));
		setACC(getAccuracy(typedText, currentSentence));
	}, [typedText, resetTyping, currentSentence]);

	const disablePaste = (e: ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (typedText.length === 1 && !stopWatch.isCounting) {
			stopWatch.startCount();
		}

		if (
			typedText.length === 1 &&
			mode === 'minutes' &&
			!countDown.isCounting
		) {
			countDown.startCount(modeValue.minutes * 60);
		}

		if (e.code === 'Enter' && typedText.length >= currentSentence.length) {
			updateResult();
		}
	};

	const input = useRef<HTMLInputElement>(null);
	if (input.current) {
		input.current.focus();
	}

	useEffect(() => {
		const reset = (e: KeyboardEvent) => {
			if (e.code === 'Escape') {
				resetTyping();
			}
		};
		document.addEventListener('keydown', reset);

		return () => document.removeEventListener('keydown', reset);
	}, []);

	return (
		<Wrapper>
			<ValidArea curSentence={currentSentence} typedText={typedText} />
			<input
				ref={input}
				type="text"
				autoComplete="off"
				onPaste={disablePaste}
				placeholder="Typing works like above text and enter(space)"
				value={typedText}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
			<GoalBar CPM={CPM} />
			<Next>
				<span>NEXT</span>
				{nextSentence}
			</Next>
		</Wrapper>
	);
};

export default TypingArea;
