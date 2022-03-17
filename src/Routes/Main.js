import { Outlet } from 'react-router-dom';
import '../App.css';
import Lists from '../Components/Lists';
import { addNewTask } from '../Components/Tasks';



const Main = props => {
    const addButton = document.getElementById('addButton');
    const newTaskTitle = document.getElementById('newTaskTitle');
    // addButton.disabled = true;

    return (
        <>
            <h1>TodoList</h1>
            <div className="layout">

                <div className="dashboard">
                    <h1>Dashboard</h1>
                    <div className="container">
                        <Lists />
                    </div>
                </div>

                <div className="list">
                    <h1>Tasks</h1>
                    <div className="container">
                        <Outlet />
                    </div>
                </div>
                <div className="control"> {/* це має бути форма в реакт стилі та данні з інпутів брати з state */}
                    <h1>Control</h1>
                    <div className="container">

                        <div className="showFilter">
                            <label className="switch">
                                <input type="checkbox"
                                    onChange={changeShowingMode}
                                />
                                <span className="slider round">
                                </span>
                            </label>
                            <p>Show only undoned</p>
                        </div>

                        <div className="addTaskForm">
                            <p>Add a new task</p>
                            <input id="newTaskTitle" placeholder='Task title: "Buy a milk"'
                                onChange={
                                    () => {
                                        console.log(newTaskTitle.value);
                                        addButton.disabled = newTaskTitle.value !== '' ? false : true
                                    }
                                } />
                            <input id="newTaskDescription" placeholder='Task description: "Not in ATB"' />
                            <input type="date" id="newTaskDeadline" />
                            <button id="addButton" onClick={() => addNewTask()}><p>Add task</p></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

let showOnlyUndoned = false;
const changeShowingMode = () => showOnlyUndoned = !showOnlyUndoned;;


export { Main, showOnlyUndoned };