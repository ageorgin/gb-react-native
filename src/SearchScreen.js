import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from "react-native-elements";

export default class SearchScreen extends React.Component {
  static navigationOptions = {
      header: 'none'
  };

  constructor(props) {
    super(props)

    console.log(this.props.apiClient);

    this.state = {
      searchText: "",
      products: []
    };

    this.props.navigation.addListener('willFocus', () => {
      console.log('Will focus');
      const { params } = this.props.navigation.state;
      if (params == undefined) {
        return;
      }

      this.setState({searchText: params.searchText});
      this.doSearch();
      console.log(params);

      this.props.navigation.state.params = undefined;
    });
  }

  doSearch = () => {
    console.log('search');
    tmpProduct = [];
    for (i = 0; i < 25; i++) {
      tmpProduct.push(
        {
          key: i,
          name: 'Product ' + i,
          category: 'Product category ' + i,
          picture: 'https://randomuser.me/api/portraits/thumb/men/53.jpg'
        }
      );
    }
    this.setState({products: tmpProduct});
  }

  navigateToProduct = (item) => {
    const { navigate } = this.props.navigation;
    navigate('Product', {productName: item.name, productId: item.key})
  }

  render() {
    return (
      <View  style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TextInput
            style={{flex: 0.8}}
            value={this.state.searchText}
            onChangeText={(searchText) => this.setState({searchText})}
          />
          <Button
            style={{flex: 0.2}}
            title="Search"
            onPress={this.doSearch}
          />
        </View>
        <View style={{flex: 0.8}}>
          <FlatList
            data={this.state.products}
            renderItem={this.renderProductItem}
          />
        </View>
      </View>
    );
  }

  renderProductItem =({item}) => (
    <ListItem
      roundAvatar
      title={item.name}
      subtitle={item.category}
      avatar={{ uri: item.picture }}
      containerStyle={{ borderBottomWidth: 0 }}
      onPress={() => this.navigateToProduct(item)}
    />
  );
}

/**
<TouchableOpacity>
    <View style={{paddingLeft: 10}}>
      <Text style={{fontSize: 20, textAlign: 'center'}}>
        {item.key}
      </Text>
    </View>
  </TouchableOpacity>


<View style={styles.button}>
  <Button
    onPress={() => navigate('Product', {productName: 'Nom du produit', productId: 12})}
    title="Aller vers la page produit"
  />
</View>
*/

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: 300
  }
});
