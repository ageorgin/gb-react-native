import React from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import { StackNavigator, TabNavigator, NavigationActions, TabBarBottom } from 'react-navigation';
import HomeScreen from './src/HomeScreen.js';
import ProductScreen from './src/ProductScreen.js';
import SearchScreen from './src/SearchScreen.js';
import ScanScreen from './src/ScanScreen.js';
import { Ionicons } from '@expo/vector-icons';

const api = "here api";
const screenProps = {apiClient: api};

const SearchNavigator = StackNavigator({
  Search: {
    screen: props => <SearchScreen {...props} {...screenProps}/>,
    navigationOptions: {
      header: null,
    }
  },
  Product: {
    screen: props => <ProductScreen {...props} {...screenProps}/>,
    navigationOptions: {
      headerTitle: 'Product',
    }
  }
});

const MainScreenNavigator = TabNavigator({
  SearchNav: {
    screen: SearchNavigator,
    navigationOptions: {
      tabBarLabel: "Rechercher",
      tabBarIcon: ({focused}) => (
        <Ionicons
          name={focused ? "ios-search" : "ios-search-outline"}
          size={25}
          style={{ color: focused ? '#33A3F4' : '#949494'}}
        />
      ),
    }
  },
  Scan: {
    screen: ScanScreen,
    navigationOptions: {
      tabBarLabel: "Scanner",
      tabBarIcon: ({focused}) => (
        <Ionicons
          name={focused ? "ios-camera" : "ios-camera-outline"}
          size={25}
          style={{ color: focused ? '#33A3F4' : '#949494'}}
        />
      ),
    }
  },
}, {
  headerMode: 'none',
  swipeEnabled: false,
  tabBarPosition: 'bottom',
  tabBarComponent: TabBarBottom,
  tabBarOptions: {
    activeTintColor: '#33A3F4',
    inactiveTintColor: '#949494',
    showIcon: true,
    indicatorStyle: {height: 0},
    style: {
        backgroundColor: '#fff',
    },
    labelStyle: {
        fontSize: 12,
    },
  },
});


const GbAppContainer = StackNavigator({
  Home: { screen: HomeScreen },
  Main: {
    screen: MainScreenNavigator,
    navigationOptions: {
      header: null,
    },
  }
}, {
  headerMode: 'none'
});

const defaultGetStateForAction = GbAppContainer.router.getStateForAction;

GbAppContainer.router.getStateForAction = (action, state) => {
  if (action.type === "Navigation/BACK" && state && state.routes[state.index].routeName === "Home") {
    return null;
  }
  if (action.type === "Navigation/BACK" && state) {
    const newRoutes = state.routes.filter(r => r.routeName !== "Home");
    const newIndex = newRoutes.length - 1;
    return defaultGetStateForAction(action, { index: newIndex, routes: newRoutes });
  }

  return defaultGetStateForAction(action, state);
};


export default class App extends React.Component {
  render() {
    return (
      <GbAppContainer />
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
});
