import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from "../../assets/images";

export default class CircleButton extends React.Component {


    render() {



        return(
            <ImageBackground style={styles.container}
                             source={images.bg_call}
                             resizeMode={'cover'}
                             borderRadius={50}
            >
                <TouchableOpacity onPress={this.props.onPress} style={styles.containerTouchable}>
                    <Image style={styles.img} source={images.ic_plus}/>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const styles= StyleSheet.create({
    container:{
        // flex:1,
        // alignItems:'center',
        // justifyContent:'center',
        // backgroundColor:'grey',
        height: 50,
        width: 50,
        // borderRadius:wp(25),

    },
    containerTouchable: {
        alignItems: 'center',
        justifyContent:'center',
        height: 50,
        width:50,
        borderRadius:10,
        // backgroundColor: '#ffffff'
        // width:wp(100),
        // marginStart:wp(3),
        // marginBottom:hp(2),
    },

    text: {
        fontSize: wp(4),
        // fontWeight:'700',
        color: '#fff',
        textAlign:'center',
        // fontFamily:'Montserrat-Regular'
    },
    img:{
        height: hp(4),
        width: wp(4),
        resizeMode:'contain',
        tintColor: '#ffffff',
    }




});


