import { useEffect, useState } from 'react';
import ArrowSwitch from 'src/components/ArrowSwitch/ArrowSwitch';
import BoxResult from 'src/components/BoxResult/BoxResult';
import Clock from 'src/components/Clock/Clock';
import GoalResults from 'src/components/GoalResults/GoalResults';
import KnobSelector from 'src/components/KnobSelector/KnobSelector';
import PangramSwitch from 'src/components/PangramSwitch/PangramSwitch';
import RandomSentence from 'src/components/RandomSentence/RandomSentence';
import Switch from 'src/components/Switch/Switch';
import TypingArea from 'src/components/TypingArea/TypingArea';
import TypingEffect from 'src/components/TypingEffect/TypingEffect';
import ALL_DATA from 'src/constants/allData';
import NOTICES from 'src/constants/notices';
import TYPING_MODE_OPTIONS from 'src/constants/typingMode';
import { getRandomNumber } from 'src/helpers/random';
import { getAccuracy, getCPM, getWPM } from 'src/helpers/typing';
import useCountDown from 'src/hooks/useCountDown';
import useStopWatch from 'src/hooks/useStopWatch';
import { Author, Notice, OptionTyping, Wrapper } from './App.styles';

const App = () => {
    const [typingLength, setTypingLength] = useState('sentences');
    const [languages, setLanguages] = useState('vn');
    const DATA = ALL_DATA[typingLength][languages];

    const getRandomParagraph = () => DATA[getRandomNumber(DATA.length)];
    const getSentences = () => {
        return typingLength === 'paragraph' ? getRandomParagraph() : DATA;
    };

    const [sentences, setSentences] = useState(getSentences);

    useEffect(() => {
        setSentences(getSentences());
    }, [DATA, languages]);

    const [typedSentences, setTypedSentences] = useState([]);

    console.log(sentences.length);
    const getRandomIndexFromSentences = () => getRandomNumber(sentences.length);

    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(
        getRandomIndexFromSentences
    );

    const [currentSentence, currentAuthor] = sentences[currentSentenceIndex];
    console.log({ sentences, languages, currentSentenceIndex });

    const getNextSentenceRandomIndex = () => {
        let randomIndex;
        do {
            randomIndex = getRandomIndexFromSentences();
        } while (typedSentences.includes(randomIndex));
        return randomIndex;
    };

    const [nextSentenceIndex, setNextSentenceIndex] = useState(
        getNextSentenceRandomIndex
    );
    console.log({ nextSentenceIndex });

    const [nextSentence, nextAuthor] = sentences[nextSentenceIndex];

    const [typingMode, setTypingMode] = useState('times');
    const [typingModeValue, setTypingModeValue] = useState({
        times: 5,
        minute: '01:00',
    });
    const [countTimes, setCountTime] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [goalCPM, setGoalCPM] = useState(0);
    const [CPM, setCPM] = useState(0);
    const [goalResults, setGoalResults] = useState([]);

    const [typedText, setTypedText] = useState('');

    const reset = () => {
        stopWatch.stopCount();
        setTypedText('');
    };

    const getGoal = () => {
        setCountTime((prevState) => ++prevState);
        setTypedSentences((prevState) => [...prevState, currentSentenceIndex]);
        if (typedSentences.length === sentences) {
            setTypedSentences([currentSentenceIndex]);
        }

        const goal = {
            wpm: getWPM(typedText, currentSentence, stopWatch.timer),
            cpm: CPM,
            acc: accuracy,
        };
        setGoalResults((prevState) => [...prevState, goal]);
        setGoalCPM((prevState) => Math.max(prevState, CPM));
        reset();

        if (typingLength === 'paragraph') {
            if (nextSentenceIndex === sentences.length) {
                setSentences(getRandomParagraph);
                setCurrentSentenceIndex(0);
                setNextSentenceIndex(1);
            }
            setNextSentenceIndex((prevState) => ++prevState);
        }
        setNextSentenceIndex(getNextSentenceRandomIndex());
    };

    const onTyping = ({ target: { value } }) => {
        setTypedText(value);
    };

    const changeTypingModeValue = (value) => {
        setTypingModeValue((prevState) => ({
            ...prevState,
            [typingMode]: value,
        }));
    };
    const stopWatch = useStopWatch();
    const countDown = useCountDown(
        typingModeValue.minute.split(':')[0] * 60000
    );

    const onKeyDown = () => {
        if (typedText.length === 1 && !stopWatch.isCounting) {
            stopWatch.startCount();
            if (typingMode === 'minute') {
                countDown.startCount();
            }
        }

        const isDone = typedText.length >= currentSentence.length;
        if (!isDone) return;

        const isWongTooMuch = getAccuracy(typedText, currentSentence) < 10;
        if (isWongTooMuch) return reset();

        setCurrentSentenceIndex(nextSentenceIndex);
        getGoal();
    };

    useEffect(() => {
        const updateSentence = () => {
            if (typingLength === 'paragraph') {
                setCurrentSentenceIndex(0);
                setNextSentenceIndex(1);
                return;
            }
            setCurrentSentenceIndex(getRandomIndexFromSentences());
            setNextSentenceIndex(getRandomIndexFromSentences());
        };
        updateSentence();

        return () => reset();
    }, [typingLength, languages]);

    useEffect(() => {
        if (typedText.length === 0) reset();
        setAccuracy(getAccuracy(typedText, currentSentence));
    }, [typedText]);

    useEffect(() => {
        setCPM(getCPM(typedText, stopWatch.timer));
    }, [stopWatch.timer]);

    const turnOnPangram = () => {
        setTypingLength('sentences');
        setLanguages('pangram');
    };

    return (
        <Wrapper>
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
                    <GoalResults results={goalResults} />
                </div>
                <div className="typing-options">
                    <OptionTyping>
                        <Switch
                            options={{ Times: 'times', Minute: 'minute' }}
                            currentOption={typingMode}
                            onChange={setTypingMode}
                        />
                        <ArrowSwitch
                            options={TYPING_MODE_OPTIONS[typingMode]}
                            currentOption={typingModeValue[typingMode]}
                            onChange={changeTypingModeValue}
                            value={
                                typingMode === 'minute' &&
                                countDown.isCounting &&
                                `${countDown.minutes}:${countDown.seconds}`
                            }
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
                        value={languages === 'pangram'}
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
