import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCountDown from 'src/hooks/useCountDown';
import { resetResultAvg } from 'src/slices/results';
import { Modal } from '../Modal/Modal.styles';
import { Overlaps } from '../Overlaps/Overlaps.styles';
import {
	AvgAcc,
	AvgSpeed,
	CurrentDate,
	DeviceOS,
	MaxSpeed,
	Mode,
	SiteName,
	Stemp,
	StempDay,
	Wrapper,
} from './FinalResultBox.styles';

const FinalResultBox = () => {
	const mode = useSelector((state) => state.mode.mode);
	const language = useSelector((state) => state.language);
	const typingLength = useSelector((state) => state.typingLength);
	const resultsAvg = useSelector((state) => state.results.avg);
	const getOS = () => {
		const appVersion = navigator.appVersion;
		if (appVersion.indexOf('Mac') !== -1) {
			return 'MacOS';
		}

		if (appVersion.indexOf('Win') !== -1) {
			return 'Windows';
		}

		if (appVersion.indexOf('Linux') !== -1) {
			return 'Linux';
		}
		return 'UnKnow';
	};
	const OS = getOS();
	const avgAccuracy = Math.round(
		resultsAvg.reduce((total: number, { acc }) => total + acc, 0) /
			resultsAvg.length
	);
	const avgCPM = Math.round(
		resultsAvg.reduce((total: number, { cpm }) => total + cpm, 0) /
			resultsAvg.length
	);
	const highestCPM = resultsAvg.reduce(
		(total: number, { cpm }) => (cpm > total ? cpm : total),
		0
	);
	const avgWPM = Math.round(
		resultsAvg.reduce((total: number, { wpm }) => total + wpm, 0) /
			resultsAvg.length
	);
	const dispatch = useDispatch();

	const allResult = useSelector((state) => state.results.all);
	const modeValue = useSelector((state) => state.mode.value);

	const [isShow, setIsShow] = useState(false);
	const countDownSeconds = useSelector((state) => state.countDown.seconds);

	useEffect(() => {
		if (mode === 'times' && resultsAvg.length === modeValue.times) {
			setIsShow(true);
		}
	}, [mode, modeValue, resultsAvg, allResult]);

	useEffect(() => {
		if (
			mode === 'minutes' &&
			countDownSeconds === 0 &&
			resultsAvg.length > 0
		) {
			setIsShow(true);
		}
	}, [mode, resultsAvg, countDownSeconds]);

	useEffect(() => {
		const hideFinalResultModal = (ev: KeyboardEvent): any => {
			if (ev.code !== 'Escape') return;
			setIsShow(false);
			dispatch(resetResultAvg());
		};

		if (isShow) {
			window.addEventListener('keydown', hideFinalResultModal);
		}
		return () => {
			window.removeEventListener('keydown', hideFinalResultModal);
		};
	}, [isShow]);

	return (
		<>
			{isShow && (
				<>
					<Modal>
						<Wrapper>
							<SiteName>PNG typing</SiteName>
							<CurrentDate>
								{new Date().toDateString()}
							</CurrentDate>
							<DeviceOS>{OS}</DeviceOS>
							<Mode id="rstMode">
								{language}, {typingLength}, Normal, {mode}
							</Mode>
							<MaxSpeed>{avgWPM || 0}</MaxSpeed>
							<AvgSpeed id="rstAvgSpd">
								{highestCPM || 0}/{avgCPM || 0}
							</AvgSpeed>
							<AvgAcc id="rstAvgAcc">{avgAccuracy || 0}</AvgAcc>
							<Stemp id="rstStemp">
								<StempDay>{new Date().toDateString()}</StempDay>
							</Stemp>
						</Wrapper>
					</Modal>
					<Overlaps />
				</>
			)}
		</>
	);
};

export default FinalResultBox;
