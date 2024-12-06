import TasksContainer from "../components/TasksContainer";
import DoneTasksContainer from "../components/DoneTasksContainer";
import NewTaskButton from "../components/NewTaskButton";
import { useAppContext } from "../context/AppContext";
import NewTaskDialog from "../components/NewTaskDialog";
import * as apiClient from "../apiClient";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const { dialogDisplay, setDialogDisplay, tasks, setTasks, setLoggedIn } = useAppContext();
  const navigate = useNavigate();

  // validate token
  // useEffect(() => {
  //   const validate = async () => {
  //     try {
  //       const response = await apiClient.validateToken();

  //       const result = await response.json();
  //       if (!result.ok) {
  //         console.log(result.message);
  //         setLoggedIn(false);
  //         navigate("/login");
  //         return;
  //       }

  //       setLoggedIn(true);
  //       console.log(result.message);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   validate();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiClient.fetchTasks();

      const result = await response.json();
      if (!response.ok && response.status === 401) {
        navigate("/login");
        setLoggedIn(false);
        return;
      }

      setTasks([...result]);
    };

    fetchData();
  }, [tasks]);

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
