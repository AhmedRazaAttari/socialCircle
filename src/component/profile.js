import React, { useState, Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Left, Header, Body, Right, Form, Item, Input, Picker } from 'native-base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import boy from '../../assets/women.png';
//import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
// import app from '@react-native-firebase/app';
// import { storage } from 'firebase';


class profile extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            //loggedIn
            userId: '',
            userImage: 'https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg',
            userName: '',
            userEmail: ''

        };
    }

    async componentDidMount() {

        try {
            await AsyncStorage.setItem('@userId');
        }
        catch
        {
            //console .error
        }

        try {
            await AsyncStorage.setItem('@userName');
        }
        catch
        {
            //console.error
        }
        try {
            await AsyncStorage.setItem('@userEmail');
        }
        catch {
            //cosole.error
        }
        try {
            await AsyncStorage.setItem('@userImage');
        }
        catch {
            //console.error
        }

        try {

            const value = await AsyncStorage.getItem('@userId');

            if (value !== null) {
                //alert(value)
                this.setState({
                    userId: value
                })

            }
        } catch (error) {
            // Error retrieving data
        }
        try {

            const name = await AsyncStorage.getItem('@userName');

            if (name !== null) {
                // alert(name)
                this.setState({
                    userName: name
                })

            }
        } catch (error) {
            // Error retrieving data
        }
        try {

            const image = await AsyncStorage.getItem('@userImage');

            if (image !== null) {
                //alert(image)
                this.setState({
                    userImage: image
                })

            }
        } catch (error) {
            // Error retrieving data
        }
        try {

            const email = await AsyncStorage.getItem('@userEmail');

            if (email !== null) {
                //alert(email)
                this.setState({
                    userEmail: email
                })

            }
        } catch (error) {
            // Error retrieving data
        }

    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.mainView}>
                    <Header style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 25, borderColor: '#98bd64', borderBottomWidth: 1, borderBottomColor: '#98bd64', marginTop: hp(1), }}>
                        <Left style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('login')} style={{ marginLeft: wp(2) }}>
                                <Icon name="angle-left" size={30} />
                            </TouchableOpacity>
                        </Left>
                        <Body style={{ flex: 0 }}>
                            <Text style={{ fontSize: hp(4), fontWeight: 'bold', alignSelf: 'center', color: '#d2d170' }}>Profile</Text>
                        </Body>
                        <Right style={{ flex: 1 }}>
                        </Right>
                    </Header>
                    <View style={{ marginLeft: wp(8), width: '22%', marginTop: hp(5), alignSelf: 'center' }}>
                        <Image source={{ uri: this.state.userImage }} style={{ width: 80, height: 80 }} />
                    </View>
                    <View style={{ width: '80%', alignSelf: 'center' }}>
                        <Text style={{ fontSize: hp(3.2), fontWeight: 'bold', textAlign: 'center', marginTop: hp(1) }}>{this.state.userName}</Text>
                    </View>
                    <View style={{ width: '80%', alignSelf: 'center' }}>
                        <Text style={{ fontSize: hp(2.5), textAlign: 'center' }}>{this.state.userEmail}</Text>
                    </View>


                    <View style={{ width: '90%', flexDirection: 'row', marginTop: hp(5), alignSelf: 'center', marginVertical: hp(0.5), paddingVertical: hp(2), borderWidth: 1.5, borderRadius: 15, borderColor: '#bac858', backgroundColor: '#fff' }}>
                        <View style={{ width: '10%', marginLeft: wp(3) }}>
                            <Icon2 name="onepassword" size={26} style={{ color: '#000' }} />
                        </View>
                        <View style={{ width: '60%', marginHorizontal: wp(7) }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('changepassword')} style={{ width: '100%' }} >
                                <Text style={{ fontSize: hp(3), fontWeight: 'bold' }}>Change Password</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '20%' }}>
                            <TouchableOpacity>
                                <Icon name="angle-right" size={26} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ width: '90%', flexDirection: 'row', alignSelf: 'center', paddingVertical: hp(2), marginVertical: hp(0.5), borderWidth: 1.5, borderRadius: 15, borderColor: '#bac858', backgroundColor: '#fff' }}>
                        <View style={{ width: '8%', marginLeft: wp(5) }}>
                            <Icon name="bell" size={26} style={{ color: '#000' }} />
                        </View>
                        <View style={{ width: '60%', marginHorizontal: wp(7) }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('notification')} style={{ width: '100%' }} >
                                <Text style={{ fontSize: hp(3), fontWeight: 'bold' }}>Notification</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '20%' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('notification')}>
                                <Icon name="angle-right" size={26} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: '90%', flexDirection: 'row', alignSelf: 'center', paddingVertical: hp(2), marginVertical: hp(0.5), borderWidth: 1.5, borderRadius: 15, borderColor: '#bac858', backgroundColor: '#fff' }}>
                        <View style={{ width: '8%', marginLeft: wp(5) }}>
                            <Icon name="user-edit" size={26} style={{ color: '#000' }} />
                        </View>
                        <View style={{ width: '60%', marginHorizontal: wp(7) }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('updateprofile')} style={{ width: '100%' }}>
                                <Text style={{ fontSize: hp(3), fontWeight: 'bold' }}>Update Profile</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '20%' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('updateprofile')}>
                                <Icon name="angle-right" size={26} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: '90%', flexDirection: 'row', alignSelf: 'center', paddingVertical: hp(2), marginVertical: hp(0.5), borderWidth: 1.5, borderRadius: 15, borderColor: '#bac858', backgroundColor: '#fff' }}>
                        <View style={{ width: '8%', marginLeft: wp(5) }}>
                            <Icon1 name="logout" size={26} style={{ color: '#000' }} />
                        </View>
                        <View style={{ width: '60%', marginHorizontal: wp(7) }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('logout')} style={{ width: '100%' }}>
                                <Text style={{ fontSize: hp(3), fontWeight: 'bold' }}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '20%' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('logout')}>
                                <Icon name="angle-right" size={26} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#86e1d8',
        flex: 1,
    },
    mainView: {
        width: '100%',
        flex: 1,
    },
    images: {
        marginHorizontal: wp(8),
    },
    input: {
        alignSelf: 'center'
    },
    lastView: {
        flexDirection: 'row',
        backgroundColor: '#37f093',
        paddingVertical: hp(2),
        borderTopLeftRadius: hp(3),
        borderTopRightRadius: hp(3)
    },
    lastIcon: {
        marginRight: wp(8)
    },
    homeIcon: {
        marginLeft: wp(8),
    },
});

export default profile;