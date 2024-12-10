import { useAppContext } from "../context/AppProvider";
import Task from "./Task";

const DoneTasksContainer = () => {
  const { tasks } = useAppContext();
  const filtered = tasks.filter((task) => task.finished);

  return (
    <div className="w-full transition-all duration-300 ease-in-out">
      <h1 className="text-sm my-4 whitespace-nowrap">Finished Tasks</h1>
      {/* Done Task List */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {filtered.map((task) => (
          <Task _id={task._id} key={task._id} {...task} />
        ))}
      </div>
    </div>
  );
};

export default DoneTasksContainer;
