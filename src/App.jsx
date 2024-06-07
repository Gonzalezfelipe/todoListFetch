import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [imputValue, setImputValue] = useState("");
  const [taskList, setTaskList] = useState([]);

  const createNewUser = () => {
    fetch("https://playground.4geeks.com/todo/users/gonzalezfelipe", {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          console.log("User Already Exists");
        } else {
          console.log("User Created Successfully");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const allTask = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/gonzalezfelipe",
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        console.log("Error al traer las tareas");
      }
      const data = await response.json();
      setTaskList(data.todos);
    } catch (error) {
      console.error("Error al traer las tareas", error);
    }
  };

  useEffect(() => {
    allTask();
  }, []);

  const deleteUser = (e) => {
    const response = fetch(
      "https://playground.4geeks.com/todo/users/gonzalezfelipe",
      {
        method: "DELETE",
      }
    ).then((response) => {
      console.log(response);
      allTask();
    });
  };

  const createTodo = async () => {
    if (imputValue === "") {
      notifyTaskEmpty();
      return;
    }
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/todos/gonzalezfelipe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            label: imputValue,
            is_done: false,
          }),
        }
      );
      if (!response.ok) {
        console.log("Error al crear las tareas");
      } else {
        const data = await response.json();
        setTaskList([...taskList, data]); // Actualizar la lista de tareas
        notifyTaskAdded();
        setImputValue("");
      }
    } catch (error) {
      console.error("Error al crear las tareas", error);
    }
  };

  const notifyTaskAdded = () => toast.success("Added task");
  const notifyTaskEmpty = () => toast.error("You must enter a task to add it");
  const notifyTaskDeleted = () => toast.error("Deleted task");

  const handlePressKey = (e) => {
    if (e.key === "Enter") {
      createTodo();
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
        <button onClick={createNewUser}>Create user</button>
        <button onClick={deleteUser}>Delete user</button>
        <div className="container-list">
          <ul>
            <li>
              <input
                type="text"
                placeholder={
                  taskList && taskList.length === 0
                    ? "There are no pending tasks"
                    : "What needs to be done?"
                }
                onChange={(e) => setImputValue(e.target.value)}
                value={imputValue}
                onKeyDown={handlePressKey}
              />
            </li>
            {taskList &&
              taskList.map((task, index) => (
                <li key={index}>
                  {task.label}
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => handleDeleteTask(index)}
                  ></i>
                </li>
              ))}
            <li className="li-final">
              {taskList && taskList.length} Tareas pendientes
            </li>
          </ul>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default App;
