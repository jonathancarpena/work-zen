import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import useVH from '../../lib/hooks/useViewportHeight';

interface Props {
	children?: React.ReactNode;
}

function Layout({ children }: Props) {
	useVH();
	return (
		<div className="app flex flex-col items-stretch h-screen  bg-main-light-0 dark:bg-main-dark-0 overflow-hidden font-mono">
			<Navbar />
			<div className="flex-1 bg-main-0 dark:bg-main-dark overflow-x-hidden overflow-y-auto px-3 md:px-4 max-h-fit ">
				{children}
			</div>
			<Footer />
		</div>
	);
}

export default Layout;
