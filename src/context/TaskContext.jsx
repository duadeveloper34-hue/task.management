import { createContext, useEffect, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          {
            id: 1,
            title: "Task 1",
            description:
              "Learn React fundamentals and practice components.",
            complete: false,
          },
          {
            id: 2,
            title: "Task 2",
            description:
              "Practice React Hook Form and form validation.",
            complete: false,
          },
          {
            id: 3,
            title: "Task 3",
            description:
              "Build a small project using Context API.",
            complete: true,
          },
          {
            id: 4,
            title: "Task 4",
            description:
              "Practice CRUD operations in React.",
            complete: false,
          },
          {
            id: 5,
            title: "Task 5",
            description:
              "Learn how to use Motion for animations.",
            complete: true,
          },
        ]
  });

  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // CREATE
  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  // DELETE
  const removeTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  // UPDATE
  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  // COMPLETE / UNCOMPLETE
  const toggleTaskComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, complete: !task.complete }
          : task
      )
    );
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
        setEditingTask,
        editingTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext };