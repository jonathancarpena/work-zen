import { useState, useRef } from 'react';
import Checkbox from './Checkbox';
import TextArea from '../../TextArea';

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
	const formRef = useRef<any>();
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (input) {
			const content = input.trim();
			const id = Date.now().toString();
			if (subtask && parentId) {
				addTask(id, content, parentId);
			} else {
				addTask(id, content);
			}
			setInput('');
		}
	};
	const handleFocus = () => setFocus(true);
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
		setInput(e.currentTarget.value);
	const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
		if (input) {
			e.preventDefault();
			formRef.current.requestSubmit();
		}
		setFocus(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.code === 'Enter') {
			e.preventDefault();
			formRef.current.requestSubmit();
		}
	};

	return (
		<form
			ref={formRef}
			onSubmit={handleSubmit}
			className={`${
				otherTaskPresent ? `${focus ? '' : 'opacity-25'}` : ''
			} flex items-center gap-x-3 mt-1 ${
				subtask ? 'w-11/12 mb-5  pr-10' : 'w-full pr-24 '
			} `}
		>
			<Checkbox checked={false} disabled={true} />
			<TextArea
				value={input}
				onChange={handleChange}
				onBlur={handleBlur}
				onFocus={handleFocus}
				onKeyDown={handleKeyDown}
				placeholder="To-do"
				sx={'flex-1'}
			/>
		</form>
	);
}

export default TaskForm;
