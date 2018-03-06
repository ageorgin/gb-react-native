import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';
import { ListItem, Rating } from "react-native-elements";

export default class ProductScreen extends React.Component {
  static navigationOptions = {
      title: 'Product'
  };

  constructor(props) {
    super(props)

    this.state = {
      product: null,
    };

    this.props.navigation.addListener('willFocus', () => {
      const { params } = this.props.navigation.state;
      if (params == undefined) {
        return;
      }

      this.loadProduct(params.productId);
    });
  }

  loadProduct = (productId) => {
    console.log("load product " + productId);
    this.setState({
      product: {
        id: productId,
        name: 'Product name',
        category: 'Product category',
        picture: 'https://www.dove.com/content/dam/unilever/dove/france/pack_shot/front/hair_care/wash_and_care/advanced_hair_series_pure_care_sublime_oil_shampoo/dove_shampoo_pure_care_oil_wrap_fop_250ml_8712561493031_fr-693858.png.ulenscale.320x320.png',
        ingredient: [
          {
            key: 1,
            name: 'Ingredient 1',
            note: 4
          },
          {
            key: 2,
            name: 'Ingredient 2',
            note: 3
          },
          {
            key: 3,
            name: 'Ingredient 3',
            note: 1
          },
          {
            key: 4,
            name: 'Ingredient 4',
            note: 5
          }
        ]
      }
    });
  }

  render() {
    console.log(this.props.apiClient);
    const { product } = this.state;
    if (product == null) {
      return (
        <View>
          <Text>Chargement en cours</Text>
        </View>
      )
    }
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Text>{product.category}</Text>
          <Text>{product.name}</Text>
          <Image
            source={{ uri: product.picture }}
            style={{ width: 200, height: 200, borderRadius: 10 }}
          />
        </View>
        <View style={{flex: 0.8}}>
          <FlatList
            data={product.ingredient}
            renderItem={this.renderIngredientItem}
          />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{ width: 300 }}>
            <Button
              title='Bouton action produit'
              onPress={() => console.log('todo')}
            />
          </View>
        </View>
      </View>
    );
  }

  renderIngredientItem =({item}) => (
    <ListItem
      hideChevron
      title=''
      subtitle={
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{flex: 0.7 }}>{item.name}</Text>
          <Rating
            readonly
            ratingCount={5}
            startingValue={item.note}
            imageSize={20}
          />
        </View>
      }
    />
  );
}
