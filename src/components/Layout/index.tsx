import { useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { formatTime } from '../../lib/utils';

import Footer from './Footer';
import Navbar from './Navbar';

interface Props {
	children?: React.ReactNode;
}

function Layout({ children }: Props) {
	const { timer, activeTimer, stage } = useAppSelector(
		(state: RootState) => state.focus
	);

	const TITLE = 'Work Zen - Simple Tool for Focused Work';
	useEffect(() => {
		if (!activeTimer) {
			document.title = TITLE;
		} else {
			let text = '';
			if (stage === 0) {
				text = 'Focus Mode Activated';
			} else if (stage === 1) {
				text = 'Take a Quick Break';
			} else {
				text = 'The Long Break You Deserve';
			}
			document.title = `${formatTime(timer)} - ${text}`;
		}
	}, [timer, activeTimer]);
	return (
		<div
			style={{ WebkitTapHighlightColor: 'transparent' }}
			className="flex flex-col items-stretch h-screen  bg-main-light-0 dark:bg-main-dark-0 overflow-hidden font-mono"
		>
			<Navbar />
			<main className="flex-1 bg-main-0 dark:bg-main-dark overflow-x-hidden overflow-y-auto px-3 md:px-4 ">
				{children}
			</main>
			<Footer />
		</div>
	);
}

export default Layout;
