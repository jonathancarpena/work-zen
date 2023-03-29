import { useState, useEffect, useRef } from 'react';
import Section from '../../Layout/Section';
import Checkbox from './Checkbox';
import { Task } from '../../../lib/interfaces';
import SingleTask from './SingleTask';

interface Props {
	visible: boolean;
}

function Tasks({ visible }: Props) {
	const [loading, setLoading] = useState(false);
	const [tasks, setTasks] = useState<Task[] | null>(null);
	const [input, setInput] = useState('');

	const storageKey = 'workzen-tasks';
	useEffect(() => {
		if (tasks === null) {
			getTasks();
		}
	});
	function getTasks() {
		setLoading(true);
		let prevNotes: any = localStorage.getItem(storageKey);
		if (prevNotes) {
			prevNotes = JSON.parse(prevNotes);
		} else {
			localStorage.setItem(storageKey, JSON.stringify([]));
			prevNotes = [];
		}
		setTasks(prevNotes);

		setLoading(false);
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		let newTask = {
			id: Date.now().toString(),
			completed: false,
			content: input,
		};
		if (tasks && tasks.length > 0) {
			console.log('NOT EMPTY');
			setTasks([...tasks, newTask]);
		} else {
			console.log('FROM EMPTY');
			setTasks([newTask]);
		}

		setInput('');
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setInput(e.target.value);
	}

	function handleKeyCapture(e: React.KeyboardEvent<HTMLInputElement>) {}

	return (
		<Section
			isVisible={visible}
			uniqueKey="tasks"
			sx="max-w-screen-2xl mx-auto flex flex-col gap-y-3"
		>
			{tasks && tasks.length > 0 && (
				<ul className="flex flex-col gap-y-3">
					{tasks.map((item) => (
						<SingleTask
							key={item.id}
							id={item.id}
							content={item.content}
							completed={true}
						/>
					))}
				</ul>
			)}

			{/* New Task Form */}
			<form onSubmit={handleSubmit} className={'flex items-center gap-x-3'}>
				<Checkbox checked={false} />
				<input
					value={input}
					onChange={handleInputChange}
					className="bg-inherit outline-none text-lg"
					placeholder="To-do"
				/>
				<button type="submit" className="hidden">
					Submit
				</button>
			</form>
		</Section>
	);
}

export default Tasks;
