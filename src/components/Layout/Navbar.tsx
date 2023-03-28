// Context
import { useTab, useTabUpdate } from '../../lib/context/Tab';

// Components
import { FiCrosshair, FiHash, FiEdit2, FiClipboard } from 'react-icons/fi';

// Types
import { TabOptions } from '../../lib/interfaces';

interface NavItems {
	value: TabOptions;
	icon: any;
}
function Navbar() {
	const tab = useTab();
	const handleTabUpdate = useTabUpdate();
	const NavItems: NavItems[] = [
		{ value: 'focus', icon: <FiCrosshair /> },
		{ value: 'notes', icon: <FiEdit2 /> },
		{ value: 'tasks', icon: <FiClipboard /> },
		{ value: 'calculator', icon: <FiHash /> },
	];
	return (
		<>
			{/* <div className="w-full h-[20px] bg-gradient-to-b from-black to-transparent hidden standalone:block"></div> */}
			<nav className="h-16 w-full z-30 px-3 md:px-4 md:h-20   bg-inherit  ">
				<ul className="flex items-center h-full space-x-3 max-w-screen-2xl mx-auto ">
					{NavItems.map((item) => (
						<li key={`NavItem-${item.value}`}>
							<button
								onClick={() => handleTabUpdate(item.value)}
								className={`${
									tab === item.value
										? 'bg-main-dark-darker text-white dark:bg-main-light-lighter dark:text-black'
										: 'bg-inherit text-black  dark:text-white'
								} w-11 h-11 md:w-14 md:h-14 flex justify-center items-center rounded-xl transition-transform duration-100 border border-pureBlack dark:border-white text-xl md:text-2xl active:scale-90`}
							>
								{item.icon}
							</button>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}

export default Navbar;
