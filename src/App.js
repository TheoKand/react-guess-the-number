import React from 'react';

//reusable functional component to enter some text with a label
function InputComponent(props) {
  return (
    <fieldset>
      <legend>{props.label}</legend>
      <input type="text" 
        onChange={ props.onChange }  
        //eslint-disable-next-line no-unused-expressions
        ref={(elem) => { props.onRef }}
        />
      <button onClick={ props.onClick }>Go</button>
    </fieldset>
  )
}

class Game extends React.Component {
  hiddenStyle = {
    display: 'none'
  }    

  gameContainerStyle = {
      border: "1px solid black",
      margin: "30px",
      padding: "5px",
  }

  initialState = {
    guessesLeft: 10 ,
    randomNumber: getRandomNumber() ,
    lastGuess:undefined,
    hint:"",
    gameResult:""
  }  
  
  constructor(props) {
    super(props);
    //set the state by creating a deep copy of the initial state
    this.state = JSON.parse(JSON.stringify( this.initialState ));
  }  

  initGame() {
    this.initialState.randomNumber = getRandomNumber();
    this.setState( this.initialState );
  }
  
  handleOnClick() {
    if(this.state.lastGuess>0 && this.state.lastGuess<=10 ){
      this.state.guessesLeft--;
      
      this.setState((state, props) => ({
        guessesLeft: state.guessesLeft,
        lastGuess: state.lastGuess
      }));      
      
      this.gameWon() && this.props.onGameWon();
      this.gameLost() && this.props.onGameLost();
    }
  }
  
  handleOnChange(e) {
    this.state.lastGuess = e.target.value;
  }  

  gameWon() {
    return (this.state.lastGuess===this.state.randomNumber) ;
  }

  gameLost() {
    return (this.state.guessesLeft===0);
  }

  render() {

    //game logic
    if (this.gameWon()) {
      this.state.guessesLeft=0;
      this.state.gameResult = "You Won!";
      this.state.hint="";
    } else if (this.gameLost()) {
      this.state.gameResult = "Game over.";
      this.state.hint="";
    } else if (this.state.lastGuess && this.state.lastGuess<this.state.randomNumber) {
      this.state.hint = "Try higher";
    } else if (this.state.lastGuess) {
      this.state.hint = "Try lower";
    }
    
    //build ui
    const gameStatusElement = 
      <div>
        <h3>You have {this.state.guessesLeft} guesses left</h3>
        <div style={this.hiddenStyle}>The random number is {this.state.randomNumber}</div>
      </div>;
    
    const lastGuessElement = this.state.lastGuess && 
          <div>Your last guess was {this.state.lastGuess}. <i>{this.state.hint}</i></div>;
    
    const inputElement = 
      <InputComponent 
        label="Enter your guess:"
        onChange={ (e) => {this.handleOnChange(e) } } 
        onClick={ () => { this.handleOnClick() } } />; 
    
    const gameResultElement =
          <div>
            <b>{this.state.gameResult}</b> 
            <button onClick={()=> {this.initGame()} }>Play again</button>
          </div>; 
    
    //render ui
    return (
      <div style={this.gameContainerStyle}>
        {gameStatusElement}
        {lastGuessElement}
        { this.state.gameResult==="" ? inputElement : gameResultElement }
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

  gameLost() {
    this.setState({
      loseCount: this.state.loseCount +1
    });
    console.log("lost");
  }
  
  gameWon() {
    this.setState({
      winCount: this.state.winCount +1
    });
    console.log("won");
  }
  
  render() {
    return (
      <div>
        <div>Wins: {this.state.winCount} Loses: {this.state.loseCount}</div>
        <Game onGameWon={this.gameWon.bind(this)} onGameLost={this.gameLost.bind(this)}  />
        <Game onGameWon={this.gameWon.bind(this)} onGameLost={this.gameLost.bind(this)}  />
        <Game onGameWon={this.gameWon.bind(this)} onGameLost={this.gameLost.bind(this)}  />
        <Game onGameWon={this.gameWon.bind(this)} onGameLost={this.gameLost.bind(this)}  />
        <Game onGameWon={this.gameWon.bind(this)} onGameLost={this.gameLost.bind(this)}  />
        <Game onGameWon={this.gameWon.bind(this)} onGameLost={this.gameLost.bind(this)}  />
      </div>
    );
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 9) + 1;
}

export default App;
