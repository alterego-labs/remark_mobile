import React, {
  AppRegistry,
  Component,
  DeviceEventEmitter
} from 'react-native';

import AppNavigator from './application/AppNavigator'

import { Provider } from 'react-redux'
import Store, { dispatch } from './application/Store';

import { receivePushToken } from './application/actions/Auth';

var GcmAndroid = require('react-native-gcm-android');
import Notification from 'react-native-system-notification';

class RemarkMobile extends Component {
  componentDidMount() {
    GcmAndroid.addEventListener('register', (token) => {
      console.log('send gcm token to server', token);
      Store.dispatch(receivePushToken({ token: token }));
    });
    GcmAndroid.addEventListener('notification', (notification) => {
      console.log('receive gcm notification', notification);
    });

    DeviceEventEmitter.addListener('sysNotificationClick', (e) => {
      console.log('sysNotificationClick', e);
    });

    GcmAndroid.requestPermissions();
  }

  render() {
    return (
      <Provider store={ Store }>
        <AppNavigator />
      </Provider>
    );
  }
}


AppRegistry.registerComponent('RemarkMobile', () => RemarkMobile);
