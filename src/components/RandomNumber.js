import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'

import PropTypes from 'prop-types'

class RandomNumber extends React.Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
  }
  handlePress = () => {
    if(!this.props.isDisabled) {
      this.props.onPress(this.props.id)
    }
  }
  render () {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text style={[styles.random, this.props.isDisabled && styles.selectedNumber]}>{this.props.number}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  random: {
    backgroundColor: '#aaa',
    fontSize: 35,
    width: 100,
    marginHorizontal: 20,
    marginVertical: 20,
    textAlign: 'center'
  },
  selectedNumber:{
    opacity: 0.3
  }
})
export default RandomNumber