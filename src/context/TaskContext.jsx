import { createContext, useEffect, useState } from "react";
import api from "../api/Api";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    let ignore = false;

    const loadTasks = async () => {
      try {
        const response = await api.get("/notes");

        console.log(response.data);

        if (!ignore) {
          setTasks(response.data.notes);
        }
      } catch (error) {
        console.log("Error fetching tasks:", error);
      }
    };

    loadTasks();

    return () => {
      ignore = true;
    };
  }, []);

  // CREATE TASK
 const addTask = async (task) => {
  try {
    console.log("TASK BEING SENT:", task);

    const response = await api.post("/notes", task);

    console.log("POST RESPONSE:", response.data);

    setTasks((prevTasks) => [
      ...prevTasks,
      response.data,
    ]);
  } catch (error) {
    console.log("POST ERROR:", error.response?.data);
  }
};

  // DELETE TASK
  const removeTask = async (id) => {
    try {
      await api.delete(`/notes/${id}`);

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  // UPDATE TASK
  const updateTask = async (updatedTask) => {
    try {
      const response = await api.put(
        `/notes/${updatedTask.id}`,
        updatedTask
      );

      console.log("PUT response:", response.data);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id
            ? response.data
            : task
        )
      );
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  // COMPLETE / UNCOMPLETE
  const toggleTaskComplete = async (id) => {
    try {
      const task = tasks.find((task) => task.id === id);

      const updatedTask = {
        ...task,
        complete: !task.complete,
      };

      const response = await api.put(
        `/notes/${id}`,
        updatedTask
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? response.data : task
        )
      );
    } catch (error) {
      console.log("Error toggling task:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        updateTask,
        toggleTaskComplete,

        filter,
        setFilter,

        isModalOpen,
        setIsModalOpen,

        editingTask,
        setEditingTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext };
