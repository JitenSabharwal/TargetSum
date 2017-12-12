import React from 'react'

import {
  View,
  StyleSheet,
  Text
} from 'react-native'

import PropTypes from 'prop-types'

import RandomNumber from './RandomNumber'
class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired
  }

  randomNumbers = Array
    .from({length: this.props.randomNumberCount})
    .map(() => 10 + Math.floor(20 * Math.random()))

  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, val) => acc + val, 0)

  state = {
    selectedNumbers: []
  }

  isNumberSelected = (numberIndex) => {
    return this.state.selectedNumbers.indexOf(numberIndex) >= 0
  }
  selectNumber = (numberIndex) => {
    this.setState((prevState) => {
      return {selectedNumbers: [...prevState.selectedNumbers, numberIndex]}
    })
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.target}>{this.target}</Text>
        <View style={styles.randomContainer}>
          {this.randomNumbers.map((randomNumber, index) => 
            <RandomNumber 
              key={index} 
              id={index}
              number={randomNumber} 
              isDisabled={this.isNumberSelected(index)}
              onPress={this.selectNumber}
            />
          )}
        </View>
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

})

export default Game