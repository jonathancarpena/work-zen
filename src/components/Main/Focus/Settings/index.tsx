import { useRef, useState } from 'react';
import { updateSettings } from '../../../../redux/features/focusSlice';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';

// Components
import { FiSettings, FiClock, FiVolume2 } from 'react-icons/fi';
import Button from '../../../Button';
import VolumeAdjuster from './VolumeAdjuster';
import AudioPlayer from '../AudioPlayer';

// Types
import { RootState } from '../../../../redux/store';

function Settings() {
	const [open, setOpen] = useState(false);
	const [audioPlaying, setAudioPlaying] = useState('alarm volume');
	const settingsAudioPlayer = useRef<any>();
	const { settings } = useAppSelector((state: RootState) => state.focus);
	const dispatch = useAppDispatch();

	function handleTimerSettingsChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) {
		const value = e.currentTarget.value;
		const target = e.currentTarget.name;
		dispatch(updateSettings({ target, value }));
	}

	function handleAudio(
		target: 'alarm volume' | 'focus volume',
		volume: number
	) {
		if (target === 'alarm volume') {
			if (audioPlaying !== 'alarm volume') {
				setAudioPlaying('alarm volume');
			}
		} else {
			if (audioPlaying !== 'focus volume') {
				setAudioPlaying('focus volume');
			}
		}

		if (open) {
			settingsAudioPlayer.current.volume = volume;
			settingsAudioPlayer.current.play();

			setTimeout(() => {
				settingsAudioPlayer.current.pause();
			}, 3000);
		}
	}

	function generateAudioUrl() {
		let basePath = '/assets/sounds';
		return audioPlaying === 'alarm volume'
			? `${basePath}/alarm/${settings['alarm sound']}.mp3`
			: `${basePath}/focus/${settings['focus sound']}.mp3`;
	}

	return (
		<>
			{/* Toggle */}
			<Button onClick={() => setOpen(!open)} active={open} sx="space-x-2">
				<FiSettings className="text-base md:text-lg" />
				<span>Settings</span>
			</Button>

			{/* Settings  */}
			<form
				className={`${
					open
						? 'z-50 shadow-xl'
						: '-z-10 translate-y-full text-transparent lg:-translate-y-[120%] opacity-0'
				} flex flex-col fixed w-full overflow-y-auto h-screen lg:h-auto lg:max-h-[95vh] -left-3 lg:left-1/2 lg:-translate-x-1/2 bottom-0 dark:bg-black bg-white transition-all duration-500 border dark:border-pureBlack standalone:pt-8  lg:rounded-b-3xl lg:top-0 lg:max-w-lg lg:bottom-auto`}
			>
				<h3 className="px-3 py-6 md:px-4 lg:p-5 border-b dark:border-pureBlack font-bold text-2xl mb-6 lg:mb-5">
					Focus Settings
				</h3>
				{/*  Timer Settings */}
				<div className="px-3 md:px-4 lg:px-5 border-b dark:border-pureBlack pb-7 flex flex-col gap-y-6 mb-6 lg:gap-y-5 lg:mb-5">
					<h4 className="font-semibold  text-neutral-500">
						<FiClock className="inline mb-1 text-xl" /> Timer
					</h4>

					{/* Timer Stages */}
					<div className="grid grid-cols-3 gap-x-3 md:gap-x-4 lg:gap-x-5">
						<h5 className="col-span-3 mb-2 font-semibold">Time (minutes)</h5>
						{/* Focus Mode */}
						<div className="flex flex-col  ">
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
						<div className="flex flex-col  ">
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
						<div className="flex flex-col  ">
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
				<div className="px-3 md:px-4 lg:px-5 mb-6 lg:mb-5">
					<h4 className="font-semibold  text-neutral-500 mb-6 lg:mb-5">
						<FiVolume2 className="inline mb-1 text-xl" /> Audio
					</h4>
					<div className="flex flex-col gap-y-6 lg:gap-y-5 ">
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
								targetName="alarm volume"
								handleAudio={handleAudio}
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
								targetName="focus volume"
								handleAudio={handleAudio}
							/>
						</div>
					</div>
				</div>

				<button
					type="button"
					onClick={() => setOpen(false)}
					className="border-t dark:border-pureBlack flex justify-center bg-main-light-0  active:bg-main-light-darker dark:bg-main-dark-darker dark:active:bg-pureBlack mt-auto "
				>
					<span className=" py-6  lg:py-5  active:scale-90 w-full tracking-wide font-semibold">
						Close ✖
					</span>
				</button>
			</form>

			<AudioPlayer url={generateAudioUrl()} ref={settingsAudioPlayer} />
		</>
	);
}

export default Settings;
