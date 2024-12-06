import { useAppContext } from "../context/AppContext";
import Task from "./Task";

const DoneTasksContainer = () => {
  const { tasks } = useAppContext();
  const filtered = tasks.filter((task) => task.finished);

  return (
    <div className="w-full transition-all duration-300 ease-in-out">
      <h1 className="text-lg my-4">Finished Tasks</h1>
      {/* Done Task List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((task) => (
          <Task _id={task._id} key={task._id} {...task} />
        ))}
      </div>
    </div>
  );
};

export default DoneTasksContainer;
