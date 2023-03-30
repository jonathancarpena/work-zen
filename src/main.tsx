import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Context Poviders
import DarkModeProvider from './context/DarkMode';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<DarkModeProvider>
			<ReduxProvider store={store}>
				<App />
			</ReduxProvider>
		</DarkModeProvider>
	</React.StrictMode>
);
