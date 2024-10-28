import React, { useState } from 'react'


function TaskForm({ tasks, setTasks }) {
  const [taskData, settaskData] = useState({ taskName: '', completed: false });

  function handleAddTask(e) {
    e.preventDefault();
    if (taskData.taskName) {
      const newTask = { ...taskData, id: tasks.length + 1, completed: false };
      setTasks([...tasks, newTask]);
      settaskData({ taskName: '', completed: false });
    }
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function toggleTaskCompletion(id) {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  const newListUI = tasks.map((task) => (
    <div key={task.id} style={{ display: 'flex', justifyContent: 'center', justifyContent: "space-between", gap: 2, marginTop: "2rem"}}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskCompletion(task.id)}
        style={{ accentColor: '#6295B5'}}
      />
      <p style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.taskName}
      </p>
      <button className='btn-delete' onClick={() => handleDeleteTask(task.id)}>Delete</button>
    </div>
  ));

  return (
    <>
    <div className="whole-thing">
      <div>
        <form onSubmit={handleAddTask} className="add-task">
          <input
            className='add-task-input'
            type='text'
            value={taskData.taskName}
            onChange={(e) => settaskData({ ...taskData, taskName: e.target.value })}
          />
          <button className='btn-task' type="submit">Add Task</button>
        </form>
        </div>
        <div className="list">
          {newListUI}
        </div>
      </div>
    </>
  )
}

export default TaskForm;
