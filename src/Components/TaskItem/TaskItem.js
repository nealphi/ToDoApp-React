import React from "react";
import "./TaskItem.css";
import { FaRegTrashAlt } from "react-icons/fa";

const TaskItem = ({ task, deleteTask, handleChangeStatus }) => (
  <li className="TaskItem">
    <input
      onChange={() => handleChangeStatus(task.id)}
      id="Task"
      type="checkbox"
      checked={task.status}
    />
    <span class="checkmark"></span>
    <h2>{task.title}</h2>
    <button
      onClick={() => {
        deleteTask(task.id);
      }}
    >
      <FaRegTrashAlt />
    </button>
  </li>
);

export default TaskItem;
