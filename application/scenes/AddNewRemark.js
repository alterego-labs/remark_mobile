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

import InsideLayout from '../layouts/InsideLayout';

import { connect } from 'react-redux';
import AuthService from '../utils/remark_api/AuthService';
import { Map } from 'immutable';

import Store, { dispatch } from '../Store';
import { receiveAccessToken } from '../actions/Auth';

import RemarksService from '../utils/remark_api/RemarksService';

import LoginErrors from './shared/LoginErrors';

class AddNewRemark extends InsideLayout {
  constructor(props) {
    super(props);
    this.state = { viewState: 'form', errors: [], remarkBody: '' };
  }

  _onBackClick() {
    this.props.navigator.pop();
  }

  _onSaveClick(event) {
    this.setState({ viewState: 'loading', errors: [] });
    let comp = this;
    RemarksService.doCreate(
      {
        login: this.props.currentUser.login,
        message: { body: this.state.remarkBody }
      },
      (success_data) => {
        
      },
      (failure_data) => {
        comp.setState({ errors: failure_data.errors, viewState: 'form' });
      }
    );
  }

  renderHeaderLeftButton() {
    return (
      <TouchableHighlight onPress={ this._onBackClick.bind(this) } style={ styles.backTouch }>
        <Image style={ styles.backImg } resizeMode='stretch' source={ require('../images/back.png') }/>
      </TouchableHighlight>
    );
  }

  renderBody() {
    if (this.state.viewState == 'form') {
      return this._renderForm();
    } else {
      return (
        <View style={ styles.loadingView }>
          <Image style={ styles.loadingImg } source={ require('../images/loader_new_remark.gif') } />
        </View>
      );
    }
  }

  _renderErrors() {
    return (
      <LoginErrors errors={ this.state.errors || [] }/>
    );
  }

  _renderForm() {
    return (
      <View style={ styles.newRemarkForm }>
        <Text style={ styles.formCaption }>New remark:</Text>
        <TextInput
          style={ styles.remarkBodyInput }
          multiline={ true }
          onChangeText={ (text) => this.setState({remarkBody: text}) }
        />
        <TouchableHighlight style={ styles.saveBtn } onPress={ event => this._onSaveClick(event) }>
          <Text style={ styles.saveBtnText }>Save</Text>
        </TouchableHighlight>
        { this._renderErrors() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backTouch: {
    position: 'absolute',
    top: 16,
    left: 5
  },
  backImg: {
    height: 25,
    width: 25,
    opacity: 0.5
  },
  formCaption: {
    fontFamily: 'OpenSans-Semibold',
    fontSize: 28,
    letterSpacing: 3
  },
  newRemarkForm: {
    marginLeft: 10,
    marginRight: 10
  },
  remarkBodyInput: {
    height: 200,
    fontSize: 15,
    borderColor: 'gray',
    borderWidth: 1,
    color: '#000',
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'OpenSans-Semibold'
  },
  saveBtn: {
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
  saveBtnText: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'OpenSans-Semibold'
  },
  loadingView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  loadingImg: {
    alignSelf: 'center'
  }
});

AddNewRemark.propTypes = {
  currentUser: React.PropTypes.object.isRequired
}

AddNewRemark.defaultProps = {
  currentUser: { loggedIn: false, login: null, accessToken: null }
}

function mapStateToProps (state) {
  return {
    currentUser: state.auth.get('user')
  };
}

export default connect(mapStateToProps)(AddNewRemark);
