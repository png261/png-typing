import { configureStore } from '@reduxjs/toolkit';
import language from 'src/slices/language';
import typingLength from 'src/slices/typingLength';
import sentenceIndex from 'src/slices/sentenceIndex';
import results from 'src/slices/results';
import mode from 'src/slices/mode';
import realTimeInfo from 'src/slices/realTimeInfo';
import countDown from 'src/slices/countDown';

const rootReducer = {
    language,
    typingLength,
    sentenceIndex,
    results,
    mode,
    realTimeInfo,
    countDown,
};
const store = configureStore({ reducer: rootReducer });
export default store;
