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

import { List } from 'immutable';
import { connect } from 'react-redux';
import Store, { dispatch } from '../Store';

import { processLogout } from '../actions/Auth';
import { addRemark } from '../actions/Remarks';

import RemarksListLayout from '../layouts/RemarksListLayout';

import { RemarksApiGateway } from 'remark-api-client-node';

import SocketNotification from '../SocketNotification';

export default class RemarksList extends Component {
  constructor(props) {
    super(props);
    this.socket = new SocketNotification();
  }

  componentDidMount() {
    this.socket.listen((new_remark) => {
      if ((this.props.currentUser.login != new_remark.user.login) && (this.props.showOnlyCurrentUserRemarks == true)) return;
      Store.dispatch(addRemark(new_remark));
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  _onLoadRemarks(params) {
    return RemarksApiGateway.getList(params, this.props.showOnlyCurrentUserRemarks ? this.props.currentUser.login : null);
  }

  _detectActiveFooterLink() {
    return this.props.showOnlyCurrentUserRemarks ? 'my' : 'home';
  }

  render() {
    return (
      <RemarksListLayout
        remarks={ this.props.remarks }
        onLoad={ (params) => this._onLoadRemarks(params) }
        navigator={ this.props.navigator }
        activeFooterLink={ this._detectActiveFooterLink() }>
      </RemarksListLayout>
    );
  }
}

RemarksList.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
  showOnlyCurrentUserRemarks: React.PropTypes.bool.isRequired,
};

RemarksList.defaultProps = {
  currentUser: { loggedIn: false, login: null, accessToken: null },
  showOnlyCurrentUserRemarks: false,
  remarks: List([])
};

function mapStateToProps (state) {
  return {
    currentUser: state.auth.get('user'),
    remarks: state.remarks
  };
}

export default connect(mapStateToProps)(RemarksList);
