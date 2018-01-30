import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class UserScreen extends React.Component {
  static navigationOptions = {
      title: 'User'
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>User Screen</Text>
        <Text>Username: {params.user}</Text>
        <Text>UserId: {params.userId}</Text>
      </View>
    );
  }
}
