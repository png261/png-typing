import React from 'react';
import { formatTime } from 'src/helpers/time';
import useClock from 'src/hooks/useClock';
import { ResultBox } from './ResultModal.styles';

const ResultModal = ({ mode, language, typingLength, goalResults }) => {
    const getOS = () => {
        if (navigator.appVersion.indexOf('Mac') != -1) {
            return 'MacOS';
        }

        if (navigator.appVersion.indexOf('Win') != -1) {
            return 'Windows';
        }

        if (navigator.appVersion.indexOf('Linux') != -1) {
            return 'Linux';
        }
        return 'UnKnow';
    };
    const OS = getOS();

    const avgAccuracy = Math.round(
        goalResults.reduce((total, { acc }) => total + acc, 0) /
            goalResults.length
    );
    const avgCPM = Math.round(
        goalResults.reduce((total, { cpm }) => total + cpm, 0) /
            goalResults.length
    );
    const highestCPM = goalResults.reduce(
        (total, { cpm }) => (cpm > total ? cpm : total),
        0
    );
    const avgWPM = Math.round(
        goalResults.reduce((total, { wpm }) => total + wpm, 0) /
            goalResults.length
    );
    const { timeString } = useClock();
    return (
        <ResultBox>
            <div id="tws-result-wrap">
                <div id="tws-result" className="tws-result-on">
                    <div id="rstDate">{timeString}</div>
                    <div id="rstOS">{OS}</div>
                    <div id="rstMode">
                        {language}, {typingLength}, Normal, {mode}
                    </div>
                    <div id="rstMaxSpd">{avgWPM}</div>
                    <div id="rstAvgSpd">
                        {highestCPM}/{avgCPM}
                    </div>
                    <div id="rstAvgAcc">{avgAccuracy}</div>
                    <div id="rstStemp">
                        <p id="rstDay">{new Date().toDateString()}</p>
                    </div>
                </div>
            </div>
        </ResultBox>
    );
};

export default ResultModal;
