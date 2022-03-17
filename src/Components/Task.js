import '../App.css';
import { useParams, Link } from 'react-router-dom';
import { showOnlyUndoned } from '../Routes/Main'; // перенести це в компонент Tаsks

export default (props) => {
    const { listsid } = useParams();

    let task = props.task;
    let bgColor = '#1de498b5';
    let date = '';
    let textColor = "normal";
    let nameTextDecoration = "normal";

    if (task.done === true) {
        if (showOnlyUndoned) return <></>;
        bgColor = 'rgba(128, 128, 128, 0.3)';
        textColor = "rgb(52, 52, 52, 0.3)";
        nameTextDecoration = "line-through";
    }
    if (task.duedate !== undefined && task.duedate != null) {
        if (task.done !== true)
            bgColor = new Date() < new Date(task.duedate) ? '#1de498b5' : '#ff73006b'
        date = `Due date: ${new Date(task.duedate).toISOString().split('T')[0]}`
    }
    const listLink = listsid === undefined ?
        <Link key={task.listsid} to={`/list/${task.listsid}`}>
            List: {task.liststitle}
        </Link> : <></>;

    return (
        <div className="task"> {/* Тут має бути інший клас в залежності від якого визначаються стилі інших */}
            <data style={{ backgroundColor: `${bgColor}` }}>
                <label>
                    <input
                        className="checkbox"
                        id={`task(${task.taskid})`}
                        type='checkbox'
                        checked={task.done}
                        onChange={() => props.changeDone(task.listsid, task.taskid, !task.done)}
                    />
                    <div className="title"><p style={{ 'color': textColor, textDecoration: nameTextDecoration }}>{task.tasktitle}</p></div>
                </label>
                <>{listLink}</>
                <div className="date" style={{
                     backgroundColor: `${bgColor === '#ff73006b' ? '#ff00009b' : '#ff000000'}` //Має бути поняття стану, та стилі мають залежати від нього
                     }}>
                    <p style={{ color: textColor }}>{date}</p>
                </div>
                <div className="description"><p style={{ color: textColor }}>{task.description}</p></div>
            </data>
            <button className="deleteButton"
                onClick={() => props.deleteTask(listsid, task.taskid)}
            ><p>⌫</p></button>
        </div >
    );
}
