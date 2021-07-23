import { configureStore } from '@reduxjs/toolkit';
import language from 'src/slices/language';
import typingLength from 'src/slices/typingLength';
import sentenceIndex from 'src/slices/sentenceIndex';
import results from 'src/slices/results';

const rootReducer = {
    language,
    typingLength,
    sentenceIndex,
    results,
};
const store = configureStore({ reducer: rootReducer });
export default store;
