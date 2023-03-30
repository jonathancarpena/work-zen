import { useState } from 'react';
import { Subtask } from '../../../lib/interfaces';
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
	const [hover, setHover] = useState(false);
	const [subtaskForm, setSubtaskForm] = useState<number[]>([]);

	const handleMouseEnter = () => setHover(true);
	const handleMouseLeave = () => setHover(false);

	const handleCheckboxClick = () => toggleTask(id);
	const handleDeleteButton = () => deleteTask(id);
	const handleAddSubtaskButton = () =>
		setSubtaskForm((prevState) => [prevState.length, ...prevState]);

	function handleSubmiTaskForm(id: string, content: string, parent?: string) {
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
	}
	function generateTextAreaRows() {
		let rows: number = 1;
		if (content.length > 21) rows = 2;
		if (content.length > 42) rows = 3;
		return rows;
	}

	return (
		<li className="flex flex-col gap-y-3">
			<div
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className="flex items-start gap-3"
			>
				<Checkbox
					onClick={handleCheckboxClick}
					checked={completed}
					name={content}
				/>
				<textarea
					className={`${
						completed ? 'line-through opacity-50' : ''
					} bg-inherit outline-none resize-none`}
					name={id}
					defaultValue={content}
					rows={generateTextAreaRows()}
					onKeyDown={editTask}
				/>

				<button
					onClick={handleAddSubtaskButton}
					className={`${
						hover ? '' : 'lg:opacity-0'
					} transition-opacity duration-100 w-8 h-8`}
				>
					<FiCornerDownRight />
				</button>

				<button
					onClick={handleDeleteButton}
					className={`${
						hover ? '' : 'lg:opacity-0'
					} transition-opacity duration-100 w-8 h-8`}
				>
					<FiTrash />
				</button>
			</div>

			{subtasks && Object.entries(subtasks).length > 0 && (
				<ul className="flex flex-col gap-y-3 ml-9">
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
	const [hover, setHover] = useState(false);
	const handleMouseEnter = () => setHover(true);
	const handleMouseLeave = () => setHover(false);

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
		if (content.length > 21) rows = 2;
		if (content.length > 42) rows = 3;
		return rows;
	}

	return (
		<li className="flex flex-col gap-y-3">
			<div
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className="flex items-start gap-3"
			>
				<Checkbox
					onClick={handleCheckboxClick}
					checked={completed}
					name={content}
				/>
				<textarea
					className={`${
						completed ? 'line-through opacity-50' : ''
					} bg-inherit outline-none resize-none`}
					name={id}
					defaultValue={content}
					rows={generateTextAreaRows()}
					onKeyDown={handleKeyDown}
				/>

				<button
					onClick={handleDeleteButton}
					className={`${
						hover ? '' : 'lg:opacity-0'
					} transition-opacity duration-100 w-8 h-8`}
				>
					<FiTrash />
				</button>
			</div>
		</li>
	);
}
