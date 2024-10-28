import { useState } from 'react';
import TaskForm from './components/TaskForm'; 
import './App.css';


function App() {
  const initialData = [
    {
      id: 1,
      taskName: '250000x front flips',
      completed: false
    },
    {
      id: 2,
      taskName: 'Figure out the answer',
      completed: false
    },
  ];

  const [tasks, setTasks] = useState(initialData);

  const incompleteTasks = tasks.filter(task => !task.completed).length;

  return (
    <>
      <div className="the-whole-shebang">
        <h1>To Do List</h1>
        <h2>{incompleteTasks} tasks remaining</h2>
        <TaskForm tasks={tasks} setTasks={setTasks} />
      </div>
    </>
  );
}

export default App;