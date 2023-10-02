import React, { useState,useEffect } from 'react';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useCustom from './components/hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);
  const transformedtext = (taskobj) => { 
    const loadedTasks = [];
       
    for(const taskKey in taskobj){
      loadedTasks.push({ id: taskKey, text: taskobj[taskKey].text });
    }

    setTasks(loadedTasks);

};
const{isLoading,error,sendRequests:fetchtask} = useCustom({
    url: 'https://http-project-655d6-default-rtdb.firebaseio.com/tasks.json',
  },transformedtext)
 useEffect(() => {
   fetchtask()
 
   
 }, [])
 
 
  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchtask}
      />
    </React.Fragment>
  );
}

export default App;
