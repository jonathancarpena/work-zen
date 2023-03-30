import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit/';
import type { RootState } from '../store';
import { TabOptions } from '../../lib/interfaces';

interface State {
	current: TabOptions;
}
const initialState: State = { current: 'focus' };

export const tabsSlice = createSlice({
	name: 'tabs',
	initialState,
	reducers: {
		updateTab: (state: State, action: PayloadAction<TabOptions>) => {
			state.current = action.payload;
		},
	},
});

export const { updateTab } = tabsSlice.actions;

export default tabsSlice.reducer;
