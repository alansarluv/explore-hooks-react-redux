import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import '../containers/App.css';

import { requestRobot, setSearchField } from '../actions';

function App() {

  const searchField = useSelector( state => state.searchRobots.searchField ); // hooks redux
  const robots = useSelector( state => state.requestRobots.robots ); // hooks redux - thunk middleware
  const isPending = useSelector( state => state.requestRobots.isPending ); // hooks redux - thunk middleware
  const error = useSelector( state => state.requestRobots.error ); // hooks redux - thunk middleware
  const dispatch = useDispatch(); // hooks redux
  
  const onSearchChange = (event) => dispatch(setSearchField(event.target.value)); // hooks redux
  
  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });
  useEffect(() => {
    dispatch(requestRobot());
  },[dispatch]);

  if (isPending) {
    return <h1>Loading...</h1>
  } else if (error) {
    return <p>{error}</p>
  } else {
    return (
      <div className="tc">
        <h1 className="f1">Robofriends</h1>
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
