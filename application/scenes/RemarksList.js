import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';
import Store, { dispatch } from '../Store';
import { processLogout } from '../actions/Auth';

export default class RemarksList extends Component {
  _onLogoutClick() {
    var comp = this;
    AsyncStorage.removeItem('remark_app_login', () => {
      Store.dispatch(processLogout());
      comp.props.navigator.replace({ name: 'Login' });
    });
  }

  renderLogin() {
    return (
      <Text>{ this.props.currentUser.login }</Text>
    );
  }

  renderLogout() {
    return (
      <TouchableHighlight onPress={ this._onLogoutClick.bind(this) }>
        <Text>Logout</Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View>
        <Text>Remarks List</Text>
        { this.renderLogin() }
        { this.renderLogout() }
      </View>
    );
  }
}

RemarksList.propTypes = {
  currentUser: React.PropTypes.object.isRequired
};

RemarksList.defaultProps = {
  currentUser: { loggedIn: false, login: undefined, accessToken: undefined }
};

function mapStateToProps (state) {
  return {
    currentUser: state.auth.get('user'),
  };
}

export default connect(mapStateToProps)(RemarksList);
