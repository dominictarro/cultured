import React, { Component } from 'react';
import NavBar from '../Navigation/navbar';
import '../../App.css'
import GameDropDowns from './guess-dropdowns'
const gameStateKey = 'cultured-game-state';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state ={
            numberChoices: 4,
            options: {}
        }
      
      }

     componentDidMount(){
        //  this.getGameState()
        console.log(window.localStorage.getItem(gameStateKey))
    }

    async getRemoteMemeState() {
        const response = await fetch('/today');
        return await response.json();
    }

    getGameState() {
        var gameState = this.getLocalGameState();
        // New player if false
        if (gameState != null) {
            const today = new Date().getDay();
            // Automatically converts from UTC to local time
            const dayOfLastUpdate = new Date(gameState.updatedAt).getDay();
            // Expired game if false
            if (today === dayOfLastUpdate) {
                return gameState;
            }
        }
    }

    updateLocalGameState(gameState) {
        window.localStorage.setItem(gameStateKey, gameState);
    }

    getLocalGameState() {
        return window.localStorage.getItem(gameStateKey);
    }
    buildDropDown(){
        let options = []
        //for options provided loop through and push value and label to obj and then push to the array of options and set options state

    }
  render() {
    // let options = this.buildDropDown()

    //get options from the api and build the drop down
    let answers = ['blah', 'me', 'you', 'and', 'you']
    let testOptions = [
        {value: 'one', label: 'two'},
         {value: 'two', label: 'three'},

    ]

    return (

      <React.Fragment>
          <NavBar />
          <div className='homePage'>
            <div className='imgContainer'>
                <img src='https://i.imgflip.com/26am.jpg' />
            </div>
            <div className="optionsContainer">
                <ul className='gameDropDowns'>
                    <li className='guessRows'>
                      {answers.map((item, index) =>
                        <GameDropDowns
                          options={testOptions}
                          />)}
                    </li>
                    <li className='guessRows'>
                      {answers.map((item, index) =>
                        <GameDropDowns
                          options={testOptions}
                          />)}
                    </li> 
                    <li className='guessRows'>
                      {answers.map((item, index) =>
                        <GameDropDowns
                          options={testOptions}
                          />)}
                    </li> 
                    <li className='guessRows'>
                      {answers.map((item, index) =>
                        <GameDropDowns
                          options={testOptions}
                          />)}
                    </li> 
                    <li className='guessRows'>
                        {answers.map((item, index) =>
                        <GameDropDowns
                          options={testOptions}
                          />)}
                    </li> 
                    <li className='guessRows'>
                      {answers.map((item, index) =>
                        <GameDropDowns
                          options={testOptions}
                          />)}
                    </li>
                </ul>
            </div>

          </div>
    
      </React.Fragment>
      )
    }  
}

    export default HomePage;

