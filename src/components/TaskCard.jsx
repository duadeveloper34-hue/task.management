import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import toast from "react-hot-toast";

const TaskCard = ({ task }) => {
  const { toggleTaskComplete, removeTask, setIsModalOpen, setEditingTask } = useContext(TaskContext);

  return (
    <div className="rounded-xl border border-[#2A2F38] bg-[#181B21] p-5 shadow-lg transition hover:border-[#F5B942]">

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-[#F5F5F5]">
          {task.title}
        </h3>

        <p className="mt-2 text-[#A7ADB7]">
          {task.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          className=" cursor-pointer rounded-lg bg-[#F5B942] px-4 py-2 font-medium text-[#0F1115] transition hover:bg-[#D99A20]"
          onClick={() => toggleTaskComplete(task.id)}
        >
          Complete
        </button>

        <button
          className="cursor-pointer rounded-lg bg-[#3B82F6] px-4 py-2 font-medium text-white transition hover:bg-blue-600"
          onClick={() => {
            setEditingTask(task);
            setIsModalOpen(true);
          }}
        >
          Edit
        </button>

        <button
          className="cursor-pointer rounded-lg bg-[#EF4444] px-4 py-2 font-medium text-white transition hover:bg-red-600"
          onClick={() => {
            removeTask(task.id);
            toast.success("Task deleted successfully!");
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;