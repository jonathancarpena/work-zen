import React from 'react';
import Section from '../../Layout/Section';

interface Props {
	visible: boolean;
}

function Tasks({ visible }: Props) {
	return (
		<Section isVisible={visible} uniqueKey="tasks">
			Tasks
		</Section>
	);
}

export default Tasks;
