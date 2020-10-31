import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import '../containers/App.css';

import { setSearchField } from '../actions';

function App(props) {

  const [robots, setRobots] = useState([]);
  const [count, setCount] = useState(0);
  const searchField = useSelector( state => state.searchField ); // hooks redux
  const dispatch = useDispatch(); // hooks redux

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setRobots(users)
    );
  },[count]) // only run if count changes
  const onSearchChange = (event) => dispatch(setSearchField(event.target.value)); // hooks redux
  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });
  if (robots.length === 0) {
    return <h1>Loading...</h1>
  } else {
    return (
      <div className="tc">
        <h1 className="f1">Robofriends</h1>
        <button onClick={()=> setCount(count+1)}>Click Me! {count}</button>
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots}/>
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;
