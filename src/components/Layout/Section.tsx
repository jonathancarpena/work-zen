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
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: {
							delay: 0,
						},
					}}
					exit={{ opacity: 0 }}
					className={`${sx} pt-1`}
				>
					{children}
				</motion.section>
			)}
		</AnimatePresence>
	);
}

export default Section;
