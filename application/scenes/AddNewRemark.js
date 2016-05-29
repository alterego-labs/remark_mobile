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
  }
});

export default AddNewRemark;
