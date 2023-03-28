import { TimerStages } from './interfaces';
type StringNum = string | number;

export function minutesToSeconds(minutes: number): number {
	return minutes * 60;
}

export function formatTime(time: number): string {
	let minutes: StringNum = Math.floor(time / 60);
	let seconds: StringNum = time % 60;

	if (seconds < 10) {
		seconds = `0${seconds}`;
	}

	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	return `${minutes}:${seconds}`;
}

export const TIMERSTAGES: TimerStages[] = [
	'focus mode',
	'short break',
	'long break',
];
