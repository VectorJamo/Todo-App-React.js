import './App.css'
import {useState} from 'react'

export default function App(){

  const [currentTask, setCurrentTask] = useState('');
  const [tasks, setTasks] = useState(new Array());
  const [doneTasks, setDoneTasks] = useState(new Array());

  function TaskComponent({tsk}) {
    const [task, setTask] = useState('');
    const [firstRender, setFirstRender] = useState(true);

    if(firstRender){
      setFirstRender(false);
      setTask(tsk);
    }

    function ifClicked() {
      // Add this task to the done tasks array
      const tempArray = doneTasks.slice();
      tempArray.push(task);
      setDoneTasks(tempArray);

      // Remove this task from tasks array
      const newTasksArray = tasks.filter(x => {
        return (x !== task);
      })
      setTasks(newTasksArray);
    }

    return (
      <li>
        <div className="task-component">
          <p className="task-name">{task}</p>
          <input type="checkbox" onClick={ifClicked}/>
        </div>
      </li>
    );
  }

  function ifButtonClicked() {
    const tempArray = tasks.slice();
    tempArray.push(currentTask);
    setTasks(tempArray);
    console.log(tempArray);
    setCurrentTask('');
  }

  function ifClearPendingClicked() {
    const tempArray = new Array();
    setTasks(tempArray);
  }
  function ifClearDoneClicked() {
    const tempArray = new Array();
    setDoneTasks(tempArray);
  }

  return (
    <div className="app">
      <header>
        <h2>Todo Tasks</h2>
      </header>
      <div className="search-container">
        <input value={currentTask} className="search-bar" type="text" onChange={e => {setCurrentTask(e.target.value)}}/>
        <button onClick={ifButtonClicked}>Add task</button>
      </div>
      <p className="text">Tasks pending:</p>
      <div className="tasks-container">
        <ol>
        {tasks.map(t => {
          return (
            <TaskComponent tsk={t}/>
          );        
        })}
        </ol>      
      </div>
      <p className="text">Tasks done:</p>
      <div className="done-tasks-container">
        <ol>
        {
          doneTasks.map(dt => {
            return (<li className="done-task">{dt}</li>);
          })
        }
        </ol>
      </div>
      <div className="last-container">
        <button className="clear-pending-button" onClick={ifClearPendingClicked}>Clear all pending tasks</button>
        <button className="clear-done-button" onClick={ifClearDoneClicked}>Clear all done tasks</button>
      </div>
    </div>
  );
}