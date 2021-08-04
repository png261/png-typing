import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'src/reducer/rootReducer';

const store = configureStore({ reducer: rootReducer });
export type AppState = ReturnType<typeof store.getState>;

export default store;
