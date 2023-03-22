// Utils
import { useState, useEffect, useRef } from 'react';
import { minutesToSeconds, formatTime } from '../../../lib/utils';

// Components
import Settings from './Settings';
import Container from './Container';
import AudioPlayer from './AudioPlayer';
import Section from '../../Layout/Section';
import Button from '../../Button';
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
				key="pomodoro"
				sx={`flex flex-col items-center font-main`}
			>
				<Container
					current={timer[stage]}
					initial={minutesToSeconds(settings[stage])}
				>
					{/* Main Content */}
					<div className="flex flex-col space-y-10 items-center mx-auto lg:w-1/2 ">
						{/* Timer Stages */}
						<div className="grid grid-cols-3 gap-2 w-full place-items-center md:gap-5 md:w-auto lg:w-full">
							{TIMERS.map((item) => (
								<Button
									key={`tabs-${item}`}
									onClick={() => handleStageChange(item)}
									sx={`${
										stage === item
											? 'bg-red-500  font-semibold'
											: 'bg-black text-black bg-opacity-10 font-medium'
									} text-white  rounded-full capitalize w-full transition-colors duration-500 text-sm md:text-lg lg:text-xl`}
								>
									{item}
								</Button>
							))}
						</div>

						{/* Timer */}
						<h1 className="text-8xl md:text-9xl font-bold text-center text-black ">
							{formatTime(timer[stage])}
						</h1>

						<div className="w-full  lg:relative">
							{/* timerActive/Pause */}
							<Button
								onClick={handleStartTimer}
								sx="w-full bg-red-500  text-white rounded-full  tracking-widest font-semibold text-2xl lg:text-3xl"
							>
								{!timerActive ? 'START' : 'PAUSE'}
							</Button>

							{/* Next Stage */}
							<Button
								disabled={!timerActive}
								onClick={handleNext}
								sx={`${
									timerActive
										? 'opacity-100'
										: 'opacity-0 select-none cursor-default'
								}  shadow-md bg-white text-black fixed bottom-10 right-3 rounded-lg overflow-hidden text-3xl transition-opacity duration-200 md:shadow-none md:text-4xl md:absolute md:bottom-1/2 md:translate-y-1/2 md:right-5   lg:bottom-0 lg:translate-y-0 lg:top-0 lg:-right-[70px]`}
							>
								<FiSkipForward />
							</Button>
						</div>
					</div>

					{/* Settings Button */}
					<Settings
						settings={settings}
						setSettings={setSettings}
						playAudio={handleAudio}
					/>
				</Container>

				{/* Counter */}
				<div className="-mt-5 bg-white shadow-lg pt-12 px-10 pb-8 rounded-3xl border z-10 text-neutral-500">
					<h3 className="text-center font-semibold  mb-2 text-lg md:text-3xl lg:text-4xl">
						TASK COMPLETED: {counter}
					</h3>
					<h4 className="text-center  text-xs md:text-sm lg:text-base mb-4">
						Need
						<span className="ml-1 mr-0.5">{untilBreak}</span> More Task
						{untilBreak > 1 ? 's' : ''} for a Long Break
					</h4>
					<button
						disabled={counter < 1}
						onClick={() => setCounter(0)}
						className="outline-none active:bg-neutral-200 text-center mx-auto  block text-xs bg-neutral-100 py-2 px-4 rounded-full"
					>
						Clear Progress
					</button>
				</div>

				{/* Visiual Counter */}
				{counter > 0 && (
					<ul className="grid grid-cols-4 gap-3 mt-6 md:mt-8 lg:mt-10">
						{Array(counter)
							.fill(counter)
							.map(() => (
								<li
									key={`Star-${Math.random()}`}
									className="text-xl md:text-3xl text-neutral-300"
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
