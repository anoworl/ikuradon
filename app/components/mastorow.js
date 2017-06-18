import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { FontAwesome } from '@expo/vector-icons';

export default class MastoRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:props.id,
      user: props.user,
      body: props.body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
      image: props.image,
    }
  }
  render() {
    return (
      <View>
        <View style={styles.container}>
          <Image source={{ uri: this.state.image }} style={styles.photo} />
          <View style={styles.textarea}>
            <Text style={styles.name}>
              {this.state.user}
            </Text>
            <Hyperlink onPress={url => this.openUrl(url)}>
              <View>
                <Text style={styles.body}>
                  {this.state.body}
                </Text>
              </View>
            </Hyperlink>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.item}>
            <FontAwesome style={styles.itemFlex} name="reply" size={20} color="gray" />
            <FontAwesome style={styles.itemFlex} name="retweet" size={20} color="gray" />
            <FontAwesome style={styles.itemFlex} name="star" size={20} color="gray" />
            <FontAwesome style={styles.itemFlex} name="ellipsis-h" size={20} color="gray" />
          </View>
        </View>
      </View>
    );
  }
  async openUrl(url) {
    try {
      let supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("not supported url");
      }
    } catch (e) {
      console.error('Linking error', e);
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    flexDirection: 'row',
  },
  textarea: {
    flex: 1,
  },
  name: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  body: {
    flex: 2,
    marginLeft: 12,
    fontSize: 12,
  },
  photo: {
    height: 50,
    width: 50,
    borderRadius: 8
  },
  item:{
    flex: 1,
    marginLeft:50,
    paddingLeft: 12,
    paddingTop:0,
    paddingBottom:0,
    flexDirection: 'row',
  },
  itemFlex:{
    flex:1
  }
});