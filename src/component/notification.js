import React,{useState,Component} from 'react';
import  {View,Text,SafeAreaView,StyleSheet,Image,TouchableOpacity,ScrollView} from 'react-native';
import { Left,Header,Body,Right, Form,Item,Input, Picker } from 'native-base';
import {heightPercentageToDP as hp ,widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5'
class notification extends Component{
        constructor(){
            super()
            this.state={

            };
        }
    render() {
    return(
       <SafeAreaView style={styles.container}>
           <View style={styles.mainView}>
               <Header style={{backgroundColor:'#fff',borderWidth:1,borderRadius:25,borderColor:'#98bd64',borderBottomWidth:1,borderBottomColor:'#98bd64',marginTop:hp(1),}}>
                   <Left style={{flex:1}}>
                       <TouchableOpacity onPress={()=>this.props.navigation.navigate('profile')}style={{marginLeft:wp(2)}}>
                       <Icon name="angle-left" size={30}/>
                       </TouchableOpacity>
                   </Left>
                   <Body style={{flex:0}}>
                       <Text style={{fontSize:hp(4),fontWeight:'bold',alignSelf:'center',color:'#d2d170'}}>Notification</Text>
                   </Body>
                   <Right style={{flex:1}}>
                   </Right>
               </Header>
               <View style={{width:'95%',flexDirection:'row',alignSelf:'center',marginVertical:hp(0.5),paddingVertical:hp(2),borderWidth:1.5,borderRadius:15,borderColor:'#bac858',backgroundColor:'#fff'}}>
                   <View style={{width:'7%',marginLeft:wp(3)}}>
                   <Icon name="lightbulb" size={26} style={{color:'#000',alignSelf:'center'}} />
                   </View>
                   <View style={{width:'82%',marginHorizontal:wp(1)}}>
                   <TouchableOpacity style={{width:'100%',marginHorizontal:wp(6)}} >
                       <Text style={{fontSize:hp(2.7),fontWeight:'bold'}}>Your number has been verified</Text>
                       </TouchableOpacity>
                   </View>
               </View>

               <View style={{width:'95%',flexDirection:'row',alignSelf:'center',marginVertical:hp(0.5),paddingVertical:hp(2),borderWidth:1.5,borderRadius:15,borderColor:'#bac858',backgroundColor:'#fff'}}>
                   <View style={{width:'7%',marginLeft:wp(3)}}>
                  <Icon name="lightbulb" size={26} style={{color:'#000',alignSelf:'center',marginTop:hp(1)}} />
                   </View>
                   <View style={{width:'80%',marginHorizontal:wp(7)}}>
                   <TouchableOpacity style={{width:'100%'}} >
                       <Text style={{fontSize:hp(2.7),fontWeight:'bold'}}>Event Reminder: Due in next 24 Hours</Text>
                    </TouchableOpacity>
                   </View>
               </View>
              
      </View>
        </SafeAreaView>
        );
    }
}

    const styles = StyleSheet.create({
        container:{
            width:'100%',
            backgroundColor:'#86e1d8',
            flex:1,
        },
        mainView:{
            width:'100%',
            flex:1,
        },
        images:{
            marginHorizontal:wp(8),
        },
        input:{
            alignSelf:'center'
        },
        lastView: {
            flexDirection: 'row',
            backgroundColor: '#37f093',
            paddingVertical: hp(2),
            borderTopLeftRadius: hp(3),
            borderTopRightRadius: hp(3)
        },
        lastIcon:{
            marginRight: wp(8)
        },
        homeIcon:{
           marginLeft: wp(8),
        },
    }); 

export default notification;