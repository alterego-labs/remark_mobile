import React, {
  Component,
  View,
  Text,
  StyleSheet
} from 'react-native';

import DateTimeService from '../../utils/DateTimeService';

class ListItem extends Component {
  _humanCreatedAt() {
    return DateTimeService.fromNowInWords(this.props.remark.created_at);
  }

  render() {
    return (
      <View style={ styles.remarkRow }>
        <View style={ styles.rowHeaderBlock }>
          <Text style={ styles.userLoginText }>@{ this.props.remark.user.login }</Text>
          <Text style={ styles.remarkCreatedAtText }>{ this._humanCreatedAt() }</Text>
        </View>
        <View>
          <Text style={ styles.remarkBodyText }>{ this.props.remark.body }</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  remarkRow: {
    marginBottom: 5,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#eeeeee'
  },
  rowHeaderBlock: {
    marginBottom: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  userLoginText: {
    color: '#4589b0',
    marginLeft: 20,
    fontFamily: 'OpenSans',
    fontWeight: 'bold',
    fontSize: 15
  },
  remarkCreatedAtText: {
    flex: 1,
    color: '#666666',
    textAlign: 'right',
    alignSelf: 'stretch',
    fontSize: 12,
    lineHeight: 24
  },
  remarkBodyText: {
    color: '#444444',
    fontFamily: 'OpenSans',
    fontSize: 15,
    lineHeight: 24
  }
});

ListItem.propTypes = {
  remark: React.PropTypes.object.isRequired
}

export default ListItem;
