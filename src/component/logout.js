import React,{useState,Component} from 'react';
import  {View,Text,SafeAreaView,StyleSheet,Image,TouchableOpacity,BackHandler,FlatList,ScrollView} from 'react-native';
import { Left,Header,Body,Right, Form,Item,Input, Button, ListItem,Toast } from 'native-base';
import {heightPercentageToDP as hp ,widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
// import {  withNavigationFocus } from '@react-navigation/native';

class logout extends Component{
    constructor(props) {
        super();
    }
    componentDidMount() {
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }
    render() {
        return (
             <SafeAreaView style={styles.container}>
                 <Header style={{backgroundColor:'#fff',borderWidth:1,borderRadius:25,borderColor:'#98bd64',borderBottomWidth:1,borderBottomColor:'#98bd64',marginTop:hp(1),}}>
              <Left style={{flex:1}}>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('map')}>
                      <Icon name="arrow-left" size={24}/>
                  </TouchableOpacity>
              </Left>
            <Body style={{flex:0}}>
            <Text style={{fontSize:hp(5),fontWeight:'bold',color:'#d2d170'}}>Social Circle</Text>
            </Body>
            <Right style={{flex:1}}>
            </Right>
          </Header>
          <View style={styles.mainView}>
           <View style={{borderWidth:1,borderColor:'#b8bbbd',backgroundColor:'#fff',width:'30%',alignSelf:'center',marginTop:hp(0.1)}}>
                  <TouchableOpacity  onPress={() => BackHandler.exitApp()}>
                   <Text style={{alignSelf:'center',fontSize:hp(3),fontWeight:'bold',paddingVertical:hp(0.5),color:'#d7cf44'}}>Logout</Text>
           </TouchableOpacity>
           </View>
          
           <View>
              <View style={{marginTop:hp(8)}}>
                  <Text style={{fontSize:hp(4.5),color:'#b2b54e',fontWeight:'bold',marginHorizontal:wp(3)}}>Logout! If You Want To Enter then login ! </Text>
              </View>
               <View style={{borderWidth:1,borderColor:'#36b5a9',backgroundColor:'#07e2cc',marginHorizontal:wp(8),width:'35%',alignSelf:'center',borderRadius:12,paddingVertical:hp(0.7),alignSelf:'center',marginTop:hp(2)}}>
                   <TouchableOpacity onPress={()=>this.props.navigation.navigate('login')}>
                       <Text style={{fontSize:hp(2.8),fontWeight:'bold',color:'#bad9d9',alignSelf:'center'}}>Login</Text>
                   </TouchableOpacity>
               </View>
               <View style={{alignSelf:'center'}}>
                   <Text style={{fontSize:hp(4),color:'#b2b54e'}}>or</Text>
               </View>
               <View style={{flexDirection:'row',justifyContent:'center',width:'100%'}}>
                   <View style={{alignSelf:'center',backgroundColor:'#1b4d8a',borderRadius:80,paddingVertical:hp(0.7),paddingHorizontal:wp(3)}}>
                      <TouchableOpacity>
                       <Icon name="facebook" size={30} style={{color:'#fff'}}/> 
                       </TouchableOpacity>
                   </View>
                   <View style={{marginLeft:wp(6),borderRadius:80,paddingHorizontal:wp(2),paddingVertical:hp(0.7),backgroundColor:'#fff'}}>
                       <TouchableOpacity>
                       <Icon name="google" size={30} style={{color:'#33ccff'}}/>
                       </TouchableOpacity>
                   </View>
               </View>
           </View>
          </View>
            </SafeAreaView>
        );
    };
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:'#86e1d8',
      flex: 1,
      width:'100%'
    },
    mainView:{
        backgroundColor:'#86e1d8'
    },
  });
export default logout;
