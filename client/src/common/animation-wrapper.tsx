import { motion, AnimatePresence } from "framer-motion";

interface AuthFormProps {
  children: React.ReactNode;
  initial?: {
    opacity: number;
  };
  animate?: { opacity: number };
  transition?: { duration: number };
  keyValue?: string;
  className?: string;
}

const AnimationWrapper = ({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
  keyValue,
  className,
}: AuthFormProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        key={keyValue}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
