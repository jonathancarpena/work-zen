import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface Props {
	children?: React.ReactNode;
}

function Layout({ children }: Props) {
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
