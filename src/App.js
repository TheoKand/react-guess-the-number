import React from 'react';
import ThemeChanger from './themeChanger';
import {AppContext,defaultContext} from "./context";
import Game from "./game";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      winCount: 0,
      loseCount: 0,
      context: {...defaultContext}
    };

  }

  onChangeTheme(newTheme) {
    this.setState(({
      context: { theme: [newTheme]}
    }))
  }

  onGameLost() {
    this.setState({
      loseCount: this.state.loseCount + 1
    });
  }
 
  onGameWon() {
    this.setState({
      winCount: this.state.winCount + 1
    });
  }

  render() {
    return (
      <AppContext.Provider value={ this.state }>
        <ThemeChanger onChange={ (e) => this.onChangeTheme(e) } />
        <div>
          <div>Wins: {this.state.winCount} Loses: {this.state.loseCount}</div>
          <Game onGameWon={ ()=> {this.onGameWon()} } onGameLost={ ()=> {this.onGameLost()} } />
          <Game onGameWon={ ()=> {this.onGameWon()} } onGameLost={ ()=> {this.onGameLost()} } />
          <Game onGameWon={ ()=> {this.onGameWon()} } onGameLost={ ()=> {this.onGameLost()} } />
          <Game onGameWon={ ()=> {this.onGameWon()} } onGameLost={ ()=> {this.onGameLost()} } />
          <Game onGameWon={ ()=> {this.onGameWon()} } onGameLost={ ()=> {this.onGameLost()} } />
          <Game onGameWon={ ()=> {this.onGameWon()} } onGameLost={ ()=> {this.onGameLost()} } />
        </div>
        </AppContext.Provider>
    );
  }
}

export default App;
