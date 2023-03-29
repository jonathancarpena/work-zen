import { useState, useContext, createContext } from 'react';
import { TabOptions } from '../lib/interfaces';

interface Props {
	children?: JSX.Element | JSX.Element[] | React.ReactNode;
}

// Context
export const TabContext = createContext<TabOptions>('focus');
export const TabUpdateContext = createContext((value: TabOptions) => {});

function TabProvider({ children }: Props) {
	const [tab, setTab] = useState<TabOptions>('focus');

	function updateTab(value: TabOptions) {
		setTab(value);
	}

	return (
		<TabContext.Provider value={tab}>
			<TabUpdateContext.Provider value={updateTab}>
				{children}
			</TabUpdateContext.Provider>
		</TabContext.Provider>
	);
}

export default TabProvider;

// Custom Hooks
export const useTab = () => useContext(TabContext);
export const useTabUpdate = () => useContext(TabUpdateContext);
