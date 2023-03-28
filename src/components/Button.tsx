import React from 'react';

interface Props {
	children?: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	block?: boolean;
	icon?: boolean;
	active?: boolean;
	size?: 'sm' | 'md' | 'lg';
	sx?: string;
}

function Button({
	children,
	onClick,
	active,
	size = 'md',
	disabled = false,
	block = true,
	icon = false,
	sx,
}: Props) {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={`${
				active
					? 'bg-main-dark-darker text-white dark:bg-main-light-lighter dark:text-black '
					: `bg-inherit text-black  dark:text-white  ${
							!disabled
								? 'active:scale-90 hover:bg-white dark:hover:bg-main-dark-lighter'
								: ''
					  }  `
			} ${icon ? 'w-11 md:w-14 rounded-xl' : ''} ${
				block && !icon ? 'w-full rounded-md' : 'w-max rounded-md px-4'
			} ${size === 'sm' ? 'h-8 md:h-10' : ''} 		${
				size === 'md' ? 'h-11 md:h-14' : ''
			} ${size === 'lg' ? 'h-16 md:h-20' : ''}  
	
			flex justify-center items-center  transition-transform duration-100 border border-pureBlack dark:border-white text-sm md:text-lg ${sx}`}
		>
			{children}
		</button>
	);
}

export default Button;
