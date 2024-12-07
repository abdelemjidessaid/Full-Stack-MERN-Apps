import React, { createContext, useContext, useState } from "react";
import { TaskType } from "../types/TaskType";

type Props = {
  children: React.ReactNode;
};

type AppContextType = {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  dialogDisplay: boolean;
  setDialogDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const appContext = createContext<AppContextType | undefined>(undefined);

export const AppContext = ({ children }: Props) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [dialogDisplay, setDialogDisplay] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <appContext.Provider
      value={{
        tasks,
        setTasks,
        dialogDisplay,
        setDialogDisplay,
        loggedIn,
        setLoggedIn,
        expanded,
        setExpanded,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(appContext);

  if (!context) throw new Error("useAppContext must be used within an AppProvider");

  return context;
};
