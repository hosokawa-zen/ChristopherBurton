import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class SimpleButton extends React.Component {


    render() {

        let bgColor=this.props.bgColor;
        let textColor=this.props.textColor||"red";
        let btnWidth=this.props.btnWidth||wp(70);
        let btnHeight=this.props.btnHeight||wp(11);
        let btnRadius=this.props.btnRadius;
        let borderWidth=this.props.borderWidth;
        let borderColor=this.props.borderColor;
        let btnMarginStart=this.props.btnMarginStart;
        let btnMarginTop=this.props.btnMarginTop;
        let btnMarginBottom=this.props.btnMarginBottom;
        let btnMarginRight=this.props.btnMarginRight;
        let fontSize=this.props.fontSize || wp(3.7);
        let iconPaddingLeft=this.props.iconPaddingLeft;
        let iconPaddingRight=this.props.iconPaddingRight;
        let paddingRight=this.props.paddingRight;


        return(
            <View style={[styles.container,{height:btnHeight,width: btnWidth,borderWidth:borderWidth,borderColor:borderColor,borderRadius:btnRadius}]}
            >
                <TouchableOpacity onPress={this.props.onPress} style={[styles.containerTouchable,{backgroundColor:bgColor},{width:btnWidth},{height:btnHeight},{borderRadius:btnRadius},{paddingLeft:iconPaddingLeft},{marginStart:btnMarginStart},{marginTop:btnMarginTop},{marginBottom:btnMarginBottom},{marginRight:btnMarginRight}]}>
                    <Text style={[styles.text,{color:textColor,paddingRight:paddingRight},{fontSize:fontSize}]}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    container:{
        // alignItems:'center',
        // justifyContent:'center',

    },
    containerTouchable: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'center',
        height: hp(6),
        // width:wp(100),
        // marginStart:wp(3),
        // marginBottom:hp(2),
    },

    text: {
        fontSize: wp(4),
        fontWeight:'700',
        color: '#fff',
        textAlign:'center',
        // fontFamily:'Montserrat-Regular'
    }




});


