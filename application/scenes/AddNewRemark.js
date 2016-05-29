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

class AddNewRemark extends InsideLayout {
  _onBackClick() {
    this.props.navigator.pop();
  }

  renderHeaderLeftButton() {
    return (
      <TouchableHighlight onPress={ this._onBackClick.bind(this) } style={ styles.backTouch }>
        <Image style={ styles.backImg } resizeMode='stretch' source={ require('../images/back.png') }/>
      </TouchableHighlight>
    );
  }

  renderBody() {
    return (
      <View style={ styles.newRemarkForm }>
        <Text style={ styles.formCaption }>New remark:</Text>
        <TextInput
          style={ styles.remarkBodyInput }
          multiline={ true }
        />
        <TouchableHighlight style={ styles.saveBtn }>
          <Text style={ styles.saveBtnText }>Save</Text>
        </TouchableHighlight>
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
    fontSize: 25,
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
