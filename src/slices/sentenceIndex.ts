import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentIndexSlice {
	current: number;
	next: number;
}

const initialState: CurrentIndexSlice = {
	current: 0,
	next: 1,
};

const currentIndexSlice = createSlice({
	name: 'sentenceIndex',
	initialState,
	reducers: {
		updateIndex(state, action: PayloadAction<{}>) {
			return { ...state, ...action.payload };
		},
	},
});

export const { updateIndex } = currentIndexSlice.actions;
export default currentIndexSlice.reducer;
