import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList,Picker, Alert, AsyncStorage } from 'react-native';
import { Header, Item, Input, List, ListItem, Container, Left, Body, Right, Toast } from 'native-base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import camera from '../../assets/pi.png';
class publicprofile extends Component {
  constructor() {
    super()
    this.state = {
    };

  }
  componentDidMount() {

  };
  render() {
    return (
      <Container style={styles.container}>
        <Header style={{
          backgroundColor: '#fff', opacity: hp(6), width: '100%', elevation: 0,
      
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
        }}>
          <Left style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('profile')} style={{ }}>
              <Icon name={'arrow-left'} size={hp(3)} color={'#000'} style={{marginBottom:hp(0.5)}} />
            </TouchableOpacity>
            
          </Left>
          <Body style={{justifyContent:'center'}}>
             <Text style={{justifyContent:'center',fontWeight:'bold',color:'#d2d170',fontSize:hp(3)}}>Social Circle</Text>
          </Body>
          <Right style={{justifyContent:'center'}}>

          </Right>
         
        </Header>
        <View style={{flexDirection:'row',width:'100%'}}>
            <View style={{width:'33%',borderWidth:2,borderRadius:10,backgroundColor:'#fff',borderBottomWidth:2.3,paddingVertical:hp(1),borderColor:'#7fddd3'}}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('profile')}>
                <Text style={{fontSize:hp(3),alignSelf:'center',fontWeight:'bold',color:'#d3d842'}}>Profile</Text>
              </TouchableOpacity>
            </View>
            <View style={{width:'33%',borderWidth:2,borderRadius:10,paddingVertical:hp(1),backgroundColor:'#fff',borderBottomWidth:2.3,borderColor:'#7fddd3'}}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('map')}>
                <Text style={{fontSize:hp(3),alignSelf:'center',fontWeight:'bold',color:'#d3d842'}}>Find Circle</Text>
              </TouchableOpacity>
            </View>
            <View style={{width:'33%',borderWidth:2,borderRadius:10,paddingVertical:hp(1),backgroundColor:'#fff',borderBottomWidth:2.3,borderColor:'#7fddd3'}}>
              <TouchableOpacity  onPress={()=>this.props.navigation.navigate('chat')}>
                <Text style={{fontSize:hp(3),alignSelf:'center',fontWeight:'bold',color:'#d3d842'}}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        <View style={{flexDirection:'row',alignSelf:'center',marginTop:hp(2)}}>
          <View style={{paddingHorizontal:wp(10),marginTop:hp(8)}}>    
              <Icon name="tennis" size={40}  /> 
                <Picker selectedValue={this.state.brands} 
                        onValueChange={(itemValue, itemIndex) => this.setState({ brands: itemValue })}>
                        <Picker.Item label="Soccer" value="soccer" />
                        <Picker.Item label="Football" value="football" />
                        <Picker.Item label="Volleyball" value="volleyball" />
                        <Picker.Item label="Tennis" value="tennis" />
                        <Picker.Item label="Basketball" value="basketball" />
                    </Picker>   
        </View>
        <View style={{marginTop:hp(4)}}>
        <Icon name="camera" size={50} />
        <Picker selectedValue={this.state.brands}
                        onValueChange={(itemValue, itemIndex) => this.setState({ brands: itemValue })}>
                         <Picker.Item label="Restaurant experience" value="restaurant" />
                        <Picker.Item label="Sightseeing" value="sightseeing" />
                        <Picker.Item label="Pub Crawl" value="pubcrawl" />
                    </Picker>
        </View>
        <View style={{marginTop:hp(8),paddingHorizontal:wp(10)}}>
        <Icon name="walk"size={40} />
        <Picker selectedValue={this.state.brands} 
                        onValueChange={(itemValue, itemIndex) => this.setState({ brands: itemValue })}>
                     <Picker.Item label="Running" value="running" />
                        <Picker.Item label="Dance" value="dance" />
                        <Picker.Item label="Swimming" value="swimming" />
                    </Picker>
                    </View>
        </View>
        
        <View
        style={{flexDirection:'row',alignSelf:'center',marginTop:hp(2)}}>
         <View style={{paddingHorizontal:wp(12)}}>
        <Icon name="football" size={40} />
        <Picker selectedValue={this.state.brands} 
                        onValueChange={(itemValue, itemIndex) => this.setState({ brands: itemValue })}>
                        <Picker.Item label="Armani" value="armani" />
                        <Picker.Item label="Adidas" value="adidas" />
                        <Picker.Item label="Gucci" value="gucci" />
                    </Picker>
        </View>
        <View style={{paddingHorizontal:wp(2),marginTop:hp(3)}}>
        <Icon name="ship-wheel" size={40}  />
        <Picker selectedValue={this.state.brands} 
                        onValueChange={(itemValue, itemIndex) => this.setState({ brands: itemValue })}>
                    <Picker.Item label="Beach Tour" value="beachtour" />
                        <Picker.Item label="Fishing" value="fishing"/>
                  
                    </Picker>
        </View>
        <View  style={{paddingHorizontal:wp(12)}}>
        <Icon name="book-open-variant" size={40} />
        <Picker selectedValue={this.state.brands} 
                        onValueChange={(itemValue, itemIndex) => this.setState({ brands: itemValue })}>
                           <Picker.Item label="Chess" value="chess" />
                        <Picker.Item label="Reading" value="reading" />
                    </Picker>
        </View>

        </View>
        <View>
        <Item style={{paddingVertical: hp(1), width:'70%',marginTop:hp(2),alignSelf:'center',borderRadius:15,backgroundColor:'#fff',borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderBottomWidth:1,borderColor:'#bac858'}}>
   
          <Text  style={{marginLeft:wp(3),fontWeight:'bold'}}>MillersSantiago42</Text>
        
          
           </Item>
    
           <Item style={{paddingVertical: hp(1), width:'70%',marginTop:hp(2),alignSelf:'center',borderRadius:15,backgroundColor:'#fff',borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderBottomWidth:1,borderColor:'#bac858'}}>
       
          <Text  style={{marginLeft:wp(3),fontWeight:'bold'}}>19</Text>
       
          
           </Item>
           <Item style={{paddingVertical: hp(1), width:'70%',marginTop:hp(2),alignSelf:'center',borderRadius:15,backgroundColor:'#fff',borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderBottomWidth:1,borderColor:'#bac858'}}>
        <TouchableOpacity >
          <Text  style={{marginLeft:wp(3),fontWeight:'bold'}}>14th st, Colorado</Text>
        </TouchableOpacity>
          
           </Item>
               
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#86e1d8',
    flex: 1,
    width: '100%',

  },
  
  header: {
    backgroundColor: '#000'
  },
  mainView: {
    backgroundColor: '#37f093',
    width: '60%',
    marginTop: hp(25),
    paddingVertical:hp(0.5),
    
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  formItems: {
    marginTop: hp(1.5),
    alignItems: 'center',
    color: 'grey',
    width: '100%',
    height: hp(6.5),
    backgroundColor: 'rgba(27,113,165,0.4)',
    borderColor: 'transparent',
    borderRadius:8,
    marginLeft:0
  },
  input: {
    fontSize: wp(4),
    marginHorizontal: hp(5),
    height: hp(6.5),
    color: '#000',
},
icon: {
  
},
iconEye: {
    position: 'relative',
    right:wp(3)
},
  main:{
     marginLeft:hp(25),
     borderBottomColor:'grey',
     width:'60%',
     backgroundColor:'#fff',
     marginTop:hp(2)
  },
  subView: {
    //backgroundColor:'#000'
    flexDirection: 'row',
  },
  vie: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: '100%',
    alignContent: 'center',
    
    //justifyContent:'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    marginTop: hp(3)

  },
  con:{
   color:'#000'
  },
});
export default publicprofile;