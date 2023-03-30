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
	const [loading, setLoading] = useState(false);
	const [tasks, setTasks] = useState<State['tasks'] | null>(null);

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

	function addTask(id: string, content: string) {
		let newTask = {
			id,
			content,
			completed: false,
			subtasks: {},
		};

		if (tasks && Object.keys(tasks).length > 0) {
			setTasks({ ...tasks, [id]: newTask });
		} else {
			setTasks({ [id]: newTask });
		}
	}

	function editTask(e: React.KeyboardEvent<HTMLTextAreaElement>) {
		const taskId = e.currentTarget.name;
		const newContent = e.currentTarget.value;

		if (e.key === 'Enter') {
			e.preventDefault();
		}

		if (tasks && newContent.length > 0) {
			let oldTask = tasks[taskId];
			setTasks({
				...tasks,
				[taskId]: {
					...oldTask,
					content: newContent,
				},
			});
		} else {
			deleteTask(taskId);
		}
	}

	function deleteTask(id: string) {
		if (tasks) {
			let oldListOfTasks = tasks;
			delete oldListOfTasks[id];
			setTasks({ ...oldListOfTasks });
		}
	}

	function toggleTask(id: string) {
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

	function addSubtask(id: string, content: string, parent?: string) {
		if (tasks && Object.keys(tasks).length > 0 && parent) {
			const newTask = { content, completed: false };
			let parentTask = tasks[parent];
			parentTask['subtasks'] = {
				...parentTask['subtasks'],
				[id]: { ...newTask },
			};

			setTasks({ ...tasks, [parent]: parentTask });
		}
	}

	function editSubtask(
		e: React.KeyboardEvent<HTMLTextAreaElement>,
		parent: string
	) {
		e.preventDefault();
		console.log('EDITING SUB');
	}

	function toggleSubtask(id: string, parent: string) {
		let oldListOfTasks = { ...tasks };
		let parentTask = oldListOfTasks[parent];

		if (parentTask['subtasks']) {
			let copyOfParentSubtasks = parentTask['subtasks'];
			console.log(oldListOfTasks[parent]);
			// oldListOfTasks[parent] = {
			// 	...oldListOfTasks[parent],
			// 	"subtasks": {
			// 		...copyOfParentSubtasks,
			// 		[id]: {

			// 		}
			// 	}
			// }
			setTasks({ ...oldListOfTasks });
		}
	}

	function deleteSubtask(id: string, parent: string) {
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
	}

	return (
		<Section
			isVisible={visible}
			uniqueKey="tasks"
			sx="max-w-screen-2xl mx-auto flex flex-col  text-base md:text-lg"
		>
			{tasks && Object.keys(tasks).length > 0 && (
				<ul className="flex flex-col gap-y-3 mb-3">
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
			<TaskForm addTask={addTask} subtask={false} />
		</Section>
	);
}

export default Tasks;
