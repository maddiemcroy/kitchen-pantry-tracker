import React from 'react';
import './App.css';
import PantryList from './pages/PantryList';
import styled from 'styled-components';

const Header = styled.div`
  /* text-align: left; */
  font-size: 2em;
  margin: 15px;
`

function App() {
  return (
    <div className="App">
      <Header>Kitchen Pantry Tracker</Header>
      <PantryList />
    </div>
  );
}

export default App;
