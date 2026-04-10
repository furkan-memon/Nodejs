import { useEffect, useState } from "react";
import api from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // 1️⃣ Get tasks when page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // 2️⃣ GET data from backend
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTasks(res.data);
  };

  // 3️⃣ POST data to backend
  const addTask = async () => {
    const token = localStorage.getItem("token");

    await api.post(
      "/tasks",
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTitle("");
    fetchTasks(); // refresh list
  };

  return (
  <div className="task-container">
    <h2>My Tasks</h2>

    <div className="task-form">
      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
    </div>

    <ul className="task-list">
      {/* {tasks.map((task) => (
        <li
          key={task._id}
          className={`task-item ${
            task.status === "completed" ? "completed" : ""
          }`}
        >
          <span>{task.title}</span>

          <div className="task-actions">
            <button className="toggle">✓</button>
            <button className="delete">✕</button>
          </div>
        </li>
      ))} */}
    </ul>
  </div>
);

}

export default Tasks;
