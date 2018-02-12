import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class ScanScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Text>TODO Scan screen</Text>
        <View>
          <Button
            onPress={() => navigate('Search', {searchText: 'bla bla bla'})}
            title="Recherche"
          />
        </View>
      </View>
    );
  }
}
