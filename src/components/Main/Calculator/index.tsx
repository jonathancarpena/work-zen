// Components
import Section from '../../Layout/Section';

interface Props {
	visible: boolean;
}

function Calculator({ visible }: Props) {
	return (
		<Section isVisible={visible} uniqueKey="calculator">
			<h1 className="text-3xl font-bold">Calculator</h1>
		</Section>
	);
}

export default Calculator;
