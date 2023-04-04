import { useAppSelector } from '../../redux/hooks';

import Focus from './Focus';
import Calculator from './Calculator';
import Tasks from './Tasks';

function Main() {
	const tab = useAppSelector((state) => state.tabs.current);

	return (
		<>
			<Focus visible={tab === 'focus'} />
			<Tasks visible={tab === 'tasks'} />
			<Calculator visible={tab === 'calculator'} />
		</>
	);
}

export default Main;
