import { Plus } from "lucide-react";
import { useAppContext } from "../context/AppProvider";

const NewTaskButton = () => {
  const { setDialogDisplay } = useAppContext();

  return (
    <div
      onClick={() => setDialogDisplay(true)}
      className="fixed z-20 bottom-10 right-10 flex flex-row gap-2  bg-blue-600 p-2 rounded-full md:rounded-md cursor-pointer hover:bg-blue-500 transition-all ease-in-out duration-300"
    >
      <Plus />
      <span className="hidden md:block transition-transform ease-in-out duration-300">
        New Task
      </span>
    </div>
  );
};

export default NewTaskButton;
