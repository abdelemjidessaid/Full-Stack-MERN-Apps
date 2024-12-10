import { useEffect } from "react";
import { useParams } from "react-router";
import { TaskType } from "../types/TaskType";
import { useForm } from "react-hook-form";
import * as apiClient from "../apiClient";
import { toast } from "react-toastify";

const TaskEdit = () => {
  const form = useForm<TaskType>({
    defaultValues: {
      _id: "",
      userId: "",
      taskTitle: "",
      taskDescription: "",
      creationDate: "",
      expirationDate: "",
      finished: false,
    },
  });
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = form;
  const params = useParams();
  const taskId = params.taskId;

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await apiClient.fetchTask(taskId);
        const result = await response.json();
        if (!response.ok) {
          toast.error(result.message);
          return;
        }
        form.reset(result);
      } catch (error) {
        toast.error(error as string);
      }
    };

    fetchTask();
  }, []);

  const onSubmit = async (data: TaskType) => {
    try {
      const response = await apiClient.updateTask(data);
      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="mt-8 place-self-center w-full lg:w-[50%]">
      <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
        {/* Task Title */}
        <div className="flex flex-col text-gray-50">
          <label htmlFor="taskTitle">Task Title</label>
          <input
            className="px-4 py-2 bg-zinc-700/80 focus:bg-zinc-700/50 outline-none rounded-md placeholder:font-normal placeholder:text-gray-300"
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
        <div className="flex flex-col text-gray-50 mt-4">
          <label htmlFor="taskDescription">Task Description</label>
          <textarea
            className="px-4 py-2 min-h-[100px] bg-zinc-700/80 focus:bg-zinc-700/50 outline-none rounded-md placeholder:font-normal placeholder:text-gray-300"
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
        <div className="flex flex-col text-gray-50 mt-4">
          <label htmlFor="expirationDate">Expiration Date</label>
          <input
            className="px-4 py-2 bg-zinc-700/80 focus:bg-zinc-700/50 outline-none rounded-md placeholder:text-gray-300 border-gray-500"
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
          className="px-4 py-2 w-full mt-4 border border-zinc-100 rounded-md hover:border-transparent hover:bg-zinc-800 transition-all ease-in-out duration-200"
          type="submit"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default TaskEdit;
