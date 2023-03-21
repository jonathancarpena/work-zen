import React from 'react';
import Footer from './Footer';

interface Props {
	children?: React.ReactNode;
}

function Layout({ children }: Props) {
	return (
		<div className="bg-neutral-50">
			<main className="min-h-screen max-w-7xl mx-auto px-3 relative pt-20">
				{children}
			</main>
			<Footer />
		</div>
	);
}

export default Layout;
