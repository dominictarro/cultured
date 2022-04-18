import React, { Component } from 'react';
import NavBar from '../Navigation/navbar';
import '../../App.css'
import GameDropDowns from './guess-dropdowns'
import { getGameState, getLocalGameState } from './data-layer/data';
import { clone, isEqual, uniqueId } from 'lodash'
import { evaluateResponse } from './data-layer/game';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state ={
            numberChoices: 4,
            options: [],
            answers: [],
            choices: [],
            guessNumber: 1
        }
      this.buildDropDown = this.buildDropDown.bind(this)
      this.setupGame = this.setupGame.bind(this);
      this.onChange = this.onChange.bind(this);
      this.checkSubmittal = this.checkSubmittal.bind(this)
      this.updateLocal = this.updateLocal.bind(this);
      }

    async  componentDidMount(){
      // let response =  getGameState();
      // console.log(response)
      this.setupGame()

    }

    setupGame(){

      let src = getLocalGameState()
      console.log(src)
      let url = src.meme.url
      let  answers = src.meme.solution
      let correctAnswer = src.meme.solution;
      this.setState({url: url, answers: answers, correctAnswer: correctAnswer})
  
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
      if(this.state.guessNumber==6){
        alert(`Better luck next time the correct answer was ${this.state.correctAnswer.toString().replaceAll(',', ' ')}`)
      }
      else if(this.state.choices.length !==  this.state.correctAnswer.length){
          alert('Fill out all required boxes before submitting')
      }
      else if(isEqual(this.state.choices, this.state.correctAnswer)){
        alert('Congrats you guessed correctly')
      
      }else{
        let guess = this.state.guessNumber
        guess++
        let correct = isEqual(this.state.choices, this.state.correctAnswer)
        let check = evaluateResponse(this.state.correctAnswer,this.state.choices)
        console.log(check)
        let winLose = 'Win' ? correct : 'Lose'
        this.setState({guessNumber: guess, choices: []})
        if(!correct){
          this.updateLocal(winLose)
        }
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
    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    
    // Add new data to localStorage Array

  }
  render() {
    let disable1 =  this.state.guessNumber ==  1 ? false : true   
    let disable2 =  this.state.guessNumber ==  2 ? false : true 
    let disable3 =  this.state.guessNumber ==  3 ? false : true 
    let disable4 =  this.state.guessNumber ==  4 ? false : true 
    let disable5 =  this.state.guessNumber ==  5 ? false : true 
    let disable6 =  this.state.guessNumber ==  6 ? false : true 

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
                <li key={uniqueId} className='guessRows'>
                      {this.state.answers.map((item, index) =>
                        <GameDropDowns
                        onChange={(item)=>this.onChange(item, index)}
                        disabled={disable1}
                        item={item}
                        index={index}
                          options={this.state.options}
                          />)}
                        <button disabled={disable1} onClick={this.checkSubmittal}>
                          Check
                        </button>
                    </li>
                  <li className='guessRows'>
                      {this.state.answers.map((item, index) =>
                        <GameDropDowns
                        onChange={(item)=>this.onChange(item, index)}
                        disabled={disable2}
                        item={item}
                        index={index}
                          options={this.state.options}
                          />)}
                          <button disabled={disable2} onClick={this.checkSubmittal}>
                          Check
                        </button>
                    </li> 
                    <li className='guessRows'>
                      {this.state.answers.map((item, index) =>
                        <GameDropDowns
                        onChange={(item)=>this.onChange(item, index)}
                        item={item}
                        disabled={disable3}
                        index={index}
                          options={this.state.options}
                          />)}
                            <button disabled={disable3} onClick={this.checkSubmittal}>
                          Check
                        </button>
                    </li> 
                    <li className='guessRows'>
                      {this.state.answers.map((item, index) =>
                        <GameDropDowns
                        onChange={(item)=>this.onChange(item, index)}
                        disabled={disable4}
                        item={item}
                        index={index}
                          options={this.state.options}
                          />)}
                            <button disabled={disable4} onClick={this.checkSubmittal}>
                          Check
                        </button>
                    </li> 
                    <li className='guessRows'>
                        {this.state.answers.map((item, index) =>
                        <GameDropDowns
                        onChange={(item)=>this.onChange(item, index)}
                        item={item}
                        disabled={disable5}
                        index={index}
                          options={this.state.options}
                          />)}
                            <button disabled={disable5} onClick={this.checkSubmittal}>
                          Check
                        </button>
                    </li> 
                    <li className='guessRows'>
                      {this.state.answers.map((item, index) =>
                        <GameDropDowns
                        item={item}
                        index={index}
                        disabled={disable6}
                        onChange={(item)=>this.onChange(item, index)}
                        options={this.state.options}
                          />)}
                        <button  disabled={disable6} onClick={this.checkSubmittal}>
                          Check
                        </button>
                    </li>
                </ul>
             </div> 

          </div>
    
      </React.Fragment>
      )
    }  
}

    export default HomePage;

