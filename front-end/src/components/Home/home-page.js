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
            gameState: null,
            numberChoices: 4,
            memeState: {},
            options: [],
            answers: [],
            choices: [],
            evaluations: [],

            guessNumber: 0
        }
      this.buildDropDown = this.buildDropDown.bind(this)
      this.setupGame = this.setupGame.bind(this);
      this.onChange = this.onChange.bind(this);
      this.checkSubmittal = this.checkSubmittal.bind(this)
      this.updateLocal = this.updateLocal.bind(this);
      }

  componentDidMount(){
    this.setupGame()
    }

    async setupGame(){
      let src = getLocalGameState()
        // store intervalId in the state so it can be accessed later:
      
        let url = src.meme.url
        let lastGuess = 1
        if( src.lastGuess !== undefined){
          lastGuess = src.lastGuess + 1
        }
        let  answers = src.meme.solution
        let correctAnswer = src.meme.solution;
        this.setState({url: url, answers: answers, correctAnswer: correctAnswer , memeState: src, guessNumber : lastGuess})
    
        this.buildDropDown(src.wordBank)


    }

    buildDropDown(meme_answers){
    let options = []
    for(let answer of meme_answers){
      options.push({value: answer, label: answer.toUpperCase()})
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
        let memeState = this.state.memeState
        memeState.gameStatus = 'Winner'
        window.localStorage.setItem('cultured-game-state', JSON.stringify(memeState))
        alert('Congrats you guessed correctly')

    
      }else{
        let evaluationsArray = clone(this.state.evaluations)
        let guess = this.state.guessNumber
        guess++
        let correct = isEqual(this.state.choices, this.state.correctAnswer)
        let check = evaluateResponse(this.state.correctAnswer,this.state.choices)
        
        evaluationsArray.push(check)
        this.setState({evaluations: evaluationsArray})

        if(!correct){
          this.updateLocal(evaluationsArray[0], this.state.choices)
        }
        this.setState({guessNumber: guess, choices: [], evaluations: []})

      }
    }
    onChange(item, index){
      let choiceArray = clone(this.state.choices)
      if(item !== null){
        choiceArray[index] = item.value
        this.setState({choices: choiceArray})
      }else if(item == null){
        choiceArray[index] = item
        this.setState({choices: choiceArray})
      }
      let memeState = this.state.memeState
      memeState.boardState[this.state.guessNumber-1] = choiceArray
      window.localStorage.setItem('cultured-game-state', JSON.stringify(memeState))
    }

  updateLocal(evaluations, choices){

    let memeState = this.state.memeState
    memeState.lastGuess = this.state.guessNumber
    memeState.boardState[this.state.guessNumber-1] = choices
    memeState.evaluations[this.state.guessNumber-1] = evaluations

    window.localStorage.setItem('cultured-game-state', JSON.stringify(memeState))

  }
  render() {
    let disable1 =  this.state.guessNumber ==  1 ? false : true   
    let disable2 =  this.state.guessNumber ==  2 ? false : true 
    let disable3 =  this.state.guessNumber ==  3 ? false : true 
    let disable4 =  this.state.guessNumber ==  4 ? false : true 
    let disable5 =  this.state.guessNumber ==  5 ? false : true 
    let disable6 =  this.state.guessNumber ==  6 ? false : true 
    
    if (this.state.options.length == 0) {
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
                        row={0}
                        choices={this.state.memeState.boardState}
                        onChange={(item)=>this.onChange(item, index)}
                        disabled={disable1}
                        item={item}
                        evaluations={this.state.memeState.evaluations}
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
                          row={1}
                          choices={this.state.memeState.boardState}
                          onChange={(item)=>this.onChange(item, index)}
                          disabled={disable2}
                          item={item}
                          evaluations={this.state.memeState.evaluations}
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
                        row={2}
                        choices={this.state.memeState.boardState}
                        onChange={(item)=>this.onChange(item, index)}
                        item={item}
                        disabled={disable3}
                        evaluations={this.state.memeState.evaluations}
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
                        row={3}
                        choices={this.state.memeState.boardState}

                        onChange={(item)=>this.onChange(item, index)}
                        disabled={disable4}
                        item={item}
                        evaluations={this.state.memeState.evaluations}
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
                        row={4}
                        choices={this.state.memeState.boardState}

                        onChange={(item)=>this.onChange(item, index)}
                        item={item}
                        disabled={disable5}
                        evaluations={this.state.memeState.evaluations}
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
                        row={5}
                        item={item}
                        choices={this.state.memeState.boardState}

                        index={index}
                        evaluations={this.state.memeState.evaluations}
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

