import React from "react";
import { motion } from "motion/react";

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AlertDialog: React.FC<Props> = ({ children, visible, onClose }) => {
  if (!visible) return null;

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <motion.div
      onClick={handleClose}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 0.2, ease: "easeInOut" } }}
      exit={{ opacity: 0.5, transition: { duration: 0.2, ease: "easeInOut" } }}
      className="absolute z-30 overflow-y-auto left-0 top-0 w-screen h-screen backdrop-blur-sm"
    >
      <motion.div
        className="flex flex-col w-full h-full items-center justify-center"
        id="wrapper"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          transition: { duration: 0.1, delay: 0.1 },
        }}
        exit={{
          opacity: 0.5,
          scale: 0,
          transition: { duration: 0.1, delay: 0.1 },
        }}
      >
        <div className="w-[90%] md:w-[60%] lg:w-[50%] bg-zinc-800/90 rounded-md px-12 py-8">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AlertDialog;
