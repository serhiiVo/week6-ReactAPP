import '../App.css';
import React, { useEffect, useState } from 'react';
import List from './List';
import axios from 'axios';


const Lists = () => {
  const [lists, setList] = useState([]);

  useEffect(
    () =>
      axios
        .get(`http://localhost:8080/dashboard/`)
        .then(response => setList(response.data.lists))
        .catch(error => console.log(error)), []
  );

  const addNewTask = () => console.log('Work');

  return (
    <>
      <List
        key="0"
        liststitle="Today tasks"
        listsid="0"
      />
      {
        lists.map(
          item =>
            <List
              key={item.listsid}
              liststitle={item.liststitle}
              listsid={item.listsid}
            />
        )
      }
    </>
  );
}

export default Lists;