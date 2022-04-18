import './App.css';
import React, { Component } from 'react';

import { renderMatches, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/home-page'
import { getGameState } from './components/Home/data-layer/data';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      data: null
    }

  }

  componentDidMount(){
    this.setState({loading: true})
    getGameState().then(data=>{
      this.setState({loading: false})
    })
  }
  
  render(){
  if(this.state.loading == true) return <div> </div>
  return (
    <>

    <Routes>
        <Route path='/' element={<HomePage />} />
    </Routes>
    </>
  );
  }
}
export default App;
