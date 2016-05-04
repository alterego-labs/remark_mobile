import React, {
  Component,
  Navigator,
} from 'react-native';

import Login from './scenes/Login';

export default class AppNavigator extends Component {
  renderScene(route, navigator) {
    let scene;
    switch (route.name) {
      case 'Login':
        scene = <Login navigator={ navigator }/>;
        break;
    }
    return scene;
  }

  render() {
    return (
      <Navigator
        ref="nav"
        initialRoute={{
          name: 'Login',
          index: 0
        }}
        renderScene={ this.renderScene }
      />
    );
  }
}
