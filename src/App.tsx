import { useEffect } from 'react';

// Components
import Layout from './components/Layout';
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
		<Layout>
			<Main />
		</Layout>
	);
}

export default App;

// npx pwa-asset-generator public/light-logo.svg public -m public/site.webmanifest --padding "calc(50vh - 25%) calc(50vw - 25%)" -b "#FAFAFA" -q 100 -i public/asset-generator-changes.html --favicon

// npx pwa-asset-generator public/dark-logo.svg public -m public/site.webmanifest --padding "calc(50vh - 25%) calc(50vw - 25%)" -b "#FAFAFA" -q 100 -i public/asset-generator-changes.html --favicon
