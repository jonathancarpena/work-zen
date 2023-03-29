import { Task } from '../../../lib/interfaces';
import Checkbox from './Checkbox';

function SingleTask({ content, completed, subtask }: Task) {
	return (
		<li className="flex items-center gap-3">
			<Checkbox checked={completed} name={content} />
			<span className={`${completed ? 'line-through' : ''}`}>{content}</span>
		</li>
	);
}

export default SingleTask;
