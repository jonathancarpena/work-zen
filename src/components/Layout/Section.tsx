import { motion, AnimatePresence } from 'framer-motion';

interface Props {
	isVisible?: boolean;
	children?: React.ReactNode;
	sx?: string;
	uniqueKey: string;
}

function Section({ children, sx, isVisible, uniqueKey }: Props) {
	return (
		<AnimatePresence mode="popLayout">
			{isVisible && (
				<motion.section
					key={uniqueKey}
					initial={{ opacity: 0, y: 50 }}
					animate={{
						opacity: 1,
						y: 0,
						transition: {
							delay: 0.3,
						},
					}}
					exit={{ opacity: 0, y: 50 }}
					className={`${sx}`}
				>
					{children}
				</motion.section>
			)}
		</AnimatePresence>
	);
}

export default Section;
