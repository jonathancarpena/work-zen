// Utils
import { useState, useEffect } from 'react';
import { minutesToSeconds, formatTime } from '../../../lib/utils';

// Components
import Settings from './Settings';
import Container from './Container';
import Section from '../../Layout/Section';
import Button from '../../Button';
import { FiSkipForward, FiStar } from 'react-icons/fi';

type Timer = 'focus mode' | 'short break' | 'long break';

export interface State {
	settings: {
		'focus mode': number;
		'short break': number;
		'long break': number;
		'long break intervals': number;
	};
	timer: {
		'focus mode': number;
		'short break': number;
		'long break': number;
	};
	stage: Timer;

	counter: number;
}

interface Props {
	visible: boolean;
	timerActive: boolean;
	setTimerActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function Pomodoro({ visible, timerActive, setTimerActive }: Props) {
	const [settings, setSettings] = useState<State['settings']>({
		'focus mode': 25,
		'short break': 4,
		'long break': 15,
		'long break intervals': 4,
	});
	const [timer, setTimer] = useState<State['timer']>({
		'focus mode': minutesToSeconds(settings['focus mode']),
		'short break': minutesToSeconds(settings['short break']),
		'long break': minutesToSeconds(settings['long break']),
	});
	const [stage, setStage] = useState<State['stage']>('focus mode');
	const [counter, setCounter] = useState<State['counter']>(0);

	const TIMERS: Timer[] = ['focus mode', 'short break', 'long break'];
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
			handleNext();
		}
		return () => clearInterval(interval);
	}, [timerActive, timer]);

	// Update Timer if Settings Change
	useEffect(() => {
		handleReset();
	}, [settings, stage]);

	function handleNext() {
		let nextStage: Timer = 'focus mode';

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

		setTimeout(() => {
			handleReset();
			setStage(nextStage);
		}, 1000);
	}

	function handleReset() {
		setTimerActive(false);
		setTimer({
			'focus mode': minutesToSeconds(settings['focus mode']),
			'short break': minutesToSeconds(settings['short break']),
			'long break': minutesToSeconds(settings['long break']),
		});
	}

	function handleStageChange(item: Timer) {
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

	return (
		<>
			<Section
				isVisible={visible}
				key="pomodoro"
				sx={`flex flex-col items-center font-main`}
			>
				{/* Container */}
				<Container
					current={timer[stage]}
					initial={minutesToSeconds(settings[stage])}
				>
					{/* Main Content */}
					<div className="flex flex-col space-y-10 items-center mx-auto lg:w-1/2 ">
						{/* Timer Stages */}
						<div className="grid grid-cols-3 gap-2  place-items-center md:gap-5 lg:w-full">
							{TIMERS.map((item) => (
								<Button
									key={item}
									onClick={() => handleStageChange(item)}
									sx={`${
										stage === item
											? 'bg-red-500  font-semibold'
											: 'bg-black text-black bg-opacity-10 font-medium'
									} text-white  rounded-md capitalize w-full transition-colors duration-500 text-sm md:text-lg lg:text-xl`}
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
								onClick={() => setTimerActive(!timerActive)}
								sx="w-full bg-red-500  text-white rounded-md  tracking-widest font-semibold text-2xl lg:text-3xl"
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
								}  text-white shadow-md bg-white text-black fixed bottom-10 right-3 rounded-lg overflow-hidden text-3xl transition-opacity duration-200 md:shadow-none md:text-4xl md:absolute md:bottom-1/2 md:translate-y-1/2 md:right-5   lg:bottom-0 lg:translate-y-0 lg:top-0 lg:-right-[70px]`}
							>
								<FiSkipForward />
							</Button>
						</div>
					</div>

					{/* Settings Button */}
					<Settings settings={settings} setSettings={setSettings} />
				</Container>

				{/* Counter */}
				<div className="-mt-5 bg-white shadow-lg pt-12 px-10 pb-8 rounded-2xl border z-10">
					<h3 className="text-center font-semibold  text-neutral-500 mb-2 text-lg md:text-3xl lg:text-4xl">
						TASK COMPLETED: {counter}
					</h3>
					<h4 className="text-center text-neutral-500 text-xs md:text-sm lg:text-base">
						Need
						<span className="ml-1 mr-0.5">{untilBreak}</span> More Task
						{untilBreak > 1 ? 's' : ''} for a Long Break
					</h4>
				</div>

				{/* Visiual Counter */}
				{counter > 0 && (
					<ul className="grid grid-cols-4 gap-3 mt-6 md:mt-8 lg:mt-10">
						{Array(counter)
							.fill(0)
							.map((item, idx) => (
								<li key={idx} className="text-xl md:text-3xl text-neutral-300">
									<FiStar />
								</li>
							))}
					</ul>
				)}
			</Section>
		</>
	);
}

export default Pomodoro;
