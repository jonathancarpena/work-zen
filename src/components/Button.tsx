import React from 'react';

interface Props {
	children?: React.ReactNode;
	value?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	disabled?: boolean;
	block?: boolean;
	active?: boolean;
	size?: 'sm' | 'md' | 'lg';
	sx?: string;
	type?: 'button' | 'reset' | 'submit';
	onSubmitClick?: (e: React.FormEvent) => void;
}

function Button({
	type = 'button',
	children,
	onClick,
	active,
	size = 'md',
	disabled = false,
	block = true,
	value = '',
	sx,
}: Props) {
	return (
		<button
			type={type}
			disabled={disabled}
			onClick={onClick}
			value={value}
			className={`${
				active
					? 'bg-main-dark-darker text-white dark:bg-main-light-lighter dark:text-black '
					: `bg-inherit text-black  dark:text-white  ${
							!disabled
								? 'active:scale-90 lg:hover:bg-white lg:dark:hover:bg-main-dark-lighter'
								: ''
					  }  `
			}  ${block ? 'w-full rounded-md' : 'w-max rounded-md px-4'} ${
				size === 'sm' ? 'h-8 md:h-10' : ''
			} 		${size === 'md' ? 'h-11 md:h-14' : ''} ${
				size === 'lg' ? 'h-16 md:h-20' : ''
			}  
			
			flex justify-center items-center  transition-transform duration-100 border border-pureBlack dark:border-white text-sm md:text-lg select-none ${sx}`}
		>
			{children}
		</button>
	);
}

export function IconButton({
	children,
	onClick,
	active,
	size = 'md',
	disabled = false,
	block = false,
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
								? 'active:scale-90 lg:hover:bg-white lg:dark:hover:bg-main-dark-lighter'
								: ''
					  }`
			}  ${block ? 'w-full' : 'w-max'} ${
				size === 'sm'
					? 'h-8 md:h-10 w-8 md:w-10 rounded-md md:rounded-lg text-base md:text-lg'
					: ''
			} 	${
				size === 'md'
					? 'h-11 md:h-14 w-11 md:w-14 rounded-lg md:rounded-xl text-xl md:text-2xl'
					: ''
			} ${
				size === 'lg'
					? 'h-16 md:h-20 w-16 md:w-20 rounded-lg md:rounded-xl text-xl md:text-2xl'
					: ''
			}  
		aspect-square
			flex justify-center items-center  transition-transform duration-100 border border-pureBlack dark:border-white  select-none ${sx}`}
		>
			{children}
		</button>
	);
}

export default Button;
