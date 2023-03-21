import React from 'react';
import Section from '../../Layout/Section';

interface Props {
	visible: boolean;
}

function Notes({ visible }: Props) {
	return (
		<Section isVisible={visible} key="notes">
			<h1 className="text-3xl font-bold">Notes </h1>
		</Section>
	);
}

export default Notes;
