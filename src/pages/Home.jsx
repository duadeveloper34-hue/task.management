import Navbar from "../components/Navbar";
import FilterButtons from "../components/FilterButtons";
import TaskList from "../components/TaskList";
// import TaskForm from "../components/TaskForm";
import TaskModal from "../components/TaskModal";
const Home = () => {
  return (
    <main className="min-h-screen bg-[#0F1115] px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <Navbar />
        <FilterButtons />
        {/* <TaskForm /> */}
        <TaskModal />
        <TaskList />
      </div>
    </main>
  );
};

export default Home;