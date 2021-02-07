import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import login from '../component/login';
import Icon from 'react-native-vector-icons/AntDesign';
import changepassword from '../component/changepassword';
import map from '../component/map';
import chooseinterest from '../component/chooseinterest';
import chat from '../component/chat';
import profile from '../component/profile';
import publicprofile from '../component/publicprofile';
import notification from '../component/notification';
import splash from '../component/splash';
import logout from '../component/logout';
import updateprofile from '../component/updateprofile';
import signup from '../component/signup';
import meetupdetails from '../component/meetupdetails';
import getdirections from '../component/getdirections';
import GroupChat from '../component/GroupChat';
import MeetupLocation from '../component/MeetupLocation';
// import fire, { firestore } from "../database/firebase";
import { useLinkProps } from "@react-navigation/native";


// const Tab = createBottomTabNavigator();
// const BottomTabNavigator = () => {
//   return (
//     <Tab.Navigator
//       tabBarOptions={{
//         activeTintColor: "#147efb",
//         inactiveTintColor: "#AAB8C2",
//         style: {
//           height: "10%",
//           //justifyContent: "center",
//           //alignItems: "center",
//           paddingTop: 15,
//           backgroundColor: "#FFF",
//           //elevation: 2
//           alignContent: "center"
//         }
//       }}
//     >
//       <Tab.Screen
//         name="map"
//         component={mapStack}
//         options={{
//           headerTitle: 'News',
//           tabBarLabel: 'Map',
//           tabBarIcon: ({ tintColor }) => (
//             <Icon name="home" size={20} color={tintColor} />
//           )
//         }}
//       />
//       <Tab.Screen
//         name="chat"
//         component={chatStack}
//         options={{
//           tabBarLabel: 'Chat',
//           tabBarIcon: ({ tintColor }) => (
//             <Icon name="wechat" size={23} color={tintColor} />
//           )
//         }}
//       />
//       <Tab.Screen
//         name="logout"
//         component={logoutStack}
//         options={{
//           tabBarLabel: 'Logout',
//           tabBarIcon: ({ tintColor }) => (
//             <Icon name="logout" size={20} color={tintColor} />
//           )
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

const Stack = createStackNavigator();

// const mapStack = () => {
//   return (
//     <Stack.Navigator>
// <Stack.Screen
//   name="map"
//   component={map}
//   options={{ headerShown: false }}
// />
// <Stack.Screen
//   name="notification"
//   component={notification}
//   options={{ headerShown: false }}
// />
//     </Stack.Navigator>
//   )
// }

const chatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="chat"
        component={chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="meetupdetails"
        component={meetupdetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="getdirections"
        component={getdirections}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile"
        component={profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="publicprofile"
        component={publicprofile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="map"
        component={map}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="notification"
        component={notification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="splash"
        component={splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        component={login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        component={signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="updateprofile"
        component={updateprofile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="chooseinterest"
        component={chooseinterest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="changepassword"
        component={changepassword}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="chat"
        component={chat}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  )
}

const logoutStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="logout"
        component={logout}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}



const mainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="splash"
        component={splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        component={login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        component={signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="chooseinterest"
        component={chooseinterest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="map"
        component={map}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="chat"
        component={chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GroupChat"
        component={GroupChat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MeetupLocation"
        component={MeetupLocation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="updateprofile"
        component={updateprofile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="changepassword"
        component={changepassword}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="notification"
        component={notification}
        options={{ headerShown: false }}
      /> */}
      {/* <Stack.Screen
        name="meetupdetails"
        component={meetupdetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="getdirections"
        component={getdirections}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="publicprofile"
        component={publicprofile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default mainStackNavigator;
