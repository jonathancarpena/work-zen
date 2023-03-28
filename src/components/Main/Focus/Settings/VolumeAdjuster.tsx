import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { updateSettings } from '../../../../redux/features/focusSlice';
import { RootState } from '../../../../redux/store';
import ReactSlider from 'react-slider';

interface Props {
	targetName: 'focus volume' | 'alarm volume';
	handleAudio: (
		target: 'focus volume' | 'alarm volume',
		volume: number
	) => void;
}

function VolumeAdjuster({ targetName, handleAudio }: Props) {
	const { settings } = useAppSelector((state: RootState) => state.focus);
	const dispatch = useAppDispatch();
	const defaultVal = settings[targetName] * 100;

	function handleSlideChange(value: number) {
		let volume = value / 100;
		dispatch(updateSettings({ target: targetName, value: volume }));
		handleAudio(targetName, volume);
	}

	return (
		<div className="flex items-center space-x-5">
			<span className="font-semibold text-neutral-400">
				{Math.ceil(settings[targetName] * 100)}
			</span>

			<div className="w-28 h-4 bg-main-light-darker dark:bg-main-dark-darker  rounded-full">
				<ReactSlider
					ariaLabelledby={`${targetName}-volumeAdjuster`}
					defaultValue={defaultVal}
					min={0}
					max={100}
					renderThumb={(props) => (
						<div
							data-testid={`slider-thumb`}
							{...props}
							className={`
						 bg-white border select-none h-6 w-6  rounded-full 
			  cursor-grab active:cursor-grabbing -top-1
				`}
						/>
					)}
					onChange={handleSlideChange}
				/>
			</div>
		</div>
	);
}

export default VolumeAdjuster;
