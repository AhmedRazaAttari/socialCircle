import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView, Button, ScrollView,  TouchableHighlight, Alert } from 'react-native';
import { Ionicons, Entypo, EvilIcons, FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { GiftedChat } from 'react-native-gifted-chat';
import fire, { database } from "../database/firebase";
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker, Circle } from 'react-native-maps';
import Modal from 'react-native-modal';
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 24.8822179;
const LONGITUDE = 67.0652013;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var itm = [];

export default class GroupChat extends React.Component {

    constructor() {
        super();

        this.state = {
            messages: [],
            ParticipentsIDS: [],
            isloading: true,
            CurrentUser_Interest: [],
            Meetup_Locations: [],
            BottomSpace: 60
        }

    }

    async componentDidMount() {

        const { MatchedUSers } = this.props.route.params;
        console.log("MATCHED USEARSSSSSSSS", MatchedUSers)
        var UserId = fire.auth().currentUser.uid;
        var data = [];
        var _ = this;

        for (var i = 0; i < MatchedUSers.length; i++) {
            // console.log("MatchedUSers", MatchedUSers[i].uid);
            data.push(MatchedUSers[i].uid)
        }

        // console.log(data)
        this.setState({
            ParticipentsIDS: data
        })
        // setParticipentsID(data)

        var tempArr = [];
        var data = []
        await fire.database().ref("users/" + UserId).child("GroupChat" + "/" + "Messages").once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                tempArr.push(childSnapshot.val())
            })

        }).then(() => {
            // console.log("tempArr", tempArr)
            tempArr.reverse();
            this.setState({
                messages: tempArr
            })
            // setMessages(tempArr)
        })

        await fire.database().ref("users/" + UserId).child("Interest").once("value").then(function (snapshot) {
            _.setState({
                CurrentUser_Interest: snapshot.val()
            })
            // SetCurrentUser_Interest(snapshot.val())
        })


        await fire.database().ref("MeetupLocation").once("value").then(function (snapshot) {
            if (snapshot.exists()) {
                snapshot.forEach(function (childSnapshot) {
                    console.log("snapshot.val()", childSnapshot.val())

                    if (childSnapshot.key === UserId) {
                        // _.setState({
                        //     CurrentUser_UpvotesLength: childSnapshot.val().Votes && childSnapshot.val().Votes.Upvotes ? childSnapshot.val().Votes.Upvotes.id.length : 0,
                        //     CurrentUser_DownvotesLength: childSnapshot.val().Votes && childSnapshot.val().Votes.Downvotes ? childSnapshot.val().Votes.Downvotes.id.length : 0
                        // })
                        // _.setState(prevState => ({
                        //     CurrentUserMeetup_Locations: [...prevState.CurrentUserMeetup_Locations, childSnapshot.val()],
                        //     // isloading: false
                        //     AddMeetupBtn: false,
                        //     CurrentUser_Meetup: true
                        // }))
                    }

                    else {
                        var tempArr = [];
                        tempArr = childSnapshot.val().Interest

                        const found = _.state.CurrentUser_Interest.some(r => tempArr.includes(r))
                        _.state.Meetup_Locations
                        if (found) {
                            _.setState(prevState => ({
                                Meetup_Locations: [...prevState.Meetup_Locations, childSnapshot.val()],
                                isloading: false
                            }))
                        }
                    }

                })
            }
        })
        // setLoading(false)

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
        if (this.state.SelectedMeetup.Votes) {
            if (this.state.SelectedMeetup.Votes.Downvotes) {
                temparr.push(this.state.SelectedMeetup.Votes.Downvotes)
            }
        }

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


    onSend(newMessage = []) {

        var UserId = fire.auth().currentUser.uid;
        var {ParticipentsIDS} = this.state
        fire.database().ref("users/" + UserId).child("GroupChat").update({
            Create_Date: new Date().toUTCString()
        }).then(() => {
            fire.database().ref("users/" + UserId).child("GroupChat" + "/" + "Participents" + "/" + "IDsofParticipants").set({
                PartcipentsList: [...ParticipentsIDS, UserId]
            })
        }).then(() => {
            for (var i = 0; i < ParticipentsIDS.length; i++) {

                fire.database().ref("users/" + ParticipentsIDS[i]).child("GroupChat").update({
                    Create_Date: new Date().toUTCString()
                })

            }

            for (var i = 0; i < ParticipentsIDS.length; i++) {
                fire.database().ref("users/" + ParticipentsIDS[i]).child("GroupChat" + "/" + "Participents" + "/" + "IDsofParticipants").set({
                    PartcipentsList: [...ParticipentsIDS, UserId]
                })
            }


            var newPostKey = fire.database().ref().child('posts').push().key;

            for (var i = 0; i < newMessage.length; i++) {

                fire.database().ref("users/" + UserId).child("GroupChat" + "/" + "Messages" + "/" + newPostKey).set({
                    _id: newMessage[i]._id,
                    createdAt: newMessage[i].createdAt.toUTCString(),
                    text: newMessage[i].text,
                    user: {
                        _id: 1,
                    }
                })

                for (var x = 0; x < ParticipentsIDS.length; x++) {
                    console.log("PARTICIPENTS FROM ONSEND FUNC", ParticipentsIDS[x])

                    fire.database().ref("users/" + ParticipentsIDS[x]).child("GroupChat" + "/" + "Messages" + "/" + newPostKey).set({
                        _id: newMessage[i]._id,
                        createdAt: newMessage[i].createdAt.toUTCString(),
                        text: newMessage[i].text,
                        user: {
                            _id: 2,
                            // avatar: firebase.auth().currentUser.photoURL,
                            name: fire.auth().currentUser.displayName
                        }
                    })
                }
            }
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, newMessage),
            }))
            // setMessages(GiftedChat.append(messages, newMessage))
        })

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
        return (
            <View style={{ flex: 1 }}>
                {this.state.MeetUpModal && this.MeetupModal()}
                <View style={{ flexDirection: "row", height: 70, width: "100%", backgroundColor: "white", alignItems: "center" }}>
                    <TouchableOpacity
                        // style={{ position: "absolute", top: 50, left: 20 }}
                        onPress={() => this.props.navigation.navigate("map")}
                    >
                        <AntDesign name="left" size={30} color="black" style={{ marginTop: 20, marginLeft: 20 }} />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 20, fontSize: 20, marginTop: 20, fontWeight: "bold" }}>Group Chat</Text>
                </View>



                <KeyboardAvoidingView style={styles.container} >
                    <GiftedChat
                        isAnimated={true}
                        messages={this.state.messages}
                        onSend={newMessages => this.onSend(newMessages)}
                        user={{
                            _id: 1,
                        }}
                    />
                </KeyboardAvoidingView>

                {!this.state.isloading && this.state.Meetup_Locations.map((items, i) => {
                    // UpdateBottom(UpdateBottom + 20)
                    // this.setState({
                    //     BottomSpace : this.state.BottomSpace + 20
                    // })
                    // this.UpdateState()
                    var val = i;
                    return <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 100, backgroundColor: "white", position: "absolute", top: (val + 1) * (val + this.state.BottomSpace), right: 20, justifyContent: "center", alignItems: "center", elevation: 5 }} key={i} onPress={() => { this.setState({ MeetUpModal: true, SelectedMeetup: items }); this.CheckVote(items) }}>
                        <Image source={require("../../assets/meetupicon2.jpg")} style={{ width: 45, height: 45, borderRadius: 100 }} />
                    </TouchableOpacity>
                })}


                {/* {!this.state.isloading && <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 100, backgroundColor: "white", position: "absolute", bottom: 80, right: 20, justifyContent: "center", alignItems: "center", elevation: 5 }} onPress={() => this.setState({ CurrentUserMeetUpModal: true })}>
                    <Image source={require("../../assets/meetupicon2.jpg")} style={{ width: 45, height: 45, borderRadius: 100 }} />
                </TouchableOpacity>} */}

            </View>
        )
    }

}




// export default function GroupChat({ route, navigation }) {

//     const [messages, setMessages] = useState([])
//     const [ParticipentsIDS, setParticipentsID] = useState([])
//     const [isloading, setLoading] = useState(true)
//     const [CurrentUser_Interest, SetCurrentUser_Interest] = useState([])
//     const [Meetup_Locations, SetMeetup_Locations] = useState([])
//     const [Meetup_LocationsUpdated, UpdateMeetupLocation] = useState(false)
//     const [BottomSpace, UpdateBottom] = useState(70)

//     const { MatchedUSers } = route.params;

//     useEffect(() => {
//         isloading && Fetched()
//     })

//     function Fetched() {
// var UserId = fire.auth().currentUser.uid;
// var data = [];

// for (var i = 0; i < MatchedUSers.length; i++) {
//     // console.log("MatchedUSers", MatchedUSers[i].uid);
//     data.push(MatchedUSers[i].uid)
// }

// // console.log(data)
// setParticipentsID(data)

// var tempArr = [];
// var data = []
// fire.database().ref("users/" + UserId).child("GroupChat" + "/" + "Messages").once("value").then(function (snapshot) {
//     snapshot.forEach(function (childSnapshot) {
//         tempArr.push(childSnapshot.val())
//     })

// }).then(() => {
//     // console.log("tempArr", tempArr)
//     tempArr.reverse();
//     setMessages(tempArr)
// })

// fire.database().ref("users/" + UserId).child("Interest").once("value").then(function (snapshot) {
//     // _.setState({
//     //     CurrentUser_Interest: snapshot.val()
//     // })
//     SetCurrentUser_Interest(snapshot.val())
// })

// fire.database().ref("MeetupLocation").once("value").then(function (snapshot) {
//     if (snapshot.exists()) {
//         snapshot.forEach(function (childSnapshot) {
//             console.log("snapshot.val()", childSnapshot.val())

//             if (childSnapshot.key === UserId) {

//             }

//             else {
//                 var tempArr2 = [];
//                 tempArr2 = childSnapshot.val().Interest

//                 const found = CurrentUser_Interest.some(r => tempArr2.includes(r))

//                 if (found) {
//                     data = [...Meetup_Locations, childSnapshot.val()]
//                     // _.setState(prevState => ({
//                     //     Meetup_Locations: [...prevState.Meetup_Locations, childSnapshot.val()],
//                     // }))
//                 }
//             }

//         })
//     }
// })
//     .then(() => {
//         SetMeetup_Locations(data)
//         UpdateMeetupLocation(true)
//         console.log("Meetup_Locations  00000000000", Meetup_Locations)
//     })

// setLoading(false)

//     }


//     // function MeetupModal() {
//     //     console.log("MEETUP DETAIL", this.state.SelectedMeetup)
//     //     return (
//     //         <Modal isVisible={this.state.MeetUpModal} style={{ backgroundColor: "white" }}>

//     //             <View style={{ flex: 1, alignItems: "center" }}>
//     //                 <MapView
//     //                     initialRegion={{
//     //                         latitude: this.state.SelectedMeetup.Location.latitude,
//     //                         longitude: this.state.SelectedMeetup.Location.longitude,
//     //                         latitudeDelta: 0.0222,
//     //                         longitudeDelta: 0.0222 * ASPECT_RATIO,
//     //                     }}
//     //                     style={{ height: 200, width: "100%" }}
//     //                     followsUserLocation={true}
//     //                 >
//     //                     <Marker
//     //                         pinColor="blue"
//     //                         coordinate={{
//     //                             latitude: this.state.SelectedMeetup.Location.latitude,
//     //                             longitude: this.state.SelectedMeetup.Location.longitude,
//     //                         }}>
//     //                     </Marker>
//     //                 </MapView>
//     //                 <View style={{ height: 70, width: "100%", backgroundColor: "#036bfc", padding: 10 }}>
//     //                     <Text style={{ fontWeight: "bold", fontSize: 24, color: "white", marginTop: 7 }}>{this.state.SelectedMeetup.nameOfPlace}</Text>
//     //                 </View>

//     //                 <View style={{ marginTop: 15 }}>
//     //                     <Text style={{ fontSize: 19, fontWeight: "bold" }}> Meetup Day : {this.state.SelectedMeetup.MeetupDay}</Text>
//     //                     <Text style={{ fontSize: 19, fontWeight: "bold" }}> Meetup Time  : {this.state.SelectedMeetup.MeetupTime}</Text>
//     //                 </View>

//     //                 <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%", height: 70, marginTop: 20 }}>
//     //                     <View style={{ flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
//     //                         <Text style={{ fontSize: 17, fontWeight: "bold" }}>Upvotes</Text>
//     //                         <Text style={{ fontSize: 17, color: "grey" }}>{this.state.UpvotesLength}</Text>
//     //                     </View>
//     //                     <View style={{ height: "100%", width: 1, backgroundColor: '#909090' }}></View>
//     //                     <View style={{ flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
//     //                         <Text style={{ fontSize: 17, fontWeight: "bold" }}>DownVotes</Text>
//     //                         <Text style={{ fontSize: 17, color: "grey" }}>{this.state.DownvotesLength}</Text>

//     //                     </View>
//     //                 </View>

//     //                 <View style={{
//     //                     marginTop: 10,
//     //                     width: "100%",
//     //                     borderBottomColor: 'grey',
//     //                     borderBottomWidth: 1,
//     //                 }}></View>

//     //                 {this.state.VoteBtns ? <View style={{ marginTop: 20, width: "100%", padding: 15 }}>
//     //                     <Text style={{ fontSize: 18, fontWeight: "bold" }}>Place your vote</Text>
//     //                     <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
//     //                         <TouchableOpacity style={{ marginTop: 20 }} onPress={() => this.PlaceUpvote()}>
//     //                             <View style={{ width: 130, padding: 10, borderRadius: 40, justifyContent: "center", alignItems: "center", backgroundColor: "white", elevation: 5 }}>
//     //                                 <Text style={{ fontSize: 20, color: "grey" }}>Upvote</Text>
//     //                             </View>
//     //                         </TouchableOpacity>
//     //                         <TouchableOpacity style={{ marginTop: 20 }} onPress={() => this.PlaceDownvote()}>
//     //                             <View style={{ width: 130, padding: 10, borderRadius: 40, justifyContent: "center", alignItems: "center", backgroundColor: "white", elevation: 5 }}>
//     //                                 <Text style={{ fontSize: 20, color: "grey" }}>Downvote</Text>
//     //                             </View>
//     //                         </TouchableOpacity>
//     //                     </View>
//     //                 </View> : <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 30 }}>You already Voted to this location</Text>}


//     //                 <View style={{ height: 30, width: 30, backgroundColor: "#ebf2f2", borderRadius: 100, position: "absolute", top: 20, right: 20 }}>
//     //                     <TouchableOpacity onPress={() => this.setState({ MeetUpModal: false })}>
//     //                         <Icon name="cancel" size={30} color="#900" />
//     //                     </TouchableOpacity>
//     //                 </View>


//     //             </View>
//     //         </Modal>
//     //     )
//     // }



    // function onSend(newMessage = []) {

    //     var UserId = fire.auth().currentUser.uid;

    //     fire.database().ref("users/" + UserId).child("GroupChat").update({
    //         Create_Date: new Date().toUTCString()
    //     }).then(() => {
    //         fire.database().ref("users/" + UserId).child("GroupChat" + "/" + "Participents" + "/" + "IDsofParticipants").set({
    //             PartcipentsList: [...ParticipentsIDS, UserId]
    //         })
    //     }).then(() => {
    //         for (var i = 0; i < ParticipentsIDS.length; i++) {

    //             fire.database().ref("users/" + ParticipentsIDS[i]).child("GroupChat").update({
    //                 Create_Date: new Date().toUTCString()
    //             })

    //         }

    //         for (var i = 0; i < ParticipentsIDS.length; i++) {
    //             fire.database().ref("users/" + ParticipentsIDS[i]).child("GroupChat" + "/" + "Participents" + "/" + "IDsofParticipants").set({
    //                 PartcipentsList: [...ParticipentsIDS, UserId]
    //             })
    //         }


    //         var newPostKey = fire.database().ref().child('posts').push().key;

    //         for (var i = 0; i < newMessage.length; i++) {

    //             fire.database().ref("users/" + UserId).child("GroupChat" + "/" + "Messages" + "/" + newPostKey).set({
    //                 _id: newMessage[i]._id,
    //                 createdAt: newMessage[i].createdAt.toUTCString(),
    //                 text: newMessage[i].text,
    //                 user: {
    //                     _id: 1,
    //                 }
    //             })

    //             for (var x = 0; x < ParticipentsIDS.length; x++) {
    //                 console.log("PARTICIPENTS FROM ONSEND FUNC", ParticipentsIDS[x])

    //                 fire.database().ref("users/" + ParticipentsIDS[x]).child("GroupChat" + "/" + "Messages" + "/" + newPostKey).set({
    //                     _id: newMessage[i]._id,
    //                     createdAt: newMessage[i].createdAt.toUTCString(),
    //                     text: newMessage[i].text,
    //                     user: {
    //                         _id: 2,
    //                         // avatar: firebase.auth().currentUser.photoURL,
    //                         name: fire.auth().currentUser.displayName
    //                     }
    //                 })
    //             }
    //         }

    //         setMessages(GiftedChat.append(messages, newMessage))
    //     })

    // }

// return (
//     <View style={{ flex: 1 }}>
//         <View style={{ flexDirection: "row", height: 70, width: "100%", backgroundColor: "white", alignItems: "center" }}>
//             <TouchableOpacity
//                 // style={{ position: "absolute", top: 50, left: 20 }}
//                 onPress={() => navigation.navigate("map")}
//             >
//                 <AntDesign name="left" size={30} color="black" style={{ marginTop: 20, marginLeft: 20 }} />
//             </TouchableOpacity>
//             <Text style={{ marginLeft: 20, fontSize: 20, marginTop: 20, fontWeight: "bold" }}>Group Chat</Text>
//         </View>



//         <KeyboardAvoidingView style={styles.container} >
//             <GiftedChat
//                 isAnimated={true}
//                 messages={messages}
//                 onSend={newMessages => onSend(newMessages)}
//                 user={{
//                     _id: 1,
//                 }}
//             />
//         </KeyboardAvoidingView>

//         {!isloading && Meetup_LocationsUpdated && Meetup_Locations.map((items, i) => {
//             // UpdateBottom(UpdateBottom + 20)
//             return <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 100, backgroundColor: "white", position: "absolute", bottom: 70, right: 20, justifyContent: "center", alignItems: "center", elevation: 5 }} onPress={() => this.setState({ CurrentUserMeetUpModal: true })}>
//                 <Image source={require("../../assets/meetupicon2.jpg")} style={{ width: 45, height: 45, borderRadius: 100 }} />
//             </TouchableOpacity>
//         })}


//         {/* {!isloading && Meetup_LocationsUpdated && <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 100, backgroundColor: "white", position: "absolute", bottom: 80, right: 20, justifyContent: "center", alignItems: "center", elevation: 5 }} onPress={() => this.setState({ CurrentUserMeetUpModal: true })}>
//             <Image source={require("../../assets/meetupicon2.jpg")} style={{ width: 45, height: 45, borderRadius: 100 }} />
//         </TouchableOpacity>} */}

//     </View>
// )
// }


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        width: 80,
    },
    ImageStyle: {
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    }
});