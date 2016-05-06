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

export default class RemarksList extends Component {
  constructor(props) {
    super(props);
    this.state = {login: null};
  }

  componentDidMount() {
    this._loadLogin().done();
  }

  async _loadLogin() {
    var value = await AsyncStorage.getItem("remark_app_login");
    console.log("Current value is " + value);
    this.setState({login: value});
  }

  _onLogoutClick() {
    var comp = this;
    AsyncStorage.removeItem('remark_app_login', () => {
      comp.props.navigator.push({ name: 'Login' });
    });
  }

  renderLogin() {
    return (
      <Text>{ this.state.login }</Text>
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
