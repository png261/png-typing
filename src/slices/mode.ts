import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModeSlice {
	mode: string;
	value: { times: number; minutes: number };
}

const initialState: ModeSlice = {
	mode: 'times',
	value: { times: 5, minutes: 1 },
};

const modeSlice = createSlice({
	name: 'mode',
	initialState,
	reducers: {
		changeMode(state, action: PayloadAction<string>) {
			state.mode = action.payload;
		},
		updateModeValue(state, action: PayloadAction<{}>) {
			state.value = { ...state.value, ...action.payload };
		},
	},
});

export const { changeMode, updateModeValue } = modeSlice.actions;
export default modeSlice.reducer;
