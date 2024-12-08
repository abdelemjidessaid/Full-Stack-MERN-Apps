import { useForm } from "react-hook-form";
import { TaskType } from "../types/TaskType";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppProvider";

type Props = {
  visible: boolean;
  onClose: () => void;
};

function NewTaskDialog({ onClose, visible }: Props) {
  if (!visible) return null;

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") onClose();
  };

  const form = useForm<TaskType>({
    defaultValues: {
      userId: "",
      taskTitle: "",
      taskDescription: "",
      expirationDate: "",
      creationDate: "",
      finished: false,
    },
    mode: "onChange",
  });

  const { formState, register, handleSubmit } = form;
  const { errors } = formState;
  const baseurl = import.meta.env.VITE_API_BASE_URL;
  const { tasks, setTasks } = useAppContext();

  const onSubmit = async (data: TaskType) => {
    data.creationDate = new Date().toISOString().slice(0, 16);

    const response = await fetch(`${baseurl}/api/task/create`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    setTasks([...tasks, result.task]);
    onClose();
  };

  return (
    <div
      onClick={handleClose}
      className="absolute z-30 overflow-y-auto left-0 top-0 w-screen h-screen bg-white bg-opacity-5 backdrop-blur-sm"
    >
      <div id="wrapper" className="flex flex-col w-full h-full items-center justify-center">
        <div className="w-[90%] md:w-[60%] lg:w-[50%] bg-gray-900 border-2 border-gray-700 rounded-md px-12 py-8">
          <form className="text-xs" onSubmit={handleSubmit(onSubmit)}>
            {/* Task Title */}
            <div className="flex flex-col text-gray-50 text-sm">
              <label htmlFor="taskTitle">Task Title</label>
              <input
                className="px-4 py-2 bg-gray-700 rounded-md border border-gray-500 placeholder:font-normal placeholder:text-gray-300"
                type="text"
                id="tasktitle"
                placeholder="Revise Math for ex..."
                {...register("taskTitle", {
                  required: {
                    value: true,
                    message: "Task Title is Required",
                  },
                })}
              />
              <p className="text-xs text-red-500 font-semibold self-end mt-1">
                {errors.taskTitle?.message}
              </p>
            </div>
            {/* Task Description */}
            <div className="flex flex-col text-gray-50 text-sm mt-4">
              <label htmlFor="taskDescription">Task Description</label>
              <textarea
                className="px-4 py-2 bg-gray-700 rounded-md min-h-24 border border-gray-500 placeholder:font-normal placeholder:text-gray-300"
                id="taskdescription"
                placeholder="Revise math and do some exercises for the 1st Examination"
                {...register("taskDescription", {
                  required: {
                    value: true,
                    message: "Task Description is Required",
                  },
                })}
              />
              <p className="text-xs text-red-500 font-semibold self-end mt-1">
                {errors.taskDescription?.message}
              </p>
            </div>
            {/* Task Expiration Date */}
            <div className="flex flex-col text-gray-50 text-sm mt-4">
              <label htmlFor="expirationDate">Expiration Date</label>
              <input
                className="px-4 py-2 bg-gray-700 rounded-md border placeholder:font-normal placeholder:text-gray-300 border-gray-500"
                type="datetime-local"
                id="expirationdate"
                {...register("expirationDate", {
                  required: "Task expiration Date is required",
                  pattern: {
                    value: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
                    message: "Invalid Expiration Date",
                  },
                  validate: (value) => {
                    const selectedDate = new Date(value as string);
                    const now = new Date();

                    return selectedDate > now || "The expiration date must be in the future";
                  },
                })}
              />
              <p className="text-xs text-red-500 font-semibold self-end mt-1">
                {errors.expirationDate?.message}
              </p>
            </div>
            {/* Submit Button */}
            <button
              className="px-4 py-2 w-full mt-4 bg-gray-700 text-white font-semibold hover:bg-gray-600 rounded-md transition-all ease-in-out duration-200"
              type="submit"
            >
              Create Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewTaskDialog;
