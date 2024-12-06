import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import { TaskType } from "../types/TaskType";

const Task = ({
  taskTitle,
  creationDate,
  taskDescription,
  expirationDate,
  finished,
  _id,
}: TaskType) => {
  const { tasks } = useAppContext();
  const navigate = useNavigate();
  const baseurl = import.meta.env.VITE_API_BASE_URL;

  const handleDone = async (id: string, checked: boolean) => {
    const task = tasks.find((task) => task._id === id);
    if (task) task.finished = checked;

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
    if (!e.target.id.startsWith("done-")) navigate(`/task/${_id}`);
  };

  return (
    <div
      onClick={handleTaskClick}
      id="task-parent"
      key={_id}
      className={`flex flex-col justify-between w-full border-2 ${
        finished
          ? "shadow-[5px_5px_0_0] shadow-green-800 border border-green-800"
          : "border-gray-800"
      } transition-all duration-300 ease-in-out rounded-md p-4 text-sm cursor-pointer bg-gray-900 hover:bg-transparent space-y-8`}
    >
      <div className="flex flex-col justify-between gap-2">
        <p className="self-center font-semibold">{taskTitle}</p>
        <p className="text-xs self-end text-blue-300">{creationDate?.replace("T", " | ")}</p>
      </div>
      <p className="mt-3 break-words">{taskDescription}</p>
      <div className="flex flex-cols justify-between">
        <div className="">
          <label
            htmlFor={`done-${_id}`}
            id={`done-`}
            className="flex justify-center gap-2 px-2 py-1 cursor-pointer"
          >
            <input
              id={`done-${_id}`}
              type="checkbox"
              checked={finished}
              onChange={(e) => handleDone(_id as string, e.target.checked)}
            />
            {finished ? "Not yet" : "Done"}
          </label>
        </div>
        <p className="text-xs text-green-300">{expirationDate?.replace("T", " | ")}</p>
      </div>
    </div>
  );
};

export default Task;
