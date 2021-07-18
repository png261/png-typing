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
import NOTICES from 'src/constants/notices';
import SENTENCES from 'src/constants/sentences';
import TYPING_MODE_OPTIONS from 'src/constants/typingMode';
import { getRandomFromData } from 'src/helpers/random';
import { getAccuracy, getCPM, getWPM } from 'src/helpers/typing';
import useCountDown from 'src/hooks/useCountDown';
import useStopWatch from 'src/hooks/useStopWatch';
import { Author, Notice, OptionTyping, Wrapper } from './App.styles';

const App = () => {
    const [languages, setLanguages] = useState('ens');
    const sentences = SENTENCES[languages];
    const randomSentence = () => getRandomFromData(sentences);
    const [isPangram, setIsPangram] = useState(false);

    const [curSentence, setCurSentence] = useState(randomSentence);
    const [nexSentence, setNexSentence] = useState(randomSentence);
    const [typingMode, setTypingMode] = useState('times');
    const [typingModeValue, setTypingModeValue] = useState({
        times: 5,
        minute: '01:00',
    });
    const [countTimes, setCountTime] = useState(0);

    const [accuracy, setAccuracy] = useState(0);
    const [goalCPM, setGoalCPM] = useState(0);
    const [CPM, setCPM] = useState(1000);

    const [goalResults, setGoalResults] = useState([]);

    const [typedText, setTypedText] = useState('');
    const [typedSentences, setTypedSentences] = useState([]);

    const reset = () => {
        stopWatch.stopCount();
        setTypedText('');
    };

    const nextSentence = () => {
        setCountTime((state) => ++state);
        setTypedSentences((state) => [...state, curSentence[0]]);
        const goal = {
            wpm: getWPM(typedText, curSentence[0], stopWatch.timer),
            cpm: CPM,
            acc: accuracy,
        };
        setGoalResults((state) => [...state, goal]);
        setGoalCPM(CPM);
        reset();

        let next = randomSentence();
        while (typedSentences.includes(next[0])) {
            next = randomSentence();
        }
        setNexSentence(next);
    };

    const onTyping = ({ target: { value } }) => {
        setTypedText(value);
    };

    const changeTypingModeValue = (value) => {
        setTypingModeValue((state) => ({
            ...state,
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

        const isDone = typedText.length >= curSentence[0].length;
        if (!isDone) return;

        const isWongTooMuch = getAccuracy(typedText, curSentence[0]) < 10;
        if (isWongTooMuch) return reset();

        setCurSentence(nexSentence);
        nextSentence();
    };

    useEffect(() => {
        setCurSentence(randomSentence());
        setNexSentence(randomSentence());
        return reset;
    }, [sentences]);

    useEffect(() => {
        if (typedText.length === 0) reset();
        setAccuracy(getAccuracy(typedText, curSentence[0]));
    }, [typedText]);

    useEffect(() => {
        setCPM(getCPM(typedText, stopWatch.timer));
    }, [stopWatch.timer]);

    return (
        <Wrapper>
            <main>
                <div className="languages-options">
                    <KnobSelector
                        options={{ English: 'ens', Native: 'vn' }}
                        onChange={setLanguages}
                        currentOption={languages}
                    />
                </div>
                <div className="sentences-options">
                    <KnobSelector
                        options={{
                            Sentences: 'sentence',
                            Paragraph: 'paragraph',
                        }}
                        currentOption="sentence"
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
                        onChange={() => setIsPangram((state) => !state)}
                        value={isPangram}
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
                    <Author>{curSentence[1]}</Author>
                </div>
                <div className="typing-area">
                    <TypingArea
                        curSentence={curSentence[0]}
                        nexSentence={nexSentence[0]}
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
