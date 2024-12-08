import TasksContainer from "../components/TasksContainer";
import DoneTasksContainer from "../components/DoneTasksContainer";
import NewTaskButton from "../components/NewTaskButton";
import { useAppContext } from "../context/AppProvider";
import NewTaskDialog from "../components/NewTaskDialog";
import * as apiClient from "../apiClient";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";

const Home = () => {
  const { dialogDisplay, setDialogDisplay, setTasks } = useAppContext();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // validate token
      if (!isAuthenticated) {
        const valide = await apiClient.validateToken();
        if (!valide.ok) {
          navigate("/login");
          return;
        }

        login();
      }

      const response = await apiClient.fetchTasks();

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message);
        return;
      }

      console.log("Tasks fetched.");
      setTasks(result);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <TasksContainer />
      <DoneTasksContainer />
      {/* New task button  */}
      <NewTaskButton />
      {/* Dialog Model */}
      <NewTaskDialog onClose={() => setDialogDisplay(false)} visible={dialogDisplay} />
    </div>
  );
};

export default Home;
