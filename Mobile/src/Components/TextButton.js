import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class TextButton extends React.Component {


    render() {
        let textColor = this.props.textColor || '#9ec600';

        return(

                <TouchableOpacity onPress={this.props.onPress} style={[styles.containerTouchable]}>
                    <View style={styles.containerTouchableText}>
                        <Text style={[styles.text,{color:textColor}]}>{this.props.title}</Text>
                    </View>
                </TouchableOpacity>

        );
    }
}

const styles= StyleSheet.create({

    containerTouchable: {
        height:hp(2),
        flexDirection:'row',
        alignItems: 'center',
        width:wp(60),
        borderRadius:wp(0.5),

    },
    containerTouchableText: {
        width:wp(60),
        // backgroundColor: "red",
        alignItems: 'center',
    },
    text: {
        fontSize: wp(3.5),
        textAlign:'center',
        fontWeight:'700',
        color: '#9ec600',
        // lineHeight:hp(15),
        textDecorationLine:'underline',
        // fontFamily:'Montserrat-Regular'
    }




});


