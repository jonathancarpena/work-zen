import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit/';
import type { RootState } from '../store';
import {
	FocusSettings,
	FocusSettingsKeys,
	TimerStages,
} from '../../lib/interfaces';
import { minutesToSeconds, TIMERSTAGES } from '../../lib/utils';

interface FocusState {
	settings: FocusSettings;
	counter: number;
	stage: number;
	timer: number;
	activeTimer: boolean;
}

const initialState: FocusState = {
	settings: {
		'focus mode': 25,
		'short break': 4,
		'long break': 15,
		'long break intervals': 4,
		'alarm repeat': 1,
		'alarm volume': 0.5,
		'alarm sound': 'xylophone',
		'focus sound': 'whiteNoise',
		'focus volume': 0.5,
	},
	counter: 0,
	stage: 0,
	timer: minutesToSeconds(25),
	activeTimer: false,
};

export const focusSlice = createSlice({
	name: 'focus',
	initialState,
	reducers: {
		decrementTimer: (state: FocusState) => {
			state.timer -= 1;
		},

		updateSettings: (
			state: FocusState,
			action: PayloadAction<{
				target: string | FocusSettingsKeys;
				value: number | string;
			}>
		) => {
			const { target, value } = action.payload;

			state.settings = {
				...state.settings,
				[target]: value,
			};

			// Update Timer
			if (
				target === 'short break' ||
				target === 'focus mode' ||
				target === 'long break'
			) {
				state.timer = minutesToSeconds(
					state.settings[TIMERSTAGES[state.stage]]
				);
			}
		},
		toggleTimer: (state: FocusState, action: PayloadAction<boolean>) => {
			state.activeTimer = action.payload;
		},
		stageSelect: (state: FocusState, action: PayloadAction<number>) => {
			state.stage = action.payload;
			state.timer = minutesToSeconds(
				state.settings[TIMERSTAGES[action.payload]]
			);
		},
		nextStage: (state: FocusState) => {
			// 0 - Focus
			// 1 - Short Break
			// 2 - Long Break (Only after # of Focus Modes)

			// Increment Counter after Focus Mode
			if (state.stage === 0) {
				state.counter += 1;
			}

			let theNextStage = state.stage + 1;

			// After # of Focus Modes
			const takeLongBreak =
				state.counter % state.settings['long break intervals'] === 0;

			if (takeLongBreak && theNextStage !== 3) {
				theNextStage = 2;
			} else if (state.stage === 0) {
				theNextStage = 1;
			} else {
				theNextStage = 0;
			}

			// Update Timer
			state.timer = minutesToSeconds(state.settings[TIMERSTAGES[theNextStage]]);
			state.stage = theNextStage;
		},
		resetCounter: (state: FocusState) => {
			state.stage = 0;
			state.timer = minutesToSeconds(state.settings[TIMERSTAGES[0]]);
			state.counter = 0;
		},
	},
});

export const {
	decrementTimer,
	updateSettings,
	toggleTimer,
	nextStage,
	resetCounter,
	stageSelect,
} = focusSlice.actions;

// Selectors
export const timer = (state: RootState['focus']) => state.timer;
export const activeTimer = (state: RootState['focus']) => state.activeTimer;
export const stage = (state: RootState['focus']) => TIMERSTAGES[state.stage];
export const settings = (state: RootState['focus']) => state.settings;
export const counter = (state: RootState['focus']) => state.counter;

export default focusSlice.reducer;
