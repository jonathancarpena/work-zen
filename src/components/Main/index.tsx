import { useAppSelector } from '../../redux/hooks';

import Focus from './Focus';
import Calculator from './Calculator';
// import Notes from './Notes';
import Tasks from './Tasks';

function Main() {
	const tab = useAppSelector((state) => state.tabs.current);

	return (
		<>
			<Focus visible={tab === 'focus'} />
			{/* <Notes visible={tab === 'notes'} /> */}
			<Tasks visible={tab === 'tasks'} />
			<Calculator visible={tab === 'calculator'} />
		</>
	);
}

export default Main;
