import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity, Alert, AwesomeAlert, showAlert, FlatList, ScrollView } from 'react-native';
import { Left, Header, Body, Right, Form, Item, Input, Button, Modal, ListItem } from 'native-base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import fire, { database } from "../database/firebase";

import doctor from '../../assets/doctor.png';
import AsyncStorage from '@react-native-community/async-storage';
import { useSafeArea } from 'react-native-safe-area-context';
const screen = Dimensions.get('window')
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 24.8822179;
const LONGITUDE = 67.0652013;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const createTwoButtonAlert = () =>
  Alert.alert(
    "Alert",
    "Match Found",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );

export default function map({ navigation }) {

  const [UserLocation, setLocation] = useState(false);
  const [Userlatitude, setLatitude] = useState(null)
  const [Userlongitude, setLongitude] = useState(null);
  const [isloading, setLoading] = useState(true)

  const [CurrentUserInterest, setCurrentUserInteres] = useState([])
  const [AllUserInterest, setAllUserInterest] = useState([])
  const [AllUsers, setAllUsers] = useState([])
  const [matchedUsers, setMatchedUsers] = useState([])
  // const [Userlongitude, setLongitude] = useState(null)

  const mapRef = useRef(null);
  const UserId = fire.auth().currentUser.uid


  useEffect(() => {

    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }


      // isloading && getUsers()
      isloading && getCurrentUserLocation_Interest()

      // let location = await Location.getCurrentPositionAsync({});
      // setLatitude(location.coords.latitude)
      // setLongitude(location.coords.longitude)
      // setLocation(true);
      // console.log("LOCATION ====>", Userlatitude + Userlongitude)

    })();
  })

  function getCurrentUserLocation_Interest() {

    fire.database().ref("users/" + UserId).child("Location").once("value").then(function (snapshot) {
      // snapshot.val()
      setLatitude(snapshot.val().latitude)
      setLongitude(snapshot.val().longitude)
      setLocation(true);
    })

    fire.database().ref("users/" + UserId).child("Interest").once("value").then(function (snapshot) {

      // console.log("SNAP ", snapshot.val())
      setCurrentUserInteres(snapshot.val())
      setLoading(false)
      getUsers()
    })
  }

  function getUsers() {

    fire.database().ref("users").once("value").then(function (snapshot) {

      const uids = Object.keys(snapshot.val())
      var tempArr = [];
      // console.log("uids", uids)
      for (var i = 0; i < uids.length; i++) {
        if (UserId === uids[i]) {
        }
        else {
          // console.log("uids", uids[i])
          fire.database().ref("users/" + uids[i]).once("value").then(function (snapshot) {
            tempArr.push({ [snapshot.key]: snapshot.val() })

          }).then(() => {
            getUsersLocation(tempArr)
          })
        }
      }
    })

  }


  function getUsersLocation(tempArr) {
    console.log("AllUSERS", tempArr)

    
  }

  // snapshot.forEach(function (childSnapshot) {
  //   if (childSnapshot.key === UserId) {
  //   }
  //   else {
  //     // console.log("NEw KEYS", childSnapshot.key)
  //     // console.log("NEW VALUES", childSnapshot.val().Interest)
  //     var tempArr = [];
  //     tempArr = childSnapshot.val().Interest;
  //     const found = CurrentUserInterest.some(item => tempArr.includes(item))
  //     // console.log(found)
  //     if (found) {
  //       // console.log("NEw KEYS", childSnapshot.key)
  //       if (matchedUsers.includes(childSnapshot.key)) {
  //         console.log("FIND")
  //       } else {
  //         setMatchedUsers(oldArray => [...oldArray, childSnapshot.key]);
  //       }
  //       // setMatchedUsers(matchedUsers)
  //       // console.log("NEW VALUES", childSnapshot.val().Interest)
  //     }
  //   }
  // })

  // const arr = [];
  // fire.database().ref("users").once("value").then(function (snapshot) {
  //   for (const [key, value] of Object.entries(snapshot.val())) {
  //     if (UserId === key) {
  //     }
  //     else {
  //       arr.push(key)
  //     }
  //   }
  // }).then(() => {
  //   console.log(arr)
  //   setAllUserInterest(arr)
  //   // console.log(AllUserInterest)
  //   setLoading(false)
  // }).then(() => {

  //   if (AllUserInterest.length) {

  //     for (var i = 0; i < AllUserInterest.length; i++) {

  //       fire.database().ref("users/" + AllUserInterest[i]).child("Interest").once("value").then(function (snapshot) {
  //         // console.log("SNAAAAAAAAAAAP", snapshot.val())
  //         if (snapshot.exists()) {
  //           var arr2 = [];
  //           arr2 = snapshot.val();
  //           for (var x = 0; x < arr2.length; x++) {
  //             for (var z = 0; z < CurrentUserInterest.length; z++) {
  //               if (arr2[x] === CurrentUserInterest[z]) {
  //                 // console.log("AAAAAARRR ===.", arr2[x] + CurrentUserInterest[z] + " " + AllUserInterest[i])
  //               }
  //             }
  //           }
  //           // console.log("CURINTER" , CurrentUserInterest)
  //           // console.log(AllUserInterest[i])
  // const found = CurrentUserInterest.some(item => arr2.includes(item))
  //           // console.log(found)
  //           if (found) {
  //             // setMatchedUsers(matchedUsers.push(AllUserInterest[i]))
  //           }
  //         }
  //       })
  //     }
  //   }
  // }).then(() => {
  //   // console.log("CURRENT USER INT", CurrentUserInterest)
  //   // console.log("Matched USERs", matchedUsers)
  // })



  return (
    <SafeAreaView style={styles.containers}>
      <Header style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 15, borderColor: '#98bd64', borderBottomWidth: 2.5, borderBottomColor: '#98bd64', marginTop: hp(0.2) }}>
        <Left style={{ flex: 1 }}>
        </Left>
        <Body style={{ flex: 0 }}>
          <Text style={{ fontSize: hp(5), fontWeight: 'bold', color: '#d2d170' }}>Social Circle</Text>
        </Body>
        <Right style={{ flex: 1 }}>
        </Right>
      </Header>
      <View style={{ marginTop: hp(0.5), marginBottom: hp(1), flexDirection: 'row', width: '100%' }}>
        <View style={{ marginLeft: wp(1), width: '26%', borderWidth: 2, borderRadius: 10, backgroundColor: '#fff', borderBottomWidth: 2.3, paddingVertical: hp(1), borderColor: '#7fddd3' }}>
          <TouchableOpacity onPress={() => navigation.navigate('profile')}>
            <Text style={{ fontSize: hp(2.5), alignSelf: 'center', fontWeight: 'bold', color: '#d3d842' }}>Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '30%', marginLeft: wp(2), borderWidth: 2, borderRadius: 10, paddingVertical: hp(1), backgroundColor: '#fff', borderBottomWidth: 2.3, borderColor: '#7fddd3' }}>
          <TouchableOpacity>
            <Text style={{ fontSize: hp(2.5), alignSelf: 'center', fontWeight: 'bold', color: '#d3d842' }}>Find Circle</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '38%', marginLeft: wp(2), borderWidth: 2, borderRadius: 10, paddingHorizontal: wp(0.75), paddingVertical: hp(0.5), backgroundColor: '#fff', borderBottomWidth: 2.3, borderColor: '#7fddd3' }}>
          <TouchableOpacity onPress={() => navigation.navigate('getdirections')}>
            <Text style={{ fontSize: hp(2.5), marginTop: hp(0.5), alignSelf: 'center', fontWeight: 'bold', color: '#d3d842' }}>Get Directions</Text>
          </TouchableOpacity>
        </View>

      </View>
      <View style={styles.container}>
        {UserLocation ?
          <MapView
            ref={mapRef}
            initialRegion={{
              latitude: Userlatitude,
              longitude: Userlongitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            style={styles.map}
            // showsUserLocation={true}
            // showsCompass={true}
            followsUserLocation={true}
          >
            <Marker

              coordinate={{
                latitude: Userlatitude,
                longitude: Userlongitude
              }}>


            </Marker>
          </MapView>
          : null}
        <View style={{ borderWidth: 2, borderRadius: 80, borderColor: '#7fddd3', marginBottom: hp(1), alignSelf: 'center', backgroundColor: '#fff', paddingVertical: hp(2.5), paddingHorizontal: wp(3) }}>
          <TouchableOpacity onPress={createTwoButtonAlert} >
            <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', color: '#d85135', alignSelf: 'center' }}>Find</Text>
          </TouchableOpacity>
        </View>
      </View>


      {/* <View style={{ width: '38%', marginTop: hp(2), borderWidth: 2, borderRadius: 10, marginLeft: wp(60), paddingVertical: hp(1), backgroundColor: '#fff', borderBottomWidth: 2.3, borderColor: '#7fddd3' }}>
        <TouchableOpacity>
          <Text style={{ fontSize: hp(2.5), alignSelf: 'center', fontWeight: 'bold', color: '#d3d842' }}>Members:3</Text>
        </TouchableOpacity>
      </View> */}


    </SafeAreaView>

  )

}


const styles = StyleSheet.create({
  containers: {
    width: '100%',
    flex: 1
  },
  container: {
    borderWidth: 1,
    borderColor: '#b0d37b',
    ...StyleSheet.absoluteFillObject,
    marginTop: '30%',
    height: 500,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    padding: 15,
    margin: 15,
    borderRadius: 4,
    backgroundColor: "#3740ff",
  },
  text: {
    color: '#fff',
    fontSize: 16
  }
});
