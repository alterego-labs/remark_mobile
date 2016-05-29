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
import AuthService from '../utils/remark_api/AuthService';
import { Map } from 'immutable';

import Store, { dispatch } from '../Store';
import { receiveAccessToken } from '../actions/Auth';

class AddNewRemark extends Component {
  // render() {
  //   return (
  //   );
  // }
}

export default AddNewRemark;
