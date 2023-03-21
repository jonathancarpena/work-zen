import { useState } from 'react';
import Pomodoro from './components/App/Pomodoro';
import Calculator from './components/App/Calculator';
import Notes from './components/App/Notes';

type Tab = 'pomodoro' | 'calculator' | 'notes';
interface State {
	tab: Tab;
	timerActive: boolean;
}
function App() {
	const [tab, setTab] = useState<State['tab']>('pomodoro');
	const [timerActive, settimerActive] = useState<State['timerActive']>(false);
	const TABS: Tab[] = ['pomodoro', 'notes', 'calculator'];

	return (
		<>
			{/* Tab Options */}
			<ul className="flex space-x-5 justify-center  fixed top-10">
				{TABS.map((item) => (
					<li key={item}>
						<button onClick={() => setTab(item)}>{item}</button>
					</li>
				))}
			</ul>

			{/* Display */}
			<Pomodoro
				visible={tab === 'pomodoro'}
				timerActive={timerActive}
				setTimerActive={settimerActive}
			/>
			<Notes visible={tab === 'notes'} />

			{tab === 'calculator' && <Calculator />}
		</>
	);
}

export default App;
