import { useState, useRef } from 'react';
import useMobileScreen from '../../../hooks/useMobileScreen';
import Checkbox from './Checkbox';

interface Props {
	addTask: (id: string, content: string, parent?: string) => void;
	subtask: boolean;
	parentId?: string;
	otherTaskPresent?: boolean;
}

function TaskForm({
	addTask,
	subtask = false,
	parentId,
	otherTaskPresent,
}: Props) {
	const [input, setInput] = useState('');
	const [focus, setFocus] = useState(false);
	const textareaRef = useRef<any>();
	const formRef = useRef<any>();
	const isMobile = useMobileScreen();
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.code === 'Enter') {
			e.preventDefault();
			formRef.current.requestSubmit();
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const id = Date.now().toString();
		const content = input.trim();

		if (subtask && parentId && parentId.length > 0) {
			addTask(id, content, parentId);
		} else {
			addTask(id, content);
		}

		setInput('');
	};

	const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
		if (input) {
			e.preventDefault();
			formRef.current.requestSubmit();
		}
		setFocus(false);
	};
	const handleFocus = () => setFocus(true);
	const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement>) =>
		setInput(e.currentTarget.value);

	function generateTextAreaRows() {
		let rows: number = 1;
		if (!subtask) {
			if (isMobile) {
				if (input.length > 50) {
					rows = 3;
				} else if (input.length > 34) {
					rows = 2;
				}
			} else {
				if (input.length > 50) {
					rows = 2;
				} else {
					rows = 1;
				}
			}
		} else {
			if (isMobile) {
				if (input.length > 40) {
					rows = 3;
				} else if (input.length > 20) {
					rows = 2;
				}
			} else {
				if (input.length > 28) {
					rows = 2;
				}
			}
		}
		return rows;
	}

	return (
		<form
			ref={formRef}
			onSubmit={handleSubmit}
			className={`${
				otherTaskPresent ? `${focus ? '' : 'opacity-25'}` : ''
			} flex items-start gap-x-3 ${
				subtask ? 'ml-9 w-1/2 mb-5' : 'w-4/5 md:w-[85%]'
			} `}
		>
			<Checkbox checked={false} disabled={true} />
			<textarea
				ref={textareaRef}
				className="bg-inherit outline-none resize-none flex-1 md"
				placeholder="To-do"
				onKeyDown={handleKeyDown}
				value={input}
				onChange={handleInputChange}
				maxLength={subtask ? 48 : 102}
				rows={generateTextAreaRows()}
				onBlur={handleBlur}
				onFocus={handleFocus}
			/>
			<button type="submit" className="hidden">
				Submit
			</button>
		</form>
	);
}

export default TaskForm;
