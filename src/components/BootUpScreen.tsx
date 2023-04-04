import { useState, useEffect } from 'react';

interface Props {
	visible: boolean;
	animationEnd: () => void;
}

function BootUpScreen({ visible, animationEnd }: Props) {
	const [loaded, setLoaded] = useState(false);
	const [animate, setAnimate] = useState(false);
	const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		e.preventDefault();
		setLoaded(true);
	};

	useEffect(() => {
		if (loaded && !animate) {
			setAnimate(true);
		}
	}, [loaded, animate]);
	return (
		<div
			style={{ padding: 'calc(50vh - 25%) calc(50vw - 25%)' }}
			className="bg-main-light-0 h-screen w-screen flex justify-center items-center"
		>
			<img
				src={'/assets/logo.svg'}
				alt="Logo"
				className={`${animate ? 'scale-50 opacity-0 transition-1000' : ''} `}
				onLoad={handleLoad}
			/>
		</div>
	);
}

export default BootUpScreen;
