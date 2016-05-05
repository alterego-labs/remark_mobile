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

  renderLogin () {
    return (
      <Text>{ this.state.login }</Text>
    );
  }

  render() {
    return (
      <View>
        <Text>Remarks List</Text>
        { this.renderLogin() }
      </View>
    );
  }
}
