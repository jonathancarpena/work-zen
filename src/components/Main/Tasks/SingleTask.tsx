import { useState } from 'react';
import { Subtask } from '../../../lib/interfaces';
import useMobileScreen from '../../../hooks/useMobileScreen';
// Components
import Checkbox from './Checkbox';
import TaskForm from './TaskForm';
import { FiTrash, FiCornerDownRight } from 'react-icons/fi';

interface Props {
	id: string;
	completed: boolean;
	content: string;
	subtasks?: Subtask;
	editTask: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
	toggleTask: (id: string) => void;
	deleteTask: (id: string) => void;
	addSubtask: (id: string, content: string, parent?: string) => void;
	editSubtask: (
		e: React.KeyboardEvent<HTMLTextAreaElement>,
		parent: string
	) => void;
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
	const isMobile = useMobileScreen();

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

	// const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
	// }

	// Max 33 on Small Screens
	// Max 50 on Med-Large Screens

	function generateTextAreaRows() {
		let rows: number = 1;
		if (isMobile) {
			if (content.length > 50) {
				rows = 3;
			} else if (content.length > 34) {
				rows = 2;
			}
		} else {
			if (content.length > 50) {
				rows = 2;
			} else {
				rows = 1;
			}
		}
		return rows;
	}

	return (
		<li className="flex flex-col w-full">
			{/* Task Content */}
			<div className="flex items-start space-x-3 mb-3">
				<Checkbox
					onClick={handleCheckboxClick}
					checked={completed}
					name={content}
				/>
				<textarea
					className={`${
						completed ? 'line-through opacity-50' : ''
					} bg-inherit outline-none resize-none flex-1`}
					name={id}
					defaultValue={content}
					maxLength={102}
					rows={generateTextAreaRows()}
					onKeyDown={editTask}
					// onBlur={handleBlur}
				/>

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

			{subtasks && Object.entries(subtasks).length > 0 && (
				<ul className="flex flex-col ml-9">
					{Object.entries(subtasks).map(([childID, task]) => (
						<SubtaskItem
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

interface SubTaskItemProps {
	id: string;
	content: string;
	completed: boolean;
	parent: string;
	editTask: (
		e: React.KeyboardEvent<HTMLTextAreaElement>,
		parent: string
	) => void;
	toggleTask: (id: string, parent: string) => void;
	deleteTask: (id: string, parent: string) => void;
}

function SubtaskItem({
	id,
	content,
	completed,
	parent,
	editTask,
	toggleTask,
	deleteTask,
}: SubTaskItemProps) {
	const isMobile = useMobileScreen();
	const handleCheckboxClick = () => toggleTask(id, parent);
	const handleDeleteButton = () => deleteTask(id, parent);
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.code === 'Enter') {
			e.preventDefault();
		}
		editTask(e, parent);
	};

	function generateTextAreaRows() {
		let rows: number = 1;

		if (isMobile) {
			if (content.length > 50) {
				rows = 3;
			} else if (content.length > 34) {
				rows = 2;
			}
		} else {
			if (content.length > 50) {
				rows = 2;
			} else {
				rows = 1;
			}
		}

		return rows;
	}

	return (
		<li className="flex flex-col w-3/5 mb-3">
			<div className="flex items-start gap-3">
				<Checkbox
					onClick={handleCheckboxClick}
					checked={completed}
					name={content}
				/>
				<textarea
					className={`${
						completed ? 'line-through opacity-50' : ''
					} bg-inherit outline-none resize-none flex-1`}
					name={id}
					maxLength={65}
					defaultValue={content}
					rows={generateTextAreaRows()}
					onKeyDown={handleKeyDown}
				/>

				<button
					onClick={handleDeleteButton}
					className={`w-9 h-9 rounded active:bg-neutral-300`}
				>
					<FiTrash className="w-6 h-6 mx-auto" />
				</button>
			</div>
		</li>
	);
}
