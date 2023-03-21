import { useState } from 'react';
import { State as PomodoroState } from '.';
import { FiSettings } from 'react-icons/fi';
import Button from '../../Button';

interface Props {
	settings: PomodoroState['settings'];
	setSettings: React.Dispatch<React.SetStateAction<PomodoroState['settings']>>;
}

function Settings({ settings, setSettings }: Props) {
	const [open, setOpen] = useState(false);

	function handleTimerSettingsChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSettings({
			...settings,
			[e.currentTarget.name]: e.currentTarget.value,
		});
	}
	return (
		<>
			<Button
				onClick={() => setOpen(!open)}
				sx="fixed bottom-10 left-3 shadow-md md:shadow-none md:h-max md:left-auto md:w-max md:absolute md:right-5 md:top-6 lg:top-7  flex items-center text-3xl bg-white rounded-lg overflow-hidden text-black "
			>
				<FiSettings />
			</Button>

			{/* Settings  */}
			<form
				className={`${
					open
						? 'z-50 shadow-xl'
						: '-z-10 translate-y-full text-transparent md:-translate-y-[120%] '
				} flex space-y-10 flex-col fixed w-full overflow-y-auto max-h-[70vh] left-1/2 -translate-x-1/2 bottom-0 bg-white transition-all duration-500 border shadow-2xl rounded-t-3xl md:shadow-none md:rounded-t-none md:rounded-b-2xl md:top-0 md:max-w-lg md:bottom-auto`}
			>
				<h3 className="px-5 py-5 border-b font-bold">Pomodoro Settings</h3>
				{/*  Timer Settings */}
				<div className="grid grid-cols-3  gap-5 px-5">
					{/* Focus Mode */}
					<div className="flex flex-col ">
						<label htmlFor="focusMode">Focus Mode</label>
						<input
							id="focusMode"
							type="number"
							name="focus mode"
							className="bg-neutral-100 p-2 rounded-sm focus:bg-white focus:outline-neutral-200 text-start"
							min={1}
							value={settings['focus mode']}
							onChange={handleTimerSettingsChange}
						/>
					</div>
					{/* Short Break */}
					<div className="flex flex-col">
						<label htmlFor="shortBreak">Short Break</label>
						<input
							id="shortBreak"
							type="number"
							name="short break"
							className="bg-neutral-100 p-2 rounded-sm focus:bg-white focus:outline-neutral-200 text-start"
							value={settings['short break']}
							onChange={handleTimerSettingsChange}
						/>
					</div>
					{/* Long Brea */}
					<div className="flex flex-col">
						<label htmlFor="longBreak">Long Break</label>
						<input
							id="longBreak"
							type="number"
							name="long break"
							className="bg-neutral-100 p-2 rounded-sm focus:bg-white focus:outline-neutral-200 text-start"
							value={settings['long break']}
							onChange={handleTimerSettingsChange}
						/>
					</div>
				</div>

				{/* Long Break Intervals */}
				<div className="flex gap-5 items-center px-5 justify-end">
					<label htmlFor="longBreakIntervals">Long Break Intervals</label>
					<input
						id="longBreakIntervals"
						type="number"
						name="long break intervals"
						min="1"
						max="99"
						className="bg-neutral-100 p-2 rounded-sm focus:bg-white focus:outline-neutral-200 max-w-[55px] text-center"
						value={settings['long break intervals']}
						onChange={handleTimerSettingsChange}
					/>
				</div>

				<button
					type="button"
					onClick={() => setOpen(false)}
					className="flex justify-center bg-neutral-50 border-t active:bg-neutral-100"
				>
					<span className="py-5  active:scale-90 w-full tracking-wide font-semibold">
						Close
					</span>
				</button>
			</form>
		</>
	);
}

export default Settings;
