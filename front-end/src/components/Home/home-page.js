import React, { Component } from 'react';
import NavBar from '../Navigation/navbar';
import '../../App.css'
import GameDropDowns from './guess-dropdowns'
import { getGameState, getLocalGameState } from './data-layer/data';
import { clone, isEqual } from 'lodash'
import { evaluateResponse } from './data-layer/game';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state ={
            numberChoices: 4,
            options: [],
            answers: [],
            choices: []
        }
      this.buildDropDown = this.buildDropDown.bind(this)
      this.setupGame = this.setupGame.bind(this);
      this.onChange = this.onChange.bind(this);
      this.checkSubmittal = this.checkSubmittal.bind(this)
      this.updateLocal = this.updateLocal.bind(this);
      }

    async  componentDidMount(){
      await getGameState();
      this.setupGame()

    }

    setupGame(){

      let src = getLocalGameState()

      let url = src.meme.url
      let  answers = src.meme.solution
      let correctAnswer = src.meme.solution;
      this.setState({url: url, answers: answers, correctAnswer: correctAnswer})
      console.log(src)
    
      this.buildDropDown(src.wordBank)

    }

    buildDropDown(meme_answers){
    let options = []
    for(let answer of meme_answers){
      options.push({value: answer, label: answer})
    }
    this.setState({options: options})

    }
    checkSubmittal(){
      let correct = isEqual(this.state.choices, this.state.correctAnswer)
      let check = evaluateResponse(this.state.correctAnswer,this.state.choices)
      let winLose = 'Win' ? correct : 'Lose'

      if(!correct){
        this.updateLocal(winLose)
      }
    }
    onChange(item, index){
      if(item !== null){
      let choiceArray = clone(this.state.choices)
      choiceArray[index] = item.value
    
      this.setState({choices: choiceArray})
      }
    }

  updateLocal(evaluations){
    var existing = localStorage.getItem('cultured-game-state');
    let  newArray = existing['evaluations']

    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    existing = existing ? existing.split(',') : [];
    
    // Add new data to localStorage Array
    existing.push(evaluations);
    
    // Save back to localStorage
    localStorage.setItem('evaluations', existing.toString());
  }
  render() {
    if (!this.state.options) {
      return <div />
  }
    return ( 


      <React.Fragment>
          <NavBar />
          <div className='homePage'>
            <div className='imgContainer'>
                <img src={this.state.url} alt='/' />
            </div>
            <div className="optionsContainer">
                <ul className='gameDropDowns'>
                <li className='guessRows'>
                      {this.state.answers.map((item, index) =>
                        <GameDropDowns
                        onChange={(item)=>this.onChange(item, index)}
                        item={item}
                        index={index}
                          options={this.state.options}
                          />)}
                        <button onClick={this.checkSubmittal}>
                          Check
                        </button>
                    </li>
                  <li className='guessRows'>
                      {this.state.answers.map((item, index) =>
                        <GameDropDowns
                        onChange={(item)=>this.onChange(item, index)}
                        item={item}
                        index={index}
                          options={this.state.options}
                          />)}
                    </li> 
                    <li className='guessRows'>
                      {this.state.answers.map((item, index) =>
                        <GameDropDowns
                        onChange={(item)=>this.onChange(item, index)}
                        item={item}
                        index={index}
                          options={this.state.options}
                          />)}
                    </li> 
                    <li className='guessRows'>
                      {this.state.answers.map((item, index) =>
                        <GameDropDowns
                        onChange={(item)=>this.onChange(item, index)}
                        item={item}
                        index={index}
                          options={this.state.options}
                          />)}
                    </li> 
                    <li className='guessRows'>
                        {this.state.answers.map((item, index) =>
                        <GameDropDowns
                        onChange={(item)=>this.onChange(item, index)}
                        item={item}
                        index={index}
                          options={this.state.options}
                          />)}
                    </li> 
                    <li className='guessRows'>
                      {this.state.answers.map((item, index) =>
                        <GameDropDowns
                        item={item}
                        index={index}
                        onChange={(item)=>this.onChange(item, index)}
                        options={this.state.options}
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

