import { useState } from 'react';
import { useDarkModeUpdate } from '../../lib/context/DarkMode';
import { FiHelpCircle } from 'react-icons/fi';

function Footer() {
	const [open, setOpen] = useState(false);
	const toggleDarkMode = useDarkModeUpdate();
	return (
		<footer className="h-16 w-full z-50 flex justify-end items-center px-3 border-t md:px-4 md:h-20 lg:border-none relative bg-inherit">
			{/* Info */}
			<div
				className={`${
					open ? '' : 'translate-x-[200%] opacity-0 '
				} absolute bottom-full right-3 md:right-4 p-5 flex flex-col space-y-3 transition-all duration-500  bg-main-light-lighter border border-black text-[#000000]  dark:bg-main-dark-darker dark:text-white dark:border-white `}
			>
				<p className="">
					Built by{' '}
					<a
						href="https://jonathancarpena.me/"
						target="_blank"
						className="underline underline-offset-2 font-semibold"
					>
						Jonathan Carpena{' '}
					</a>
				</p>

				<p className="">
					Check Out the{' '}
					<a
						href="https://github.com/jonathancarpena/i-am-productive"
						className="underline underline-offset-2 font-semibold"
					>
						GitHub Repo
					</a>
				</p>

				<div className=" flex">
					<span>Dark Mode</span>
					<button onClick={toggleDarkMode} className="ml-auto">
						Click
					</button>
				</div>
			</div>

			<button
				onClick={() => setOpen(!open)}
				className={`${
					open
						? 'bg-main-dark-0 text-white dark:bg-main-light-0 dark:text-black'
						: 'bg-inherit text-inherit dark:text-white'
				}  rounded-full active:scale-85 ml-auto transition-transform duration-100 ouline-none`}
			>
				<FiHelpCircle className="w-11 h-11" />
			</button>
		</footer>
	);
}

export default Footer;
