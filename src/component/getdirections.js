import React,{useState,Component} from 'react';
import  {View,Text,SafeAreaView,StyleSheet,Image,TouchableOpacity,Alert,AwesomeAlert,showAlert,FlatList,ScrollView} from 'react-native';
import { Left,Header,Body,Right, Form,Item,Input, Button,Modal, ListItem } from 'native-base';
import {heightPercentageToDP as hp ,widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import doctor from '../../assets/doctor.png';
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
class getdirections extends Component{
        constructor(){
            super()
            this.state={ };
            
            };

    render() {
    return(
      <SafeAreaView style={styles.containers}>
          <Header style={{backgroundColor:'#fff',borderWidth:1,borderRadius:15,borderColor:'#98bd64',borderBottomWidth:2.5,borderBottomColor:'#98bd64',marginTop:hp(0.2)}}>
            <Left style={{flex:1}}>
            </Left>
            <Body style={{flex:0}}>
              <Text style={{fontSize:hp(5),fontWeight:'bold',color:'#d2d170'}}>Social Circle</Text>
            </Body>
            <Right style={{flex:1}}>
            </Right>
          </Header>
          <View style={{flexDirection:'row',width:'100%', marginTop: hp(0.5)}}>
            <View style={{width:'33%',marginLeft: wp(17),borderWidth:2,borderRadius:10,backgroundColor:'#fff',borderBottomWidth:2.3,paddingVertical:hp(1),borderColor:'#7fddd3'}}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('profile')}>
                <Text style={{fontSize:hp(3),alignSelf:'center',fontWeight:'bold',color:'#d3d842'}}>Profile</Text>
              </TouchableOpacity>
            </View>
          
            <View style={{width:'30%',marginLeft: wp(1),borderWidth:2,borderRadius:10,paddingVertical:hp(1),backgroundColor:'#fff',borderBottomWidth:2.3,borderColor:'#7fddd3'}}>
              <TouchableOpacity  onPress={()=>this.props.navigation.navigate('chat')}>
                <Text style={{fontSize:hp(3),alignSelf:'center',fontWeight:'bold',color:'#d3d842'}}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
       <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}>
     </MapView>

   </View>
   <View style={{width:'100%',marginTop:hp(1), marginLeft: wp(50)}}>
   <View style={{width:'38%',borderWidth:2,borderRadius:10,marginLeft:wp(8),paddingVertical:hp(0.5),backgroundColor:'#fff',borderBottomWidth:2.3,borderColor:'#7fddd3'}}>
     <TouchableOpacity> 
     <Text style={{fontSize:hp(3),alignSelf:'center',fontWeight:'bold',color:'#d3d842'}}>Members:3</Text>
     </TouchableOpacity>
   </View>

   </View>
   <View>
   <View style={{marginTop: hp(60),width:'42%',borderWidth:2,borderRadius:10,marginHorizontal:wp(4),paddingHorizontal:wp(1),paddingVertical:hp(0.5),backgroundColor:'#fff',borderBottomWidth:2.3,borderColor:'#7fddd3'}}>
   <TouchableOpacity> 
     <Text style={{fontSize:hp(3),alignSelf:'center',fontWeight:'bold',color:'#d3d842'}}>Get Directions</Text>
     </TouchableOpacity> 
   </View>
   </View>
   </SafeAreaView>
   
        )
    }
}

const styles = StyleSheet.create({
  containers:{
    width:'100%',
    flex:1
  },
    container: {
      borderWidth:1,
      borderColor:'#b0d37b',
      ...StyleSheet.absoluteFillObject,
      marginTop:'30%',
      height:500,
      width:'100%',
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

export default getdirections;