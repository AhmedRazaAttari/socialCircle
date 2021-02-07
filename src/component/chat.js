import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Animated, ActivityIndicator, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Header, Left, Right, Body, Input, Form } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AntDesign } from '@expo/vector-icons';
import { GiftedChat } from 'react-native-gifted-chat';
import fire, { database } from "../database/firebase";


export default function chat({ route, navigation }) {

    const [messagesdata, setMessages] = useState([])
    const [isloading, setLoading] = useState(true)
    const { uid, name } = route.params;


    useEffect(() => {

        var UserId = fire.auth().currentUser.uid;

        var tempArr = [];
        fire.database().ref("users/" + UserId).child("ChatHeads" + "/" + uid + "/" + "ChatMsgs").once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                tempArr.push(childSnapshot.val())
            })

        }).then(() => {
            console.log("tempArr", tempArr)
            tempArr.reverse();
            setMessages(tempArr)
        })
    }, [])


    function onSend(newMessage = []) {

        var UserId = fire.auth().currentUser.uid;

        fire.database().ref("users/" + UserId).child("ChatHeads" + "/" + uid).update({
            name: name,
            uid: uid,
        })

        fire.database().ref("users/" + uid).child("ChatHeads" + "/" + UserId).update({
            name: name,
            uid: UserId,
        })

        var newPostKey = fire.database().ref().child('posts').push().key;
        for (var i = 0; i < newMessage.length; i++) {

            fire.database().ref("users/" + UserId).child("ChatHeads" + "/" + uid + "/" + "ChatMsgs" + "/" + newPostKey).set({
                _id: newMessage[i]._id,
                createdAt: newMessage[i].createdAt.toUTCString(),
                text: newMessage[i].text,
                user: {
                    _id: 1,
                }
            })

            fire.database().ref("users/" + uid).child("ChatHeads" + "/" + UserId + "/" + "ChatMsgs" + "/" + newPostKey).set({
                _id: newMessage[i]._id,
                createdAt: newMessage[i].createdAt.toUTCString(),
                text: newMessage[i].text,
                user: {
                    _id: 2,
                    avatar: fire.auth().currentUser.photoURL,
                }
            })

        }
        setMessages(GiftedChat.append(messagesdata, newMessage))
    }



    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", height: 70, width: "100%", backgroundColor: "white", alignItems: "center" }}>
                <TouchableOpacity
                    // style={{ position: "absolute", top: 50, left: 20 }}
                    onPress={() => navigation.navigate("map")}
                >
                    <AntDesign name="left" size={30} color="black" style={{ marginTop: 20, marginLeft: 20 }} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 20, fontSize: 20, marginTop: 20, fontWeight: "bold" }}>{name}</Text>
            </View>

            <KeyboardAvoidingView style={{ flex: 1 }} >
                {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                <GiftedChat
                    isAnimated={true}
                    // renderAccessory={CustomView}
                    // renderSend={this.SendBtn}
                    messages={messagesdata}
                    onSend={newMessages => onSend(newMessages)}
                    user={{
                        _id: 1,
                    }}
                />
                {/* </ScrollView> */}
            </KeyboardAvoidingView>
        </View>
    )
}

// export default class chat extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             messages: [],
//         }
//     }

//     componentDidMount() {
//         console.log(this.props.navigation)
//     }

//     onSend(messages = []) {

//         console.log(messages, messages.length)
//         this.setState(previousState => ({
//             messages: GiftedChat.append(previousState.messages, messages),
//         }))
//     }

//     render() {
//         return (
//             <ScrollView>
// <Header style={style.header}>
//     <Left style={{ flex: 1 }}>
//         <TouchableOpacity onPress={() => this.props.navigation.navigate('map')} style={{ marginLeft: wp(2) }}>
//             <Icon name="angle-left" size={30} />
//         </TouchableOpacity>
//     </Left>
//     <Body style={style.body}>
//         <Text style={style.text1}>Social Circle</Text>
//     </Body>
//     <Right style={{ flex: 1 }}>

//     </Right>
// </Header>
//             </ScrollView>
//         )
//      
//     }
// }
const style = StyleSheet.create({
    icon: {
        paddingHorizontal: wp(2),
        marginTop: hp(1.5)

    },
    viewcb: {
        backgroundColor: '#fff',
        width: '60%',
        borderWidth: wp(0.25),
        paddingHorizontal: wp(5),
        marginHorizontal: wp(3),
        borderColor: '#43e9da',
    },
    viewc: {
        paddingVertical: hp(1),
        paddingHorizontal: wp(2),
        backgroundColor: '#c3f0eb',
        flexDirection: "row"
    },
    viewca: {
        width: '10%',
        borderColor: '#c5d352',
        alignSelf: 'center',

    },
    iconb: {
        //borderRadius: wp(9),
        //borderWidth: wp(1),
        width: '100%',

    },
    text9: {
        color: '#b46e69',
        paddingHorizontal: wp(1)
    },
    viewb: {
        //   paddingHorizontal: wp(5),
        flexDirection: "row",
        alignItems: "center"
    },
    text8: {
        fontSize: hp(1)
    },
    viewab: {
        flexDirection: "row",
        marginBottom: hp(2)
    },
    viewaa: {
        //flexDirection: "row-reverse",
        //borderWidth: wp(1),
        marginVertical: hp(2)
    },
    icona: {

    },
    text7: {
        backgroundColor: '#fff',
        width: '70%',
        textAlign: "center"
    },
    text6: {
        backgroundColor: '#fff',
        fontSize: hp(2),
        paddingVertical: hp(1),
        paddingHorizontal: wp(1),
        marginHorizontal: wp(3)
    },
    viewa: {
        //backgroundColor: 'red',
        // flexDirection: "column",
        paddingHorizontal: wp(2),
        marginHorizontal: wp(2),
        paddingVertical: hp(2),
        // alignItems: "center",
        // justifyContent: "center"
    },
    view0: {
        flexDirection: "row",
        backgroundColor: '#86e1d8'
    },
    mainView: {
        backgroundColor: '#fff',
        width: '40%',
        flexDirection: "column",
    },
    text5: {
        paddingTop: hp(1),
        paddingLeft: wp(2),
        fontWeight: '700',
        fontSize: hp(2),
    },
    view2_1: {
        flexDirection: "row",
        alignSelf: "center",
        marginVertical: hp(2),
    },
    user1: {
    },
    view2: {

        borderTopWidth: wp(0.25),
        borderRightWidth: wp(0.25),
        borderLeftWidth: wp(0.25),
    },
    text4: {
        fontSize: hp(2.5),
        fontWeight: '600',
        color: '#000000',
        fontWeight: 'bold',
        textAlign: "center",
    },
    o2: {
        backgroundColor: '#efece5',
        width: '30%',
        marginLeft: wp(2),
        alignSelf: "center",
        paddingVertical: hp(1.5),
        borderWidth: 2
    },
    text3: {
        fontSize: hp(2),
        color: '#777673',
        textAlign: "center"
    },
    text2: {
        fontSize: hp(2.5),
        fontWeight: '700',
        color: '#777673',
        textAlign: "center"
    },
    o1: {
        backgroundColor: '#efece5',
        width: '50%',
        marginRight: wp(2),
        borderColor: '#000000',
        borderWidth: 2
    },
    userAlt: {
        paddingHorizontal: wp(3),
        paddingTop: hp(1)
    },
    view1: {
        flexDirection: "row",
        backgroundColor: '#c3f0eb',
        paddingVertical: hp(2),
    },
    text1: {
        fontSize: hp(3),
        fontWeight: '700',
        color: '#aab973'
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        borderBottomRightRadius: hp(2),
        borderBottomLeftRadius: hp(2),
        borderBottomWidth: wp(1),
        borderBottomColor: '#aab973',
        backgroundColor: '#fff',
    },
    body: {
        backgroundColor: '#fff',
        alignItems: "center",
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    }
});
// export default chat;