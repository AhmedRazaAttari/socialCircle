import React,{useState,Component} from 'react';
import  {View,Text,SafeAreaView,StyleSheet,Image,TouchableOpacity,FlatList,ScrollView} from 'react-native';
import { Left,Header,Body,Right, Form,Item,Input, Button, ListItem } from 'native-base';
import {heightPercentageToDP as hp ,widthPercentageToDP as wp} from 'react-native-responsive-screen';
// import Icon from 'react-native-vector-icons/FontAwesome';
import brown from '../../assets/brown.png';
import logo from '../../assets/loginPage.png';
class changepassword extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
             <SafeAreaView style={styles.container}>
                 <Header style={{backgroundColor:'#fff',borderWidth:1,borderRadius:25,borderColor:'#98bd64',borderBottomWidth:1,borderBottomColor:'#98bd64',marginTop:hp(1),}}>
              <Left style={{flex:1}}>
              </Left>
            <Body style={{flex:0}}>
            <Text style={{fontSize:hp(5),fontWeight:'bold',color:'#d2d170'}}>Social Circle</Text>
            </Body>
            <Right style={{flex:1}}>
            </Right>
          </Header>
          <View style={styles.mainView}>
           <View style={{width:'80%',marginTop:hp(4),paddingVertical:hp(1.5),alignSelf:'center',borderWidth:1,borderColor:'#b0d37b',borderRadius:15,backgroundColor:'#fff'}}>
               <Text style={{fontSize:hp(3.3),color:'#7c7b74',alignSelf:'center'}}>Change Password</Text>
           </View>
           <View style={{marginTop:hp(5)}}>
               <Form>
                   <Item style={{width:'70%',marginTop:hp(2),alignSelf:'center',borderRadius:15,backgroundColor:'#fff',borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderBottomWidth:1,borderColor:'#bac858'}}>
                       <Input placeholder="Old Password" placeholderTextColor="#b4b4b4" style={{marginLeft:wp(3),fontWeight:'bold'}}/>
                   </Item>
                   <Item style={{width:'70%',marginTop:hp(2),alignSelf:'center',borderRadius:15,backgroundColor:'#fff',borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderBottomWidth:1,borderColor:'#bac858'}}>
                       <Input placeholder="New Password" placeholderTextColor="#b4b4b4" style={{marginLeft:wp(3),fontWeight:'bold'}}/>
                   </Item>
                   <Item style={{width:'70%',marginTop:hp(2),alignSelf:'center',borderRadius:15,backgroundColor:'#fff',borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderBottomWidth:1,borderColor:'#bac858'}}>
                       <Input placeholder="Confirm" placeholderTextColor="#b4b4b4" style={{marginLeft:wp(3),fontWeight:'bold'}}/>
                   </Item>
               </Form>
               <View style={{borderWidth:1,borderColor:'#bfcc73',backgroundColor:'#07e2cc',width:'35%',borderRadius:12,paddingVertical:hp(0.7),alignSelf:'center',marginTop:hp(5)}}>
                   <TouchableOpacity onPress={()=>this.props.navigation.navigate('profile')}>
                       <Text style={{fontSize:hp(3),fontWeight:'bold',color:'#ecfdfc',alignSelf:'center'}}>Update</Text>
                   </TouchableOpacity>
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
export default changepassword;
