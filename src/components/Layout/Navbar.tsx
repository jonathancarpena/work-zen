// Context
import { useTab, useTabUpdate } from '../../lib/context/Tab';

// Components
import { FiCrosshair, FiHash, FiEdit2 } from 'react-icons/fi';

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
		{ value: 'calculator', icon: <FiHash /> },
	];
	return (
		<nav className="h-16 w-full z-30 px-3 md:px-4 md:h-20 lg:border-none relative bg-inherit">
			<ul className="flex items-center h-full space-x-3 max-w-screen-2xl mx-auto standalone:h-[6.75rem]">
				{NavItems.map((item) => (
					<li key={`NavItem-${item.value}`}>
						<button
							onClick={() => handleTabUpdate(item.value)}
							className={`${
								tab === item.value
									? 'bg-main-dark-darker text-white dark:bg-main-light-lighter dark:text-black'
									: 'bg-main-light-lighter text-black dark:bg-main-dark-lighter dark:text-white'
							} w-11 h-11 md:w-14 md:h-14 flex justify-center items-center rounded-xl transition-transform duration-100 border border-main-light-darker dark:border-main-dark-darker text-xl md:text-2xl active:scale-90`}
						>
							{item.icon}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default Navbar;
