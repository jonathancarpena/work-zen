import React from 'react';

interface Props {
	children?: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	sx?: string;
}

function Button({ children, onClick, disabled, sx }: Props) {
	return (
		<button
			disabled={disabled}
			type="button"
			onClick={onClick}
			className={`flex justify-center  ${sx}`}
		>
			<span className="p-2 md:p-3 active:scale-90 w-full">{children}</span>
		</button>
	);
}

export default Button;
