import { useState } from 'react';
import { useDarkMode, useDarkModeUpdate } from '../../context/DarkMode';
import { FiHelpCircle, FiToggleLeft, FiToggleRight } from 'react-icons/fi';

function Footer() {
	const [open, setOpen] = useState(false);
	const toggleDarkMode = useDarkModeUpdate();
	const darkMode = useDarkMode();
	return (
		<footer className="h-14 z-40 flex justify-end items-center px-3  dark:border-pureBlack md:px-4 md:h-16 lg:h-20   fixed bottom-0 right-0 w-max rounded-full ml-auto">
			{/* Info */}
			<div
				className={`${
					open ? '' : 'translate-x-[200%] opacity-0 '
				} text-sm md:text-base absolute bottom-full right-3 md:right-4 p-5 flex flex-col space-y-3 transition-all duration-500  bg-main-dark-darker text-white dark:bg-main-light-lighter dark:text-black rounded-xl border dark:border-pureBlack w-max`}
			>
				<p className="">
					Built by{' '}
					<a
						href="https://jonathancarpena.me/"
						target="_blank"
						className="underline underline-offset-2"
					>
						Jonathan Carpena{' '}
					</a>
				</p>

				<p className="">
					Check Out the{' '}
					<a
						href="https://github.com/jonathancarpena/i-am-productive"
						className="underline underline-offset-2 "
					>
						GitHub Repo
					</a>
				</p>

				<div className=" flex items-start">
					<span>Dark Mode: {darkMode ? 'On' : 'Off'}</span>
					<button
						onClick={toggleDarkMode}
						className="ml-auto   text-white  dark:text-black -mt-1"
					>
						{!darkMode ? (
							<FiToggleLeft className="w-11 h-auto " />
						) : (
							<FiToggleRight className="w-11  h-auto" />
						)}
					</button>
				</div>
			</div>

			<button
				onClick={() => setOpen(!open)}
				className={`${
					open
						? 'bg-main-dark-0 text-white dark:bg-main-light-0 dark:text-black'
						: 'bg-inherit text-inherit dark:text-white'
				}  rounded-full active:scale-90 ml-auto transition-transform duration-100 ouline-none`}
			>
				<FiHelpCircle className="w-10 h-10 md:w-12 md:h-12" />
			</button>
		</footer>
	);
}

export default Footer;
