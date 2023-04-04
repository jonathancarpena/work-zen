export type TabOptions = 'focus' | 'notes' | 'calculator' | 'tasks';

// (Tab) Focus Mode
export type TimerStages = 'focus mode' | 'short break' | 'long break';
type AlarmSounds = 'xylophone' | 'policeSiren';
type FocusSounds = 'brownNoise' | 'whiteNoise' | 'rain';
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
export type FocusSettingsKeys =
	| TimerStages
	| 'long break intervals'
	| 'alarm repeat'
	| 'alarm volume'
	| 'alarm sound'
	| 'focus sound'
	| 'focus volume';

// (Tab) Tasks
export interface Task {
	[id: string]: {
		completed: boolean;
		content: string;
		subtasks?: SubTask;
	};
}
export interface SubTask {
	[id: string]: {
		completed: boolean;
		content: string;
	};
}

// (Tab) Calculator
export enum CalculatorActionType {
	CLEAR = 'CLEAR',
	BACKSPACE = 'BACKSPACE',
	PERCENT = 'PERCENT',
	OPERATOR = 'OPERATOR',
	NUMBER = 'NUMBER',
	DECIMAL = 'DECIMAL',
	NEGATIVE = 'NEGATIVE',
	EQUAL = 'EQUAL',
}
export enum OperationActionType {
	MULTIPLY = 'MULTIPLY',
	DIVIDE = 'DIVIDE',
	ADD = 'ADD',
	SUBTRACT = 'SUBTRACT',
	MODULUS = 'MODULUS',
}
type ColSpan = 'col-span-1' | 'col-span-2' | 'col-span-3' | 'col-span-4';
export interface Button {
	key: string | React.ReactNode;
	value: string;
	type: CalculatorActionType;
	operator?: OperationActionType;
	span?: ColSpan;
}

// (Tab) Notes
export interface Note {
	title: string;
	body: string;
	id: string;
}
