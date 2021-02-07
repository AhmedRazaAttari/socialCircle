import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Left, Header, Body, Right, Form, Item, Input, Button, ListItem, Badge } from 'native-base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import meetupicon from '../../assets/meetupicon.jpg'
import fire, { database } from "../database/firebase";
import Modal from 'react-native-modal';
import { useIsFocused } from "@react-navigation/native";
import * as geolib from 'geolib';
const screen = Dimensions.get('window')
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 24.8822179;
const LONGITUDE = 67.0652013;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// const createTwoButtonAlert = () =>
//   Alert.alert(
//     "Alert",
//     "Match Found",
//     [
//       {
//         text: "Cancel",
//         onPress: () => console.log("Cancel Pressed"),
//         style: "cancel"
//       },
//       { text: "OK", onPress: () => console.log("OK Pressed") }
//     ],
//     { cancelable: false }
//   );


export default class map extends React.Component {
  constructor() {
    super()

    this.state = {
      isloading: true,
      userLocation: null,
      CurrentUser_Interest: [],
      MatchedUSers: [],
      modalVisible: false,
      currentUserPhoto: null,
      Meetup_Locations: [],
      moveToUserLocation: true,
      marginBottom: 1,
      VoteBtns: true,
      AddMeetupBtn: true,
      CurrentUserMeetup_Locations: []
    };
  }

  async componentDidMount() {

    var _ = this;
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    const UserId = fire.auth().currentUser.uid

    await fire.database().ref("users/" + UserId).child("Location").once("value").then(function (snapshot) {
      _.setState({
        userLocation: {
          latitude: snapshot.val().latitude,
          longitude: snapshot.val().longitude
        }
      })
    }).then(() => {
      _.map.animateToRegion({
        latitude: this.state.userLocation.latitude,
        longitude: this.state.userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922 * ASPECT_RATIO
      });
    })

    await fire.database().ref("users/" + UserId).child("Interest").once("value").then(function (snapshot) {
      _.setState({
        CurrentUser_Interest: snapshot.val()
      })
    })

    await fire.database().ref("users").once("value").then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        if (childSnapshot.val().uid === UserId) {
        }
        else {
          var tempArr = [];
          tempArr = childSnapshot.val().Interest

          const found = _.state.CurrentUser_Interest.some(r => tempArr.includes(r))
          if (found) {
            const distance = geolib.getDistance({ latitude: _.state.userLocation.latitude, longitude: _.state.userLocation.longitude }, { latitude: childSnapshot.val().Location.latitude, longitude: childSnapshot.val().Location.longitude })

            // console.log("distance", distance)
            if (distance <= 2000) {
              // console.log(distance)
              _.setState(prevState => ({
                MatchedUSers: [...prevState.MatchedUSers, childSnapshot.val()],
                ShowedBtn: true
              }))
            }
            else {
              // console.log(distance, "With greater than 2000")
            }
          }
        }

      })
    })

    await fire.database().ref("MeetupLocation").once("value").then(function (snapshot) {
      if (snapshot.exists()) {
        snapshot.forEach(function (childSnapshot) {
          console.log("snapshot.val()", childSnapshot.val())

          if (childSnapshot.key === UserId) {
            _.setState({
              CurrentUser_UpvotesLength: childSnapshot.val().Votes && childSnapshot.val().Votes.Upvotes ? childSnapshot.val().Votes.Upvotes.id.length : 0,
              CurrentUser_DownvotesLength: childSnapshot.val().Votes && childSnapshot.val().Votes.Downvotes ? childSnapshot.val().Votes.Downvotes.id.length : 0
            })
            _.setState(prevState => ({
              CurrentUserMeetup_Locations: [...prevState.CurrentUserMeetup_Locations, childSnapshot.val()],
              // isloading: false
              AddMeetupBtn: false,
              CurrentUser_Meetup: true
            }))
          }

          else {
            var tempArr = [];
            tempArr = childSnapshot.val().Interest

            const found = _.state.CurrentUser_Interest.some(r => tempArr.includes(r))

            if (found) {
              _.setState(prevState => ({
                Meetup_Locations: [...prevState.Meetup_Locations, childSnapshot.val()],
              }))
            }
          }

        })
      }
    })

    await fire.database().ref("users/" + UserId).child("MeetupLocation").once("value").then(function (snapshot) {
      if (snapshot.exists()) {
        _.setState({
          AddMeetupBtn: false
        })
      }
    })

  }

  _gotoCurrentLocation() {
    this.map.animateToRegion({
      latitude: this.state.userLocation.latitude,
      longitude: this.state.userLocation.longitude,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0322 * ASPECT_RATIO
    });
  }


  RenderModal() {
    return (
      <Modal isVisible={this.state.modalVisible} style={{ backgroundColor: "white" }}>
        <View style={{ height: 50, alignItems: "flex-end", padding: 15 }}>
          <TouchableOpacity onPress={() => this.setState({ modalVisible: false })}>
            <View style={{ height: 30, width: 30, backgroundColor: "#ebf2f2", borderRadius: 100 }}>
              <Icon name="cancel" size={30} color="#900" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Image source={require("../../assets/nullimage.jpg")} style={{ height: 80, width: 80 }} />
            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}> {this.state.selectedUser.name}</Text>
          </View>

          <View style={{
            marginTop: 10,
            width: "80%",
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
          }}></View>

          <View style={{
            marginTop: 20,
            width: "80%"
          }}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Interest</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {this.state.selectedUser.Interest.map((items, i) => {
                return <Badge style={{ margin: 5 }} key={i}>
                  <Text style={{ color: "white" }}>{items}</Text>
                </Badge>
              })}
            </View>
          </View>


          <View style={{
            marginTop: 10,
            width: "80%",
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
          }}></View>

          <View style={{
            marginTop: 20,
            width: "80%"
          }}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Other Info:</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}> {this.state.selectedUser.email}</Text>
            </View>
          </View>

          <View style={{
            marginTop: 10,
            width: "80%",
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
          }}></View>

          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
            <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }); this.props.navigation.navigate('chat', { uid: this.state.selectedUser.uid, name: this.state.selectedUser.name }) }}>
              <View style={{ width: 130, padding: 10, borderRadius: 40, borderWidth: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#147562", elevation: 5 }}>
                <Text style={{ fontSize: 20, color: "white" }}>Message</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>
    )
  }

  CheckVote(items) {
    const UserId = fire.auth().currentUser.uid
    var _ = this;

    // console.log("items.Votes.Upvotes.id.length", items.Votes.Upvotes.id.length)
    this.setState({
      UpvotesLength: items.Votes && items.Votes.Upvotes ? items.Votes.Upvotes.id.length : 0,
      DownvotesLength: items.Votes && items.Votes.Downvotes ? items.Votes.Downvotes.id.length : 0
    })

    if (items.Votes) {
      if (items.Votes.Upvotes) {
        console.log("AVAILABLE ===>", items.Votes.Upvotes.id)
        for (var i = 0; i < items.Votes.Upvotes.id.length; i++) {
          if (items.Votes.Upvotes.id[i] === UserId) {
            console.log(items.Votes.Upvotes.id)
            _.setState({
              VoteBtns: false
            })
          }
        }
      }
      else {
        if (items.Votes.Downvotes) {
          for (var i = 0; i < items.Votes.Downvotes.id.length; i++) {
            if (items.Votes.Downvotes.id[i] === UserId) {
              _.setState({
                VoteBtns: false
              })
            }
          }
        }
      }
    }
    else {
      _.setState({
        VoteBtns: true
      })
    }

  }


  PlaceUpvote() {
    const PostId = this.state.SelectedMeetup.PostID
    console.log("this.state.SelectedMeetup.PostID", this.state.SelectedMeetup)
    var temparr = []
    if (this.state.SelectedMeetup.Votes) {
      if (this.state.SelectedMeetup.Votes.Upvotes) {
        temparr.push(this.state.SelectedMeetup.Votes.Upvotes)
      }
    }
    const UserId = fire.auth().currentUser.uid


    fire.database().ref("MeetupLocation").child(PostId + "/" + "Votes" + "/" + "Upvotes").set({
      id: [...temparr, UserId]
    })

    fire.database().ref("users/" + PostId).child("MeetupLocation" + "/" + "Votes" + "/" + "Upvotes").set({
      id: [...temparr, UserId]
    })

    this.setState({
      MeetUpModal: false,
      VoteBtns: false
    })
  }

  PlaceDownvote() {
    const PostId = this.state.SelectedMeetup.PostID;
    var newPostKey = fire.database().ref().child('posts').push().key;

    const UserId = fire.auth().currentUser.uid
    var temparr = []
    temparr.push(this.state.SelectedMeetup.PostID.Votes.Downvotes)

    fire.database().ref("MeetupLocation").child(PostId + "/" + "Votes" + "/" + "Downvotes").set({
      id: [...temparr, UserId]
    })
    fire.database().ref("users/" + PostId).child("MeetupLocation" + "/" + "Votes" + "/" + "Downvotes").set({
      id: [...temparr, UserId]
    })
    this.setState({
      MeetUpModal: false,
      VoteBtns: false
    })

  }

  CurrentUser_MeetupModal() {
    // console.log("MEETUP DETAIL", this.state.CurrentUser_Interest[0].Votes.Upvotes)

    return (
      <Modal isVisible={this.state.CurrentUserMeetUpModal} style={{ backgroundColor: "white" }}>

        <View style={{ flex: 1, alignItems: "center" }}>
          <MapView
            initialRegion={{
              latitude: this.state.CurrentUserMeetup_Locations[0].Location.latitude,
              longitude: this.state.CurrentUserMeetup_Locations[0].Location.longitude,
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0222 * ASPECT_RATIO,
            }}
            style={{ height: 200, width: "100%" }}
            followsUserLocation={true}
          >
            <Marker
              pinColor="blue"
              coordinate={{
                latitude: this.state.CurrentUserMeetup_Locations[0].Location.latitude,
                longitude: this.state.CurrentUserMeetup_Locations[0].Location.longitude,
              }}>
            </Marker>
          </MapView>
          <View style={{ height: 70, width: "100%", backgroundColor: "#036bfc", padding: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 24, color: "white", marginTop: 7 }}>{this.state.CurrentUserMeetup_Locations[0].nameOfPlace}</Text>
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 19, fontWeight: "bold" }}> Meetup Day : {this.state.CurrentUserMeetup_Locations[0].MeetupDay}</Text>
            <Text style={{ fontSize: 19, fontWeight: "bold" }}> Meetup Time  : {this.state.CurrentUserMeetup_Locations[0].MeetupTime}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%", height: 70, marginTop: 20 }}>
            <View style={{ flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>Upvotes</Text>
              <Text style={{ fontSize: 17, color: "grey" }}>{this.state.CurrentUser_UpvotesLength}</Text>
            </View>
            <View style={{ height: "100%", width: 1, backgroundColor: '#909090' }}></View>
            <View style={{ flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>DownVotes</Text>
              <Text style={{ fontSize: 17, color: "grey" }}>{this.state.CurrentUser_DownvotesLength}</Text>
            </View>
          </View>

          <View style={{
            marginTop: 10,
            width: "100%",
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
          }}></View>

          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
            <TouchableOpacity >
              <View style={{ width: 200, padding: 10, borderRadius: 10, justifyContent: "center", alignItems: "center", backgroundColor: "red", elevation: 3 }}>
                <Text style={{ fontSize: 20, color: "white" }}>Cancel Meetup Plan</Text>
              </View>
            </TouchableOpacity>
          </View>


          <View style={{ height: 30, width: 30, backgroundColor: "#ebf2f2", borderRadius: 100, position: "absolute", top: 20, right: 20 }}>
            <TouchableOpacity onPress={() => this.setState({ CurrentUserMeetUpModal: false })}>
              <Icon name="cancel" size={30} color="#900" />
            </TouchableOpacity>
          </View>


        </View>
      </Modal>
    )
  }



  MeetupModal() {
    console.log("MEETUP DETAIL", this.state.SelectedMeetup)
    return (
      <Modal isVisible={this.state.MeetUpModal} style={{ backgroundColor: "white" }}>

        <View style={{ flex: 1, alignItems: "center" }}>
          <MapView
            initialRegion={{
              latitude: this.state.SelectedMeetup.Location.latitude,
              longitude: this.state.SelectedMeetup.Location.longitude,
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0222 * ASPECT_RATIO,
            }}
            style={{ height: 200, width: "100%" }}
            followsUserLocation={true}
          >
            <Marker
              pinColor="blue"
              coordinate={{
                latitude: this.state.SelectedMeetup.Location.latitude,
                longitude: this.state.SelectedMeetup.Location.longitude,
              }}>
            </Marker>
          </MapView>
          <View style={{ height: 70, width: "100%", backgroundColor: "#036bfc", padding: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 24, color: "white", marginTop: 7 }}>{this.state.SelectedMeetup.nameOfPlace}</Text>
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 19, fontWeight: "bold" }}> Meetup Day : {this.state.SelectedMeetup.MeetupDay}</Text>
            <Text style={{ fontSize: 19, fontWeight: "bold" }}> Meetup Time  : {this.state.SelectedMeetup.MeetupTime}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%", height: 70, marginTop: 20 }}>
            <View style={{ flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>Upvotes</Text>
              <Text style={{ fontSize: 17, color: "grey" }}>{this.state.UpvotesLength}</Text>
            </View>
            <View style={{ height: "100%", width: 1, backgroundColor: '#909090' }}></View>
            <View style={{ flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>DownVotes</Text>
              <Text style={{ fontSize: 17, color: "grey" }}>{this.state.DownvotesLength}</Text>

            </View>
          </View>

          <View style={{
            marginTop: 10,
            width: "100%",
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
          }}></View>

          {this.state.VoteBtns ? <View style={{ marginTop: 20, width: "100%", padding: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Place your vote</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
              <TouchableOpacity style={{ marginTop: 20 }} onPress={() => this.PlaceUpvote()}>
                <View style={{ width: 130, padding: 10, borderRadius: 40, justifyContent: "center", alignItems: "center", backgroundColor: "white", elevation: 5 }}>
                  <Text style={{ fontSize: 20, color: "grey" }}>Upvote</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginTop: 20 }} onPress={() => this.PlaceDownvote()}>
                <View style={{ width: 130, padding: 10, borderRadius: 40, justifyContent: "center", alignItems: "center", backgroundColor: "white", elevation: 5 }}>
                  <Text style={{ fontSize: 20, color: "grey" }}>Downvote</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View> : <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 30 }}>You already Voted to this location</Text>}


          <View style={{ height: 30, width: 30, backgroundColor: "#ebf2f2", borderRadius: 100, position: "absolute", top: 20, right: 20 }}>
            <TouchableOpacity onPress={() => this.setState({ MeetUpModal: false })}>
              <Icon name="cancel" size={30} color="#900" />
            </TouchableOpacity>
          </View>


        </View>
      </Modal>
    )
  }

  render() {
    console.log("this.state.Meetup_Locations", this.state.Meetup_Locations)
    return (
      <SafeAreaView style={styles.containers} >
        {this.state.modalVisible && this.RenderModal()}
        {this.state.MeetUpModal && this.MeetupModal()}
        {this.state.CurrentUserMeetUpModal && this.CurrentUser_MeetupModal()}


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
            <TouchableOpacity onPress={() => this.props.navigation.navigate('profile')}>
              <Text style={{ fontSize: hp(2.5), alignSelf: 'center', fontWeight: 'bold', color: '#d3d842' }}>Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '30%', marginLeft: wp(2), borderWidth: 2, borderRadius: 10, paddingVertical: hp(1), backgroundColor: '#fff', borderBottomWidth: 2.3, borderColor: '#7fddd3' }}>
            <TouchableOpacity onPress={() => this.setState({ isloading: false })}>
              <Text style={{ fontSize: hp(2.5), alignSelf: 'center', fontWeight: 'bold', color: '#d3d842' }}>Find Circle</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '38%', marginLeft: wp(2), borderWidth: 2, borderRadius: 10, paddingHorizontal: wp(0.75), paddingVertical: hp(0.5), backgroundColor: '#fff', borderBottomWidth: 2.3, borderColor: '#7fddd3' }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('getdirections')}>
              <Text style={{ fontSize: hp(2.5), marginTop: hp(0.5), alignSelf: 'center', fontWeight: 'bold', color: '#d3d842' }}>Get Directions</Text>
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.container}>

          <MapView
            ref={ref => { this.map = ref; }}
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            onMapReady={() => {
              var _ = this;
              setTimeout(function () {
                _._gotoCurrentLocation();
                _.setState({ moveToUserLocation: false })
              }, 1000);
            }}
            style={styles.map}
            followsUserLocation={true}
          // onRegionChangeComplete={(region) => this._gotoCurrentLocation()}
          >

            {!this.state.isloading && <Circle key={this.state.userLocation.latitude + this.state.userLocation.longitude}
              center={this.state.userLocation}
              radius={1000}
              strokeWidth={1}
              strokeColor={'#1a66ff'}
              fillColor={'rgba(230,238,255,0.5)'}
            />}
            {!this.state.isloading && this.state.MatchedUSers.map((items, i) => {
              return <Marker
                key={i}
                coordinate={{
                  latitude: items.Location.latitude,
                  longitude: items.Location.longitude
                }}
                onPress={() => this.setState({ modalVisible: true, selectedUser: items })}
              >
              </Marker>
            })}

            <Marker
              pinColor="blue"
              coordinate={{
                latitude: this.state.userLocation ? this.state.userLocation.latitude : LATITUDE,
                longitude: this.state.userLocation ? this.state.userLocation.longitude : LONGITUDE
              }}>

            </Marker>

            {/* {!this.state.isloading && this.state.Meetup_Locations.map((items, i) => {

              return <Marker
                // pinColor="yellow"
                key={i}
                coordinate={{
                  latitude: items.Location.latitude,
                  longitude: items.Location.longitude
                }}
                onPress={() => { this.setState({ MeetUpModal: true, SelectedMeetup: items }); this.CheckVote(items) }}
              >
                <Image source={require("../../assets/meetupicon.jpg")} style={{ width: 45, height: 45, borderRadius: 100 }} />
              </Marker>
            })} */}

          </MapView>

          {!this.state.isloading && this.state.ShowedBtn && <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 100, backgroundColor: "white", position: "absolute", bottom: 40, left: 30, justifyContent: "center", alignItems: "center", elevation: 5 }} onPress={() => this.props.navigation.navigate("GroupChat", { MatchedUSers: this.state.MatchedUSers })}>
            <Icon name="chat" size={30} />
          </TouchableOpacity>}

          {!this.state.isloading && this.state.ShowedBtn && this.state.AddMeetupBtn && <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 100, backgroundColor: "white", position: "absolute", bottom: 40, right: 30, justifyContent: "center", alignItems: "center", elevation: 5 }} onPress={() => this.props.navigation.navigate("MeetupLocation")}>
            <Icon name="add" size={30} />
          </TouchableOpacity>}

          {this.state.CurrentUser_Meetup && <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 100, backgroundColor: "white", position: "absolute", top: 40, right: 20, justifyContent: "center", alignItems: "center", elevation: 5 }} onPress={() => this.setState({ CurrentUserMeetUpModal: true })}>
            <Image source={require("../../assets/meetupicon2.jpg")} style={{ width: 45, height: 45, borderRadius: 100 }} />
          </TouchableOpacity>}

          <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 100, backgroundColor: "white", position: "absolute", top: 40, left: 20, justifyContent: "center", alignItems: "center", elevation: 5 }} onPress={() => this.setState({ CurrentUserMeetUpModal: true })}>
            <Image source={require("../../assets/splash.png")} style={{ width: 45, height: 45, borderRadius: 100 }} />
          </TouchableOpacity>

          {/* {this.state.MatchedUSers.length < 1 && <View style={{ position: "absolute", bottom: 40, height: 40, width: 200, backgroundColor : "white" }}>
            <Text>No User's Found</Text>
          </View>} */}

        </View>

      </SafeAreaView>

    )
  }
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
    // height: 500,
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
