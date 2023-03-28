import { useState } from 'react';
import { useTab } from '../../lib/context/Tab';
import Focus from './Focus';
import Calculator from './Calculator';
import Notes from './Notes';

function Main() {
	const tab = useTab();

	return (
		<>
			<Focus visible={tab === 'focus'} />
			<Notes visible={tab === 'notes'} />
			<Calculator visible={tab === 'calculator'} />
		</>
	);
}

export default Main;
