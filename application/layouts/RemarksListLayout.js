import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  Image,
  ListView
} from 'react-native';

import InsideLayout from './InsideLayout';

import { connect } from 'react-redux';
import Store, { dispatch } from '../Store';

import { processLogout } from '../actions/Auth';
import { cleanRemarks, loadRemarks, addRemarks } from '../actions/Remarks';

import RemarkListItem from '../views/remarks/ListItem';
import DotsSpinner from '../components/spinners/DotsSpinner';

class RemarksListLayout extends InsideLayout {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      noMoreRemarks: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.remarks.toArray())
    });
  }

  componentDidMount() {
    this.getItems(true);
  }

  getItems(firstLoad) {
    this.props.onLoad(this.getParams(firstLoad))
      .then((response_json) => {
        const remarks = response_json.data.messages;
        const dispatchAction = firstLoad ? loadRemarks : addRemarks
        Store.dispatch(dispatchAction(remarks));
        this.setState({ loading: false, noMoreRemarks: remarks.length === 0 });
        return response_json;
      }).catch((ex) => {
        console.log('parsing failed', ex);
      });
  }

  getParams(firstLoad) {
    if (firstLoad) return null;
    let lastItem = this.getLastItem();
    return lastItem ? { last_message_id: lastItem.id } : null;
  }

  getLastItem() {
    if (!this.props.remarks || this.props.remarks.size === 0) return null;
    return this.props.remarks.last();
  }

  _onGoToAllRemarksList() {
    if (this.props.activeFooterLink == 'home') return false;
    this.props.navigator.replace({name: 'AllRemarksList'});
  }

  _onGoToMyRemarksList() {
    if (this.props.activeFooterLink == 'my') return false;
    this.props.navigator.replace({name: 'MyRemarksList'});
  }

  _onLogoutClick() {
    var comp = this;
    AsyncStorage.removeItem('remark_app_login', () => {
      Store.dispatch(processLogout());
      comp.props.navigator.replace({ name: 'Login' });
    });
  }

  _onNewRemarkClick() {
  }

  renderRemark(remark) {
    return (
      <RemarkListItem remark={ remark }/>
    );
  }

  onBottom() {
    if (this.state.noMoreRemarks || this.state.loading) return false;
    return this.setState({ loading: true }, () => {
      this.getItems(false);
    });
  }

  renderBody() {
    return (
      [
        <ListView
          dataSource={ this.state.dataSource }
          renderRow={ this.renderRemark.bind(this) }
          onEndReached={ event => this.onBottom(event) }
          onEndReachedThreshold={ 100 }
          key="bodyListRemarks"
        />
        ,
        <DotsSpinner key="bodyDotsSpinner" show={ this.state.loading } />
      ]
    );
  }

  renderFooter() {
    return (
      [
        <TouchableHighlight key="footerHomeList" onPress={ this._onGoToAllRemarksList.bind(this) } style={ [styles.footerButton, (this.props.activeFooterLink == 'home') && styles.footerButtonActive] }>
          <Text style={ [styles.footerButtonText, (this.props.activeFooterLink == 'home') && styles.footerButtonTextActive] }>Home</Text>
        </TouchableHighlight>
        ,
        <TouchableHighlight key="footerMyList" onPress={ this._onGoToMyRemarksList.bind(this) } style={ [styles.footerButton, (this.props.activeFooterLink == 'my') && styles.footerButtonActive] }>
          <Text style={ [styles.footerButtonText, (this.props.activeFooterLink == 'my') && styles.footerButtonTextActive] }>My</Text>
        </TouchableHighlight>
      ]
    );
  }

  renderHeaderLeftButton() {
    return (
      <TouchableHighlight onPress={ this._onNewRemarkClick.bind(this) } style={ styles.newRemarkTouch }>
        <Image style={ styles.newRemarkImg } resizeMode='stretch' source={ require('../images/new_remark.png') }/>
      </TouchableHighlight>
    );
  }

  renderHeaderRightButton() {
    return (
      <TouchableHighlight onPress={ this._onLogoutClick.bind(this) } style={ styles.logoutTouch }>
        <Image style={ styles.logoutImg } resizeMode='stretch' source={ require('../images/logout.png') }/>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
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
  },
  logoutTouch: {
    position: 'absolute',
    top: 16,
    right: 5
  },
  newRemarkTouch: {
    position: 'absolute',
    top: 16,
    left: 5
  },
  newRemarkImg: {
    height: 25,
    width: 25,
    opacity: 0.5
  },
  logoutImg: {
    height: 25,
    width: 25,
    opacity: 0.5
  },
  newRemarkTouch: {
    position: 'absolute',
    top: 16,
    left: 5
  },
  newRemarkImg: {
    height: 25,
    width: 25,
    opacity: 0.5
  }
});

RemarksListLayout.propTypes = {
  activeFooterLink: React.PropTypes.string.isRequired,
  navigator: React.PropTypes.object.isRequired,
  onLoad: React.PropTypes.func.isRequired
};

RemarksListLayout.defaultProps = {
  activeFooterLink: 'home'
};

export default RemarksListLayout;
