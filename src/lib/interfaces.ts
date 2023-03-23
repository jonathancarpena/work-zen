export interface PomodoroSettings {
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
export type TabOptions = 'pomodoro' | 'notes' | 'calculator';
export interface Note {
	id: string;
	title: string;
	body: string;
}
