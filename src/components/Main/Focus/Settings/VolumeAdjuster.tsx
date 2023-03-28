import { motion, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { updateSettings } from '../../../../redux/features/focusSlice';
import { RootState } from '../../../../redux/store';

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
	const x = useMotionValue(0);

	useMotionValueEvent(x, 'change', (latest) => {
		// 0 - Mute
		// 1.0 - 100% Volume

		let volume = (latest + 50) / 100;
		if (volume < 0) {
			volume = 0;
		}

		if (volume > 1) {
			volume = 1;
		}

		dispatch(updateSettings({ target: targetName, value: volume }));
		handleAudio(targetName, volume);
	});

	return (
		<div className="flex items-center space-x-5">
			<span className="font-semibold text-neutral-400">
				{Math.ceil(settings[targetName] * 100)}
			</span>

			{/* Slide */}
			<div className=" w-[100px] bg-main-light-darker dark:bg-main-dark-darker h-4  rounded-full ">
				{/* Thumb */}
				<motion.div
					style={{ x }}
					drag="x"
					dragConstraints={{
						left: -50,
						right: 50,
					}}
					dragElastic={0}
					dragMomentum={false}
					className={`cursor-grab active:cursor-grabbing bg-white dark:bg-main-dark-lighter dark:border-pureBlack border-2 shadow-sm w-auto aspect-square rounded-[100%] h-[150%] relative bottom-1 mx-auto`}
				/>
			</div>
		</div>
	);
}

export default VolumeAdjuster;
