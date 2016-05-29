import React, {
  Component,
  Navigator,
} from 'react-native';

import Login from './scenes/Login';
import RemarksList from './scenes/RemarksList';
import AddNewRemark from './scenes/AddNewRemark';

export default class AppNavigator extends Component {
  renderScene(route, navigator) {
    let scene;
    switch (route.name) {
      case 'Login':
        scene = <Login navigator={ navigator }/>;
        break;
      case 'AllRemarksList':
        scene = <RemarksList navigator={ navigator } showOnlyCurrentUserRemarks={ false }/>;
        break;
      case 'MyRemarksList':
        scene = <RemarksList navigator={ navigator } showOnlyCurrentUserRemarks={ true }/>;
        break;
      case 'AddNewRemark':
        scene = <AddNewRemark navigator={ navigator } showFooter={ false }/>;
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
