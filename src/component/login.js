import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Left, Header, Body, Right, Form, Item, Input, Button, ListItem, Toast } from 'native-base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import brown from '../../assets/brown.png';
import logo from '../../assets/loginPage.png';
import AsyncStorage from '@react-native-community/async-storage';
import fire, { database } from "../database/firebase";
import { useIsFocused } from "@react-navigation/native";

// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
//   } from '@react-native-community/google-signin'

export default function login({ navigation }) {

    const [email, setEmail] = useState();
    const [password, setPass] = useState();
    const isVisible = useIsFocused();

    useEffect(() => {
        if (isVisible) {
            AuthUser();
        }
    }, [isVisible]);

    function AuthUser() {
        fire.auth().onAuthStateChanged(function (user) {
            if (user) {
                // navigation.navigate("Chat")
            }
            else {

            }
        })
    }


    function userLogin() {
        if (email !== undefined && email !== "" && password !== undefined && password !== "") {
            fire.auth().signInWithEmailAndPassword(email, password)
                .then(res => {
                    try {
                        AsyncStorage.setItem(
                            '@userId', res.user.displayName
                        );
                    } catch (error) {
                    }
                    try {
                        AsyncStorage.setItem(
                            '@userImage', 'https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg'
                        );
                    } catch (error) {
                    }
                    try {
                        AsyncStorage.setItem(
                            '@userEmail', res.user.email
                        );
                    } catch (error) {
                    }

                    console.log(res);
                    Toast.show({
                        text: 'User logged-in successfully!!',
                        buttonText: 'Okay',
                    })
                    setEmail("");
                    setPass("");
                    navigation.navigate("map");
                })
                .catch(error => {
                    if (error.code === 'wrong-password') {
                        alert('Invalid email or password')
                    }
                    if (error.code === 'user-not-found') {
                        alert('No user Found')
                    }
                })
        } else {
            Toast.show({
                text: 'Enter details to signin!!',
                buttonText: 'Okay',
            })
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 25, borderColor: '#98bd64', borderBottomWidth: 1, borderBottomColor: '#98bd64', marginTop: hp(1), }}>
                <Left style={{ flex: 1 }}>
                </Left>
                <Body style={{ flex: 0 }}>
                    <Text style={{ fontSize: hp(5), fontWeight: 'bold', color: '#d2d170' }}>Social Circle</Text>
                </Body>
                <Right style={{ flex: 1 }}>
                </Right>
            </Header>
            <View style={styles.mainView}>
                <View style={{ borderWidth: 1, borderColor: '#b8bbbd', backgroundColor: '#fff', width: '30%', alignSelf: 'center', marginTop: hp(0.1) }}>
                    <TouchableOpacity>
                        <Text style={{ alignSelf: 'center', fontSize: hp(3), fontWeight: 'bold', paddingVertical: hp(0.5), color: '#d7cf44' }}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignSelf: 'center' }}>
                    <Image source={logo} />
                </View>
                <View>
                    <Form>
                        <Item style={{ width: '70%', marginTop: hp(2), alignSelf: 'center', borderRadius: 15, backgroundColor: '#fff', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#7aabaa' }}>
                            <Input placeholder="email" placeholderTextColor="#d7cf44" style={{ marginLeft: wp(3), fontWeight: 'bold' }}
                                style={[styles.input]} value={email} onChangeText={val => setEmail(val)} autoCapitalize='none' autoCorrect={false} />
                        </Item>
                        <Item style={{ width: '70%', marginTop: hp(2), alignSelf: 'center', borderRadius: 15, backgroundColor: '#fff', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#7aabaa' }}>
                            <Input placeholder="password" placeholderTextColor="#d7cf44" style={{ marginLeft: wp(3), fontWeight: 'bold' }} style={[styles.input]}
                                value={password} onChangeText={val => setPass(val)} autoCapitalize='none' autoCorrect={false} />
                        </Item>
                    </Form>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ borderWidth: 1, borderColor: '#36b5a9', backgroundColor: '#07e2cc', marginHorizontal: wp(8), width: '35%', alignSelf: 'center', borderRadius: 12, paddingVertical: hp(0.7), alignSelf: 'center', marginTop: hp(2) }}>
                            <TouchableOpacity onPress={() => userLogin()} block style={styles.submitBtn}>
                                <Text style={{ fontSize: hp(2.8), fontWeight: 'bold', color: '#bad9d9', alignSelf: 'center' }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: '#36b5a9', backgroundColor: '#07e2cc', marginLeft: wp(8), width: '35%', alignSelf: 'center', borderRadius: 12, paddingVertical: hp(0.7), alignSelf: 'center', marginTop: hp(2) }}>
                            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                                <Text style={{ fontSize: hp(2.8), fontWeight: 'bold', color: '#bad9d9', alignSelf: 'center' }}>Signup</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ fontSize: hp(4), color: '#b2b54e' }}>or</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                        <View style={{ alignSelf: 'center', backgroundColor: '#1b4d8a', borderRadius: 80, paddingVertical: hp(0.7), paddingHorizontal: wp(3) }}>
                            <TouchableOpacity>
                                <Icon name="facebook" size={30} style={{ color: '#fff' }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginLeft: wp(6), borderRadius: 80, paddingHorizontal: wp(2), paddingVertical: hp(0.7), backgroundColor: '#fff' }}>
                            <TouchableOpacity>
                                <Icon name="google" size={30} style={{ color: '#33ccff' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}


// class login extends Component {

//     constructor(props) {

//         super();
//         this.state = {
//             email: '',
//             password: '',
//             loading: false,
//         }
//     }

//     // componentDidMount(){
//     //     // GoogleSignin.configure({
//     //     //     scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
//     //     //     webClientId: '977633592312-jj0malv9asbumub7nctuhpn2huma225t.apps.googleusercontent.com',
//     //     //     offlineAccess: true,
//     //     // });
//     // }

//     onLoginUser = (email, password) => {

//         if (email === '') {
//             this.setState({ loading: false });

//             Toast.show({
//                 text: 'Please enter email',
//                 buttonText: 'Okay',
//             });
//         } else if (password === '') {
//             this.setState({ loading: false });

// Toast.show({
//     text: 'Please enter passwrod',
//     buttonText: 'Okay',
// });
//         } else {
//             try {
//                 auth()
//                     .signInWithEmailAndPassword(this.state.email, this.state.password)
//                     .then(async (userInfo) => {
//                         try {
//                             await AsyncStorage.setItem(
//                                 '@userId', userInfo.user.name
//                             );
//                         } catch (error) {
//                             // Error saving data
//                         }
//                         try {
//                             await AsyncStorage.setItem(
//                                 '@userImage', 'https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg'
//                             );
//                         } catch (error) {
//                             // Error saving data
//                         }
//                         try {
//                             await AsyncStorage.setItem(
//                                 '@userEmail', userInfo.user.email
//                             );
//                         } catch (error) {
//                             // Error saving data
//                         }
//                         database()
//                             .ref('/users/' + userInfo.user.uid)
//                             .on('value', async snapshot => {

//                                 console.log(snapshot.child('userName').val())

//                                 try {
//                                     await AsyncStorage.setItem(
//                                         '@userName', snapshot.child('userName').val()
//                                     );
//                                 } catch (error) {
//                                     // Error saving data
//                                 }

//                             })
//                         this.props.navigation.navigate('map');
//                     })
// .catch(error => {
//     if (error.code === 'wrong-password') {
//         alert('Invalid email or password')
//     }
//     if (error.code === 'user-not-found') {
//         alert('No user Found')
//     }
// });
//             } catch (err) { alert(err) }
//         }

//     };

//     onGoogleButtonPress = async () => {
//         // Get the users ID token

//         const { idToken } = await GoogleSignin.signIn();

//         // Create a Google credential with the token
//         const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//         // Sign-in the user with the credential
//         const userInfo = await GoogleSignin.signIn()
//         console.log(userInfo)
//         database()
//             .ref('/users/' + userInfo.user.id)
//             .set({
//                 email: userInfo.user.email,
//                 // password:password,
//                 userName: userInfo.user.name,
//                 //phone:phone,
//                 image: userInfo.user.photo,
//                 uid: userInfo.user.id
//             })
//             .then(
//                 async () => {
//                     try {
//                         await AsyncStorage.setItem(
//                             '@userId', userInfo.user.id

//                         );
//                     } catch (error) {
//                         // Error saving data
//                     }
//                     try {
//                         await AsyncStorage.setItem(
//                             '@userName', userInfo.user.name
//                         );
//                     } catch (error) {
//                         // Error saving data
//                     }
//                     try {
//                         await AsyncStorage.setItem(
//                             '@userImage', userInfo.user.photo
//                         );
//                     } catch (error) {
//                         // Error saving data
//                     }

//                     await this.props.navigation.navigate('map');

//                 });
//         return auth().signInWithCredential(googleCredential);
//     }

//     // render() {
//     //     console.log(this.state.email)
//     //     return (
//     //         <SafeAreaView style={styles.container}>
//     //             <Header style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 25, borderColor: '#98bd64', borderBottomWidth: 1, borderBottomColor: '#98bd64', marginTop: hp(1), }}>
//     //                 <Left style={{ flex: 1 }}>
//     //                 </Left>
//     //                 <Body style={{ flex: 0 }}>
//     //                     <Text style={{ fontSize: hp(5), fontWeight: 'bold', color: '#d2d170' }}>Social Circle</Text>
//     //                 </Body>
//     //                 <Right style={{ flex: 1 }}>
//     //                 </Right>
//     //             </Header>
//     //             <View style={styles.mainView}>
//     //                 <View style={{ borderWidth: 1, borderColor: '#b8bbbd', backgroundColor: '#fff', width: '30%', alignSelf: 'center', marginTop: hp(0.1) }}>
//     //                     <TouchableOpacity>
//     //                         <Text style={{ alignSelf: 'center', fontSize: hp(3), fontWeight: 'bold', paddingVertical: hp(0.5), color: '#d7cf44' }}>Login</Text>
//     //                     </TouchableOpacity>
//     //                 </View>
//     //                 <View style={{ alignSelf: 'center' }}>
//     //                     <Image source={logo} />
//     //                 </View>
//     //                 <View>
//     //                     <Form>
//     //                         <Item style={{ width: '70%', marginTop: hp(2), alignSelf: 'center', borderRadius: 15, backgroundColor: '#fff', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#7aabaa' }}>
//     //                             <Input placeholder="email" placeholderTextColor="#d7cf44" style={{ marginLeft: wp(3), fontWeight: 'bold' }}
//     //                                 style={[styles.input]} value={this.state.email} onChangeText={email => this.setState({ email })} autoCapitalize='none' autoCorrect={false} />
//     //                         </Item>
//     //                         <Item style={{ width: '70%', marginTop: hp(2), alignSelf: 'center', borderRadius: 15, backgroundColor: '#fff', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#7aabaa' }}>
//     //                             <Input placeholder="password" placeholderTextColor="#d7cf44" style={{ marginLeft: wp(3), fontWeight: 'bold' }} style={[styles.input]}
//     //                                 value={this.state.password} onChangeText={password => this.setState({ password })} autoCapitalize='none' autoCorrect={false} />
//     //                         </Item>
//     //                     </Form>
//     //                     <View style={{ flexDirection: 'row', width: '100%' }}>
//     //                         <View style={{ borderWidth: 1, borderColor: '#36b5a9', backgroundColor: '#07e2cc', marginHorizontal: wp(8), width: '35%', alignSelf: 'center', borderRadius: 12, paddingVertical: hp(0.7), alignSelf: 'center', marginTop: hp(2) }}>
//     //                             <TouchableOpacity onPress={() => this.onLoginUser(this.state.email, this.state.password)} block style={styles.submitBtn}>
//     //                                 <Text style={{ fontSize: hp(2.8), fontWeight: 'bold', color: '#bad9d9', alignSelf: 'center' }}>Login</Text>
//     //                             </TouchableOpacity>
//     //                         </View>
//     //                         <View style={{ borderWidth: 1, borderColor: '#36b5a9', backgroundColor: '#07e2cc', marginLeft: wp(8), width: '35%', alignSelf: 'center', borderRadius: 12, paddingVertical: hp(0.7), alignSelf: 'center', marginTop: hp(2) }}>
//     //                             <TouchableOpacity onPress={() => this.props.navigation.navigate('signup')}>
//     //                                 <Text style={{ fontSize: hp(2.8), fontWeight: 'bold', color: '#bad9d9', alignSelf: 'center' }}>Signup</Text>
//     //                             </TouchableOpacity>
//     //                         </View>
//     //                     </View>
//     //                     <View style={{ alignSelf: 'center' }}>
//     //                         <Text style={{ fontSize: hp(4), color: '#b2b54e' }}>or</Text>
//     //                     </View>
//     //                     <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
//     //                         <View style={{ alignSelf: 'center', backgroundColor: '#1b4d8a', borderRadius: 80, paddingVertical: hp(0.7), paddingHorizontal: wp(3) }}>
//     //                             <TouchableOpacity>
//     //                                 <Icon name="facebook" size={30} style={{ color: '#fff' }} />
//     //                             </TouchableOpacity>
//     //                         </View>
//     //                         <View style={{ marginLeft: wp(6), borderRadius: 80, paddingHorizontal: wp(2), paddingVertical: hp(0.7), backgroundColor: '#fff' }}>
//     //                             <TouchableOpacity>
//     //                                 <Icon name="google" size={30} style={{ color: '#33ccff' }} />
//     //                             </TouchableOpacity>
//     //                         </View>
//     //                     </View>
//     //                 </View>
//     //             </View>
//     //         </SafeAreaView>
//     //     );
//     // };
// }
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#86e1d8',
        flex: 1,
        width: '100%'
    },
    mainView: {
        backgroundColor: '#86e1d8'
    },
});
// export default login;
