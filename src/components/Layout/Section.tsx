interface Props {
	isVisible?: boolean;
	children?: React.ReactNode;
	sx?: string;
	uniqueKey: string;
}

function Section({ children, sx, isVisible, uniqueKey }: Props) {
	return (
		<>
			{isVisible && (
				<section
					key={uniqueKey}
					className={`${sx} text-black dark:text-white pt-3`}
				>
					{children}
				</section>
			)}
		</>
	);
}

export default Section;
