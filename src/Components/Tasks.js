import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Task from './Task';
import { useParams } from 'react-router-dom';

let currentListID = 0;
let mySetTasks;
const Tasks = (props) => {
  const [tasks, setTasks] = useState([]);
  const { listsid } = useParams();

  currentListID = listsid;
  mySetTasks = newTask => setTasks(newTask);

  useEffect(() => axios
    .get(listsid === undefined ? 'http://localhost:8080/colection/today' : `http://localhost:8080/tasks/list/${listsid}`)
    .catch(error => console.log(error))
    .then(response => setTasks(response.data))
    .catch(error => console.log(error)), [listsid]
  );

  const changeDone = (listsid, taskid, done) => {
    axios
      .patch('http://localhost:8080/tasks/list/' + listsid + '/task/' + taskid, { done: done }) //post putch and put might return updatetd object
      .then(() =>
        setTasks(
          tasks.map(item => {
            item.taskid === taskid ? item.done = !item.done : item.done = item.done;
            return item;
          })))
      .catch((error) => console.log(error))
  }

  const deleteTask = (listsid, tasksid) => {
    for (let i = 0; i < tasks.length; i++) 
      if (tasks[i].taskid === tasksid)
        tasks.splice(i, 1);

    axios
      .delete(`http://localhost:8080/tasks/list/` + listsid, { 'taskID': tasksid })
      .then(() => setTasks(tasks.filter(task => task.taskid !== tasksid)))
      .catch(error => console.log(error))
  }

  return (
    <>{
      tasks.map(item =>
        <Task
          key={item.taskid}
          task={item}
          changeDone={changeDone}
          deleteTask={deleteTask}
          tasks={tasks}
        />
      )
    }</>
  );
}

const newTaskTitle = document.getElementById('newTaskTitle');
const newTaskDescription = document.getElementById('newTaskDescription');
const newTaskDeadline = document.getElementById('newTaskDeadline');
const addButton = document.getElementById('addButton');
const addNewTask = () => {
  let newTask = { "listID": currentListID, "title": newTaskTitle.value };
  if (newTaskDescription.value !== '')
    newTask['description'] = newTaskDescription.value;
  if (newTaskDeadline.value !== '')
    newTask['dueDate'] = newTaskDeadline.value;

  
  axios     //* http POST localhost:8080/tasks/ listID=1 title="NEW task in list 1" dueDate="2022-02-05"
    .post(`http://localhost:8080/tasks/`, newTask)
    .then(() => {
      clearForm();
      mySetTasks(newTask);
    })
    .catch(error => console.log(error))
}

function clearForm() {
  newTaskTitle.value = '';
  newTaskDescription.value = '';
  newTaskDeadline.value = '';
  addButton.disabled = true;
}

export { Tasks, addNewTask };
