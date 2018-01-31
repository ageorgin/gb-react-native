import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class SearchScreen extends React.Component {
  static navigationOptions = {
      header: null
  };

  constructor(props) {
    super(props)
    this.state = {
      searchText: "",
    };
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View  style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TextInput
            style={{flex: 0.8}}
            value={this.state.searchText}
            onChangeText={(searchText) => this.setState({searchText})}
          />
          <Button
            style={{flex: 0.2}}
            title="Search"
            onPress={() => console.log('todo')}
          />
        </View>
        <Text>TODO Search screen</Text>

        <View style={styles.button}>
          <Button
            onPress={() => navigate('Product', {productName: 'Nom du produit', productId: 12})}
            title="Aller vers la page produit"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: 300
  }
});
