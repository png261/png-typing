import Accuracy from 'src/components/Accuracy/Accuracy';
import Author from 'src/components/Author/Author';
import Clock from 'src/components/Clock/Clock';
import CountTimes from 'src/components/CountTimes/CountTimes';
import FinalResultBox from 'src/components/FinalResultBox/FinalResultBox';
import AllResults from 'src/components/GoalResults/GoalResults';
import GoalSpeed from 'src/components/GoalSpeed/GoalSpeed';
import LanguageSelector from 'src/components/LanguageSelector/LanguageSelector';
import ModeSelector from 'src/components/ModeSelector/ModeSelector';
import PangramSwitch from 'src/components/PangramSwitch/PangramSwitch';
import RandomSentence from 'src/components/RandomSentence/RandomSentence';
import Speed from 'src/components/Speed/Speed';
import TypingArea from 'src/components/TypingArea/TypingArea';
import TypingEffect from 'src/components/TypingEffect/TypingEffect';
import TypingLengthSelector from 'src/components/TypingLengthSelector/TypingLengthSelector';
import { Notice, Wrapper } from './App.styles';

const App = () => {
    return (
        <Wrapper>
            <main>
                <div className="languages-options">
                    <LanguageSelector />
                </div>
                <div className="sentences-options">
                    <TypingLengthSelector />
                </div>
                <div className="goal-results">
                    <AllResults />
                </div>
                <div className="typing-options">
                    <ModeSelector />
                </div>
                <div className="notice">
                    <Notice>
                        <RandomSentence />
                        <Clock />
                    </Notice>
                </div>
                <div className="typing-effect">
                    <TypingEffect />
                </div>
                <div className="pangram">
                    <PangramSwitch />
                </div>
                <div className="goal-speed">
                    <GoalSpeed />
                </div>
                <div className="speed">
                    <Speed />
                </div>
                <div className="accuracy">
                    <Accuracy />
                </div>
                <div className="count">
                    <CountTimes />
                </div>
                <div className="author">
                    <Author />
                </div>
                <div className="typing-area">
                    <TypingArea />
                </div>
            </main>
            <FinalResultBox />
        </Wrapper>
    );
};

export default App;
