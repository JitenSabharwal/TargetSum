import React from 'react'

import {
  View,
  StyleSheet,
  Text,
  Button
} from 'react-native'

import PropTypes from 'prop-types'

import RandomNumber from './RandomNumber'
import shuffle from 'lodash.shuffle'
class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeaconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
    gameScore: PropTypes.number.isRequired,
    addGameScore: PropTypes.func.isRequired
  }

  randomNumbers = Array
    .from({length: this.props.randomNumberCount})
    .map(() => 10 + Math.floor(10 * Math.random()))

  shuffledRandomNumbers = shuffle(this.randomNumbers)

  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, val) => acc + val, 0)
  gameStatus = 'PLAYING'
  state = {
    selectedIds: [],
    remainingSeconds: this.props.initialSeaconds
  }
  componentDidMount() {
    this.timeIntervalId = setInterval(()=> {
      this.setState((prevState) => {
        return {remainingSeconds: prevState.remainingSeconds - 1}
      }, () => {
        if (this.state.remainingSeconds === 0) {
          clearInterval(this.timeIntervalId)
        }
      })
    }, 1000)
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextState.selectedIds !== this.state.selectedIds || nextState.remainingSeconds === 0) {
      this.gameStatus = this.calcGameStatus(nextState)
      if(this.gameStatus !== 'PLAYING'){
        clearInterval(this.timeIntervalId)
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.timeIntervalId)
  }
  isNumberSelected = (numberIndex) => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0
  }
  selectNumber = (numberIndex) => {
    this.setState((prevState) => {
      return {selectedIds: [...prevState.selectedIds, numberIndex]}
    })
  }
  calcGameStatus = (nextState) => {
    const sumSelected = nextState.selectedIds.reduce((acc, val) => {
      return acc + this.shuffledRandomNumbers[val]
    },0)
    if(nextState.remainingSeconds === 0) {
      return 'LOST'
    }
    if (sumSelected < this.target) {
      return 'PLAYING'
    } else if (sumSelected > this.target) {
      return 'LOST'
    } else {
      clearInterval(this.initialSeaconds)
      this.props.addGameScore()
      return 'WON'
    }
  }
  gameEnd = () => {
    return (
      <View>
        <Text style={styles.scoreCard}>Score {this.props.gameScore}</Text>
        <Button
          title="Play Again"
          onPress={this.props.onPlayAgain}
        />
      </View>
    )
  }
  render () {
    const gameStatus = this.gameStatus
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
        <View style={styles.randomContainer}>
          {this.shuffledRandomNumbers.map((randomNumber, index) => 
            <RandomNumber 
              key={index} 
              id={index}
              number={randomNumber} 
              isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'}
              onPress={this.selectNumber}
            />
          )}
        </View>
        {this.gameStatus !== 'PLAYING' && this.gameEnd()}
        <Text>{this.state.remainingSeconds}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    paddingTop: 30
  },
  target: {
    fontSize: 40,
    backgroundColor: '#aaa',
    margin: 50,
    textAlign: 'center'
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  STATUS_WON: {
    backgroundColor: 'green'
  },
  STATUS_PLAYING: {
    backgroundColor: '#bbb'
  },
  STATUS_LOST: {
    backgroundColor: 'red'
  },
  scoreCard:{
    fontSize: 30,
    margin:20,
    textAlign: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#41a48f',
  }

})

export default Game