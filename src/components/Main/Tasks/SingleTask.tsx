import { Task } from '../../../lib/interfaces';
import Checkbox from './Checkbox';
import { useState } from 'react';

interface Props {
	id: string;
	completed: boolean;
	content: string;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleToggleTask: (id: string) => void;
}

function SingleTask({
	id,
	completed,
	content,
	handleInputChange,
	handleToggleTask,
}: Props) {
	function handleClick() {
		handleToggleTask(id);
	}
	return (
		<li className="flex items-center gap-3">
			<Checkbox onClick={handleClick} checked={completed} name={content} />
			{completed ? (
				<span className={`line-through`}>{content}</span>
			) : (
				<input
					className={`bg-transparent outline-none`}
					value={content}
					name={id}
					onChange={handleInputChange}
				/>
			)}
		</li>
	);
}

export default SingleTask;
