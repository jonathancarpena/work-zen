import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Context Poviders
import DarkModeProvider from './lib/context/DarkMode';
import TabProvider from './lib/context/Tab';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<DarkModeProvider>
			<ReduxProvider store={store}>
				<TabProvider>
					<App />
				</TabProvider>
			</ReduxProvider>
		</DarkModeProvider>
	</React.StrictMode>
);
