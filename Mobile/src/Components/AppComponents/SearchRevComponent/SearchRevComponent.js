import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,FlatList,ImageBackground,TouchableWithoutFeedback,Platform} from 'react-native';
import AppHeader from "../../../Components/AppHeader";
import images from "../../../../assets/images";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';





export default class SearchRevComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            paused: true
        }
    }

    onPress = () => {
        this.setState({
            paused: !this.state.paused
        })
        this.props.onPlay(this.state.paused)
    }


    render() {
        return(
            <View style={styles.mainContainer}>

                <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
                    <View style={styles.imgView}>
                        <Image style={styles.img} source={this.props.image}/>
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.textTitle}>{this.props.title}</Text>
                        <Text style={styles.yearText}>{this.props.yearCar}</Text>
                        <Text style={styles.typeText}>{this.props.typeCar}</Text>
                    </View>
                    <TouchableOpacity style={styles.playView} onPress={this.onPress}>
                        <Image style={styles.icon} source={images.icn_play_small}/>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>

        );
    }
}




const styles= StyleSheet.create({
    mainContainer:{
        // flex:1,
        alignItems:'center',
        marginTop:10
    },
    container:{
        height:hp(13),
        width:wp(92),
        backgroundColor:colors.app_brown,
        borderRadius:wp(2),
        flexDirection:'row'
    },
    imgView:{
        height: '100%',
        width: '30%',
        // backgroundColor: 'red',
        borderTopLeftRadius:wp(2),
        borderBottomLeftRadius:wp(2)
    },
    img:{
        height:'100%',
        width:'100%',
        resizeMode:'cover',
        // borderRadius:wp(2),
        borderTopLeftRadius:wp(2),
        borderBottomLeftRadius:wp(2),


    },
    textView:{
        height: '100%',
        width: '54%',
        // backgroundColor: 'blue',
        // borderRadius:wp(2),
        // borderTopRightRadius:wp(2),
        // borderBottomRightRadius:wp(2),
        // justifyContent:'center',
        paddingLeft:'3%',
        paddingTop:'4%',
        borderBottomWidth:1,
        borderColor:colors.app_red,
        borderTopWidth:1,
    },
    playView:{
        height: '100%',
        width: '16%',
        backgroundColor:colors.app_brown,
        // borderRadius:wp(2),
        borderTopRightRadius:wp(2),
        borderBottomRightRadius:wp(2),
        justifyContent:'center',
        // paddingLeft:'4%'
        // alignItems: 'center',
        borderBottomWidth:1,
        borderColor:colors.app_red,
        borderRightWidth:1,
        borderTopWidth:1,
    },
    icon:{
        height:'75%',
        width:'75%',
        resizeMode:'contain',
        // borderRadius:wp(2),
        // borderTopLeftRadius:wp(2),
        // borderBottomLeftRadius:wp(2)
    },
    textTitle:{
        fontSize:wp(4),
        fontWeight:'bold',
        color:colors.white
    },
    yearText:{
        fontSize:wp(3.2),
        fontWeight:'bold',
        color:colors.white,
        paddingTop:'2%'
    },
    typeText:{
        fontSize:wp(3.5),
        fontWeight:'bold',
        color:colors.white,
        paddingTop:Platform.OS === 'ios' ? '13%' : '4%'

    }





});




