import React from 'react';
import InputComponent from "./inputComponent";
import {AppContext} from './context';

const styles = (theme) => ({
    hiddenStyle : {
      display: 'none'
    },
    gameContainerStyle : {
      border: `1px solid ${theme}`,
      margin: "30px",
      padding: "5px",
      color: [theme]
    }
  });
  
  export default class Game extends React.Component {
  
    initialState = {
      guessesLeft: 10,
      randomNumber: getRandomNumber(),
      hint: "",
      gameResult: ""
    }
  
    constructor(props) {
      super(props);
      //set the state by creating a deep copy of the initial state
      this.state = {...this.initialState};
    }
  
    initGame() {
      this.initialState.randomNumber = getRandomNumber();
      this.setState(this.initialState);
    }
  
    handleOnChange(e) {
      this.lastGuess = parseInt(e.target.value);
    }
  
    handleOnClick() {
      if (this.lastGuess < 0 || this.lastGuess > 10) return;
      this.gameLogic();
    }
  
    gameLogic() {
  
      let currentState = {...this.state}
      currentState.guessesLeft--;
  
      //game logic
      if (this.lastGuess === currentState.randomNumber) {
        currentState.guessesLeft = 0;
        currentState.gameResult = "You Won!";
        currentState.hint = "";
        this.props.onGameWon();
      } else if (currentState.guessesLeft === 0) {
        currentState.gameResult = "Game over.";
        currentState.hint = "";
        this.props.onGameLost()
      } else if (this.lastGuess < this.state.randomNumber) {
        currentState.hint = `Your last guess was ${this.lastGuess}. Try higher`;
      } else if (this.lastGuess > this.state.randomNumber) {
        currentState.hint = `Your last guess was ${this.lastGuess}. Try lower`;
      }
  
      this.setState({
        guessesLeft: currentState.guessesLeft,
        gameResult: currentState.gameResult,
        hint: currentState.hint,
      });
    }
  
    render() {
  
      //build ui
      const gameStatusElement =
        <div>
          <h3>You have {this.state.guessesLeft} guesses left</h3>
          <div style={styles("red").hiddenStyle}>The random number is {this.state.randomNumber}</div>
        </div>;
  
      const hintElement = this.state.hint &&
        <div><i>{this.state.hint}</i></div>;
  
      const inputElement =
        <InputComponent
          label="Enter your guess:"
          onChange={(e) => { this.handleOnChange(e) }}
          onClick={() => { this.handleOnClick() }} />;
  
      const gameResultElement =
        <div>
          <b>{this.state.gameResult}</b>
          <button onClick={() => { this.initGame() }}>Play again</button>
        </div>;
  
      //render ui
      return (
        <AppContext.Consumer>
        {context => 
            <div style={styles( context.context.theme ).gameContainerStyle}>
            {gameStatusElement}
            {hintElement}
            {this.state.gameResult === "" ? inputElement : gameResultElement}
            </div>
        }
        </AppContext.Consumer>
      );
    }
  }

  function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1;
  }