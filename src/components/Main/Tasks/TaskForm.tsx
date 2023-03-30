import { useState, useRef } from 'react';
import Checkbox from './Checkbox';

interface Props {
	addTask: (id: string, content: string, parent?: string) => void;
	subtask: boolean;
	parentId?: string;
}

function TaskForm({ addTask, subtask = false, parentId }: Props) {
	const [input, setInput] = useState('');
	const textareaRef = useRef<any>();
	const formRef = useRef<any>();

	function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
		if (e.code === 'Enter') {
			e.preventDefault();
			formRef.current.requestSubmit();
		}
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const id = Date.now().toString();
		const content = input.trim();

		if (subtask && parentId && parentId.length > 0) {
			addTask(id, content, parentId);
		} else {
			addTask(id, content);
		}

		setInput('');
	}

	function handleInputChange(e: React.FormEvent<HTMLTextAreaElement>) {
		setInput(e.currentTarget.value);
	}
	function generateRows() {
		let rows: number;
		if (input.length > 42) {
			rows = 3;
		} else if (input.length > 21) {
			rows = 2;
		} else {
			rows = 1;
		}

		return rows;
	}

	return (
		<form
			ref={formRef}
			onSubmit={handleSubmit}
			className={`flex items-start gap-x-3 ${subtask ? 'ml-9' : ''} `}
		>
			<Checkbox checked={false} disabled={true} />
			<textarea
				ref={textareaRef}
				className="bg-inherit outline-none resize-none"
				placeholder="To-do"
				onKeyDown={handleKeyDown}
				value={input}
				onChange={handleInputChange}
				maxLength={63}
				rows={generateRows()}
			/>
			<button type="submit" className="hidden">
				Submit
			</button>
		</form>
	);
}

export default TaskForm;
