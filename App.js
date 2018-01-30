import React from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import HomeScreen from './src/HomeScreen.js';
//import UserScreen from './src/UserScreen.js';
import SearchScreen from './src/SearchScreen.js';
import ScanScreen from './src/ScanScreen.js';

const MainScreenNavigator = TabNavigator({
  Search: { screen: SearchScreen},
  Scan: { screen: ScanScreen},
});


const GbAppContainer = StackNavigator({
  Home: { screen: HomeScreen },
  Main: {
    screen: MainScreenNavigator,
    navigationOptions: {
      header: null,
    },
  }
});

const defaultGetStateForAction = GbAppContainer.router.getStateForAction;

GbAppContainer.router.getStateForAction = (action, state) => {
  console.log("action", action);
  console.log("state", state);

  if (
    state &&
    state.index > 0 && 
    action.type == NavigationActions.BACK &&
    state.routes[state.index - 1].routeName == 'Home'
  ) {
    return null;
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
