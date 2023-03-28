import { useState, useContext, createContext } from 'react';

interface Props {
	children?: JSX.Element | JSX.Element[] | React.ReactNode;
}

// Context
export const DarkModeContext = createContext(false);
export const DarkModeUpdateContext = createContext(() => {});

function DarkModeProvider({ children }: Props) {
	const [isDark, setIsDark] = useState(() => {
		const preferDark = window.matchMedia(
			'(prefers-color-scheme: dark)'
		).matches;
		if (preferDark) {
			document.documentElement.classList.add('dark');
			document.body.style.backgroundColor = '#262626';
		}
		return preferDark;
	});

	function toggleDarkMode() {
		if (isDark) {
			document.documentElement.classList.add('dark');
			document.body.style.backgroundColor = '#262626';
		} else {
			document.documentElement.classList.remove('dark');
			document.body.style.backgroundColor = '#fafafa';
		}
		setIsDark((prevDarkMode) => !prevDarkMode);
	}

	return (
		<DarkModeContext.Provider value={isDark}>
			<DarkModeUpdateContext.Provider value={toggleDarkMode}>
				{children}
			</DarkModeUpdateContext.Provider>
		</DarkModeContext.Provider>
	);
}

export default DarkModeProvider;

// Custom Hooks
export const useDarkMode = () => useContext(DarkModeContext);
export const useDarkModeUpdate = () => useContext(DarkModeUpdateContext);
