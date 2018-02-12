import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ProductScreen extends React.Component {
  static navigationOptions = {
      title: 'Product'
  };

  render() {
    console.log(this.props.apiClient);
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Product Screen</Text>
        <Text>Product name: {params.productName}</Text>
        <Text>Product Id: {params.productId}</Text>
      </View>
    );
  }
}
