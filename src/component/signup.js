import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Picker, Alert, PermissionsAndroid, ScrollView } from 'react-native';
import { Header, Item, Input, List, ListItem, Container, Left, Body, Right, Toast } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5';
import fire, { database } from "../database/firebase";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import logo from '../../assets/pci.png';
import lg from '../../assets/p.png';
import ig from '../../assets/pi.png';
import wheel from '../../assets/wheel.png';
import ball from '../../assets/ball.png';
import degree from '../../assets/degree.png';
import AsyncStorage from '@react-native-community/async-storage';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from "@react-navigation/native";

export default function Signup({ navigation }) {

  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [UserLocation, setLocation] = useState();
  const [password, setPassword] = useState();
  const [profilePic, setImageUrl] = useState(null);
  const [UploadedImg, setUploadedUrl] = useState(null);
  const [AvailableImg, setAvailableImg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const isVisible = useIsFocused();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("LOCATION ====>", location)
      setLocation(location.coords);

      if (isVisible) {
        AuthUser();
      }
    })();
  }, [isVisible])

  function AuthUser() {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        fire.database().ref("users/" + user.uid).child("Interest").once("value").then(function (snapshot) {
          if (snapshot.exists()) {
            navigation.navigate("map");
          }
          else {
            navigation.navigate("chooseinterest");
          }
        })
      }
      else {

      }
    })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageUrl(result.uri);
      setAvailableImg(true)
    }
  };

  const uploadImage = async () => {
    // var _ = this;
    const response = await fetch(profilePic);
    const blob = await response.blob();
    var ref = fire.storage().ref("images").child(new Date().toDateString());
    ref.put(blob)
      .then((result) => {
        result.ref.getDownloadURL()
          .then((url) => {
            console.log(url);
            setUploadedUrl(url)
          })
      })
  }


  const UserSignup = async () => {
    if (username !== undefined && username !== "" && email !== undefined && email !== "" &&
      age !== undefined && age !== "" && password !== undefined && password !== "") {

      if (UserLocation !== undefined && UserLocation !== "") {
        await uploadImage()
        fire.auth().createUserWithEmailAndPassword(email, password)
          .then(res => {

            fire.database().ref("users/" + res.user.uid).set({
              uid: res.user.uid,
              name: username,
              email: email,
              age: age,
              Location: UserLocation,
              profilePic: UploadedImg,
            })
              .then(() => {
                res.user.updateProfile({
                  displayName: username,
                  photoURL: UploadedImg,
                })
                alert("User registered succesfully")
                // setdisplay("");
                setUserName("");
                setAge("");
                setEmail("");
                setPassword("");
                setErrorMsg("");
                navigation.navigate("chooseinterest");
              })
              .catch(error => alert(error.message));
          })
          .catch(error => alert(error.message));
      }
      else {
        let { status } = Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
      }
    }
    else {
      Toast.show({
        text: "Please fill all field's",
        buttonText: 'Okay',
      })
    }
  }

  return (
    <Container style={styles.container}>
      <Header style={{
        backgroundColor: '#fff', opacity: hp(6), width: '100%', elevation: 0,

        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
      }}>
        <Left style={{ flex: 1, }}>
        </Left>
        <Body style={{ justifyContent: 'center' }}>
          <Text style={{ justifyContent: 'center', fontWeight: 'bold', color: '#d2d170', fontSize: hp(3) }}>Social Circle</Text>
        </Body>
        <Right style={{ justifyContent: 'center' }}>

        </Right>

      </Header>
      <View style={{ borderWidth: 1, borderColor: '#b8bbbd', backgroundColor: '#fff', width: '30%', alignSelf: 'center', marginTop: hp(0.1) }}>
        <Text style={{ alignSelf: 'center', fontSize: hp(3), fontWeight: 'bold', paddingVertical: hp(0.5), color: '#d7cf44' }}>SignUp</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10, marginBottom: -20 }}>
          {AvailableImg ? <View style={{ alignItems: "center", padding: 10, borderRadius: 100, width: 100, height: 100, }}>
            <Image source={{ uri: profilePic }} style={{ width: 120, height: 120, borderRadius: 100 }} />
          </View> : <View style={{ borderRadius: 100, backgroundColor: 'white', width: 100, height: 100, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "white" }} ></View>}
        </View>

        <View style={{ marginTop: hp(5) }}>
          <Item style={{
            width: '70%', backgroundColor: '#fff', alignSelf: 'center', marginTop: hp(5),
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>

            <Input placeholder={"Name"} style={{ fontWeight: 'bold' }} underlineColorAndroid='transparent' placeholderTextColor='#d2d170'
              value={username}
              onChangeText={val => setUserName(val)}
              style={[styles.input]}
              autoCapitalize='none' autoCorrect={false} />

          </Item>
          <Item style={{
            width: '70%', backgroundColor: '#fff', borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10, alignSelf: 'center', marginTop: hp(1.5)
          }}>

            <Input placeholder={"Email"} style={{ fontWeight: 'bold' }} underlineColorAndroid='transparent' placeholderTextColor='#d2d170'
              style={[styles.input]}
              value={email}
              onChangeText={email => setEmail(email)}
              autoCapitalize='none' autoCorrect={false} />

          </Item>
          <Item style={{
            width: '70%', backgroundColor: '#fff', borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10, alignSelf: 'center', marginTop: hp(1.5)
          }}>

            <Input placeholder={"Age"} style={{ fontWeight: 'bold' }} underlineColorAndroid='transparent' placeholderTextColor='#d2d170'
              style={[styles.input]}
              value={age}
              onChangeText={age => setAge(age)}
              autoCapitalize='none' autoCorrect={false} />

          </Item>
          <Item style={{
            width: '70%', backgroundColor: '#fff', borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10, alignSelf: 'center', marginTop: hp(1.5)
          }}>

            <Input placeholder={"Password"} style={{ fontWeight: 'bold' }} underlineColorAndroid='transparent' placeholderTextColor='#d2d170'
              style={[styles.input]}
              value={password}
              onChangeText={password => setPassword(password)}
              autoCapitalize='none' autoCorrect={false} />

          </Item>

          <Item style={{
            width: '70%', backgroundColor: '#fff', borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10, alignSelf: 'center', marginTop: hp(1.5)
          }}>

          </Item>

          <View style={{ width: '60%', alignSelf: 'center', marginTop: hp(3), paddingVertical: hp(1), borderWidth: 1, borderRadius: 15, backgroundColor: '#09e1cc', borderColor: '#09e1cc' }}>
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => pickImage()}>
              <View style={{ borderWidth: 1, borderRadius: 15, backgroundColor: '#09e1cc', borderColor: '#09e1cc', width: '80%', alignSelf: 'center' }}>
                <Text style={{ fontSize: hp(2.2), color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Upload your Image</Text>
              </View>
              <View style={{ width: '15%', alignSelf: 'center' }}>
                <Icon name="camera" size={25} style={{ color: "#fff" }} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>

            <TouchableOpacity onPress={() => UserSignup()} block style={styles.submitBtn} style={{
              backgroundColor: '#09e1cc', width: '30%',
              borderWidth: 1,
              borderRadius: 10,
              borderColor: '#000',
              alignSelf: 'center', marginTop: hp(2)
            }}>
              <Text style={{ color: '#fff', alignSelf: 'center', paddingHorizontal: wp(3), paddingVertical: hp(1), fontSize: hp(2.4), fontWeight: 'bold' }}>
                Signup
            </Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </Container>
  );
}



// class signup extends Component {
//   constructor() {
//     super()

//     this.state = {
//       username: '',
//       userId: '',
//       email: '',
//       age: '',
//       password: '',
//       location: '',
//       latitude: '',
//       longitude: '',
//       error: null,
//       Address: '',
//       image: 'https://sezeromer.com/wp-content/uploads/2018/04/file-upload.png',
//       fcmToken: '',
//       imageUploading: false,
//       pid: '',
//       loading: false,

//     };

//   }



//   componentDidMount() {

//     // Geocoder.from(41.89, 12.49)
//     //     .then(json => {
//     //     		var addressComponent = json.results[0].address_components[0];
//     //         console.log(addressComponent);
//     //     })
//     //     .catch(error => console.warn(error));

//     // Geolocation.getCurrentPosition(

//     //               (location) => {

//     //                   this.setState({

//     //                       latitude: location.coords.latitude,

//     //                       longitude: location.coords.longitude,



//     //                   });

//     //                   Geocoder.from(location.coords.latitude, location.coords.longitude)


//     //                       .then(json => {

//     //                           console.log('=====',json.results[0].formatted_address,'======');


//     //   var addressComponent = json.results[0].address_components;

//     //                     this.setState({

//     //                              Address: json.results[0].formatted_address

//     //                           })

//     //                           console.log(addressComponent);

//     //                       })

//     //                       .catch(error => console.warn(error));

//     //               },


//     //               (error) => {

//     //                   // See error code charts below.

//     //                   this.setState({

//     //                           error: error.message

//     //                       }),

//     //                       console.log(error.code, error.message);
//     //                     },


//     //               {

//     //                   enableHighAccuracy: false,

//     //                   timeout: 10000,

//     //                   maximumAge: 100000

//     //               }

//     //           );
//   }




//   onButtonPressSignup = () => {
//     this.setState({ loading: true });
//     const { username, email, age, password, location, Address } = this.state;
//     if (username === '') {
//       this.setState({ loading: false });
//       Toast.show({
//         text: 'Please enter name',
//         buttonText: 'Okay',
//       });
//     } else if (email === '') {
//       this.setState({ loading: false });

//       Toast.show({
//         text: 'Please enter email',
//         buttonText: 'Okay',
//       });
//     } else if (age === '') {
//       this.setState({ loading: false });

//       Toast.show({
//         text: 'Please enter Age',
//         buttonText: 'Okay',
//       });
//     }
//     else if (password === '') {
//       this.setState({ loading: false });

// Toast.show({
//   text: 'Please enter password',
//   buttonText: 'Okay',
// });
//     }
//     else {
//       FireServices.signupUserToFirebase(email, password, response => {
//         if (response.isSuccess) {
//           this.setState({ loading: false });
//           let user = response.response;
//           console.log(user)
//           database()
//             .ref('/users/' + response.response.uid)
//             .set({
//               email: this.state.email,
//               password: password,
//               userName: username,
//               age: age,
//               location: Address,
//               uid: response.response.uid
//             })
//             .then(
//               () => {
//                 this.props.navigation.navigate('chooseinterest');

//                 this.setState({

//                   email: '', password: '', username: '', age: '', location: ''
//                 }, async () => {

//                   try {
//                     await AsyncStorage.setItem(
//                       '@userId', response.response.uid

//                     );
//                   } catch (error) {
//                     // Error saving data
//                   }
//                   try {
//                     await AsyncStorage.setItem(
//                       '@userName', response.response.userName
//                     );
//                   } catch (error) {
//                     // Error saving data
//                   }
//                   try {
//                     await AsyncStorage.setItem(
//                       '@userImage', 'https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg'
//                     );
//                   } catch (error) {
//                     // Error saving data
//                   }
//                   try {
//                     await AsyncStorage.setItem(
//                       '@userEmail', response.response.email
//                     );
//                   } catch (error) {
//                     // Error saving data
//                   }

//                 })

//               });


//         } else {
//           this.setState({ loading: false });
//           Alert.alert(response.error);
//         }
//       });
//     }
//   };
//   render() {
//     Location: { this.state.locationResult }
//     return (
//       <Container style={styles.container}>
//         <Header style={{
//           backgroundColor: '#fff', opacity: hp(6), width: '100%', elevation: 0,

//           borderBottomRightRadius: 30,
//           borderBottomLeftRadius: 30,
//         }}>
//           <Left style={{ flex: 1, }}>
//           </Left>
//           <Body style={{ justifyContent: 'center' }}>
//             <Text style={{ justifyContent: 'center', fontWeight: 'bold', color: '#d2d170', fontSize: hp(3) }}>Social Circle</Text>
//           </Body>
//           <Right style={{ justifyContent: 'center' }}>

//           </Right>

//         </Header>
//         <View style={{ borderWidth: 1, borderColor: '#b8bbbd', backgroundColor: '#fff', width: '30%', alignSelf: 'center', marginTop: hp(0.1) }}>
//           <Text style={{ alignSelf: 'center', fontSize: hp(3), fontWeight: 'bold', paddingVertical: hp(0.5), color: '#d7cf44' }}>SignUp</Text>
//         </View>
//         <View style={{ marginTop: hp(5) }}>
//           <Item style={{
//             width: '70%', backgroundColor: '#fff', alignSelf: 'center', marginTop: hp(5),
//             borderBottomRightRadius: 10,
//             borderBottomLeftRadius: 10,
//             borderTopLeftRadius: 10,
//             borderTopRightRadius: 10,
//           }}>

//             <Input placeholder={"Name"} style={{ fontWeight: 'bold' }} underlineColorAndroid='transparent' placeholderTextColor='#d2d170'
//               value={this.state.username} onChangeText={username => this.setState({ username })} style={[styles.input]}
//               autoCapitalize='none' autoCorrect={false} />


//           </Item>
//           <Item style={{
//             width: '70%', backgroundColor: '#fff', borderBottomRightRadius: 10,
//             borderBottomLeftRadius: 10,
//             borderTopLeftRadius: 10,
//             borderTopRightRadius: 10, alignSelf: 'center', marginTop: hp(1.5)
//           }}>

//             <Input placeholder={"Email"} style={{ fontWeight: 'bold' }} underlineColorAndroid='transparent' placeholderTextColor='#d2d170'
//               style={[styles.input]} value={this.state.email} onChangeText={email => this.setState({ email })} autoCapitalize='none' autoCorrect={false} />


//           </Item>
//           <Item style={{
//             width: '70%', backgroundColor: '#fff', borderBottomRightRadius: 10,
//             borderBottomLeftRadius: 10,
//             borderTopLeftRadius: 10,
//             borderTopRightRadius: 10, alignSelf: 'center', marginTop: hp(1.5)
//           }}>

//             <Input placeholder={"Age"} style={{ fontWeight: 'bold' }} underlineColorAndroid='transparent' placeholderTextColor='#d2d170'
//               style={[styles.input]} value={this.state.age} onChangeText={age => this.setState({ age })} autoCapitalize='none' autoCorrect={false} />


//           </Item>
//           <Item style={{
//             width: '70%', backgroundColor: '#fff', borderBottomRightRadius: 10,
//             borderBottomLeftRadius: 10,
//             borderTopLeftRadius: 10,
//             borderTopRightRadius: 10, alignSelf: 'center', marginTop: hp(1.5)
//           }}>

//             <Input placeholder={"Password"} style={{ fontWeight: 'bold' }} underlineColorAndroid='transparent' placeholderTextColor='#d2d170'
//               style={[styles.input]} value={this.state.password} onChangeText={password => this.setState({ password })} autoCapitalize='none' autoCorrect={false} />


//           </Item>

//           <Item style={{
//             width: '70%', backgroundColor: '#fff', borderBottomRightRadius: 10,
//             borderBottomLeftRadius: 10,
//             borderTopLeftRadius: 10,
//             borderTopRightRadius: 10, alignSelf: 'center', marginTop: hp(1.5)
//           }}>

//             <Input placeholder={"Location"} multiline={true} style={{ fontWeight: 'bold' }} underlineColorAndroid='transparent' placeholderTextColor='#d2d170'
//               style={[styles.locationInput]} value={this.state.Address} onChangeText={location => this.setState({ Address })} autoCapitalize='none' autoCorrect={false} />
//             <TouchableOpacity >
//               <Icon name={'location-arrow'}
//                 size={hp(3)} color={'#000'} style={[styles.iconEye]} />
//             </TouchableOpacity>


//           </Item>
//           <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
//             <TouchableOpacity onPress={() => this.onButtonPressSignup(this.state.Name, this.state.Password, this.state.Email, this.state.Age, this.state.Location)} block style={styles.submitBtn} style={{
//               backgroundColor: '#09e1cc', width: '30%',
//               borderWidth: 1,
//               borderRadius: 10,
//               borderColor: '#000',
//               alignSelf: 'center', marginTop: hp(2)
//             }}>
//               <Text style={{ color: '#fff', alignSelf: 'center', paddingHorizontal: wp(3), paddingVertical: hp(1), fontSize: hp(2.4), fontWeight: 'bold' }}>
//                 Signup
//                              </Text>
//             </TouchableOpacity>


//           </View>
//           <View style={{ width: '60%', alignSelf: 'center', marginTop: hp(3), paddingVertical: hp(1), borderWidth: 1, borderRadius: 15, backgroundColor: '#09e1cc', borderColor: '#09e1cc' }}>
//             <TouchableOpacity style={{ flexDirection: 'row' }}>
//               <View style={{ borderWidth: 1, borderRadius: 15, backgroundColor: '#09e1cc', borderColor: '#09e1cc', width: '80%', alignSelf: 'center' }}>
//                 <Text style={{ fontSize: hp(2.2), color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Upload your Image</Text>

//               </View>
//               <View style={{ width: '15%', alignSelf: 'center' }}>
//                 <Icon name="camera" size={25} style={{ color: "#fff" }} />
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Container>
//     );
//   }
// }
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
  locationInput: {
    fontSize: wp(4),
    marginHorizontal: hp(5),
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
// export default signup;