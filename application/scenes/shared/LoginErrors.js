import React, {
  Component,
  Text,
  StyleSheet,
  View
} from 'react-native';

class LoginErrors extends Component {
  _mappedErrors() {
    return this.props.errors.map((error_msg, i) => {
      return (<Text key={i} style={ styles.errorItem }>{ error_msg }</Text>);
    });
  }

  render() {
    if (this.props.errors.length == 0) return false;
    return (
      <View>
        { this._mappedErrors() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorItem: {
    alignSelf: 'center',
    color: '#A92323'
  }
});

LoginErrors.propTypes = {
  errors: React.PropTypes.array.isRequired
};

LoginErrors.defaultProps = {
  errors: []
};

export default LoginErrors;
