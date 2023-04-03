// Components
import Checkbox from './Checkbox';
import TextArea from '../../TextArea';
import { FiTrash } from 'react-icons/fi';

interface Props {
	id: string;
	content: string;
	completed: boolean;
	parent: string;
	editTask: (id: string, content: string, parent: string) => void;
	toggleTask: (id: string, parent: string) => void;
	deleteTask: (id: string, parent: string) => void;
}

function SubTask({
	id,
	content,
	completed,
	parent,
	editTask,
	toggleTask,
	deleteTask,
}: Props) {
	const handleCheckboxClick = () => toggleTask(id, parent);
	const handleDeleteButton = () => deleteTask(id, parent);
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
		editTask(id, e.currentTarget.value, parent);

	return (
		<li className="flex flex-col w-full mb-3 ">
			<div className="flex items-start gap-3">
				<Checkbox
					onClick={handleCheckboxClick}
					checked={completed}
					name={content}
				/>
				<TextArea
					value={content}
					onChange={handleChange}
					sx={`${completed ? 'line-through opacity-50' : ''} flex-1`}
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

export default SubTask;
