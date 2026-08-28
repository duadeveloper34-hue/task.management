import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const { tasks, filter } = useContext(TaskContext);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.complete;
    }

    if (filter === "completed") {
      return task.complete;
    }

    return true;
  });

  if (!tasks) {
    return (
      <div className="py-10 text-center text-[#A7ADB7]">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;