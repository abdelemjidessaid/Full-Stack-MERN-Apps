import { Plus } from "lucide-react";
import { useAppContext } from "../context/AppProvider";

const NewTaskButton = () => {
  const { setDialogDisplay } = useAppContext();

  return (
    <div
      onClick={() => setDialogDisplay(true)}
      title="New Task"
      className="fixed z-20 bottom-10 right-10 bg-green-700 p-2 rounded-md cursor-pointer hover:bg-green-600 transition-all ease-in-out duration-300"
    >
      <Plus />
    </div>
  );
};

export default NewTaskButton;
