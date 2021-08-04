import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string = 'ens';

const languageSlice = createSlice({
	name: 'language',
	initialState,
	reducers: {
		updateLanguage(state, action: PayloadAction<string>) {
			return action.payload;
		},
	},
});

export const { updateLanguage } = languageSlice.actions;
export default languageSlice.reducer;
