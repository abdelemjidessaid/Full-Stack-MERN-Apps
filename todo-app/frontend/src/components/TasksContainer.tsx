import { useAppContext } from "../context/AppProvider";
import Task from "./Task";

const TasksContainer = () => {
  const { tasks } = useAppContext();
  const filtered = tasks.filter((task) => !task.finished);

  return (
    <div className="w-full">
      <h1 className="text-lg my-4">Unfinished Tasks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((task) => (
          <Task {...task} _id={task._id} key={task._id} />
        ))}
      </div>
    </div>
  );
};

export default TasksContainer;
