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
          <TouchableHighlight style={ [styles.footerButton, styles.footerButtonActive] }>
            <Text style={ [styles.footerButtonText, styles.footerButtonTextActive] }>Home</Text>
          </TouchableHighlight>
          <TouchableHighlight style={ styles.footerButton }>
            <Text style={ styles.footerButtonText }>My</Text>
          </TouchableHighlight>
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
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'stretch'
    
  },
  headerLogo: {
    height: 35,
    width: 20
  },
  footerButton: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center'
  },
  footerButtonActive: {
    backgroundColor: '#4589b0'
  },
  footerButtonText: {
    fontSize: 20,
    fontFamily: 'OpenSans-Semibold',
    alignSelf: 'center',
    color: '#4589b0'
  },
  footerButtonTextActive: {
    color: '#ffffff'
  }
});

export default RemarksListLayout;
