import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';
import { AuthApiGateway } from 'remark-api-client-node';
import { Map } from 'immutable';

class Login extends Component {
  onContinueClick() {
    this._storeLogin(this.state.login).done();
    this.props.navigator.push({
      name: 'RemarksList'
    });
  }

  async _storeLogin(login) {
    console.log("Setted value is " + login);
    await AsyncStorage.setItem("remark_app_login", login);
  }

  render() {
    return (
      <View style={styles.topContainer}>
        <View style={ styles.logoContainer }>
          <Text style={ styles.name }>REMARK</Text>
        </View>
        <View style={ styles.formContainer }>
          <View style={ {backgroundColor: '#fff', marginLeft: 10, marginRight: 10, marginBottom: 10} }>
            <TextInput
              ref="login"
              style={ styles.loginField }
              placeholder="Enter your nickname"
              placeholderTextColor="#bababa"
              underlineColorAndroid="transparent"
              onChangeText={ (text) => this.setState({login: text}) }
            />
          </View>
          <TouchableHighlight style={ styles.continueBtn } onPress={ this.onContinueClick.bind(this) }>
            <Text style={ styles.continueBtnText }>Continue</Text>
          </TouchableHighlight>
        </View>
        <Text style={ styles.copyright }>AlterEGO Labs, 2016</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: '#4589b0',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column'
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontFamily: 'OpenSans-Semibold',
    fontSize: 28,
    letterSpacing: 3,
    color: '#ffffff'
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column'
  },
  loginField: {
    height: 60,
    fontSize: 25,
    borderColor: 'gray',
    borderWidth: 1,
    color: '#000',
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'OpenSans-Semibold'
  },
  continueBtn: {
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#1d628b',
    backgroundColor: '#1d628b',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'OpenSans-Semibold'
  },
  copyright: {
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'OpenSans-Semibold',
    fontSize: 12
  }
});

Login.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
};

Login.defaultProps = {
  currentUser: {}
};

function mapStateToProps (state) {
  return {
    currentUser: state.get('auth').user,
  };
}

export default connect(mapStateToProps)(Login);
