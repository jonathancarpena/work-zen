import { useTab, useTabUpdate } from '../../lib/context/Tab';
import { FiCrosshair, FiHash, FiEdit2 } from 'react-icons/fi';
import { TabOptions } from '../../lib/interfaces';

interface NavItems {
	value: TabOptions;
	icon: any;
}
function Navbar() {
	const tab = useTab();
	const handleTabUpdate = useTabUpdate();
	const NavItems: NavItems[] = [
		{ value: 'pomodoro', icon: <FiCrosshair /> },
		{ value: 'notes', icon: <FiEdit2 /> },
		{ value: 'calculator', icon: <FiHash /> },
	];
	return (
		<nav className="max-w-screen-xl mx-auto px-3 h-[6vh]">
			<ul className="flex items-center h-full space-x-3">
				{NavItems.map((item) => (
					<li key={`NavItem-${item.value}`}>
						<button
							onClick={() => handleTabUpdate(item.value)}
							className={`${
								tab === item.value
									? 'bg-black text-white'
									: 'bg-white text-black'
							} w-9 h-9 flex justify-center items-center  rounded-full  border text-xl active:scale-90`}
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
