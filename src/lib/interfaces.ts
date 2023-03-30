export interface FocusSettings {
	'focus mode': number;
	'short break': number;
	'long break': number;
	'long break intervals': number;
	'alarm sound': AlarmSounds;
	'alarm volume': number;
	'alarm repeat': number;
	'focus sound': FocusSounds;
	'focus volume': number;
}

export type TimerStages = 'focus mode' | 'short break' | 'long break';
export type AlarmSounds = 'xylophone' | 'policeSiren';
export type FocusSounds = 'brownNoise' | 'whiteNoise' | 'rain';
export type TabOptions = 'focus' | 'notes' | 'calculator' | 'tasks';
export type FocusSettingsKeys =
	| TimerStages
	| 'long break intervals'
	| 'alarm repeat'
	| 'alarm volume'
	| 'alarm sound'
	| 'focus sound'
	| 'focus volume';

export interface Note {
	id: string;
	title: string;
	body: string;
}

export interface Task {
	[id: string]: {
		completed: boolean;
		content: string;
		subtasks?: Subtask;
	};
}
export interface Subtask {
	[id: string]: {
		completed: boolean;
		content: string;
	};
}
