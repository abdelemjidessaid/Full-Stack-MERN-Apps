import { useAppContext } from "../context/AppProvider";
import Task from "./Task";
import { AnimatePresence, motion } from "motion/react";

const TasksContainer = () => {
  const { tasks } = useAppContext();
  const filtered = tasks.filter((task) => !task.finished);

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.1 } }}
    >
      <h1 className="text-sm my-4 whitespace-nowrap">Unfinished Tasks</h1>
      <AnimatePresence>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {filtered.map((task) => (
            <Task {...task} _id={task._id} key={task._id} />
          ))}
        </div>
      </AnimatePresence>
    </motion.div>
  );
};

export default TasksContainer;
