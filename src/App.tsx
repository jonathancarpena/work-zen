import { useState } from 'react';
import { useTab } from './lib/context/Tab';

// Components
import Layout from './components/Layout';
import Pomodoro from './components/App/Pomodoro';
import Calculator from './components/App/Calculator';
import Notes from './components/App/Notes';

function App() {
	const tab = useTab();
	const [timerActive, setTimerActive] = useState<boolean>(false);

	return (
		<Layout>
			{/* Displays */}
			<Pomodoro
				visible={tab === 'pomodoro'}
				timerActive={timerActive}
				setTimerActive={setTimerActive}
			/>
			<Notes visible={tab === 'notes'} />

			<Calculator visible={tab === 'calculator'} />
		</Layout>
	);
}

export default App;
