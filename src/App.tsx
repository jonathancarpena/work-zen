import { useEffect } from 'react';

// Components
import Layout from './components/Layout';
import Main from './components/Main';

function App() {
	// Mobile Viewport Fix
	useEffect(() => {
		// only execute all the code below in client side
		if (typeof window !== 'undefined') {
			// Handler to call on window resize
			const handleResize = () => {
				let vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty('--vh', `${vh}px`);
			};

			// Add event listener
			window.addEventListener('resize', handleResize);

			// Call handler right away so state gets updated with initial window size
			handleResize();

			// Remove event listener on cleanup
			return () => window.removeEventListener('resize', handleResize);
		}
	});
	return (
		<Layout>
			<Main />
		</Layout>
	);
}

export default App;
