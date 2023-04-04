import type { Button } from '../../../lib/interfaces';
import {
	CalculatorActionType,
	OperationActionType,
} from '../../../lib/interfaces';
interface State {
	input: Button[];
	output: string;
}

interface CalculatorAction {
	type: CalculatorActionType;
	payload: any;
}

export const BUTTONS: Button[] = [
	// Row 1
	{
		key: 'CLEAR',
		value: 'clear',
		type: CalculatorActionType.CLEAR,
	},
	{
		key: 'DEL',
		value: 'backspace',
		type: CalculatorActionType.BACKSPACE,
	},
	{
		key: '(-)',
		value: '-',
		type: CalculatorActionType.NEGATIVE,
	},
	{
		key: '/',
		value: '/',
		type: CalculatorActionType.OPERATOR,
		operator: OperationActionType.DIVIDE,
	},

	// Row 2
	{
		key: '7',
		value: '7',
		type: CalculatorActionType.NUMBER,
	},
	{
		key: '8',
		value: '8',
		type: CalculatorActionType.NUMBER,
	},
	{
		key: '9',
		value: '9',
		type: CalculatorActionType.NUMBER,
	},
	{
		key: '*',
		value: '*',
		type: CalculatorActionType.OPERATOR,
		operator: OperationActionType.MULTIPLY,
	},

	// Row 3
	{
		key: '4',
		value: '4',
		type: CalculatorActionType.NUMBER,
	},
	{
		key: '5',
		value: '5',
		type: CalculatorActionType.NUMBER,
	},
	{
		key: '6',
		value: '6',
		type: CalculatorActionType.NUMBER,
	},
	{
		key: '-',
		value: '-',
		type: CalculatorActionType.OPERATOR,
		operator: OperationActionType.SUBTRACT,
	},

	// Row 4
	{
		key: '1',
		value: '1',
		type: CalculatorActionType.NUMBER,
	},
	{
		key: '2',
		value: '2',
		type: CalculatorActionType.NUMBER,
	},
	{
		key: '3',
		value: '3',
		type: CalculatorActionType.NUMBER,
	},
	{
		key: '+',
		value: '+',
		type: CalculatorActionType.OPERATOR,
		operator: OperationActionType.ADD,
	},

	// Row 5
	{
		key: '0',
		value: '0',
		type: CalculatorActionType.NUMBER,
		span: 'col-span-2',
	},
	{
		key: '.',
		value: '.',
		type: CalculatorActionType.DECIMAL,
	},
	{
		key: 'MOD',
		value: '%',
		type: CalculatorActionType.OPERATOR,
		operator: OperationActionType.MODULUS,
	},

	// Row 6
	{
		key: '=',
		value: '=',
		span: 'col-span-4',
		type: CalculatorActionType.EQUAL,
	},
];

function calculate(inputs: Button[]): string {
	let expression = '';
	inputs.forEach((item) => {
		expression += item.value;
	});
	let result = eval(expression);
	return result.toString();
}

export function calculatorReducer(state: State, action: CalculatorAction) {
	const { type, payload } = action;
	let prev: Button = state['input'][state.input.length - 1];
	switch (type) {
		case CalculatorActionType.NUMBER:
			return {
				...state,
				input: [...state.input, payload],
			};
		case CalculatorActionType.BACKSPACE:
			return {
				...state,
				input: [...state.input.slice(0, -1)],
			};
		case CalculatorActionType.CLEAR:
			return {
				output: '',
				input: [],
			};
		case CalculatorActionType.DECIMAL:
			if (!prev && state.output && !state.output.includes('.')) {
				const newValue = {
					key: 'ANS',
					value: state.output,
					type: CalculatorActionType.NUMBER,
				};
				return { ...state, input: [newValue, payload] };
			} else if (prev && prev.type !== 'DECIMAL' && !prev.value.includes('.')) {
				return { ...state, input: [...state.input, payload] };
			} else {
				return state;
			}
		case CalculatorActionType.NEGATIVE:
			if (!prev) {
				return { ...state, input: [...state.input, payload] };
			} else if (prev.type === 'OPERATOR') {
				return { ...state, input: [...state.input, payload] };
			} else {
				return state;
			}
		case CalculatorActionType.OPERATOR:
			if (!prev && state.output) {
				const digits = state.output.split('');
				const newInputs = digits.map((item) => {
					return {
						key: item,
						value: item,
						type: CalculatorActionType.NUMBER,
					};
				});
				return { ...state, input: [...newInputs, payload] };
			} else if (prev && prev.type !== 'OPERATOR') {
				return { ...state, input: [...state.input, payload] };
			} else {
				return state;
			}
		case CalculatorActionType.EQUAL:
			const isValid = state.input.some((item) => item.type === 'OPERATOR');

			if (isValid) {
				return {
					input: [],
					output: calculate(state.input),
				};
			} else {
				return state;
			}

		default:
			return state;
	}
}
