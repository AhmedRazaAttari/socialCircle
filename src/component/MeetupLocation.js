import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign, EvilIcons, Feather, Entypo } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import fire, { database } from "../database/firebase";
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as geolib from 'geolib';
const screen = Dimensions.get('window')
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 24.8822179;
const LONGITUDE = 67.0652013;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import * as Location from 'expo-location';
import DateTimePickerModal from "react-native-modal-datetime-picker";

class CustomTextBox extends React.Component {
    render() {
        return (
            <TextInput
                style={{
                    width: this.props.Width,
                    height: this.props.Height,
                    fontSize: 19,
                    color: "black",
                    marginLeft: 30
                }}
                value={this.props.SearchBarTxtVal}
                onChangeText={this.props.ONChangeText}
                placeholderTextColor={this.props.PlaceholderColor}
                placeholder={this.props.Value}
                onFocus={this.props.ONFocus}
                onBlur={this.props.ONBlur}
                autoFocus={this.props.AutoFocus}
            />
        )
    }
}

export default class MeetupLocation extends React.Component {
    constructor() {
        super()

        this.state = {
            isloading: true,
            userLocation: null,
            CurrentUser_Interest: [],
            MatchedUSers: [],
            modalVisible: false,
            currentUserPhoto: null,
            followsUserLocation: true,
            marker_lat: null,
            marker_long: null,
            dataFetched: false,
            SearchBarTxt: "",
            SearchedResult: [],
            setParticipentsID: [],
            chosenDate: new Date(),
            SelectedDate: new Date(1598051730000),
            SelectedTime: new Date(1598051730000)
        };
        this.setDate = this.setDate.bind(this);
    }

    async componentDidMount() {
        var _ = this;
        const UserId = fire.auth().currentUser.uid
        await fire.database().ref("users/" + UserId).child("Location").once("value").then(function (snapshot) {
            _.setState({
                userLocation: {
                    latitude: snapshot.val().latitude,
                    longitude: snapshot.val().longitude,
                    isloading: false
                }
            })
        }).then(() => {

            _.map.animateToRegion({
                latitude: _.state.userLocation.latitude,
                longitude: _.state.userLocation.longitude,
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0322 * ASPECT_RATIO
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

                        if (distance <= 2000) {
                            console.log(distance)
                            _.setState(prevState => ({
                                MatchedUSers: [...prevState.MatchedUSers, childSnapshot.val()],
                                ShowedBtn: true
                            }))
                        }
                        else {
                            console.log(distance, "With greater than 2000")
                        }
                    }
                }

            })
        }).then(() => {
            var data = [];

            for (var i = 0; i < _.state.MatchedUSers.length; i++) {
                // console.log("MatchedUSers", MatchedUSers[i].uid);
                data.push(_.state.MatchedUSers[i].uid)
            }

            console.log(data)
            _.setState(prevState => ({
                setParticipentsID: [...prevState.setParticipentsID, data],
            }))
        })

        await Location.watchPositionAsync({ timeInterval: 7000, distanceInterval: 0.1 }, loc => {
            // console.log('watching***', loc);
            this.setState({ marker_long: loc.coords.longitude, marker_lat: loc.coords.latitude })
        })

    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    handleConfirm = (date) => {
        var dated = `"${date}"`;
        var extractedDate = dated.slice(1, 11)
        console.log("A date has been picked: ", extractedDate);

        this.setState({
            ShowDayPicker: false,
            SelectedDate: extractedDate
        })
    };

    handleConfirm2 = (time) => {
        var timing = `"${time}"`;

        var extracted = timing.slice(16, 26)
        console.log("A time has been picked: ", extracted);
        this.setState({
            ShowTimePicker: false,
            SelectedTime: extracted
        })
    };

    MeetUpModal() {
        return (
            <Modal isVisible={this.state.MeetUpModal} style={{ backgroundColor: "white" }}>

                <View style={{ flex: 1 }}>
                    <MapView
                        initialRegion={{
                            latitude: this.state.userLocation.latitude,
                            longitude: this.state.userLocation.longitude,
                            latitudeDelta: 0.0222,
                            longitudeDelta: 0.0222 * ASPECT_RATIO,
                        }}
                        style={{ height: 200, width: "100%" }}
                        followsUserLocation={true}
                    >
                        <Marker
                            pinColor="blue"
                            coordinate={{
                                latitude: this.state.userLocation.latitude,
                                longitude: this.state.userLocation.longitude,
                            }}>
                        </Marker>
                    </MapView>
                    <View style={{ minHeight: 70, width: "100%", backgroundColor: "#036bfc", padding: 10 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 24, color: "white", marginTop: 7 }}>{this.state.nameOfPlace}</Text>
                    </View>

                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 19, fontWeight: "bold" }}>Select Day and time for meetup</Text>

                        <View style={{
                            marginTop: 10,
                            width: "100%",
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                        }}></View>

                        <TouchableOpacity onPress={() => this.setState({ ShowDayPicker: true })}>
                            <View style={{ marginTop: 20, height: 50, borderRadius: 10, backgroundColor: "white", elevation: 5, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 18 }}>Select Day for meetup</Text>
                            </View>
                        </TouchableOpacity>

                        <DateTimePickerModal
                            isVisible={this.state.ShowDayPicker}
                            mode="date"
                            onConfirm={this.handleConfirm}
                            onCancel={() => this.setState({ ShowDayPicker: false })}
                        />

                        <TouchableOpacity onPress={() => this.setState({ ShowTimePicker: true })}>
                            <View style={{ marginTop: 10, height: 50, borderRadius: 10, backgroundColor: "white", elevation: 3, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 18 }}>Select Time for meetup</Text>
                            </View>
                        </TouchableOpacity>

                        <DateTimePickerModal
                            isVisible={this.state.ShowTimePicker}
                            mode="time"
                            onConfirm={this.handleConfirm2}
                            onCancel={() => this.setState({ ShowTimePicker: false })}
                        />

                    </View>


                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity onPress={() => this.SetMeetupLocation()}>
                            <View style={{ height: 50, borderRadius: 10, backgroundColor: "white", elevation: 4, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 18 }}>Confirm Meetup</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={{ height: 30, width: 30, backgroundColor: "#ebf2f2", borderRadius: 100, position: "absolute", top: 20, right: 20 }}>
                        <TouchableOpacity onPress={() => this.setState({ MeetUpModal: false })}>
                            <Icon name="cancel" size={30} color="#900" />
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        )
    }


    _gotoCurrentLocation(item) {

        console.log("LOCATIONOBJ", item)
        this.setState({
            userLocation: {
                latitude: item.LocationObj.lat,
                longitude: item.LocationObj.lng
            },
            nameOfPlace: item.nameOfPlace,
            address: item.LocationObj.address,
            RenderedList: false,
            SearchBarTxt: "",
            EnableBtn: true
        })

        this.map.animateToRegion({
            latitude: item.LocationObj.lat,
            longitude: item.LocationObj.lng,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0322 * ASPECT_RATIO
        });
    }


    RenderedList() {
        return (
            <View style={{ width: "93%", height: 300, borderRadius: 10, backgroundColor: "white", position: "absolute", top: 90, left: 13, elevation: 5, padding: 10 }}>
                <ScrollView>
                    {this.state.SearchedResult.map((item, i) => {
                        return (
                            <TouchableOpacity
                                key={i}
                                onPress={() => {
                                    this._gotoCurrentLocation(item)
                                }}
                            >
                                <View style={{ height: 60, width: "100%", flexDirection: "column", borderBottomWidth: 1, borderColor: "lightgrey", justifyContent: "center" }}>
                                    <Text style={{ fontSize: 17 }}>{item.nameOfPlace}</Text>
                                    <Text>{item.LocationObj.address}  {item.LocationObj.city}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        )
    }

    RegionChange(region) {
        console.log(region)
        this.setState({ userLocation: region })
    }


    async SearchLocation(e) {
        // console.log(e)
        this.setState({
            SearchBarTxt: e
        })
        let items = [];
        await fetch("https://api.foursquare.com/v2/venues/suggestcompletion?ll=" + this.state.marker_lat + "," + this.state.marker_long + "&limit=20&query=" + e + "&client_id=5RW3OYKKVFF40CZUBQB0RHFZ5LNLNKZSBS1OHUL0BVB2NRBO&client_secret=13L3DECCAODM3XQESIW0X1PAZCE22COWB05FLNNOKSBQYBIV&v=20140715")

            .then(res => res.json())
            .then((response) => {
                var SearchedData = [];
                // console.log(response)
                for (var i = 0; i < response.response.minivenues.length; i++) {
                    items.push({
                        nameOfPlace: response.response.minivenues[i].name,
                        LocationObj: response.response.minivenues[i].location
                    })
                }
                SearchedData = items;
                this.setState({
                    dataFetched: true,
                    SearchedResult: SearchedData,
                    RenderedList: true
                })
                // console.log(SearchedData)

            })

    }

    SearchBarView() {
        return <View style={{
            width: "94%", height: 55, backgroundColor: "white", borderRadius: 10, elevation: 4,
            position: "absolute", flexDirection: "row", top: 20,
            alignSelf: "center", alignItems: "center",
            paddingLeft: 15
        }}>
            <TouchableOpacity>
                <AntDesign name="arrowleft" size={25} color="black" />
            </TouchableOpacity>
            <CustomTextBox Width={140} SearchBarTxtVal={this.state.SearchBarTxt} Value="Search Here" ONChangeText={(e) => this.SearchLocation(e)} />

        </View>
    }




    async SetMeetupLocation() {

        var newPostKey = fire.database().ref().child('posts').push().key;
        const UserId = fire.auth().currentUser.uid
        if (this.state.SelectedDate !== "" && this.state.SelectedDate !== undefined && this.state.SelectedTime !== "" && this.state.SelectedTime !== undefined) {

            fire.database().ref("users/" + UserId).child("MeetupLocation").set({
                MeetupDay: this.state.SelectedDate,
                MeetupTime: this.state.SelectedTime,
                Location: this.state.userLocation,
                nameOfPlace: this.state.nameOfPlace,
            })

            fire.database().ref("MeetupLocation").child(UserId).set({
                Location: this.state.userLocation,
                nameOfPlace: this.state.nameOfPlace,
                MeetupDay: this.state.SelectedDate,
                MeetupTime: this.state.SelectedTime,
                Interest: this.state.CurrentUser_Interest,
                PostID: UserId
            })

        }

        this.setState({
            RenderedList: false,
            SearchBarTxt: "",
            MeetUpModal: false
        })

        this.props.navigation.push("map")

    }


    hideRenderList() {
        if (this.state.RenderedList) {
            this.setState({
                RenderedList: false,
                SearchBarTxt: ""
            })
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.containers} >
                <View style={styles.container}>

                    <MapView
                        onPress={() => this.hideRenderList()}
                        initialRegion={{
                            latitude: LATITUDE,
                            longitude: LONGITUDE,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }}
                        ref={ref => (this.map = ref)}

                        style={styles.map}
                    // onRegionChange={(region) => this.RegionChange(region)}
                    >
                        <Marker
                            draggable
                            pinColor="blue"
                            coordinate={{
                                latitude: this.state.userLocation ? this.state.userLocation.latitude : LATITUDE,
                                longitude: this.state.userLocation ? this.state.userLocation.longitude : LONGITUDE
                            }}>

                        </Marker>

                    </MapView>
                    {this.state.MeetUpModal && this.MeetUpModal()}
                    {this.SearchBarView()}
                    {this.state.SearchedResult.length && this.state.RenderedList ? this.RenderedList() : null}
                    {this.state.EnableBtn && <View style={{ width: "100%", marginTop: 20, position: "absolute", bottom: 60, left: "15%" }}>
                        <TouchableOpacity style={{ width: "100%" }} onPress={() => this.setState({ MeetUpModal: true })}>
                            <View style={{ width: "70%", padding: 10, borderRadius: 40, justifyContent: "center", alignItems: "center", backgroundColor: "white", elevation: 5 }}>
                                <Text style={{ fontSize: 20 }}>Set Meetup Location</Text>
                            </View>
                        </TouchableOpacity>
                    </View>}
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
        // marginTop: '30%',
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
