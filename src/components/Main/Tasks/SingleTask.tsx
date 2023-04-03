import { useState } from 'react';
import type { SubTask as SubTaskType } from '../../../lib/interfaces';

// Components
import SubTask from './SubTask';
import Checkbox from './Checkbox';
import TextArea from '../../TextArea';
import TaskForm from './TaskForm';
import { FiTrash, FiCornerDownRight } from 'react-icons/fi';

interface Props {
	id: string;
	completed: boolean;
	content: string;
	subtasks?: SubTaskType;
	editTask: (id: string, content: string) => void;
	toggleTask: (id: string) => void;
	deleteTask: (id: string) => void;
	addSubtask: (id: string, content: string, parent?: string) => void;
	editSubtask: (id: string, content: string, parent: string) => void;
	toggleSubtask: (id: string, parent: string) => void;
	deleteSubtask: (id: string, parent: string) => void;
}

function SingleTask({
	id,
	completed,
	content,
	subtasks,
	editTask,
	toggleTask,
	deleteTask,
	addSubtask,
	editSubtask,
	toggleSubtask,
	deleteSubtask,
}: Props) {
	const [subtaskForm, setSubtaskForm] = useState<number[]>([]);

	const handleCheckboxClick = () => toggleTask(id);
	const handleDeleteButton = () => deleteTask(id);
	const handleAddSubtaskButton = () =>
		setSubtaskForm((prevState) => [prevState.length, ...prevState]);
	const handleSubmiTaskForm = (
		id: string,
		content: string,
		parent?: string
	) => {
		if (parent) {
			addSubtask(id, content, parent);
			let oldSubTaskForm = subtaskForm;
			if (oldSubTaskForm.length > 0) {
				oldSubTaskForm.pop();
				setSubtaskForm([...oldSubTaskForm]);
			} else {
				setSubtaskForm([]);
			}
		}
	};
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
		editTask(id, e.currentTarget.value);
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) =>
		e.code === 'Enter' && e.preventDefault();

	return (
		<li className="flex flex-col items-end  ">
			{/* Task Content */}
			<div className="flex items-start space-x-3 mb-3 w-full">
				<Checkbox
					onClick={handleCheckboxClick}
					checked={completed}
					name={content}
				/>

				<TextArea
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					value={content}
					sx={`${completed ? 'line-through opacity-50' : ''} flex-1`}
				/>

				{/* Action Buttons: Add SubTask, Delete Task */}
				<div className="flex items-start space-x-3">
					<button
						onClick={handleAddSubtaskButton}
						className={`w-9 h-9 rounded active:bg-neutral-300 `}
					>
						<FiCornerDownRight className="w-6 h-6 mx-auto" />
					</button>

					<button
						onClick={handleDeleteButton}
						className={`w-9 h-9 rounded active:bg-neutral-300`}
					>
						<FiTrash className="w-6 h-6 mx-auto" />
					</button>
				</div>
			</div>

			{/* SubTasks */}
			{subtasks && Object.entries(subtasks).length > 0 && (
				<ul className="flex flex-col w-11/12">
					{Object.entries(subtasks).map(([childID, task]) => (
						<SubTask
							key={childID}
							id={childID}
							content={task.content}
							completed={task.completed}
							parent={id}
							editTask={editSubtask}
							toggleTask={toggleSubtask}
							deleteTask={deleteSubtask}
						/>
					))}
				</ul>
			)}

			{/* If Adding a SubTask */}
			{subtaskForm.length > 0 &&
				subtaskForm.map((item) => (
					<TaskForm
						key={`${id}-subtask-form-${item}`}
						addTask={handleSubmiTaskForm}
						subtask={true}
						parentId={id}
					/>
				))}
		</li>
	);
}
export default SingleTask;
