// Utils
import { useEffect, useRef } from 'react';
import { formatTime, TIMERSTAGES } from '../../../lib/utils';

// Redux
import { RootState } from '../../../redux/store';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import {
	resetCounter,
	decrementTimer,
	toggleTimer,
	nextStage,
	stageSelect,
} from '../../../redux/features/focusSlice';

// Components
import Button from '../../Button';
import Settings from './Settings';
import AudioPlayer from './AudioPlayer';
import Section from '../../Layout/Section';
import { FiSkipForward, FiStar } from 'react-icons/fi';

interface Props {
	visible: boolean;
}

function Focus({ visible }: Props) {
	const alarmAudioPlayer = useRef<any>();
	const focusAudioPlayer = useRef<any>();
	const {
		settings,
		counter,
		activeTimer,
		timer,
		stage: stageIndex,
	} = useAppSelector((state: RootState) => state.focus);
	const dispatch = useAppDispatch();
	let untilBreak =
		settings['long break intervals'] -
		(counter % settings['long break intervals']);

	// Countdown Timer
	useEffect(() => {
		let interval: any;
		if (activeTimer && timer > 0) {
			interval = setInterval(() => {
				dispatch(decrementTimer());
			}, 1000);
		}

		if (timer <= 0) {
			let alarmRepeat = 15000 * settings['alarm repeat'];
			handleFocusAudio(false);
			handleAlarmAudio(true);
			setTimeout(() => {
				handleAlarmAudio(false);
			}, alarmRepeat);
			handleNext();
		}
		return () => clearInterval(interval);
	}, [activeTimer, timer]);

	// Volume Change
	useEffect(() => {
		alarmAudioPlayer.current.volume = settings['alarm volume'];
		focusAudioPlayer.current.volume = settings['focus volume'];
	}, [settings['alarm volume'], settings['focus volume']]);

	function handleTimerButton() {
		if (activeTimer) {
			handleFocusAudio(false);
		} else {
			if (stageIndex === 0) {
				handleFocusAudio(true);
			}
		}
		dispatch(toggleTimer(!activeTimer));
	}

	function handleNext() {
		dispatch(nextStage());
		handleTimerButton();
	}

	function handleStageChange(num: number) {
		let confirm = true;
		if (activeTimer) {
			confirm = window.confirm(
				'The timer is still running, are you sure you want to switch?'
			);
		}

		if (confirm) {
			dispatch(stageSelect(num));
			dispatch(toggleTimer(false));
			handleFocusAudio(false);
			handleAlarmAudio(false);
		}
	}

	function handleAlarmAudio(input: boolean) {
		if (input) {
			if (settings['alarm volume'] > 0) {
				alarmAudioPlayer.current.play();
			}
		} else {
			alarmAudioPlayer.current.pause();
		}
	}

	function handleFocusAudio(input: boolean) {
		if (input) {
			if (settings['focus volume'] > 0) {
				focusAudioPlayer.current.play();
			}
		} else {
			focusAudioPlayer.current.pause();
		}
	}

	function handleResetCounter() {
		dispatch(resetCounter());
	}

	function generateMotivatingMessage() {
		return (
			<h4 className="text-center  text-sm md:text-base mb-2">
				{stageIndex !== 0 ? (
					<>
						{stageIndex === 1
							? 'Take a quick break.'
							: 'You deserve a long break.'}
					</>
				) : (
					<>
						Need
						<span className="ml-2">{untilBreak}</span> More Task
						{untilBreak > 1 ? 's' : ''} for a Long Break
					</>
				)}
			</h4>
		);
	}
	return (
		<>
			<Section
				isVisible={visible}
				uniqueKey="pomodoro"
				sx="text-black dark:text-white max-w-screen-md mx-auto "
			>
				{/* Timer */}
				<div className="mx-auto ">
					{/* Stages */}
					<div className="grid grid-cols-3 gap-3 w-full place-items-center md:gap-4 md:w-auto lg:w-full">
						{TIMERSTAGES.map((item, index) => (
							<Button
								active={stageIndex === index}
								key={`tabs-${item}`}
								onClick={() => handleStageChange(index)}
								sx="uppercase"
							>
								{item}
							</Button>
						))}
					</div>

					{/* Timer */}
					<h1 className="text-9xl md:text-[12rem] lg:text-[15rem] font-bold text-center my-8 text-inherit select-none">
						{formatTime(timer)}
					</h1>

					{/* Start Button */}

					<Button active={true} onClick={handleTimerButton} size="lg">
						<span className="text-3xl md:text-4xl">
							{!activeTimer ? 'START' : 'PAUSE'}
						</span>
					</Button>

					{/* Settings, Skip Button */}
					<div className="mt-6 flex space-x-3 md:mt-8 md:space-x-4  justify-center ">
						<Settings />

						<Button
							disabled={!activeTimer}
							onClick={handleNext}
							sx={'space-x-2'}
						>
							<FiSkipForward className="text-base md:text-lg" />
							<span>Next</span>
						</Button>
					</div>
				</div>

				{/* Counter */}
				<div className="mt-6 md:mt-8">
					<h3 className="text-center font-semibold  mb-2 text-lg md:text-xl">
						TASK COMPLETED: {counter}
					</h3>
					{generateMotivatingMessage()}

					<Button
						disabled={counter < 1}
						block={false}
						onClick={handleResetCounter}
						size="sm"
						sx="mx-auto mt-4"
					>
						<span className="text-sm">Clear Progress</span>
					</Button>
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

export default Focus;
