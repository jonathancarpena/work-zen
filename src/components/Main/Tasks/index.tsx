import { useState, useEffect, useRef } from 'react';
import Section from '../../Layout/Section';
import Checkbox from './Checkbox';
import { Task, Subtask } from '../../../lib/interfaces';
import SingleTask from './SingleTask';

interface Props {
	visible: boolean;
}

interface State {
	tasks: {
		[id: string]: {
			completed: boolean;
			content: string;
		};
	};
}

function Tasks({ visible }: Props) {
	const [loading, setLoading] = useState(false);
	const [tasks, setTasks] = useState<State['tasks'] | null>(null);
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
			localStorage.setItem(storageKey, JSON.stringify({}));
			prevNotes = {};
		}
		setTasks(prevNotes);

		setLoading(false);
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const id = Date.now().toString();
		let newTask = {
			completed: false,
			content: input,
		};

		if (input) {
			if (tasks && Object.keys(tasks).length > 0) {
				setTasks({ ...tasks, [id]: newTask });
			} else {
				setTasks({ [id]: newTask });
			}
			setInput('');
		}
	}

	function handleNewTaskInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setInput(e.target.value);
	}

	function handleEditTaskChange(e: React.ChangeEvent<HTMLInputElement>) {
		const taskId = e.currentTarget.name;
		if (tasks) {
			let oldTask = tasks[taskId];
			setTasks({
				...tasks,
				[taskId]: {
					...oldTask,
					content: e.target.value,
				},
			});
		}
	}

	function handleToggleTask(id: string) {
		if (tasks) {
			let oldTask = tasks[id];
			setTasks({
				...tasks,
				[id]: {
					...oldTask,
					completed: !tasks[id].completed,
				},
			});
		}
	}

	return (
		<Section
			isVisible={visible}
			uniqueKey="tasks"
			sx="max-w-screen-2xl mx-auto flex flex-col gap-y-3 text-base md:text-lg"
		>
			{tasks && Object.keys(tasks).length > 0 && (
				<ul className="flex flex-col gap-y-3">
					{Object.entries(tasks).map(([id, task]) => (
						<SingleTask
							key={id}
							id={id}
							content={task.content}
							completed={task.completed}
							handleInputChange={handleEditTaskChange}
							handleToggleTask={handleToggleTask}
						/>
					))}
				</ul>
			)}

			{/* New Task Form */}
			<form onSubmit={handleSubmit} className={'flex items-center gap-x-3'}>
				<Checkbox checked={false} />
				<input
					value={input}
					onChange={handleNewTaskInputChange}
					className="bg-inherit outline-none "
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
