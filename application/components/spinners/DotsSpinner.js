import React, {
  Component,
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

class DotsSpinner extends Component {
  render() {
    if (!this.props.show) return false;
    return (
      <View style={ styles.dotsView }>
        <Image source={ require('../../images/loader_more.gif') }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dotsView: {
    alignItems: 'center'
  }
});

DotsSpinner.propTypes = {
  show: React.PropTypes.bool.isRequired
}

DotsSpinner.defaultProps = {
  show: true
}

export default DotsSpinner;
