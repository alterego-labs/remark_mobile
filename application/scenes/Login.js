import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  Image
} from 'react-native';

import { connect } from 'react-redux';
import AuthService from '../utils/AuthService';
import { Map } from 'immutable';

import Store, { dispatch } from '../Store';
import { receiveAccessToken } from '../actions/Auth';

import LoginErrors from './shared/LoginErrors';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { viewState: 'loading', login: null, errors: [] };
  }

  onContinueClick(event) {
    this.setState({ viewState: 'loading', errors: [] });
    let comp = this;
    let enteredLogin = this.state.login;
    AuthService.doLogin(
      { login: enteredLogin },
      (data) => {
        comp._storeLogin(data.user).done();
        comp._goToRemarksList();
      },
      (data) => {
        comp.setState({ errors: data.errors, viewState: 'form' });
      }
    );

    event.preventDefault();
    return false;
  }

  async _storeLogin(user) {
    console.log("Setted value is " + user.login);
    Store.dispatch(receiveAccessToken({ accessToken: user.login, login: user.login }));
    await AsyncStorage.setItem("remark_app_login", user.login);
  }

  componentDidMount() {
    var comp = this;
    AsyncStorage.getItem("remark_app_login", (err, result) => {
      if (result) {
        comp._goToRemarksList();
      } else {
        this.setState({ viewState: 'form' });
      }
    });
  }

  _goToRemarksList() {
    this.props.navigator.replace({
      name: 'RemarksList'
    });
  }

  _renderErrors() {
    return (
      <LoginErrors errors={ this.state.errors || [] }/>
    );
  }

  _renderForm() {
    return (
      <View>
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
        <TouchableHighlight style={ styles.continueBtn } onPress={ event => this.onContinueClick(event) }>
          <Text style={ styles.continueBtnText }>Continue</Text>
        </TouchableHighlight>
        { this._renderErrors() }
      </View>
    );
  }

  _renderMain() {
    if (this.state.viewState == 'loading') {
      return (
        <Image source={ require('../images/loader_login.gif') }/>
      );
    } else {
      return this._renderForm();
    }
  }

  render() {
    return (
      <View style={styles.topContainer}>
        <View style={ styles.logoContainer }>
          <Text style={ styles.name }>REMARK</Text>
        </View>
        <View style={ styles.formContainer }>
          { this._renderMain() }
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
  currentUser: React.PropTypes.object.isRequired
};

Login.defaultProps = {
  currentUser: {}
};

function mapStateToProps (state) {
  return {
    currentUser: state.auth.get('user'),
  };
}

export default connect(mapStateToProps)(Login);
