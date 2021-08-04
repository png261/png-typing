import { createSlice } from '@reduxjs/toolkit';

const initialState: string = 'sentences';

const languageSlice = createSlice({
	name: 'typingLength',
	initialState,
	reducers: {
		updateTypingLength(state, action) {
			return action.payload;
		},
	},
});

export const { updateTypingLength } = languageSlice.actions;
export default languageSlice.reducer;
