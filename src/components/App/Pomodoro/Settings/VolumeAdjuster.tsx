import { motion, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { Props as SettingsProps } from '.';
import { useEffect } from 'react';

interface Props extends SettingsProps {
	targetName: 'focus volume' | 'alarm volume';
	settingsOpen: boolean;
}

function VolumeAdjuster({
	settings,
	setSettings,
	targetName,
	playAudio,
	settingsOpen,
}: Props) {
	const x = useMotionValue(0);

	useMotionValueEvent(x, 'change', (latest) => {
		// 0 - Mute
		// 1.0 - 100% Volume
		let results = (100 + latest) / 100;
		if (results < 0) {
			results = 0;
		}

		if (results > 1) {
			results = 1;
		}
		setSettings({ ...settings, [targetName]: results });
		playAudio(targetName, true, true);
	});

	// Stop testing audio when settings closed
	useEffect(() => {
		if (!settingsOpen) {
			playAudio(targetName, false, false);
		}
	}, [settingsOpen]);

	return (
		<div className="flex items-center space-x-5">
			<span className="font-semibold text-neutral-400">
				{Math.ceil(settings[targetName] * 100)}
			</span>

			{/* Slide */}
			<div className=" w-[100px] bg-neutral-100 h-4 relative rounded-full">
				{/* Thumb */}
				<motion.div
					style={{ x }}
					drag="x"
					dragConstraints={{
						left: -100,
						right: 0,
					}}
					dragElastic={0}
					dragMomentum={false}
					className="bg-white border shadow-sm w-auto  aspect-square rounded-[100%] h-[150%] absolute -right-3 -top-1"
				/>
			</div>
		</div>
	);
}

export default VolumeAdjuster;
