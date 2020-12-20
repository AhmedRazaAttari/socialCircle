import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Root } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import ChatStackNavigator from './src/navigations/Navigator';


// const mapStack=createStackNavigator({
//   map:{
//     screen:map,
//     headerMode:'none',
//   },
//   notification:{
//     screen:notification,
//     headerMode:'none',
//   },
// },
// {
//   headerMode:'none'
// });
// const logoutStack=createStackNavigator({
//   logout:{
//     screen:logout,
//     headerMode:'none',
//   },
// },
// {
//   headerMode:'none'
// })


export default function App() {
  return (
    <NavigationContainer>
      <ChatStackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
