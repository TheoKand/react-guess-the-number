import React from 'react';

//reusable functional component to enter some text with a label
function InputComponent(props) {
  return (
    <fieldset>
      <legend>{props.label}</legend>
      <input type="text"
        onChange={props.onChange}
        //eslint-disable-next-line no-unused-expressions
        ref={(elem) => { props.onRef }}
      />
      <button onClick={props.onClick}>Go</button>
    </fieldset>
  )
}

const styles = {
  hiddenStyle : {
    display: 'none'
  },
  gameContainerStyle : {
    border: "1px solid black",
    margin: "30px",
    padding: "5px",
  }
};

class Game extends React.Component {

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
        <div style={styles.hiddenStyle}>The random number is {this.state.randomNumber}</div>
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
      <div style={styles.gameContainerStyle}>
        {gameStatusElement}
        {hintElement}
        {this.state.gameResult === "" ? inputElement : gameResultElement}
      </div>
    );
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      winCount: 0,
      loseCount: 0
    };

  }

  onGameLost() {
    this.setState({
      loseCount: this.state.loseCount + 1
    });
    console.log("lost");
  }

  onGameWon() {
    this.setState({
      winCount: this.state.winCount + 1
    });
    console.log("won");
  }

  render() {
    return (
      <div>
        <div>Wins: {this.state.winCount} Loses: {this.state.loseCount}</div>
        <Game onGameWon={ ()=> {this.onGameWon()} } onGameLost={ ()=> {this.onGameLost()} } />
        <Game onGameWon={ ()=> {this.onGameWon()} } onGameLost={ ()=> {this.onGameLost()} } />
        <Game onGameWon={ ()=> {this.onGameWon()} } onGameLost={ ()=> {this.onGameLost()} } />
        <Game onGameWon={ ()=> {this.onGameWon()} } onGameLost={ ()=> {this.onGameLost()} } />
        <Game onGameWon={ ()=> {this.onGameWon()} } onGameLost={ ()=> {this.onGameLost()} } />
        <Game onGameWon={ ()=> {this.onGameWon()} } onGameLost={ ()=> {this.onGameLost()} } />
      </div>
    );
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 9) + 1;
}

export default App;
