import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const FilterButtons = () => {
  const { setFilter, setIsModalOpen, } = useContext(TaskContext);

  return (
    <div className="mb-6 flex flex-wrap justify-center gap-3">
      <button
        className="rounded-lg bg-[#F5B942] px-5 py-2 font-medium text-[#0F1115] transition hover:bg-[#D99A20]"
        onClick={() => setFilter("all")}
      >
        All
      </button>

      <button
        className="rounded-lg bg-[#3B82F6] px-5 py-2 font-medium text-white transition hover:bg-blue-600"
        onClick={() => setFilter("active")}
      >
        Active
      </button>

      <button
        className="rounded-lg bg-[#22C55E] px-5 py-2 font-medium text-white transition hover:bg-green-600"
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>

      <button
        className="rounded-lg border border-[#F5B942] bg-transparent px-5 py-2 font-medium text-[#F5B942] transition hover:bg-[#F5B942] hover:text-[#0F1115]"
        onClick={() => setIsModalOpen(true)}
      >
        + Add Task
      </button>
    </div>
  );
};

export default FilterButtons;