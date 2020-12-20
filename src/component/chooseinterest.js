import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Picker, Alert, ScrollView, ImageBackground, StatusBar } from 'react-native';
import { Header, Item, Input, List, ListItem, Container, Left, Body, Right, Toast } from 'native-base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import fire, { database } from "../database/firebase";
import { useIsFocused } from "@react-navigation/native";


export default function chooseinterest({ navigation }) {

  const [sports, setSports] = useState("")
  const [photography, setPhotography] = useState("")
  const [walk, setWalk] = useState("")
  const [brands, setBrand] = useState("")
  const [vichecles, setVichecles] = useState("")
  const [books, setBooks] = useState("")

  const [InterestList, setInterestList] = useState([])
  const isVisible = useIsFocused();

  useEffect(() => {
    if (isVisible) {
      AuthUser();
    }
  }, [isVisible])

  function AuthUser() {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        fire.database().ref("users/" + user.uid).child("Interest").once("value").then(function (snapshot) {
          if (snapshot.exists()) {
            navigation.navigate("map");
          }
          else {
            // navigation.navigate("chooseinterest");
          }
        })
      }
      else {

      }
    })
  }

  function onSubmit() {
    if (sports !== undefined && sports !== "" && photography !== undefined && photography !== "" && walk !== undefined && walk !== "" &&
      brands !== undefined && brands !== "" && vichecles !== undefined && vichecles !== "" && books !== undefined && books !== "") {
      var Userid = fire.auth().currentUser.uid;
      setInterestList(InterestList.push(sports, photography, walk, brands, vichecles, books))
      console.log("InterestList ***", InterestList)
      fire.database().ref("users/" + Userid).child("Interest").set(InterestList).then(() => {
        navigation.navigate("map")
      })
    }
    else {
      Alert.alert("Please select all categories")
    }
  }


  return (
    <Container style={styles.container}>
      <StatusBar backgroundColor="white" />
      <View style={{ padding: 20 }}>
        <Text style={{ justifyContent: 'center', fontWeight: 'bold', fontSize: hp(4) }}>Choose your Interest</Text>
      </View>

      <View style={{ padding: 10, alignItems: "center" }}>
        <Text style={{ fontSize: 16, textAlign: "center" }}>Click a few things you like so we can suggest peoples to follow</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
          <View style={{ flexDirection: "column", width: 110, height: 120, justifyContent: "center" }}>
            <Icon name="tennis" size={44} style={{ marginRight: 40 }} />
            <Picker
              style={{ height: 50, color: "black" }}
              selectedValue={sports}
              onValueChange={(itemValue) => setSports(itemValue)}
            >
              <Picker.Item label="Sports" color="#ff0000" />
              <Picker.Item label="Soccer" value="soccer" />
              <Picker.Item label="Football" value="football" />
              <Picker.Item label="Volleyball" value="volleyball" />
              <Picker.Item label="Tennis" value="tennis" />
              <Picker.Item label="Archery" value="archery" />
              <Picker.Item label="Badminton" value="badminton" />
              <Picker.Item label="Cricket" value="cricket" />
              <Picker.Item label="Bowling" value="bowling" />
              <Picker.Item label="Hockey" value="hockey" />
              <Picker.Item label="Baseball" value="baseball" />
            </Picker>
          </View>

          <View style={{ flexDirection: "column", width: 110, height: 120, justifyContent: "center" }}>
            <Icon name="camera" size={44} style={{ marginLeft: 20 }} />
            <Picker
              style={{ height: 50, color: "black" }}
              selectedValue={photography}
              onValueChange={(itemValue) => setPhotography(itemValue)}
            >
              <Picker.Item label="Photography" color="#ff0000" />
              <Picker.Item label="Restaurant experience" value="restaurant" />
              <Picker.Item label="Sightseeing" value="sightseeing" />
              <Picker.Item label="Pub Crawl" value="pubcrawl" />
            </Picker>
          </View>

          <View style={{ flexDirection: "column", width: 110, height: 120, justifyContent: "center" }}>
            <Icon name="walk" size={44} style={{ marginLeft: 20 }} />
            <Picker
              style={{ height: 50, color: "black" }}
              selectedValue={walk}
              onValueChange={(itemValue) => setWalk(itemValue)}

            >
              <Picker.Item label="Walk" color="#ff0000" />
              <Picker.Item label="Running" value="running" />
              <Picker.Item label="Dance" value="dance" />
              <Picker.Item label="Swimming" value="swimming" />
              <Picker.Item label="Jogging" value="jogging" />
            </Picker>
          </View>

          <View style={{ flexDirection: "column", width: 110, height: 120, justifyContent: "center" }}>
            <Icon name="football" size={44} style={{ marginLeft: 20 }} />
            <Picker
              style={{ height: 50, color: "black" }}
              selectedValue={brands}
              onValueChange={(itemValue) => setBrand(itemValue)}
            >
              <Picker.Item label="Brands" color="#ff0000" />
              <Picker.Item label="Armani" value="armani" />
              <Picker.Item label="Adidas" value="adidas" />
              <Picker.Item label="Gucci" value="gucci" />
            </Picker>
          </View>

          <View style={{ flexDirection: "column", width: 110, height: 120, justifyContent: "center" }}>
            <Icon name="ship-wheel" size={44} style={{ marginLeft: 20 }} />
            <Picker
              style={{ height: 50, color: "black" }}
              selectedValue={vichecles}
              onValueChange={(itemValue) => setVichecles(itemValue)}
            >
              <Picker.Item label="Vichecles" color="#ff0000" />
              <Picker.Item label="Beach Tour" value="beachtour" />
              <Picker.Item label="Fishing" value="fishing" />
            </Picker>
          </View>

          <View style={{ flexDirection: "column", width: 110, height: 120, justifyContent: "center" }}>
            <Icon name="book-open-variant" size={44} style={{ marginLeft: 20 }} />
            <Picker
              style={{ height: 50, color: "black" }}
              selectedValue={books}
              onValueChange={(itemValue) => setBooks(itemValue)}
            >
              <Picker.Item label="Books" color="#ff0000" />
              <Picker.Item label="Chess" value="chess" />
              <Picker.Item label="Reading" value="reading" />
            </Picker>
          </View>

        </View>

        <View style={{ height: 40, backgroundColor: 'skyblue', width: '55%', borderRadius: 12, paddingVertical: hp(0.7), alignSelf: 'center', marginTop: hp(5) }}>
          <TouchableOpacity onPress={() => onSubmit()}>
            <Text style={{ fontSize: hp(3), fontWeight: 'bold', color: '#ecfdfc', alignSelf: 'center' }}>Save Changes</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>



    </Container >
  );

}



const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#86e1d8',
    flex: 1,
    width: '100%',

  },

  header: {
    backgroundColor: '#000'
  },
  mainView: {
    // backgroundColor: '#37f093',
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