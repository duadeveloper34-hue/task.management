import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import toast from "react-hot-toast";

let nextTaskId = 0;

const TaskForm = () => {
  const {
    addTask,
    updateTask,
    setIsModalOpen,
    editingTask,
    setEditingTask,
  } = useContext(TaskContext);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();
  useEffect(() => {
    if (editingTask) {
      reset({
        taskName: editingTask.title,
        taskDescription: editingTask.description,
      });
    } else {
      reset({
        taskName: "",
        taskDescription: "",
      });
    }
  }, [editingTask, reset]);

  const onSubmit = (data) => {
    if (editingTask) {
  const updatedTask = {
    ...editingTask,
    title: data.taskName,
    description: data.taskDescription,
  };

  updateTask(updatedTask);
  toast.success("Task updated successfully!");
} else {
  const newTask = {
    id: nextTaskId++,
    title: data.taskName,
    description: data.taskDescription,
    complete: false,
  };

  addTask(newTask);
  toast.success("Task added successfully!");
}

    reset();
    setEditingTask(null);
    setIsModalOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Task Name */}
      <div className="space-y-2">
        <label
          htmlFor="taskName"
          className="block text-sm font-medium text-[#F5F5F5]"
        >
          Task Name
        </label>

        <input
          type="text"
          id="taskName"
          placeholder="Enter task name"
          {...register("taskName")}
          className="w-full rounded-lg border border-[#2A2F38] bg-[#0F1115] px-4 py-3 text-[#F5F5F5] outline-none transition placeholder:text-[#6B7280] focus:border-[#F5B942] focus:ring-1 focus:ring-[#F5B942]"
        />
      </div>

      {/* Task Description */}
      <div className="space-y-2">
        <label
          htmlFor="taskDescription"
          className="block text-sm font-medium text-[#F5F5F5]"
        >
          Task Description
        </label>

        <textarea
          id="taskDescription"
          rows="4"
          placeholder="Enter task description"
          {...register("taskDescription")}
          className="w-full resize-none rounded-lg border border-[#2A2F38] bg-[#0F1115] px-4 py-3 text-[#F5F5F5] outline-none transition placeholder:text-[#6B7280] focus:border-[#F5B942] focus:ring-1 focus:ring-[#F5B942]"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-[#F5B942] px-5 py-3 font-semibold text-[#0F1115] transition hover:bg-[#D99A20]"
      >
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;