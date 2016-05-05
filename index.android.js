import React, {
  AppRegistry,
  Component,
  DeviceEventEmitter
} from 'react-native';

import AppNavigator from './application/AppNavigator'

var GcmAndroid = require('react-native-gcm-android');
import Notification from 'react-native-system-notification';

class RemarkMobile extends Component {
  componentDidMount() {
    GcmAndroid.addEventListener('register', (token) => {
      console.log('send gcm token to server', token);
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
      <AppNavigator />
    );
  }
}


AppRegistry.registerComponent('RemarkMobile', () => RemarkMobile);
