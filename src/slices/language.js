import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
    name: 'language',
    initialState: 'ens',
    reducers: {
        updateLanguage(state, action) {
            return action.payload;
        },
    },
});

export const { updateLanguage } = languageSlice.actions;
export default languageSlice.reducer;
