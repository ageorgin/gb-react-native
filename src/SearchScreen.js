import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class SearchScreen extends React.Component {
  static navigationOptions = {
      header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    
    return (
      <View>
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
