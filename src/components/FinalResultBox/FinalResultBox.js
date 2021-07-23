import React from 'react';
import {
    Wrapper,
    SiteName,
    CurrentDate,
    DeviceOS,
    Mode,
    MaxSpeed,
    AvgSpeed,
    AvgAcc,
    Stemp,
    StempDay,
} from './FinalResultBox.styles';

const FinalResultBox = ({ mode, language, typingLength, goalResults }) => {
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

    return (
        <Wrapper>
            <SiteName>PNG typing</SiteName>
            <CurrentDate>{new Date().toDateString()}</CurrentDate>
            <DeviceOS>{OS}</DeviceOS>
            <Mode id="rstMode">
                {language}, {typingLength}, Normal, {mode}
            </Mode>
            <MaxSpeed>{avgWPM}</MaxSpeed>
            <AvgSpeed id="rstAvgSpd">
                {highestCPM}/{avgCPM}
            </AvgSpeed>
            <AvgAcc id="rstAvgAcc">{avgAccuracy}</AvgAcc>
            <Stemp id="rstStemp">
                <StempDay>{new Date().toDateString()}</StempDay>
            </Stemp>
        </Wrapper>
    );
};

export default FinalResultBox;
