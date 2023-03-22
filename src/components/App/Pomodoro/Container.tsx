interface Props {
	children?: React.ReactNode;
	current: number;
	initial: number;
}

function Container({ children, current, initial }: Props) {
	function generatePercentFill(current: number) {
		const temp = Math.abs(initial - current);
		const result = temp / initial;
		return `${result - 0.1}`;
	}
	return (
		<div className="mx-auto w-full bg-white p-4 md:p-6 lg:p-10 rounded-3xl shadow-lg border z-20 relative overflow-hidden">
			<div
				style={{
					opacity: generatePercentFill(current),
					transitionTimingFunction: 'ease-in',
				}}
				className="absolute w-full h-full bg-red-500 inset-0  overflow-hidden -z-10"
			/>
			{children}
		</div>
	);
}

export default Container;
