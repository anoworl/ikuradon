import React from 'react';
import { View, Text, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as StreamingActions from '../../actions/actioncreators/streaming';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Setting extends React.Component {
  static navigationOptions = {
    title: "Setting",
    tabBarIcon: ({ focused, tintColor }) => (
      <FontAwesome name="cogs" size={26} color={tintColor} />
    )
  };
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      setting: {
        streaming_api_checked: false,
      }
    };
  }
  render() {
    return <View>
      <Text>Streaming API</Text>
      <Switch
        onValueChange={(streamingChecked) => streamingChecked ? this.streamStart() : this.streamStop()}
        value={this.state.setting.streaming_api_checked}
      />
    </View>;
  }
  streamStart() {
    this.setState({ setting: { streaming_api_checked: true } });
    this.props.StreamingActions.start();
  }
  streamStop() {
    this.setState({ setting: { streaming_api_checked: false } });
    this.props.StreamingActions.stop();
  }
}

export default connect((state) => {
  return (state)
},
  (dispatch) => ({
    StreamingActions: bindActionCreators(StreamingActions, dispatch)
  })
)(Setting);