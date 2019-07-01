import React, { Component } from 'react';
import './App.css';
import PriceChart from './PriceChart';

class App extends Component {

  render() {
    return (
      <div className="App">
      <PriceChart color="red" chartTitle="SPY Price" ticker="spy" interval="5"/>
      </div>
    );
  }
}

export default App;
