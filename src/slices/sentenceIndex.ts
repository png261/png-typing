import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const currentIndexSlice = createSlice({
	name: 'sentenceIndex',
	initialState: { current: 0, next: 1 },
	reducers: {
		updateIndex(state, action: PayloadAction<{}>) {
			return { ...state, ...action.payload };
		},
	},
});

export const { updateIndex } = currentIndexSlice.actions;
export default currentIndexSlice.reducer;
