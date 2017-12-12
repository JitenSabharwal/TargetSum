import React from 'react'
import Game from './Game'
class App extends React.Component {
  state = {
    gameId: 0,
    score: 0
  }
  resetGame = () => {
    this.setState((prevState) => {
      return {gameId: prevState.gameId + 1}
    })
  }
  increaseScore = () => {
    this.setState((prevState) => {
      return {score: prevState.score + 1}    
    })
  }
  render () {
    return (
      <Game 
        key={this.state.gameId}
        onPlayAgain={this.resetGame}
        addGameScore={this.increaseScore}
        gameScore={this.state.score}
        randomNumberCount={6} 
        initialSeaconds={10} />
    )
  }
}

export default App