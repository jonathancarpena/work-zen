// Utils
import { useReducer } from 'react';
import { BUTTONS, calculatorReducer } from './utils';

// Components
import Section from '../../Layout/Section';
import { Button as ButtonType } from '../../../lib/interfaces';
import Button from '../../Button';

interface Props {
	visible: boolean;
}

function Calculator({ visible }: Props) {
	const [{ input, output }, dispatch] = useReducer(calculatorReducer, {
		input: [],
		output: '',
	});

	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const button = JSON.parse(e.currentTarget.value);
		dispatch({ type: button.type, payload: button });
	};

	const generateKey = (button: ButtonType): string => {
		let key = 'button-';
		if (button.value === '-' && button.type === 'NEGATIVE') {
			return key + 'negative';
		} else {
			return key + button.value;
		}
	};

	function renderCalcScreen() {
		let child: JSX.Element;
		if (input.length) {
			child = (
				<>
					{input.map((item, index) => (
						<span
							key={`calc-input-${index}`}
							className={`${item.type === 'OPERATOR' ? 'mx-1' : ''} ${
								item.type === 'NEGATIVE' ? 'text-red-500 ' : ''
							}`}
						>
							{item.value}
						</span>
					))}
				</>
			);
		} else if (output) {
			child = <>{output}</>;
		} else {
			child = <>0</>;
		}

		return (
			<p
				className={`col-span-4 text-6xl md:text-8xl ${
					!input.length && !output ? 'opacity-50' : ''
				}  overflow-x-auto overflow-y-hidden text-end`}
			>
				{child}
			</p>
		);
	}

	return (
		<Section
			isVisible={visible}
			uniqueKey="calculator"
			sx="max-w-screen-sm mx-auto flex flex-col  md:text-lg"
		>
			{/* Numbers */}
			<div className="grid grid-cols-4 gap-4">
				{renderCalcScreen()}
				{BUTTONS.map((item) => (
					<Button
						key={generateKey(item)}
						onClick={handleClick}
						sx={`${item.span ? item.span : ''}`}
						value={JSON.stringify(item)}
						size="lg"
					>
						{item.key}
					</Button>
				))}
			</div>
		</Section>
	);
}

export default Calculator;
