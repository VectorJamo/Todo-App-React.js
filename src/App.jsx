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
      <div className="task-component">
        <p className="task-name">{task}</p>
        <input type="checkbox" onClick={ifClicked}/>
      </div>
    );
  }

  function ifButtonClicked() {
    const tempArray = tasks.slice();
    tempArray.push(currentTask);
    setTasks(tempArray);
    console.log(tempArray);
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
      <div className="tasks-container">
        {tasks.map(t => {
          return (<TaskComponent tsk={t}/>);
        })}
      </div>
      <div className="done-tasks-container">
        <ol>
        {
          doneTasks.map(dt => {
            return (<li>{dt}</li>);
          })
        }
        </ol>
      </div>
    </div>
  );
}