import { useRef, useLayoutEffect } from 'react';

interface Props {
	value: string;
	placeholder?: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLTextAreaElement, Element>) => void;
	onFocus?: () => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
	sx?: string;
}
function TextArea({
	value,
	placeholder = '',
	onChange,
	onBlur,
	onFocus,
	onKeyDown,
	sx,
}: Props) {
	const textbox = useRef<any>(null);

	function adjustHeight() {
		textbox.current.style.height = 'inherit';
		textbox.current.style.height = `${textbox.current.scrollHeight}px`;
	}

	useLayoutEffect(adjustHeight, []);

	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		adjustHeight();
		onChange(e);
	}

	return (
		<textarea
			ref={textbox}
			value={value}
			placeholder={placeholder}
			onChange={handleChange}
			onBlur={onBlur}
			onFocus={onFocus}
			onKeyDown={onKeyDown}
			className={`bg-inherit resize-none outline-none ${sx ? sx : ''}`}
			rows={1}
		/>
	);
}

export default TextArea;
