import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowSwitch from 'src/components/ArrowSwitch/ArrowSwitch';
import BoxResult from 'src/components/BoxResult/BoxResult';
import Clock from 'src/components/Clock/Clock';
import FinalResultBox from 'src/components/FinalResultBox/FinalResultBox';
import AllResults from 'src/components/GoalResults/GoalResults';
import KnobSelector from 'src/components/KnobSelector/KnobSelector';
import { Modal } from 'src/components/Modal/Modal.styles';
import { Overlaps } from 'src/components/Overlaps/Overlaps.styles';
import PangramSwitch from 'src/components/PangramSwitch/PangramSwitch';
import RandomSentence from 'src/components/RandomSentence/RandomSentence';
import Switch from 'src/components/Switch/Switch';
import TypingArea from 'src/components/TypingArea/TypingArea';
import TypingEffect from 'src/components/TypingEffect/TypingEffect';
import NOTICES from 'src/constants/notices';
import MODE_OPTIONS from 'src/constants/typingMode';
import { getAccuracy, getCPM, getWPM } from 'src/helpers/typing';
import useCountDown from 'src/hooks/useCountDown';
import useGetData from 'src/hooks/useGetData';
import useGetSentences from 'src/hooks/useGetSentences';
import useStopWatch from 'src/hooks/useStopWatch';
import { updateLanguage } from 'src/slices/language';
import { addResult } from 'src/slices/results';
import { updateTypingLength } from 'src/slices/typingLength';
import { Author, Notice, OptionTyping, Wrapper } from './App.styles';

const App = () => {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.language);
    const typingLength = useSelector((state) => state.typingLength);

    const setLanguage = (lang) => dispatch(updateLanguage(lang));
    const setTypingLength = (lengthOption) =>
        dispatch(updateTypingLength(lengthOption));

    const { currentSentence, currentAuthor, nextSentence, goToNextSentence } =
        useGetSentences();

    const [mode, setMode] = useState('times');
    const [modeValue, setModeValue] = useState({
        times: 5,
        minutes: 1,
    });

    const stopWatch = useStopWatch();
    const countDown = useCountDown(modeValue.minutes * 60);

    const [countTimes, setCountTime] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [goalCPM, setGoalCPM] = useState(0);
    const [CPM, setCPM] = useState(0);
    const [resultsToAvg, setResultsToAvg] = useState([]);

    const [isShowFinalResult, setIsShowFinalResult] = useState(false);
    const [typedText, setTypedText] = useState('');

    const resetTyping = () => {
        stopWatch.stopCount();
        setTypedText('');
    };
    const onTyping = ({ target: { value } }) => {
        setTypedText(value);
    };
    const resetMode = () => {
        countDown.stopCount();
        setResultsToAvg([]);
    };

    const changeModeValue = (value) => {
        setModeValue((prevState) => ({
            ...prevState,
            [mode]: value,
        }));
        resetMode();
    };

    const updateResult = () => {
        setCountTime((prevState) => ++prevState);

        const goal = {
            wpm: getWPM(typedText, currentSentence, stopWatch.timer),
            cpm: CPM,
            acc: accuracy,
        };
        dispatch(addResult(goal));
        if (
            (mode === 'minutes' && countDown.isCounting) ||
            (mode === 'times' && typeof modeValue.times === 'number')
        ) {
            setResultsToAvg((prevState) => [...prevState, goal]);
        }
        setGoalCPM((prevState) => Math.max(prevState, CPM));

        resetTyping();
        goToNextSentence();
    };
    const onKeyDown = (e) => {
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
        if (e.code !== 'Enter') return;

        const isDone = typedText.length >= currentSentence.length;
        if (!isDone) return;
        updateResult();
    };

    const turnOnPangram = () => {
        setTypingLength('sentences');
        setLanguage('pangram');
    };
    const turnOffPangram = () => {
        setTypingLength('sentences');
        setLanguage('ens');
    };

    useEffect(() => {
        if (typedText.length === 0) resetTyping();
        setAccuracy(getAccuracy(typedText, currentSentence));
    }, [typedText]);

    useLayoutEffect(() => {
        setCPM(getCPM(typedText, stopWatch.timer));
    }, [stopWatch.timer]);
    useEffect(() => {
        resetMode();
    }, [mode]);

    useEffect(() => {
        if (mode === 'times' && resultsToAvg.length === modeValue.times) {
            setIsShowFinalResult(true);
        }
    }, [countTimes]);

    useEffect(() => {
        if (
            mode === 'minutes' &&
            countDown.seconds === 0 &&
            resultsToAvg.length > 0
        ) {
            setIsShowFinalResult(true);
        }
    }, [countDown.seconds]);

    useEffect(() => {
        const hideFinalResultModal = (e) => {
            if (e.code !== 'Esc') setIsShowFinalResult(false);
            resetMode();
        };

        if (isShowFinalResult) {
            document.body.addEventListener('keydown', hideFinalResultModal);
        }
        return () => {
            document.body.removeEventListener('keydown', hideFinalResultModal);
        };
    }, [isShowFinalResult]);

    const formatTime = (duration) => {
        const minutes = Math.trunc(duration / 60)
            .toString()
            .padStart(2, '0');
        const seconds = Math.floor(duration - minutes * 60)
            .toString()
            .padStart(2, '0');

        return `${minutes}:${seconds}`;
    };

    const [minutesFormatted, setMinutesFormatted] = useState(
        formatTime(modeValue.minutes * 60)
    );

    useEffect(() => {
        function updateMinutesDisplay() {
            if (countDown.isCounting) {
                return setMinutesFormatted(formatTime(countDown.seconds));
            }
            setMinutesFormatted(formatTime(modeValue.minutes * 60));
        }
        updateMinutesDisplay();
    }, [countDown]);

    return (
        <Wrapper>
            {isShowFinalResult && (
                <>
                    <Modal>
                        <FinalResultBox
                            mode={`${modeValue[mode]}${mode}`}
                            language={
                                { ens: 'English', vn: 'Vietnamese' }[language]
                            }
                            typingLength={typingLength}
                            goalResults={resultsToAvg}
                        />
                    </Modal>
                    <Overlaps />
                </>
            )}
            <main>
                <div className="languages-options">
                    <KnobSelector
                        options={{ English: 'ens', Vietnamese: 'vn' }}
                        onChange={setLanguage}
                        currentOption={language}
                    />
                </div>
                <div className="sentences-options">
                    <KnobSelector
                        options={{
                            Sentences: 'sentences',
                            Paragraph: 'paragraph',
                        }}
                        onChange={setTypingLength}
                        currentOption={typingLength}
                    />
                </div>
                <div className="goal-results">
                    <AllResults />
                </div>
                <div className="typing-options">
                    <OptionTyping>
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
                    </OptionTyping>
                </div>
                <div className="notice">
                    <Notice>
                        <RandomSentence data={NOTICES} intervals={5000} />
                        <Clock />
                    </Notice>
                </div>
                <div className="typing-effect">
                    <TypingEffect />
                </div>
                <div className="pangram">
                    <PangramSwitch
                        label="Pangram"
                        onActive={turnOnPangram}
                        onOff={turnOffPangram}
                        isActive={language === 'pangram'}
                    />
                </div>
                <div className="goal-speed">
                    <BoxResult
                        label="Goal speed"
                        value={goalCPM}
                        textLeft={true}
                    />
                </div>
                <div className="speed">
                    <BoxResult
                        label="Speed"
                        value={CPM}
                        isHighLight={CPM > 400}
                    />
                </div>
                <div className="accuracy">
                    <BoxResult label="Accuracy" value={accuracy} />
                </div>
                <div className="count">
                    <BoxResult label="Count" value={countTimes} />
                </div>
                <div className="author">
                    <Author>{currentAuthor}</Author>
                </div>
                <div className="typing-area">
                    <TypingArea
                        currentSentence={currentSentence}
                        nextSentence={nextSentence}
                        typedText={typedText}
                        onChange={onTyping}
                        onKeyDown={onKeyDown}
                        CPM={CPM}
                    />
                </div>
            </main>
        </Wrapper>
    );
};

export default App;
