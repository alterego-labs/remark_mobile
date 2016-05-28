import React, {
  Component,
  StyleSheet,
  View,
  Image,
} from 'react-native';

class InsideLayout extends Component {
  renderBody() {
    return false;
  }

  renderFooter() {
    return false;
  }

  renderHeaderLeftButton() {
    return false;
  }

  renderHeaderRightButton() {
    return false;
  }

  _renderFooter() {
    if (this.props.showFooter == false) return false;
    return (
      <View style={ styles.footer }>
        { this.renderFooter() }
      </View>
    );
  }

  render() {
    return (
      <View style={ styles.topContainer }>
        <View style={ styles.header }>
          { this.renderHeaderLeftButton() }
          <Image style={ styles.headerLogo } resizeMode='stretch' source={ require('../images/logo.png') }/>
          { this.renderHeaderRightButton() }
        </View>
        <View style={ styles.body }>
          { this.renderBody() }
        </View>
        { this._renderFooter() }
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
  }
});

InsideLayout.propTypes = {
  showFooter: React.PropTypes.bool.isRequired,
};

InsideLayout.defaultProps = {
  showFooter: true
};

export default InsideLayout;
