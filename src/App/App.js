import { useEffect, useLayoutEffect, useState } from 'react';
import AllResults from 'src/components/GoalResults/GoalResults';
import ArrowSwitch from 'src/components/ArrowSwitch/ArrowSwitch';
import BoxResult from 'src/components/BoxResult/BoxResult';
import Clock from 'src/components/Clock/Clock';
import KnobSelector from 'src/components/KnobSelector/KnobSelector';
import { Overlaps } from 'src/components/Overlaps/Overlaps.styles';
import PangramSwitch from 'src/components/PangramSwitch/PangramSwitch';
import RandomSentence from 'src/components/RandomSentence/RandomSentence';
import ResultModal from 'src/components/ResultModal/ResultModal';
import Switch from 'src/components/Switch/Switch';
import TypingArea from 'src/components/TypingArea/TypingArea';
import TypingEffect from 'src/components/TypingEffect/TypingEffect';
import ALL_DATA from 'src/constants/allData';
import NOTICES from 'src/constants/notices';
import MODE_OPTIONS from 'src/constants/typingMode';
import { randomNumber } from 'src/helpers/random';
import { getAccuracy, getCPM, getWPM } from 'src/helpers/typing';
import useCountDown from 'src/hooks/useCountDown';
import useStopWatch from 'src/hooks/useStopWatch';
import { Author, Notice, OptionTyping, Wrapper } from './App.styles';

const App = () => {
    const [languages, setLanguages] = useState('ens');
    const [typingLength, setTypingLength] = useState('sentences');

    const getSentences = () => {
        const DATA = ALL_DATA[typingLength][languages];
        if (typingLength === 'paragraph') {
            return DATA[randomNumber(DATA.length)];
        }
        return DATA;
    };

    const [sentences, setSentences] = useState(getSentences);

    const [currentIndex, setCurrentIndex] = useState(
        randomNumber(sentences.length)
    );
    const [typedIndexes, setTypedIndexes] = useState([currentIndex]);
    const randomNextIndex = () => {
        const num = randomNumber(sentences.length);
        return typedIndexes.includes(num) ? randomNextIndex() : num;
    };
    const [nextIndex, setNextIndex] = useState(randomNextIndex);

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
    const [allResults, setAllResults] = useState([]);
    const [resultsToAvg, setResultsToAvg] = useState([]);
    console.log(resultsToAvg);

    const [isShowFinalResult, setIsShowFinalResult] = useState(false);
    const [typedText, setTypedText] = useState('');

    const [currentSentence, currentAuthor] = sentences[currentIndex] || [
        '',
        '',
    ];
    const [nextSentence] = sentences[nextIndex] || ['', ''];

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
        setAllResults((prevState) => [...prevState, goal]);
        if (
            (mode === 'minutes' && countDown.isCounting) ||
            (mode === 'times' && typeof modeValue.times === 'number')
        ) {
            setResultsToAvg((prevState) => [...prevState, goal]);
        }
        setGoalCPM((prevState) => Math.max(prevState, CPM));

        resetTyping();

        if (typingLength !== 'paragraph') {
            return setNextIndex(randomNextIndex());
        }

        if (nextIndex === sentences.length) {
            return setNextIndex(0);
        }
        return setNextIndex((prevState) => ++prevState);
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

        setCurrentIndex(nextIndex);
        updateResult();
    };
    const turnOnPangram = () => {
        setTypingLength('sentences');
        setLanguages('pangram');
    };
    const turnOffPangram = () => {
        setTypingLength('sentences');
        setLanguages('ens');
    };

    useLayoutEffect(() => {
        setSentences(getSentences());
        return () => {
            setSentences([]);
        };
    }, [typingLength, languages]);

    useLayoutEffect(() => {
        function updateSentences() {
            if (typingLength === 'paragraph') {
                setCurrentIndex(0);
                setNextIndex(1);
                return;
            }
            setCurrentIndex(randomNumber(sentences.length));
            setNextIndex(randomNumber(sentences.length));
        }
        updateSentences();
        return resetTyping;
    }, [sentences]);

    useEffect(() => {
        setTypedIndexes((prevState) => [...prevState, currentIndex]);
    }, [currentIndex]);

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

    const hideFinalResultModal = (e) => {
        if (e.code !== 'Esc') setIsShowFinalResult(false);
        resetMode();
    };
    useEffect(() => {
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
                    <ResultModal
                        mode={`${modeValue[mode]}${mode}`}
                        language={
                            { ens: 'English', vn: 'Vietnamese' }[languages]
                        }
                        typingLength={typingLength}
                        goalResults={resultsToAvg}
                    />
                    <Overlaps />
                </>
            )}
            <main>
                <div className="languages-options">
                    <KnobSelector
                        options={{ English: 'ens', Vietnamese: 'vn' }}
                        onChange={setLanguages}
                        currentOption={languages}
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
                    <AllResults results={allResults} />
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
                        isActive={languages === 'pangram'}
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
