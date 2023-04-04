// Redux
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { updateTab } from '../../redux/features/tabSlice';

// Components
import { FiCrosshair, FiHash, FiClipboard } from 'react-icons/fi';
import { IconButton } from '../Button';

// Types
import { TabOptions } from '../../lib/interfaces';

// Utils
import { formatTime } from '../../lib/utils';

interface NavItems {
	value: TabOptions;
	icon: any;
}
function Navbar() {
	const tab = useAppSelector((state) => state.tabs.current);
	const { timer, stage } = useAppSelector((state) => state.focus);
	const dispatch = useAppDispatch();
	const NavItems: NavItems[] = [
		{ value: 'focus', icon: <FiCrosshair /> },
		{ value: 'tasks', icon: <FiClipboard /> },
		{ value: 'calculator', icon: <FiHash /> },
	];

	const handleClick = (input: TabOptions) => dispatch(updateTab(input));

	function renderTimer() {
		const messages = ['', '(Break)', '(Break)'];

		return (
			<p className="text-neutral-400 flex gap-x-2 flex-row-reverse lg:flex-row">
				<span>{formatTime(timer)}</span> <span>{messages[stage]}</span>
			</p>
		);
	}
	return (
		<>
			{/* Notch Div */}
			<div className="hidden standalone:block w-full h-9 bg-gradient-to-b from-main-dark-lighter to-transparent dark:from-main-dark-0  " />
			<nav className="flex justify-end items-center gap-x-3 w-full z-30 px-3 md:px-4 md:h-20 min-h-16 py-3 bg-inherit standalone:pt-2 max-w-screen-2xl lg:flex-row-reverse  mx-auto">
				<span className="text-neutral-400">{renderTimer()}</span>
				<ul className="flex items-center h-full space-x-3 ">
					{NavItems.map((item) => (
						<li key={`NavItem-${item.value}`}>
							<IconButton
								active={tab === item.value}
								onClick={() => handleClick(item.value)}
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
