import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
      title: 'Welcome'
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenue sur Green</Text>
        <Text style={styles.title}>Beauty</Text>
        <Text>L'app qui décrypte pour vous la</Text>
        <Text>qualité</Text>
        <Text>de vos cosmétiques</Text>
        <View style={styles.button}>
          <Button
            onPress={() => navigate('Search')}
            title="Lancer une recherche"
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => navigate('Scan')}
            title="Evaluer un produit"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#00cc66',
    fontSize: 30,
  },
  button: {
    marginTop: 10,
    width: 300
  }
});
