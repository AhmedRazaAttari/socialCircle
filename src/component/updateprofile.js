import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Picker, Alert, AsyncStorage } from 'react-native';
import { Header, Item, Input, List, ListItem, Container, Left, Body, Right, Toast } from 'native-base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import UUIDGenerator from 'react-native-uuid-generator';
// import Geocoder from 'react-native-geocoding';
// import Geolocation from 'react-native-geolocation-service';  

// import FireServices from '../Firebase/FireServices';
// import database from '@react-native-firebase/database'; 
import camera from '../../assets/pi.png';
class updateprofile extends Component {
  constructor() {
    super()

  };


  show = (value) => {
    alert(value);
    this.setState({ brands: value });
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
            <TouchableOpacity onPress={() => this.props.navigation.navigate('profile')} style={{}}>
              <Icon name={'arrow-left'} size={hp(3)} color={'#000'} style={{ marginBottom: hp(0.5) }} />
            </TouchableOpacity>

          </Left>
          <Body style={{ justifyContent: 'center' }}>
            <Text style={{ justifyContent: 'center', fontWeight: 'bold', color: '#d2d170', fontSize: hp(3) }}>Social Circle</Text>
          </Body>
          <Right style={{ justifyContent: 'center' }}>

          </Right>

        </Header>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={{ width: '33%', borderWidth: 2, borderRadius: 10, backgroundColor: '#fff', borderBottomWidth: 2.3, paddingVertical: hp(1), borderColor: '#7fddd3' }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('profile')}>
              <Text style={{ fontSize: hp(3), alignSelf: 'center', fontWeight: 'bold', color: '#d3d842' }}>Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '33%', borderWidth: 2, borderRadius: 10, paddingVertical: hp(1), backgroundColor: '#fff', borderBottomWidth: 2.3, borderColor: '#7fddd3' }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('map')}>
              <Text style={{ fontSize: hp(3), alignSelf: 'center', fontWeight: 'bold', color: '#d3d842' }}>Find Circle</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '33%', borderWidth: 2, borderRadius: 10, paddingVertical: hp(1), backgroundColor: '#fff', borderBottomWidth: 2.3, borderColor: '#7fddd3' }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('chat')}>
              <Text style={{ fontSize: hp(3), alignSelf: 'center', fontWeight: 'bold', color: '#d3d842' }}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: hp(2) }}>
          <View style={{ paddingHorizontal: wp(10), marginTop: hp(8) }}>
            <Icon name="tennis" size={40} />
            <Picker selectedValue={this.state.brands}
              onValueChange={this.show.bind()}>
              <Picker.Item label="Armani" value="armani" />
              <Picker.Item label="Adidas" value="adidas" />
              <Picker.Item label="Gucci" value="gucci" />
            </Picker>
          </View>
          <View style={{ marginTop: hp(4) }}>
            <Icon name="camera" size={50} />
            <Picker selectedValue={this.state.brands}
              onValueChange={this.show.bind()}>
              <Picker.Item label="Armani" value="armani" />
              <Picker.Item label="Adidas" value="adidas" />
              <Picker.Item label="Gucci" value="gucci" />
              <Picker.Item label="Cat" value="Cat" />
              <Picker.Item label="J." value="J." />
              <Picker.Item label="Nike" value="Nike" />
              <Picker.Item label="Samsung" value="Samsung" />
              <Picker.Item label="Apple" value="Apple" />
            </Picker>
          </View>
          <View style={{ marginTop: hp(8), paddingHorizontal: wp(10) }}>
            <Icon name="walk" size={40} />
            <Picker selectedValue={this.state.brands}
              onValueChange={this.show.bind()}>
              <Picker.Item label="Armani" value="armani" />
              <Picker.Item label="Adidas" value="adidas" />
              <Picker.Item label="Gucci" value="gucci" />
            </Picker>
          </View>
        </View>

        <View
          style={{ flexDirection: 'row', alignSelf: 'center', marginTop: hp(2) }}>
          <View style={{ paddingHorizontal: wp(12) }}>
            <Icon name="football" size={40} />
            <Picker selectedValue={this.state.brands}
              onValueChange={this.show.bind()}>
              <Picker.Item label="Armani" value="armani" />
              <Picker.Item label="Adidas" value="adidas" />
              <Picker.Item label="Gucci" value="gucci" />
            </Picker>
          </View>
          <View style={{ paddingHorizontal: wp(2), marginTop: hp(3) }}>
            <Icon name="ship-wheel" size={40} />
            <Picker selectedValue={this.state.brands}
              onValueChange={this.show.bind()}>
              <Picker.Item label="Armani" value="armani" />
              <Picker.Item label="Adidas" value="adidas" />
              <Picker.Item label="Gucci" value="gucci" />
            </Picker>
          </View>
          <View style={{ paddingHorizontal: wp(12) }}>
            <Icon name="book-open-variant" size={40} />
            <Picker selectedValue={this.state.brands}
              onValueChange={this.show.bind()}>
              <Picker.Item label="Armani" value="armani" />
              <Picker.Item label="Adidas" value="adidas" />
              <Picker.Item label="Gucci" value="gucci" />
            </Picker>
          </View>

        </View>
        <View>
          <Item style={{
            width: '50%', backgroundColor: '#fff', alignSelf: 'center', marginTop: hp(5),
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>

            <Input placeholder={"Name"} style={{ fontWeight: 'bold' }} underlineColorAndroid='transparent' placeholderTextColor='#d2d170'

              autoCapitalize='none' autoCorrect={false} />


          </Item>

          <Item style={{
            width: '50%', backgroundColor: '#fff', borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10, alignSelf: 'center', marginTop: hp(1.5)
          }}>

            <Input placeholder={"Age"} style={{ fontWeight: 'bold' }} underlineColorAndroid='transparent' placeholderTextColor='#d2d170'
              autoCapitalize='none' autoCorrect={false} />


          </Item>
          <Item style={{
            width: '50%', backgroundColor: '#fff', borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10, alignSelf: 'center', marginTop: hp(1.5)
          }}>

            <Input placeholder={"Location"} style={{ fontWeight: 'bold' }} underlineColorAndroid='transparent' placeholderTextColor='#d2d170'
              autoCapitalize='none' autoCorrect={false} />
            <TouchableOpacity>
              <Icon name={'map-marker'}
                size={30} color={'#000'} style={[styles.iconEye]} />
            </TouchableOpacity>

          </Item>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('profile')} style={{
              backgroundColor: '#09e1cc', width: '40%',
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderWidth: 1,
              borderRadius: 1,
              borderColor: '#000',
              alignSelf: 'center', marginTop: hp(2)
            }}>
              <Text style={{ color: '#fff', alignSelf: 'center', paddingVertical: hp(1), paddingHorizontal: wp(1), fontSize: hp(2.5), fontWeight: 'bold' }}>
                Save Changes
                             </Text>
            </TouchableOpacity>
          </View>
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
    paddingVertical: hp(0.5),

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
    borderRadius: 8,
    marginLeft: 0
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
    right: wp(3)
  },
  main: {
    marginLeft: hp(25),
    borderBottomColor: 'grey',
    width: '60%',
    backgroundColor: '#fff',
    marginTop: hp(2)
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
  con: {
    color: '#000'
  },
});
export default updateprofile;