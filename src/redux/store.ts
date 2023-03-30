import { configureStore } from '@reduxjs/toolkit';
import focusReducer from './features/focusSlice';
import tabsReducer from './features/tabSlice';

export const store = configureStore({
	reducer: {
		focus: focusReducer,
		tabs: tabsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
