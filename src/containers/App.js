import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import '../containers/App.css';

function App(props) {

  const [robots, setRobots] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setRobots(users)
    );
    console.log(props.store.getState())

  },[count]) // onnly run if count changes
  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  }
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
