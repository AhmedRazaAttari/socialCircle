import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Animated, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { Header, Left, Right, Body, Input, Form } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GiftedChat } from 'react-native-gifted-chat';
//import firebaseSvc from './fbFunction';
/*import AsyncStorage from '@react-native-community/async-storage';*/
class chat extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
        messages: [],
        userFCM:this.props.navigation.getParam('fcmToken', 'null'),
       /* userImage:''*/
    }
}
/*    async componentDidMount(){ 
        this.setState({
            messages:[],
        })
        try {
            const image = await AsyncStorage.getItem('@userImage');
            if(image !==null) {

                this.setState({
                    userImage:image
                })
            }
        } catch(error) {

        }
        await firebaseSvc.refOn(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            })), this.props.navigation.getParam('chatName' , 'null')
            );
    }*/

    sendMessage(message)
    {
        const url = 'https://swoot.herokuapp.com/api/messaging';
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body:JSON.stringify({
                message:message[0].text ,
                name: this.props.navigation.getParam('uName','null'),
                fcm:this.state.userFCM,
                /*userImage: this.state.userImage*/
            }),
        })

        .then(res => res.json())
        .then(res => {
            if (res.success) {

            }
        })
        .catch(error => {
            console.log(error)
        });
    }


    onSend(messages = []) {
        
        console.log(messages,messages.length)
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    render (){
    return(
        
        <View style={style.container}>
            <ScrollView>
              <Header style={style.header}>
                  <Left style={{flex:1}}>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('map')}style={{marginLeft:wp(2)}}>
                       <Icon name="angle-left" size={30}/>
                       </TouchableOpacity>
                  </Left>
                    <Body style={style.body}>
                        <Text style={style.text1}>Social Circle</Text>
                    </Body>
                    <Right style={{flex:1}}>

                    </Right>
              </Header>
              <View style={style.view1}>
              <Icon name="user-alt" size={30} color="#000" style={style.userAlt} onPress={()=> this.props.navigation.navigate('profile')}/>
              <TouchableOpacity style={style.o1} onPress={()=> this.props.navigation.navigate('publicprofile')}>
                  <Text style={style.text2}>Millers</Text>
                  <Text style={style.text3}>Active Now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.o2} onPress={() => this.props.navigation.navigate('meetupdetails')}>
                  <Text style={style.text4}>Select</Text>
              </TouchableOpacity>
              </View>
    <View style={style.view0}>
        <View style={style.mainView}>
            <View style={style.view2}>
                <View style={style.view2_1} onPress={()=> this.props.navigation.navigate('publicprofile')}>
                    <Icon name="user-friends" size={30} color="#000" style={style.user1} />
                    <Text style={style.text5}>Millers</Text>
                </View>
            </View>
            <View style={style.view2}>
                <View style={style.view2_1}>
                    <Icon name="user-friends" size={30} color="#000" style={style.user1} />
                    <Text style={style.text5}>FC CAPS</Text>
                </View>
            </View>
            <View style={style.view2}>
                <View style={style.view2_1}>
                    <Icon name="user-tie" size={30} color="#000" style={style.user1} />
                    <Text style={style.text5}>Rocky</Text>
                </View>
            </View>
            <View style={style.view2}>
                <View style={style.view2_1}>
                    <Icon name="user" size={30} color="#000" style={style.user1} />
                    <Text style={style.text5}>FC CAPS</Text>
                </View>
            </View>
            <View style={style.view2}>
                <View style={style.view2_1}>
                    <Icon name="user-tie" size={30} color="#000" style={style.user1} />
                    <Text style={style.text5}>FC CAPS</Text>
                </View>
            </View>
            <View style={style.view2}>
                <View style={style.view2_1}>
                    <Icon name="user" size={30} color="#000" style={style.user1} />
                    <Text style={style.text5}>FC CAPS</Text>
                </View>
            </View>
            <View style={style.view2}>
                <View style={style.view2_1}>
                    <Icon name="user" size={30} color="#000" style={style.user1} />
                    <Text style={style.text5}>FC CAPS</Text>
                </View>
            </View>
            <View style={style.view2}>
                <View style={style.view2_1}>
                    <Icon name="user" size={30} color="#000" style={style.user1} />
                    <Text style={style.text5}>FC CAPS</Text>
                </View>
            </View>
            <View style={style.view2}>
                <View style={style.view2_1}>
                    <Icon name="user-friends" size={30} color="#000" style={style.user1} />
                    <Text style={style.text5}>FC CAPS</Text>
                </View>
            </View>
        </View>


    <View style={style.viewa}>
        <ScrollView>
        <View style={style.viewaa}>
            <View style={style.viewab}>
                <Text style={style.text6}>Hi!</Text>
                <Icon name="user" size={30} color="#000" style={style.icona} />
            </View>
            <Text style={style.text7}>7:00am</Text>
        </View>
        <View style={style.viewaa}>
            <View style={style.viewab}>
                <Icon name="user" size={30} color="#000" style={style.icona} />
                 <Text style={style.text6}>How are you?</Text>
               
            </View>
           
        </View>
        <View style={style.viewaa}>
            <View style={style.viewab}>
                <Text style={style.text6}>Lets go fishing</Text>
                <Icon name="user" size={30} color="#000" style={style.icona} />
            </View>
            <Text style={style.text6}>Today</Text>
        </View>
        <View style={style.viewaa}>
            <View style={style.viewab}>
                 <Icon name="user" size={30} color="#000" style={style.icona} />
                 <Text style={style.text6}>Any time</Text>
            </View>
        </View>

        <View style={style.viewaa}>
            <View style={style.viewab}>
                <Icon name="user" size={30} color="#000" style={style.icona} />
                 <Text style={style.text6}>How are you?</Text>
               
            </View>
           
        </View>
        <View style={style.viewaa}>
            <View style={style.viewab}>
                <Text style={style.text6}>Lets go fishing</Text>
                <Icon name="user" size={30} color="#000" style={style.icona} />
            </View>
            <Text style={style.text6}>Today</Text>
        </View>
        <View style={style.viewaa}>
            <View style={style.viewab}>
                 <Icon name="user" size={30} color="#000" style={style.icona} />
                 <Text style={style.text6}>Any time</Text>
            </View>
        </View>
        </ScrollView>
       {/* <View style={style.viewb}>
        <Text style={style.text8}>To change meeting time click on</Text>
        <TouchableOpacity>
        <Text style={style.text9}>VOTE NOW</Text>
        </TouchableOpacity>
        </View> */}

        </View> 
        
    </View>
    <View style={style.viewc}>
        <View style={style.viewca}>
            <TouchableOpacity>
             <Icon name="smile" size={30} color="#000" style={style.iconb} />
             </TouchableOpacity>
        </View>
       <View style={style.viewcb}>
       <Input placeholder="typing..." placeholderTextColor="#000"/>
        </View>
      
        <TouchableOpacity>
        <Icon name="paper-plane" size={30} color="#000" style={style.icon} />
        </TouchableOpacity>
    </View>
            </ScrollView>
        
         <View>
           <GiftedChat 
            messages={this.state.messages}
            onSend={(message) => {
                this.sendMessage(message); 

                firebaseSvc.send(message,this.props.navigation.getParam('chatName','null'))
            }}
            scrollToBottom
            renderAvatarOnTop
            user={{
                _id: this.props.navigation.getparam('uid','null'),
                name: this.props.navigation.getParam('uName','null'),
            }}
            />
        </View>

        </View>
    );
  }
}
const style = StyleSheet.create({
    icon:{
        paddingHorizontal: wp(2),
        marginTop: hp(1.5)
   
    },
    viewcb:{
        backgroundColor: '#fff',
        width: '60%',
        borderWidth: wp(0.25),
        paddingHorizontal: wp(5),
        marginHorizontal: wp(3),
        borderColor: '#43e9da',
    },
    viewc:{
        paddingVertical: hp(1),
        paddingHorizontal: wp(2),
        backgroundColor: '#c3f0eb',
        flexDirection: "row"
    },
    viewca:{
        width: '10%',
        borderColor: '#c5d352',
        alignSelf:'center',
        
    },
    iconb:{
        //borderRadius: wp(9),
        //borderWidth: wp(1),
        width: '100%',
        
    },
    text9:{
       color: '#b46e69',
       paddingHorizontal: wp(1)
    },
    viewb:{
     //   paddingHorizontal: wp(5),
        flexDirection: "row",
        alignItems: "center"
    },
    text8:{
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
    icona:{
        
    },
    text7:{
        backgroundColor: '#fff',
        width: '70%',
        textAlign: "center"
    },
    text6:{
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
export default chat;