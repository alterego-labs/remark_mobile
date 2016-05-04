import React, {
  AppRegistry,
  Component,
} from 'react-native';

import AppNavigator from './application/AppNavigator'

class RemarkMobile extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}


AppRegistry.registerComponent('RemarkMobile', () => RemarkMobile);
