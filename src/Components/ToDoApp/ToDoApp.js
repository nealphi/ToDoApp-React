import React, { useEffect, useState } from "react";
import { AddTaskForm, TaskList, FilterFooter } from "../index";
import { v4 as uuidv4 } from "uuid";

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      storedTasks = JSON.parse(storedTasks);
    } else {
      storedTasks = []
    }
    setTasks(storedTasks)
  }, []);
  useEffect(() => {
    if (filter === "all") {
      setFilteredTasks(tasks);
    }
    if (filter === "active") {
      const newActiveFilteredTasks = tasks.filter((task) => !task.status);
      setFilteredTasks(newActiveFilteredTasks);
    }
    if (filter === "done") {
      const newDoneFilteredTasks = tasks.filter((task) => task.status);
      setFilteredTasks(newDoneFilteredTasks);
    }
  }, [filter, tasks, refresh]);

  const addTask = (taskTitle) => {
    const newTasks = [
      ...tasks,
      { id: uuidv4(), title: taskTitle, status: false },
    ];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const deleteTask = (taskId) => {
    let newTaskList = tasks;
    delete newTaskList[tasks.findIndex((task) => task.id === taskId)];
    newTaskList = newTaskList.filter((item) => item);
    setTasks(newTaskList);
    localStorage.setItem("tasks", JSON.stringify(newTaskList));
  };

  const handleChangeStatus = (taskId) => {
    let newTaskList = tasks;
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    newTaskList[taskIndex].status = !newTaskList[taskIndex].status;
    setTasks(newTaskList);
    localStorage.setItem("tasks", JSON.stringify(newTaskList));
    setRefresh(refresh + 1);
  };

  return (
    <div className="ToDoApp">
      <AddTaskForm addTask={addTask} />
      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        handleChangeStatus={handleChangeStatus}
      />
      <FilterFooter updateFilter={setFilter} tasks={filteredTasks} />
    </div>
  );
};
export default ToDoApp;
