import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, Alert, Platform } from 'react-native';
import { Toast } from 'native-base';
import logo from '../../assets/splash1.jpeg';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import * as Animatable from 'react-native-animatable';
// console.disableYellowBox = true;
class splash extends Component {
    componentDidMount() {
        this.handleFirstConnectivityChange();
    }

    handleFirstConnectivityChange = state => {

        setTimeout(() => {
            this.props.navigation.navigate('login');
        }, 2500);
    };

    render() {
        return (
            <View style={style.container}>
                <View style={style.logo}>
                    <Image style={style.logoMain} source={logo} />
                </View>
                <Animatable.Text useNativeDriver={true} style={style.text} animation="fadeInUp" iterationCount={1} direction="alternate">Welcome to</Animatable.Text>
                <Animatable.Text useNativeDriver={true} style={style.text1} animation="fadeInUp" iterationCount={1} direction="alternate">Social Circle!</Animatable.Text>
                <ActivityIndicator style={{ marginTop: hp(5) }} size="large" color="#0000ff" />
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#86e1d8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
    },
    logoMain: {
        width: 370,
        height: 480
    },
    text: {
        fontSize: wp(8),
        fontWeight: 'bold',
        marginTop: hp(3),
        color: '#000'
    },
    text1: {
        fontSize: wp(8),
        fontWeight: 'bold',
        marginTop: hp(3),
        color: '#fff'
    },
});
export default splash;