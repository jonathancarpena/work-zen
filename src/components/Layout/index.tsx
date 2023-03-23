import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface Props {
	children?: React.ReactNode;
}

function Layout({ children }: Props) {
	return (
		<div className="flex flex-col items-stretch  h-screen bg-main-light-0 dark:bg-main-dark-0 overflow-hidden font-mono">
			<Navbar />
			<div className="flex-1 bg-main-0 dark:bg-main-dark overflow-y-scroll px-3 md:px-4">
				{children}
			</div>
			<Footer />
		</div>
	);
}

export default Layout;
