import React,{useState,Component} from 'react';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import  {View,Text,SafeAreaView,StyleSheet,Image,TouchableOpacity,FlatList,ScrollView} from 'react-native';
import { Left,Header,Body,Right, Form,Item,Input, Button, ListItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
// import SwitchSelector from 'react-native-switch-selector';
//import CalendarPicker from 'react-native-calendar-picker';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
//import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import brown from '../../assets/brown.png';
import logo from '../../assets/loginPage.png';
const options = [
  { label: 'Accept', value: '1' },
  { label: 'Reject', value: '1.5' },
 
];

class meetupdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      des: '',
      address: '',
      isDatePickerVisible: false,
      date: '',
      isTimePicker: false,
      time: '',
      AppID: 'e0e258354c38433ab0ad5fca3b1d6860',
      ChannelName: '',
      loading: false,
    };
  }
  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };
  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };
  handleConfirm = date => {
    this.setState({date: date.toString().substring(0, 15)});
    this.hideDatePicker();
  };

  ///////////
  showTimePicker = () => {
    this.setState({isTimePicker: true});
  };
  hideTimePicker = () => {
    this.setState({isTimePicker: false});
  };
  handleConfirmTime = date => {
    console.log('time', date.toString().substring(15, 21));
    this.setState({time: date.toString().substring(15, 21)});
    this.hideDatePicker();
  };

    
    render (){
         

        return(
        <SafeAreaView style={style.container}>
        <Header style={{backgroundColor:'#fff',borderWidth:1,borderRadius:25,borderColor:'#98bd64',borderBottomWidth:1,borderBottomColor:'#98bd64',marginTop:hp(1),}}>
     <Left style={{flex:1}}>
     </Left>
   <Body style={{flex:0}}>
   <Text style={{fontSize:hp(5),fontWeight:'bold',color:'#d2d170'}}>Social Circle</Text>
   </Body>
   <Right style={{flex:1}}>
   </Right>
 </Header>
 <View style={style.mainView}>
  <View style={{width:'80%',marginTop:hp(4),paddingVertical:hp(1.5),alignSelf:'center',borderWidth:1,borderColor:'#b0d37b',borderRadius:15,backgroundColor:'#fff'}}>
      <Text style={{fontSize:hp(3.3),color:'#7c7b74',alignSelf:'center'}}>Meet Up Details</Text>
  </View>
  <View style={{marginTop:hp(5)}}>
      <Form>
      <Item style={{paddingVertical: hp(1), width:'70%',marginTop:hp(2),alignSelf:'center',borderRadius:15,backgroundColor:'#fff',borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderBottomWidth:1,borderColor:'#bac858'}}>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('getdirections')}>
          <Text  style={{marginLeft:wp(3),fontWeight:'bold'}}>Venue</Text>
        </TouchableOpacity>
          
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('getdirections')}>
              <Icon name={'map-marker'} size={30} color={'#000'} style={{marginLeft: wp(45)}} />
              </TouchableOpacity>
           </Item>

          <Item style={{width:'70%',paddingVertical: hp(1.5),marginTop:hp(2),alignSelf:'center',borderRadius:15,backgroundColor:'#fff',borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderBottomWidth:1,borderColor:'#bac858'}}>
          <Text
                style={{
                  backgroundColor: '#fff',
                  marginLeft:wp(3),
                  fontWeight:'bold',
                  marginRight: wp(10),
                }}
                onPress={this.showDatePicker}>
                <Text >Select Date</Text>
              </Text>
              <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="date"
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
              />
              <Text>{this.state.date}</Text>
          </Item>
          <Item style={{paddingVertical: hp(1.5),width:'70%',marginTop:hp(2),alignSelf:'center',borderRadius:15,backgroundColor:'#fff',borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderBottomWidth:1,borderColor:'#bac858'}}>
          <Text
                style={{
                  backgroundColor: '#fff',
                  marginLeft:wp(3),
                  fontWeight:'bold',
                  marginRight: wp(10),
                }}
                onPress={this.showTimePicker}>
                <Text>Select time</Text>
              </Text>
              <DateTimePickerModal
                isVisible={this.state.isTimePicker}
                mode="time"
                onConfirm={this.handleConfirmTime}
                onCancel={this.hideTimePicker}
              />
              <Text>{this.state.time}</Text>
            
          </Item>
     
      </Form>
      <View style={{borderWidth:1,borderColor:'#bfcc73',backgroundColor:'#07e2cc',width:'55%',borderRadius:12,paddingVertical:hp(0.7),alignSelf:'center',marginTop:hp(5)}}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('profile')}>
              <Text style={{fontSize:hp(3),fontWeight:'bold',color:'#ecfdfc',alignSelf:'center'}}>Save Changes </Text>
          </TouchableOpacity>
      </View>
      <SwitchSelector style={style.selector} options={options} initial={0} onPress={value => console.log(`Call onPress with value: ${value}`)} />
 
  </View>

  <View style={{marginTop: hp(10),width:'42%',borderWidth:2,borderRadius:10,marginHorizontal:wp(4),paddingHorizontal:wp(1),paddingVertical:hp(0.5),backgroundColor:'#fff',borderBottomWidth:2.3,borderColor:'#7fddd3'}}>
   <TouchableOpacity onPress={()=> this.props.navigation.navigate('getdirections')}> 
     <Text style={{fontSize:hp(3),alignSelf:'center',fontWeight:'bold',color:'#d3d842'}}>Get Directions</Text>
     </TouchableOpacity> 
   </View>
 </View>
   </SafeAreaView>
    );
  }
}
const style = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor:'#86e1d8',
    },
    calender:
    {
       alignSelf: 'center',
       alignContent: 'center'
    },
    selector:
    {
      marginTop: hp(4),
      width: '60%',
      alignSelf: 'center'
    },
});
export default meetupdetails;
