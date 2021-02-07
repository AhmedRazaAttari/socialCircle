import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, TextInput, Modal, Keyboard, ScrollView, FlatList, StyleSheet, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign, EvilIcons, Feather, Entypo } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


class CustomTextBox extends Component {
    render() {
        return (
            <TextInput
                style={{
                    width: this.props.Width,
                    height: this.props.Height,
                    fontSize: 19,
                    color: "black",
                    marginLeft: 30
                }}
                value={this.props.SearchBarTxtVal}
                onChangeText={this.props.ONChangeText}
                placeholderTextColor={this.props.PlaceholderColor}
                placeholder={this.props.Value}
                onFocus={this.props.ONFocus}
                onBlur={this.props.ONBlur}
                autoFocus={this.props.AutoFocus}
            />
        )
    }
}

class SearchBar extends Component {

    constructor() {
        super();

        this.state = {
            SearchBarActive: false,
            marker_lat: null,
            marker_long: null,
            dataFetched: false,
            SearchBarTxt: "",
            SearchedResult: []
        }
        this.SearchLocation = this.SearchLocation.bind(this);
    }

    Search = () => {
        this.setState({
            SearchBarActive: true
        })
    }

    CancelSearch = () => {
        this.setState({
            SearchedResult: [],
            SearchBarActive: false
        })
        Keyboard.dismiss();
    }

    async componentDidMount() {

        Location.watchPositionAsync({ timeInterval: 7000, distanceInterval: 0.1 }, loc => {
            // console.log('watching***', loc);
            this.setState({ marker_long: loc.coords.longitude, marker_lat: loc.coords.latitude })
        })

    }

    async SearchLocation(e) {
        // console.log(e)
        this.setState({
            SearchBarTxt: e
        })
        let items = [];
        await fetch("https://api.foursquare.com/v2/venues/suggestcompletion?ll=" + this.state.marker_lat + "," + this.state.marker_long + "&limit=20&query=" + e + "&client_id=5RW3OYKKVFF40CZUBQB0RHFZ5LNLNKZSBS1OHUL0BVB2NRBO&client_secret=13L3DECCAODM3XQESIW0X1PAZCE22COWB05FLNNOKSBQYBIV&v=20140715")

            .then(res => res.json())
            .then((response) => {
                var SearchedData = [];
                // console.log(response)
                for (var i = 0; i < response.response.minivenues.length; i++) {
                    items.push({
                        nameOfPlace: response.response.minivenues[i].name,
                        LocationObj: response.response.minivenues[i].location
                    })
                }
                SearchedData = items;
                this.setState({
                    dataFetched: true,
                    SearchedResult: SearchedData
                })
                console.log(SearchedData)

            })

    }

    SetMeetup(LocationObj) {
        this.setState({
            // SearchedResult: [],
            SearchBarActive: false
        })


        const { navigate } = this.props.navigation;
        navigate("map", { LocationObj: LocationObj })
    }


    Show_Modal() {
        return <Modal
            animationType="slide"
            // transparent={false}
            visible={true}
        // onRequestClose={() => {
        //     Alert.alert('Modal has been closed.');
        // }}
        >
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <View style={{
                    width: this.props.Width, height: this.props.Height, borderRadius: 10, elevation: 4,
                    backgroundColor: "white", flexDirection: "row", marginTop: 20,
                    alignSelf: "center", alignItems: "center", padding: 12
                }}>
                    <TouchableOpacity onPress={this.CancelSearch} ><AntDesign name="arrowleft" size={25} color="black" /></TouchableOpacity>
                    <CustomTextBox SearchBarTxtVal={this.state.SearchBarTxt} Width={215} Value="Search Here" ONFocus={this.Search} ONBlur={this.CancelSearch} PlaceholderColor={!this.state.SearchBarActive ? "white" : "black"} AutoFocus={true} ONChangeText={(e) => this.SearchLocation(e)} />
                    {this.state.SearchBarTxt.length ? <TouchableHighlight onPress={() => this.setState({ SearchBarTxt: "", SearchedResult: [] })}>
                        <Entypo name="cross" size={26} color="black" />
                    </TouchableHighlight> : null}
                </View>

                {/* <View style={{ width: "95%", marginTop: 20 }}>
                    <ScrollView showsVerticalScrollIndicator={false} > */}
                {this.state.SearchedResult.length ? this.state.SearchedResult.map((item, i) => {
                    return (
                        <View style={{ width: "95%", marginTop: 20 }}>
                            <TouchableOpacity
                                key={i}
                                onPress={() => {
                                    this.props.getData(item.LocationObj)
                                }}
                            >
                                <View style={{ height: 70, width: "100%", flexDirection: "column" }}>
                                    <Text style={{ fontSize: 17 }}>{item.nameOfPlace}</Text>
                                    <Text>{item.LocationObj.address}  {item.LocationObj.city}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                }) : null}
                {/* <View style={{ width: "95%", marginTop: 20 }}> */}
                {/* <FlatList
                    data={this.state.SearchedResult}
                    keyExtractor={(item, index) => "key" + index}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ width: "95%", marginTop: 20 }}>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        this.props.getData(item.LocationObj)
                                    }}
                                >
                                    <View style={{ height: 70, width: "100%", flexDirection: "column" }}>
                                        <Text style={{ fontSize: 17 }}>{item.nameOfPlace}</Text>
                                        <Text>{item.LocationObj.address}  {item.LocationObj.city}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        );
                    }}
                ></FlatList> */}
                {/* </View> */}

                {/* </ScrollView>
                </View> */}

            </View>
        </Modal>
    }

    RenderedList() {
        return (
            <View style={{ width: "90%", height: 300, borderRadius: 10, backgroundColor: "white", position: "relative", elevation: 5 }}>

            </View>
        )
    }

    navigateToMap() {
        const { navigate } = this.props.navigation;
        navigate("map")
    }

    SearchBarView() {
        return <View style={{
            width: this.props.Width, height: this.props.Height, backgroundColor: "white", borderRadius: 10, elevation: 4,
            position: "absolute", flexDirection: "row", top: 20,
            alignSelf: "center", alignItems: "center",
            paddingLeft: 15
        }}>
            <TouchableOpacity onPress={() => this.navigateToMap()}>
                <AntDesign name="arrowleft" size={25} color="black" />
            </TouchableOpacity>
            <CustomTextBox Width={140} Value="Search Here" ONFocus={this.Search} ONBlur={this.CancelSearch} />

        </View>
    }

    render() {
        return (
            !this.state.SearchBarActive ? this.SearchBarView() : this.Show_Modal()
        )
    }
}

export default SearchBar;