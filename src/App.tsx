import { useEffect } from 'react';

// Components
import Main from './components/Main';

function App() {
	// Mobile Viewport Fix
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const handleResize = () => {
				let vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty('--vh', `${vh}px`);
			};
			window.addEventListener('resize', handleResize);
			handleResize();
			return () => window.removeEventListener('resize', handleResize);
		}
	});

	return (
		<>
			<Main />
		</>
	);
}

export default App;
