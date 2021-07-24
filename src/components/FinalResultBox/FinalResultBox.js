import React, { useEffect, useState } from 'react';
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
        resultsAvg.reduce((total, { acc }) => total + acc, 0) /
            resultsAvg.length
    );
    const avgCPM = Math.round(
        resultsAvg.reduce((total, { cpm }) => total + cpm, 0) /
            resultsAvg.length
    );
    const highestCPM = resultsAvg.reduce(
        (total, { cpm }) => (cpm > total ? cpm : total),
        0
    );
    const avgWPM = Math.round(
        resultsAvg.reduce((total, { wpm }) => total + wpm, 0) /
            resultsAvg.length
    );
    const dispatch = useDispatch();

    const countDown = useCountDown();
    const allResult = useSelector((state) => state.results.all);
    const modeValue = useSelector((state) => state.mode.value);

    const [isShow, setIsShow] = useState(false);
    useEffect(() => {
        if (mode === 'times' && resultsAvg.length === modeValue.times) {
            setIsShow(true);
        }
    }, [allResult.length]);

    useEffect(() => {
        if (
            mode === 'minutes' &&
            countDown.seconds === 0 &&
            resultsAvg.length > 0
        ) {
            setIsShow(true);
        }
    }, [countDown.seconds]);

    useEffect(() => {
        const hideFinalResultModal = (e) => {
            if (e.code === 'Escape') {
                setIsShow(false);
                countDown.stopCount();
                dispatch(resetResultAvg());
            }
        };

        if (isShow) {
            document.body.addEventListener('keydown', hideFinalResultModal);
        }
        return () => {
            document.body.removeEventListener('keydown', hideFinalResultModal);
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
