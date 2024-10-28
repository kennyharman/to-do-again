import React, { useState } from 'react';

function TaskForm({ tasks, setTasks }) {
  const [taskData, setTaskData] = useState({ taskName: '', completed: false });
  const [filter, setFilter] = useState("All"); 

  function handleAddTask(e) {
    e.preventDefault();
    if (taskData.taskName) {
      const newTask = { ...taskData, id: tasks.length + 1, completed: false };
      setTasks([...tasks, newTask]);
      setTaskData({ taskName: '', completed: false });
    }
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function toggleTaskCompletion(id) {
    setTasks(tasks.map(task =>
      task.id === id && !task.completed
        ? { ...task, completed: true }
        : task
    ));
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true; 
  });

  const newListUI = filteredTasks.map((task) => (
    <div key={task.id} style={{ display: 'flex', justifyContent: "space-between", margin: '1em' }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskCompletion(task.id)}
        disabled={task.completed} 
      />
      <p style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.taskName}
      </p>
      <button className='btn-delete' onClick={() => handleDeleteTask(task.id)}>Delete</button>
    </div>
  ));

  return (
    <>
      <form onSubmit={handleAddTask} className='taskForm'>
        <input
          type='text'
          value={taskData.taskName}
          onChange={(e) => setTaskData({ ...taskData, taskName: e.target.value })}
          placeholder="Add a new task"
        />
        <button className='btn-task' type="submit">Add Task</button>
      </form>

      <div className='filter-buttons'>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
        <button onClick={() => setFilter("Pending")}>Pending</button>
      </div>

      <div className='taskList'>
        {newListUI}
      </div>
    </>
  );
}

export default TaskForm;