import { useState } from 'react';
import { FiSettings, FiClock, FiVolume2 } from 'react-icons/fi';
import Button from '../../../Button';
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
			<Button
				onClick={() => setOpen(!open)}
				sx="absolute top-1/2 -translate-y-1/2  md:translate-y-0 md:h-max md:left-auto md:w-max md:absolute md:right-5 md:top-6 lg:top-7  flex items-center text-3xl bg-white rounded-lg overflow-hidden text-black "
			>
				<FiSettings />
			</Button>

			{/* Settings  */}
			<form
				className={`${
					open
						? 'z-50 shadow-xl'
						: '-z-10 translate-y-full text-transparent md:-translate-y-[120%] '
				} flex  flex-col fixed w-full overflow-y-auto max-h-[95vh] left-1/2 -translate-x-1/2 bottom-[57px] bg-white transition-all duration-500 border rounded-t-3xl  md:rounded-t-none md:rounded-b-3xl md:top-0 md:max-w-lg md:bottom-auto`}
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
								className="bg-neutral-100 p-2 rounded-sm focus:bg-white focus:outline-neutral-200 text-start"
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
								className="bg-neutral-100 p-2 rounded-sm focus:bg-white focus:outline-neutral-200 text-start"
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
								className="bg-neutral-100 p-2 rounded-sm focus:bg-white focus:outline-neutral-200 text-start"
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
							className="bg-neutral-100 p-2 rounded-sm focus:bg-white focus:outline-neutral-200 max-w-[65px] text-center"
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
								className="bg-neutral-100 p-2 rounded-sm focus:bg-white focus:outline-neutral-200 text-start min-w-max"
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
								className="bg-neutral-100 p-2 rounded-sm focus:bg-white focus:outline-neutral-200 text-start max-w-[65px] "
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
								className="bg-neutral-100 p-2 rounded-sm focus:bg-white focus:outline-neutral-200 text-start min-w-max"
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
					className="flex justify-center md:bg-neutral-50  md:active:bg-neutral-100 absolute top-0 right-5 md:right-auto md:relative"
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
