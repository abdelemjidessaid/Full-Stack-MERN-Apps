import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppProvider";
import { TaskType } from "../types/TaskType";
import * as apiClient from "../apiClient";
import { ClockAlert, Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Task = ({
  taskTitle,
  creationDate,
  taskDescription,
  expirationDate,
  finished,
  _id,
}: TaskType) => {
  const { tasks, setTasks } = useAppContext();
  const navigate = useNavigate();
  const baseurl = import.meta.env.VITE_API_BASE_URL;

  const isExpired = (): boolean => {
    const date = new Date(expirationDate as string);
    const now = new Date();

    return date < now;
  };

  // Delete Handler
  const handleDelete = async (taskId: string) => {
    const response = await apiClient.deleteTask(taskId);
    const result = await response.json();

    if (!response.ok) {
      toast.error(result.message);
      return;
    }

    setTasks([...tasks.filter((task) => task._id !== _id)]);
    toast.success(result.message);
  };

  // Finished Handler
  const handleDone = async (id: string, checked: boolean) => {
    const task = tasks.find((task) => task._id === id);
    if (task) {
      task.finished = checked;
      setTasks([...tasks.filter((t) => t._id !== task._id), task]);
    }

    const response = await fetch(`${baseurl}/api/task/update/${task?._id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const result = await response.json();
    if (!response.ok) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
  };

  const handleTaskClick = (e: any) => {
    if (!e.target.id.startsWith("done-") && !e.target.id.startsWith("trash-")) {
      navigate(`/task/${_id}`);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        onClick={handleTaskClick}
        id="task-parent"
        key={_id}
        initial={{ opacity: 0, scale: 0.8, x: -100, y: -100 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.1, delay: 0 },
        }}
        exit={{
          opacity: 0.8,
          scale: 1.5,
          transition: { duration: 0.2 },
        }}
        className={`flex flex-col justify-between w-full border-2 ${
          finished
            ? "shadow-[5px_5px_0_0] shadow-green-800 border border-green-800"
            : isExpired()
            ? "border-red-500 border-opacity-40"
            : "border-gray-800"
        } transition-all duration-300 ease-in-out rounded-md p-4 text-sm cursor-pointer bg-gray-900 hover:bg-transparent space-y-8`}
      >
        <div className="flex flex-col justify-between gap-4">
          <div className="flex flex-row items-center justify-between">
            {/* Creation Date */}
            <div className="flex flex-row justify-between items-center gap-2 text-green-300">
              <Pencil className="w-[18px]" />
              <p className="text-xs">{creationDate?.replace("T", " | ")}</p>
            </div>
            {/* Delete Task */}
            <button
              onClick={() => handleDelete(_id as string)}
              id={`trash-${_id}`}
              className="p-1 hover:text-red-500 transition-all duration-200 ease-in-out flex flex-row items-center justify-center gap-2"
            >
              <FontAwesomeIcon id={`trash-${_id}`} icon={faTrash} />
              Delete
            </button>
          </div>
          {/* Task Title */}
          <p className="self-center font-semibold">{taskTitle}</p>
        </div>
        <p className="mt-3 break-words">{taskDescription}</p>
        <div className="flex flex-cols justify-between items-center">
          <label
            htmlFor={`done-${_id}`}
            id={`done-`}
            className="flex justify-center items-center gap-2 px-2 py-1 cursor-pointer text-center hover:text-green-500 duration-300 ease-in-out"
          >
            <input
              id={`done-${_id}`}
              type="checkbox"
              checked={finished}
              className="h-[20px] w-[20px] cursor-pointer"
              onChange={(e) => handleDone(_id as string, e.target.checked)}
            />
            {finished ? "Not yet" : "Done"}
          </label>
          <div
            className={`flex flex-row justify-between items-center gap-2 ${
              isExpired() ? "text-red-300" : "text-blue-300"
            }`}
          >
            <ClockAlert className="w-[18px]" />
            <p className="text-xs">{expirationDate?.replace("T", " | ")}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Task;
