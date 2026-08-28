import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskForm from "./TaskForm";

const TaskModal = () => {
  const { isModalOpen, setIsModalOpen } = useContext(TaskContext);

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-lg rounded-xl bg-[#181B21] p-6">
        
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            Add Task
          </h2>

          <button
            onClick={() => setIsModalOpen(false)}
            className="text-xl text-white"
          >
            ×
          </button>
        </div>

        <TaskForm />

      </div>
    </div>
  );
};

export default TaskModal;