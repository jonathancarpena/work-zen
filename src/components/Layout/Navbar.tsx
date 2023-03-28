// Context
import { useTab, useTabUpdate } from '../../lib/context/Tab';

// Components
import { FiCrosshair, FiHash, FiEdit2, FiClipboard } from 'react-icons/fi';
import Button from '../Button';

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
		{ value: 'focus', icon: <FiCrosshair className="text-xl md:text-2xl" /> },
		{ value: 'notes', icon: <FiEdit2 className="text-xl md:text-2xl" /> },
		{ value: 'tasks', icon: <FiClipboard className="text-xl md:text-2xl" /> },
		{ value: 'calculator', icon: <FiHash className="text-xl md:text-2xl" /> },
	];
	return (
		<>
			{/* <div className="w-full h-[20px] bg-gradient-to-b from-black to-transparent hidden standalone:block"></div> */}
			<nav className="h-16 w-full z-30 px-3 md:px-4 md:h-20   bg-inherit  ">
				<ul className="flex items-center h-full space-x-3 max-w-screen-2xl mx-auto ">
					{NavItems.map((item) => (
						<li key={`NavItem-${item.value}`}>
							<Button
								icon
								block={false}
								active={tab === item.value}
								onClick={() => handleTabUpdate(item.value)}
							>
								{item.icon}
							</Button>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}

export default Navbar;
