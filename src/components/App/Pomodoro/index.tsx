// Utils
import { useState, useEffect, useRef } from 'react';
import { minutesToSeconds, formatTime } from '../../../lib/utils';

// Components
import Settings from './Settings';
import Container from './Container';
import AudioPlayer from './AudioPlayer';
import Section from '../../Layout/Section';
import { FiSkipForward, FiStar } from 'react-icons/fi';

// Types / Interfaces
import { PomodoroSettings, TimerStages } from '../../../lib/interfaces';

interface State {
	settings: PomodoroSettings;
	timer: {
		'focus mode': number;
		'short break': number;
		'long break': number;
	};
	stage: TimerStages;
	counter: number;
}
interface Props {
	visible: boolean;
	timerActive: boolean;
	setTimerActive: React.Dispatch<React.SetStateAction<boolean>>;
}
const TIMERS: TimerStages[] = ['focus mode', 'short break', 'long break'];

function Pomodoro({ visible, timerActive, setTimerActive }: Props) {
	const [settings, setSettings] = useState<State['settings']>({
		'focus mode': 25,
		'short break': 4,
		'long break': 15,
		'long break intervals': 4,
		'alarm repeat': 1,
		'alarm volume': 1,
		'alarm sound': 'xylophone',
		'focus sound': 'whiteNoise',
		'focus volume': 1,
	});
	const [timer, setTimer] = useState<State['timer']>({
		'focus mode': minutesToSeconds(settings['focus mode']),
		'short break': minutesToSeconds(settings['short break']),
		'long break': minutesToSeconds(settings['long break']),
	});
	const [stage, setStage] = useState<State['stage']>('focus mode');
	const [counter, setCounter] = useState<State['counter']>(0);
	const alarmAudioPlayer = useRef<any>();
	const focusAudioPlayer = useRef<any>();
	let untilBreak =
		settings['long break intervals'] -
		(counter % settings['long break intervals']);

	// Countdown Timer
	useEffect(() => {
		let interval: any;
		if (timerActive && timer[stage] > 0) {
			interval = setInterval(() => {
				setTimer({
					...timer,
					[stage]: timer[stage] - 1,
				});
			}, 1000);
		}

		if (timer[stage] === 0) {
			handleAudio('alarm volume', true);
			handleAudio('focus volume', false);
			handleNext();
		}
		return () => clearInterval(interval);
	}, [timerActive, timer]);

	// Update Timer if Settings Change
	useEffect(() => {
		handleReset();
	}, [settings, stage]);

	// Volume Changes
	useEffect(() => {
		alarmAudioPlayer.current.volume = settings['alarm volume'];
		focusAudioPlayer.current.volume = settings['focus volume'];
	}, [settings['alarm volume'], settings['focus volume']]);

	function handleStartTimer() {
		let prevTimerActive = timerActive;
		if (!prevTimerActive && stage === 'focus mode') {
			handleAudio('focus volume', true);
		} else {
			handleAudio('focus volume', false);
		}

		handleAudio('alarm volume', false);
		setTimerActive(!timerActive);
	}

	function handleNext() {
		let nextStage: TimerStages = 'focus mode';

		if (stage === 'focus mode') {
			// Increase Focus Counter
			let newCounter = counter + 1;
			setCounter(newCounter);

			// After # of Focus Intervals, Take Long Break
			if (newCounter % settings['long break intervals'] === 0) {
				nextStage = 'long break';
			} else {
				nextStage = 'short break';
			}
		}

		setStage(nextStage);
		handleReset();
	}

	function handleReset() {
		setTimerActive(false);
		setTimer({
			'focus mode': minutesToSeconds(settings['focus mode']),
			'short break': minutesToSeconds(settings['short break']),
			'long break': minutesToSeconds(settings['long break']),
		});
	}

	function handleStageChange(item: TimerStages) {
		if (timerActive) {
			let confirm = window.confirm(
				'The timer is still running, are you sure you want to switch?'
			);
			if (confirm) {
				setStage(item);
			}
		} else {
			setStage(item);
		}
	}

	function handleAudio(
		type: 'alarm volume' | 'focus volume',
		turnOn: boolean,
		test: boolean = false
	) {
		if (type === 'alarm volume') {
			if (turnOn && !test) {
				// Repeat x 15 second sound
				let timeStop = settings['alarm repeat'] * 15000;
				alarmAudioPlayer.current.play();
				setTimeout(() => {
					alarmAudioPlayer.current.pause();
				}, timeStop);
			} else if (turnOn && test) {
				// For Settings
				alarmAudioPlayer.current.play();
				setTimeout(() => {
					alarmAudioPlayer.current.pause();
				}, 5000);
			} else {
				alarmAudioPlayer.current.pause();
			}
		} else if (type === 'focus volume') {
			if (turnOn && !test) {
				focusAudioPlayer.current.play();
			} else if (turnOn && test) {
				// For Settings
				focusAudioPlayer.current.play();
				setTimeout(() => {
					focusAudioPlayer.current.pause();
				}, 5000);
			} else {
				focusAudioPlayer.current.pause();
			}
		}
	}
	return (
		<>
			<Section
				isVisible={visible}
				uniqueKey="pomodoro"
				sx="text-black dark:text-white max-w-screen-md mx-auto"
			>
				{/* Timer */}
				<div className="mx-auto ">
					{/* Stages */}
					<div className="grid grid-cols-3 gap-3 w-full place-items-center md:gap-4 md:w-auto lg:w-full">
						{TIMERS.map((item) => (
							<button
								key={`tabs-${item}`}
								onClick={() => handleStageChange(item)}
								className={`${
									stage === item
										? 'bg-main-dark-darker text-white dark:bg-main-light-lighter dark:text-black'
										: 'bg-main-light-lighter text-black dark:bg-main-dark-lighter dark:text-white'
								} border border-main-light-darker dark:border-main-dark-darker text-sm active:scale-90 h-11 w-full rounded-lg uppercase transition-transform duration-100 md:text-lg md:h-14`}
							>
								{item}
							</button>
						))}
					</div>

					{/* Timer */}
					<h1 className="text-9xl md:text-[12rem] lg:text-[15rem] font-bold text-center my-8 text-inherit">
						{formatTime(timer[stage])}
					</h1>

					{/* Start Button */}
					<button
						onClick={handleStartTimer}
						className={`outline-none z-10 relative w-full mb-5`}
					>
						<span
							className={`${
								timerActive
									? 'translate-y-5 bg-main-dark-darker text-white dark:bg-main-light-lighter dark:text-black'
									: 'active:translate-y-5 bg-main-dark-0 text-white dark:bg-main-light-0 dark:text-black'
							} h-16 md:h-20 text-3xl md:text-4xl  flex justify-center items-center w-full rounded-xl   transition-transform ease-in duration-100 `}
						>
							{!timerActive ? 'START' : 'PAUSE'}
						</span>

						<div
							className={`w-full h-full bg-main-dark-darker dark:bg-main-light-0 brightness-75  absolute left-0 top-5 rounded-xl -z-10`}
						/>
					</button>

					{/* Settings, Skip Button */}
					<div className="mt-6 flex space-x-3 md:mt-8 md:space-x-4  justify-center ">
						<Settings
							settings={settings}
							setSettings={setSettings}
							playAudio={handleAudio}
						/>

						<button
							disabled={!timerActive}
							onClick={handleNext}
							className={`w-full h-11 text-sm md:text-lg md:h-14 flex justify-center items-center space-x-2  rounded-md transition-transform duration-100 border border-main-light-darker dark:border-main-dark-darker active:scale-90 bg-main-light-lighter text-black hover:bg-main-light-0   dark:bg-main-dark-lighter dark:text-white dark:hover:bg-main-dark-0 dark:hover:text-white uppercase `}
						>
							<FiSkipForward className="text-base md:text-lg" />
							<span>Next</span>
						</button>
					</div>
				</div>

				{/* Counter */}
				<div className="mt-6 md:mt-8">
					<h3 className="text-center font-semibold  mb-2 text-lg md:text-xl">
						TASK COMPLETED: {counter}
					</h3>
					<h4 className="text-center  text-sm md:text-base mb-2">
						Need
						<span className="ml-2">{untilBreak}</span> More Task
						{untilBreak > 1 ? 's' : ''} for a Long Break
					</h4>
					<button
						disabled={counter < 1}
						onClick={() => setCounter(0)}
						className="w-max px-4 mx-auto h-8 text-xs md:text-base md:h-9 flex justify-center items-center space-x-2  rounded-md transition-transform duration-100 border border-main-light-darker dark:border-main-dark-darker active:scale-90 bg-main-light-lighter text-black hover:bg-main-light-0   dark:bg-main-dark-lighter dark:text-white dark:hover:bg-main-dark-0 dark:hover:text-white capitalize"
					>
						Clear Progress
					</button>
				</div>

				{/* Visiual Counter */}
				{counter > 0 && (
					<ul
						className={`${counter > 40 ? 'flex flex-wrap ' : 'grid'} ${
							counter > 16 && counter <= 40
								? 'grid-cols-8 max-w-[250px] md:max-w-[275px] lg:max-w-[300px]'
								: ''
						} ${
							counter <= 16
								? 'grid-cols-4 max-w-[100px] md:max-w-[125px] lg:max-w-[150px]'
								: ''
						} gap-3 mt-6 md:mt-8  mx-auto place-items-center `}
					>
						{Array(counter)
							.fill(counter)
							.map(() => (
								<li
									key={`Star-${Math.random()}`}
									className="text-xl md:text-2xl lg:text-3xl text-main-dark-lighter dark:text-main-light-darker mx-auto"
								>
									<FiStar />
								</li>
							))}
					</ul>
				)}
			</Section>

			<AudioPlayer
				url={`/assets/sounds/alarm/${settings['alarm sound']}.mp3`}
				ref={alarmAudioPlayer}
			/>
			<AudioPlayer
				url={`/assets/sounds/focus/${settings['focus sound']}.mp3`}
				ref={focusAudioPlayer}
			/>
		</>
	);
}

export default Pomodoro;
