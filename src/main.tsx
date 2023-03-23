import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Context Poviders
import DarkModeProvider from './lib/context/DarkMode';
import TabProvider from './lib/context/Tab';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<DarkModeProvider>
			<TabProvider>
				<App />
			</TabProvider>
		</DarkModeProvider>
	</React.StrictMode>
);
