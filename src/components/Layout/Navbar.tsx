// Context
import { useTab, useTabUpdate } from '../../lib/context/Tab';

// Components
import { FiCrosshair, FiHash, FiEdit2, FiClipboard } from 'react-icons/fi';
import { IconButton } from '../Button';

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
			{/* Notch Div */}
			<div className="hidden standalone:block w-full h-9 bg-gradient-to-b from-main-dark-lighter to-transparent dark:bg-inherit" />
			<nav className=" w-full z-30 px-3 md:px-4 md:h-20 min-h-16 py-3 bg-inherit standalone:pt-2">
				<ul className="flex items-center h-full space-x-3 max-w-screen-2xl mx-auto ">
					{NavItems.map((item) => (
						<li key={`NavItem-${item.value}`}>
							<IconButton
								active={tab === item.value}
								onClick={() => handleTabUpdate(item.value)}
							>
								{item.icon}
							</IconButton>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}

export default Navbar;
