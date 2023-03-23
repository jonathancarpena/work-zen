import { useState } from 'react';
import { FiSettings, FiClock, FiVolume2 } from 'react-icons/fi';
import VolumeAdjuster from './VolumeAdjuster';
import { PomodoroSettings } from '../../../../lib/interfaces';

export interface Props {
	settings: PomodoroSettings;
	setSettings: React.Dispatch<React.SetStateAction<PomodoroSettings>>;
	playAudio: (
		type: 'alarm volume' | 'focus volume',
		turnOn: boolean,
		test: boolean
	) => void;
}

function Settings({ settings, setSettings, playAudio }: Props) {
	const [open, setOpen] = useState(false);

	function handleTimerSettingsChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) {
		setSettings({
			...settings,
			[e.currentTarget.name]: e.currentTarget.value,
		});
	}

	return (
		<>
			<button
				onClick={() => setOpen(!open)}
				className={`${
					open
						? ' border-main-dark-darker  dark:bg-main-light-lighter dark:text-black    bg-main-dark-0 hover:bg-main-dark-lighter text-white dark:hover:bg-main-dark-0  hover:text-white dark:border-main-light-darker'
						: 'border-main-light-darker dark:border-main-dark-darker  bg-main-light-lighter text-black hover:bg-main-light-0   dark:bg-main-dark-lighter dark:text-white dark:hover:bg-main-dark-0 dark:hover:text-white'
				} w-full h-11 md:text-lg md:h-14 flex justify-center items-center space-x-2 active:scale-90 rounded-md transition-transform duration-100 border  text-sm uppercase `}
			>
				<FiSettings className="text-base md:text-lg" />
				<span>Settings</span>
			</button>

			<div
				className={`${
					open ? 'opacity-30 z-40' : 'opacity-0 -z-10'
				} w-screen h-screen inset-0 bg-pureBlack fixed -left-3 md:-left-4`}
			/>
			{/* Settings  */}
			<form
				className={`${
					open
						? 'z-50 shadow-xl'
						: '-z-10 translate-y-full text-transparent lg:-translate-y-[120%] opacity-0'
				} flex flex-col fixed w-full overflow-y-auto max-h-[95vh] -left-3 lg:left-1/2 lg:-translate-x-1/2 bottom-14 md:bottom-16 dark:bg-black bg-white transition-all duration-500 border dark:border-pureBlack rounded-t-xl  lg:rounded-t-none lg:rounded-b-3xl lg:top-0 lg:max-w-lg lg:bottom-auto`}
			>
				<h3 className="px-5 py-5 border-b font-bold text-lg mb-5">
					Pomodoro Settings
				</h3>
				{/*  Timer Settings */}
				<div className="px-5 border-b pb-7 flex flex-col space-y-5 mb-5">
					<h4 className="font-semibold  text-neutral-500">
						<FiClock className="inline mb-1 mr-1 text-lg" /> Timer
					</h4>

					{/* Timer Stages */}
					<div className="grid grid-cols-3 ">
						<h5 className="col-span-3 mb-2 font-semibold">Time (minutes)</h5>
						{/* Focus Mode */}
						<div className="flex flex-col mr-5 ">
							<label
								htmlFor="focusMode"
								className="font-medium text-sm text-neutral-500"
							>
								Focus Mode
							</label>
							<input
								id="focusMode"
								type="number"
								name="focus mode"
								className="bg-main-light-darker p-2 rounded-sm focus:bg-main-light-lighter focus:outline-main-dark-darker text-start dark:bg-main-dark-darker dark:focus:bg-main-dark-lighter  "
								min={1}
								max={99}
								step={0.5}
								value={settings['focus mode']}
								onChange={handleTimerSettingsChange}
							/>
						</div>
						{/* Short Break */}
						<div className="flex flex-col mr-5">
							<label
								htmlFor="shortBreak"
								className="font-medium text-sm text-neutral-500"
							>
								Short Break
							</label>
							<input
								id="shortBreak"
								type="number"
								name="short break"
								min={1}
								step={0.5}
								max={99}
								className="bg-main-light-darker p-2 rounded-sm focus:bg-main-light-lighter focus:outline-main-dark-darker text-start dark:bg-main-dark-darker dark:focus:bg-main-dark-lighter  "
								value={settings['short break']}
								onChange={handleTimerSettingsChange}
							/>
						</div>
						{/* Long Brea */}
						<div className="flex flex-col">
							<label
								htmlFor="longBreak"
								className="font-medium text-sm text-neutral-500"
							>
								Long Break
							</label>
							<input
								id="longBreak"
								type="number"
								name="long break"
								step={0.5}
								min={1}
								max={99}
								className="bg-main-light-darker p-2 rounded-sm focus:bg-main-light-lighter focus:outline-main-dark-darker text-start dark:bg-main-dark-darker dark:focus:bg-main-dark-lighter  "
								value={settings['long break']}
								onChange={handleTimerSettingsChange}
							/>
						</div>
					</div>

					{/* Long Break Intervals */}
					<div className="flex justify-between ">
						<label htmlFor="longBreakIntervals" className="font-semibold">
							Long Break Intervals
						</label>
						<input
							id="longBreakIntervals"
							type="number"
							name="long break intervals"
							min="1"
							max="99"
							className="bg-main-light-darker p-2 rounded-sm focus:bg-main-light-lighter focus:outline-main-dark-darker text-start dark:bg-main-dark-darker dark:focus:bg-main-dark-lighter  "
							value={settings['long break intervals']}
							onChange={handleTimerSettingsChange}
						/>
					</div>
				</div>

				{/*  Audio Settings */}
				<div className="px-5  border-b pb-7 flex flex-col space-y-5">
					<h4 className="font-semibold mb-2 text-neutral-500">
						<FiVolume2 className="inline mb-1 mr-1 text-lg" /> Audio
					</h4>
					<div className="flex flex-col space-y-5 mb-5">
						{/* Alarm Sound */}
						<div className="flex justify-between ">
							<label htmlFor="alarmSound" className="font-semibold">
								Alarm Sound
							</label>
							<select
								id="alarmSound"
								name="alarm sound"
								className="bg-main-light-darker p-2 rounded-sm focus:bg-main-light-lighter focus:outline-main-dark-darker text-start dark:bg-main-dark-darker dark:focus:bg-main-dark-lighter min-w-max"
								value={settings['alarm sound']}
								onChange={handleTimerSettingsChange}
							>
								<option value="xylophone">Xylophone</option>
								<option value="policeSiren">Police Sirens</option>
							</select>
						</div>

						{/* Alarm Volume */}
						<div className="self-end ">
							<VolumeAdjuster
								settings={settings}
								setSettings={setSettings}
								targetName="alarm volume"
								playAudio={playAudio}
								settingsOpen={open}
							/>
						</div>

						{/* Alarm Repeat */}
						<div className="self-end space-x-5 ">
							<label htmlFor="alarmRepeat" className="text-neutral-400 ">
								Repeat (15 seconds)
							</label>
							<input
								id="alarmRepeat"
								name="alarm repeat"
								type="number"
								min={1}
								className="bg-main-light-darker p-2 rounded-sm focus:bg-main-light-lighter focus:outline-main-dark-darker text-start dark:bg-main-dark-darker dark:focus:bg-main-dark-lighter  max-w-[65px]"
								value={settings['alarm repeat']}
								onChange={handleTimerSettingsChange}
							/>
						</div>

						{/* Focus Sound */}
						<div className="flex justify-between ">
							<label htmlFor="focusSound" className="font-semibold">
								Focus Sound
							</label>
							<select
								id="focusSound"
								name="focus sound"
								className="bg-main-light-darker p-2 rounded-sm focus:bg-main-light-lighter focus:outline-main-dark-darker text-start dark:bg-main-dark-darker dark:focus:bg-main-dark-lighter min-w-max "
								value={settings['focus sound']}
								onChange={handleTimerSettingsChange}
							>
								<option value="whiteNoise">White Noise</option>
								<option value="brownNoise">Brown Noise</option>
								<option value="rain">Rain</option>
							</select>
						</div>

						{/* Focus Volume */}
						<div className="self-end">
							<VolumeAdjuster
								settings={settings}
								setSettings={setSettings}
								targetName="focus volume"
								playAudio={playAudio}
								settingsOpen={open}
							/>
						</div>
					</div>
				</div>

				<button
					type="button"
					onClick={() => setOpen(false)}
					className="flex justify-center md:bg-main-light-0  md:active:bg-main-light-darker md:dark:bg-main-dark-darker md:dark:active:bg-pureBlack absolute top-0 right-5 md:right-auto md:relative"
				>
					<span className="py-5  active:scale-90 w-full tracking-wide font-semibold">
						Close ✖
					</span>
				</button>
			</form>
		</>
	);
}

export default Settings;
