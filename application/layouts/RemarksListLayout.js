import React, {
  AppRegistry,
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

import { connect } from 'react-redux';
import Store, { dispatch } from '../Store';

import { cleanRemarks, loadRemarks, addRemarks } from '../actions/Remarks';

import RemarkListItem from '../views/remarks/ListItem';
import DotsSpinner from '../components/spinners/DotsSpinner';

class RemarksListLayout extends Component {
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

  render() {
    return (
      <View style={ styles.topContainer }>
        <View style={ styles.header }>
          <Image style={ styles.headerLogo } resizeMode='stretch' source={ require('../images/logo.png') }/>
        </View>
        <View style={ styles.body }>
          <ListView
            dataSource={ this.state.dataSource }
            renderRow={ this.renderRemark.bind(this) }
            onEndReached={ event => this.onBottom(event) }
            onEndReachedThreshold={ 100 }
          />
          <DotsSpinner show={ this.state.loading } />
        </View>
        <View style={ styles.footer }>
          <TouchableHighlight onPress={ this._onGoToAllRemarksList.bind(this) } style={ [styles.footerButton, (this.props.activeFooterLink == 'home') && styles.footerButtonActive] }>
            <Text style={ [styles.footerButtonText, (this.props.activeFooterLink == 'home') && styles.footerButtonTextActive] }>Home</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={ this._onGoToMyRemarksList.bind(this) } style={ [styles.footerButton, (this.props.activeFooterLink == 'my') && styles.footerButtonActive] }>
            <Text style={ [styles.footerButtonText, (this.props.activeFooterLink == 'my') && styles.footerButtonTextActive] }>My</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
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

RemarksListLayout.propTypes = {
  activeFooterLink: React.PropTypes.string.isRequired,
  navigator: React.PropTypes.object.isRequired,
  onLoad: React.PropTypes.func.isRequired
};

RemarksListLayout.defaultProps = {
  activeFooterLink: 'home'
};

export default RemarksListLayout;
