import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';

import { AuthApiGateway } from 'remark-api-client-node';

export default class Login extends Component {
  onContinueClick() {
    console.log('continue clicked');
    AuthApiGateway.login({ user: { login: "m32dm23mz232m323ze23" } }).then((response) => {
      console.log(response);
      return response;
    }).then((response) => {
      console.log(response);
      return response;
    }).catch(function(ex) {
      console.log(ex);
      return ex.response;
    });

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
              style={ styles.loginField }
              placeholder="Enter your nickname"
              placeholderTextColor="#bababa"
              underlineColorAndroid="transparent"
            />
          </View>
          <TouchableHighlight style={ styles.continueBtn } onPress={ this.onContinueClick }>
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
