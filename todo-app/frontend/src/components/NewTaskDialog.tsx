import { useForm } from "react-hook-form";
import { TaskType } from "../types/TaskType";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppProvider";
import AlertDialog from "./AlertDialog";

type Props = {
  visible: boolean;
  onClose: () => void;
};

function NewTaskDialog({ onClose, visible }: Props) {
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

    form.reset();
    toast.success(result.message);
    setTasks([result.task, ...tasks]);
    onClose();
  };

  return (
    <AlertDialog onClose={onClose} visible={visible}>
      <form className="text-xs" onSubmit={handleSubmit(onSubmit)}>
        {/* Task Title */}
        <div className="flex flex-col text-gray-50 text-sm">
          <label htmlFor="taskTitle">Task Title</label>
          <input
            className="px-4 py-2 bg-zinc-700/80 focus:bg-zinc-700/50 outline-none rounded-md transition-all ease-in-out placeholder:text-gray-300"
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
            className="px-4 py-2 min-h-[100px] bg-zinc-700/80 focus:bg-zinc-700/50 outline-none rounded-md transition-all ease-in-out placeholder:font-normal placeholder:text-gray-300"
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
            className="px-4 py-2 bg-zinc-700/80 focus:bg-zinc-700/50 outline-none rounded-md transition-all ease-in-out placeholder:font-normal placeholder:text-gray-300 border-gray-500"
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
          className="px-4 py-2 w-full mt-4 bg-zinc-700 border rounded-md border-transparent hover:border-zinc-100 transition-all ease-in-out duration-200"
          type="submit"
        >
          Create Task
        </button>
      </form>
    </AlertDialog>
  );
}

export default NewTaskDialog;
