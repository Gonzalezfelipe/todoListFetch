import { useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [imputValue, setImputValue] = useState("");
  const [taskList, setTaskList] = useState([]);

  const notifyTaskAdded = () => toast.success("Added task");
  const notifyTaskEmpty = () => toast.error("You must enter a task to delete it");
  const notifyTaskDeleted = () => toast.error("Deleted task");

  const handlePressKey = (e) => {
    if (imputValue === "" && e.key === "Enter") {
      notifyTaskEmpty();
      return;
    }

    if (e.key === "Enter") {
      setTaskList([...taskList, imputValue]);
      notifyTaskAdded();
      setImputValue("");
      return;
    }
  };

  const handleDeleteTask = (index) => {
    setTaskList(taskList.filter((task, i) => i !== index));
    notifyTaskDeleted();
    return;
  };

  return (
    <>
      <div className="container">
        <h1>todos</h1>
        <div className="container-list">
          <ul>
            <li>
              <input
                type="text"
                placeholder={taskList.length === 0 ? "There are no pending tasks" : "What needs to be done?"}
                onChange={(e) => setImputValue(e.target.value)}
                value={imputValue}
                onKeyDown={handlePressKey}
              />
            </li>
            {taskList.map((task, index) => (
              <li key={index}>
                {task}
                <i className="fa-solid fa-trash" onClick={() => handleDeleteTask(index)}></i>
              </li>
            ))}
            <li className="li-final">{taskList.length} Tareas pendientes</li>
          </ul>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default App;
