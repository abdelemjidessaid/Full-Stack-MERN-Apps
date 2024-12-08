import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppProvider";
import { TaskType } from "../types/TaskType";
import * as apiClient from "../apiClient";
import { ClockAlert, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

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
  const handleDelete = async (e: any) => {
    if (!e.target.id.startsWith("trash")) return;

    const task = tasks.find((t) => t._id === _id);
    setTasks([...tasks.filter((task) => task._id !== _id)]);

    const response = await apiClient.deleteTask(task as TaskType);
    const result = await response.json();

    if (!response.ok) {
      toast.error(result.message);
      return;
    }

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
    if (!result.ok) {
      console.log(result.message);
      return;
    }

    console.log(result.message);
  };

  const handleTaskClick = (e: any) => {
    if (!e.target.id.startsWith("done-") && !e.target.id.startsWith("trash-")) {
      navigate(`/task/${_id}`);
    }
  };

  return (
    <div
      onClick={handleTaskClick}
      id="task-parent"
      key={_id}
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
            onClick={handleDelete}
            id={`trash-${_id}`}
            className="p-1 hover:text-red-500 transition-all duration-200 ease-in-out"
          >
            <Trash2 id={`trash-${_id}`} className="w-[20px]" />
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
          className="flex justify-center items-center gap-2 px-2 py-1 cursor-pointer"
        >
          <input
            id={`done-${_id}`}
            type="checkbox"
            checked={finished}
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
    </div>
  );
};

export default Task;
