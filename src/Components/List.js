import '../App.css';
import { Link } from 'react-router-dom';

//http GET localhost:8080/lists/list/2/tasks all:=true
function ListName(props) {
  let link = props.listsid == 0 ? `colection/today` : `list/${props.listsid}`;
  return (
    <>
      <div className="lists">
        <Link
          key={props.listsid}
          to={link}
        >
          <h1>{props.liststitle}</h1>
        </Link>
      </div>
    </>
  );
}

export default ListName;