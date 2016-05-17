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
import Store, { dispatch } from '../Store';

class RemarksListLayout extends Component {
  render() {
    return (
      <View style={ styles.topContainer }>
        <View style={ styles.header }>
          <Image style={ styles.headerLogo } resizeMode='stretch' source={ require('../images/logo.png') }/>
        </View>
        <View style={ styles.body }>
          <Text>body</Text>
        </View>
        <View style={ styles.footer }>
          <Text>footer</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  header: {
    height: 60,
    borderBottomColor: '#4589b0',
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    alignSelf: 'stretch',
    flex: 1
  },
  footer: {
    height: 60,
    borderTopColor: '#4589b0',
    borderTopWidth: 1,
    alignSelf: 'stretch'
  },
  headerLogo: {
    height: 55,
    width: 40
  }
});

export default RemarksListLayout;
