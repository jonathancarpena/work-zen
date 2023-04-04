import { useAppSelector } from '../../redux/hooks';

import Layout from '../Layout';
import Focus from './Focus';
import Calculator from './Calculator';
import Tasks from './Tasks';

function Main() {
	const tab = useAppSelector((state) => state.tabs.current);

	return (
		<Layout>
			<Focus visible={tab === 'focus'} />
			<Tasks visible={tab === 'tasks'} />
			<Calculator visible={tab === 'calculator'} />
		</Layout>
	);
}

export default Main;
