import React from 'react';
import { FiCheck } from 'react-icons/fi';

interface Props {
	name?: string;
	checked?: boolean;
	onClick?: () => void;
}

function Checkbox({ checked = false, onClick, name = '' }: Props) {
	return (
		<button
			name={name}
			onClick={onClick}
			role="checkbox"
			className={`${
				checked ? 'bg-black dark:bg-main-light-0 ' : ''
			} w-6 h-6 rounded-sm border-2 border-pureBlack dark:border-white  justify-center items-center text-white dark:text-pureBlack text-2xl inline-flex`}
		>
			{checked && <FiCheck />}
		</button>
	);
}

export default Checkbox;
