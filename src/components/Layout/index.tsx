import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface Props {
	children?: React.ReactNode;
}

function Layout({ children }: Props) {
	return (
		<>
			<Navbar />
			<main className="h-[88vh] max-h-[88vh] lg:h-[94vh] lg:max-h-[94vh] overflow-hidden max-w-screen-xl mx-auto px-3 relative bg-neutral-50">
				{children}
			</main>
			<Footer />
		</>
	);
}

export default Layout;
