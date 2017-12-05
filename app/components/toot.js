import React, { PropTypes } from 'react';
import {
  Text,
  Button,
  TextInput,
  StyleSheet,
  Modal,
  Picker,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TootActions from '../actions/actioncreators/toot';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import I18n from '../i18n';

const MAX_TOOT_LENGTH = 500;

class Toot extends React.Component {
  static navigationOptions = {
    title: "Toot",
  };
  constructor(props) {
    super(props);
    Toot.navigationOptions.title = I18n.t("toot_title");
    this.state = {
      nsfwFlag: false,
      text: "",
      warning: "",
      visibilityModal: false,
      visibility: "public",
    };
  }
  render() {
    return (
      <View style={styles.container}>
        {this.toggleCw()}
        <TextInput
          placeholder={I18n.t("toot_placeholder")}
          style={styles.toottext}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          maxLength={MAX_TOOT_LENGTH}
          multiline={true}
        />
        <View style={styles.buttonview}>
          <View style={styles.tootbuttonview}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.TootActions.mediaOpen("library")}>
              <FontAwesome name="picture-o" size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.TootActions.mediaOpen("camera")}>
              <FontAwesome name="camera" size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.setState({ visibilityModal: true })}>
              <Text style={styles.textvisibility}>{this.state.visibility}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.setState({ nsfwFlag: !this.state.nsfwFlag })}>
              <Text style={styles.textcw}>CW</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tootbuttonview}>
            <View style={styles.button}>
              <Text style={styles.textlimit}>{MAX_TOOT_LENGTH - this.state.text.length - this.state.warning.length}</Text>
            </View>
            <TouchableOpacity style={styles.tootbutton} onPress={() => this.props.TootActions.toot(this.state.text, this.state.visibility, this.state.nsfwFlag, this.state.warning)}>
              <Text style={styles.texttoot}>Toot!</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.visibilityModal}
        >
          <View>
            <Picker
              selectedValue={this.state.visibility}
              onValueChange={(visibility) => this.setState({ visibility })}>
              <Picker.Item label="public" value="public" />
              <Picker.Item label="unlisted" value="unlisted" />
              <Picker.Item label="private" value="private" />
              <Picker.Item label="direct" value="direct" />
            </Picker>
            <TouchableOpacity onPress={() => this.setState({ visibilityModal: false })}>
              <Text>OK!</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
  //warningとtoot、合わせて500文字
  toggleCw() {
    if (this.state.nsfwFlag) {
      return <TextInput
        placeholder={"Write your warning here"}
        style={styles.warningtext}
        onChangeText={(warning) => this.setState({ warning })}
        value={this.state.warning}
        maxLength={MAX_TOOT_LENGTH}
        multiline={false}
      />;
    } else {
      return;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toottext: {
    height: 200,
    margin: 5,
    padding: 5,
    borderWidth: 1
  },
  warningtext: {
    height: 30,
    margin: 5,
    padding: 5,
    borderWidth: 1
  },
  buttonview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tootbuttonview: {
    width: 120,
    height: 40,
    flexDirection: 'row',
  },
  button: {
    width: 40,
    height: 40,
    margin: 5,
    alignItems: 'center',
  },
  tootbutton: {
    width: 80,
    height: 40,
    margin: 5,
    alignItems: 'center',
  },
  textcw: {
    fontSize: 24,
  },
  textvisibility: {
    fontSize: 12,
  },
  textlimit: {
    fontSize: 20,
  },
  texttoot: {
    fontSize: 20,
    color:"#00008B"
  }
});

export default connect(state => state,
  (dispatch) => ({
    TootActions: bindActionCreators(TootActions, dispatch)
  })
)(Toot);