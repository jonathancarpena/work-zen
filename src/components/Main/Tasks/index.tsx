import { useState, useEffect, useRef } from 'react';
import Section from '../../Layout/Section';
import TaskForm from './TaskForm';
import SingleTask from './SingleTask';
import { Task } from '../../../lib/interfaces';

interface Props {
	visible: boolean;
}

interface State {
	tasks: Task;
}

function Tasks({ visible }: Props) {
	const [loading, setLoading] = useState(true);
	const [tasks, setTasks] = useState<State['tasks'] | null>(null);
	const storageKey = 'workzen-tasks';

	useEffect(() => {
		if (tasks === null) {
			getTasksFromLocalStorage();
		} else {
			postTasksToLocalStorage();
		}
	}, [tasks]);

	const getTasksFromLocalStorage = () => {
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
	};

	const postTasksToLocalStorage = () => {
		setLoading(true);
		if (localStorage.getItem(storageKey)) {
			localStorage.setItem(storageKey, JSON.stringify(tasks));
		}
		setLoading(false);
	};

	const addTask = (id: string, content: string) => {
		let newTask = {
			id,
			content,
			completed: false,
		};

		if (tasks && Object.keys(tasks).length > 0) {
			setTasks({ ...tasks, [id]: newTask });
		} else {
			setTasks({ [id]: newTask });
		}
	};

	const editTask = (id: string, content: string) => {
		if (tasks && content.length > 0) {
			let oldTask = tasks[id];
			setTasks({
				...tasks,
				[id]: {
					...oldTask,
					content: content,
				},
			});
		}
	};

	const deleteTask = (id: string) => {
		if (tasks) {
			let oldListOfTasks = tasks;
			delete oldListOfTasks[id];
			setTasks({ ...oldListOfTasks });
		}
	};

	const toggleTask = (id: string) => {
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
	};

	const addSubtask = (id: string, content: string, parent?: string) => {
		if (tasks && Object.keys(tasks).length > 0 && parent) {
			const newTask = { content, completed: false };
			let parentTask = tasks[parent];
			parentTask['subtasks'] = {
				...parentTask['subtasks'],
				[id]: { ...newTask },
			};

			setTasks({ ...tasks, [parent]: parentTask });
		}
	};

	const editSubtask = (id: string, content: string, parent: string) => {
		let oldListOfTasks = { ...tasks };
		let parentTask = oldListOfTasks[parent];

		if (parentTask['subtasks']) {
			// Update Child
			let childTask = parentTask['subtasks'][id];
			childTask = {
				...childTask,
				content: content,
			};

			// Update Parent
			parentTask = {
				...parentTask,
				subtasks: {
					[id]: { ...childTask },
				},
			};

			// Update List Of Tasks
			oldListOfTasks = {
				...oldListOfTasks,
				[parent]: { ...parentTask },
			};

			setTasks({ ...oldListOfTasks });
		}
	};

	const toggleSubtask = (id: string, parent: string) => {
		let oldListOfTasks = { ...tasks };
		let parentTask = oldListOfTasks[parent];

		if (parentTask['subtasks']) {
			// Update Child
			let childTask = parentTask['subtasks'][id];
			childTask = {
				...childTask,
				completed: !childTask.completed,
			};

			// Update Parent
			parentTask = {
				...parentTask,
				subtasks: {
					[id]: { ...childTask },
				},
			};

			// Update List Of Tasks
			oldListOfTasks = {
				...oldListOfTasks,
				[parent]: { ...parentTask },
			};

			setTasks({ ...oldListOfTasks });
		}
	};

	const deleteSubtask = (id: string, parent: string) => {
		let oldListOfTasks = { ...tasks };
		let updatedParentTask = oldListOfTasks[parent];
		if (updatedParentTask['subtasks']) {
			delete updatedParentTask['subtasks'][id];
			oldListOfTasks = {
				...oldListOfTasks,
				[parent]: updatedParentTask,
			};
			setTasks({ ...oldListOfTasks });
		}
	};

	return (
		<Section
			isVisible={visible}
			uniqueKey="tasks"
			sx="max-w-screen-sm mx-auto flex flex-col items-start md:text-lg"
		>
			<h1 className="text-3xl mb-3 font-bold">My Tasks</h1>
			{tasks && Object.keys(tasks).length > 0 && (
				<ul className="flex flex-col w-full">
					{Object.entries(tasks).map(([id, task]) => (
						<SingleTask
							key={id}
							id={id}
							content={task.content}
							completed={task.completed}
							subtasks={task.subtasks}
							editTask={editTask}
							toggleTask={toggleTask}
							deleteTask={deleteTask}
							addSubtask={addSubtask}
							editSubtask={editSubtask}
							toggleSubtask={toggleSubtask}
							deleteSubtask={deleteSubtask}
						/>
					))}
				</ul>
			)}

			{/* New Task Form */}
			<TaskForm
				addTask={addTask}
				subtask={false}
				otherTaskPresent={tasks && Object.keys(tasks).length > 0 ? true : false}
			/>
		</Section>
	);
}

export default Tasks;
