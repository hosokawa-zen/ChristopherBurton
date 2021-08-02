import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from "../../assets/images";

export default class IconButton extends React.Component {


    render() {

        let bgColor=this.props.bgColor;
        let textColor=this.props.textColor||"red";
        let textMarginRight=this.props.textMarginRight;
        let imgLeftColor=this.props.imgLeftColor;
        let imgLeftMarginLeft=this.props.imgLeftMarginLeft;
        // let imgMiddleColor=this.props.imgLeftColor;
        let imgRightColor=this.props.imgRightColor;
        let btnWidth=this.props.btnWidth||wp(70);
        let btnHeight=this.props.btnHeight||wp(12);
        let btnRadius=this.props.btnRadius||wp(0);
        let btnMarginStart=this.props.btnMarginStart;
        // let containerMarginEnd=this.props.containerMarginEnd;
        let btnMarginRight=this.props.btnMarginRight;
        let marginTop=this.props.marginTop;
        let btnPaddingRight=this.props.btnPaddingRight;
        let fontSize=this.props.fontSize || wp(4.2);
        let iconHeight=this.props.iconHeight || hp(4);
        let iconWidth=this.props.iconWidth || wp(4);
        // let iconWidth=this.props.iconWidth||wp(4);
        // let iconPadding=this.props.iconPadding||wp(7);
        let iconPaddingLeft=this.props.iconPaddingLeft;
        let iconPaddingRight=this.props.iconPaddingRight;
        let iconMarginRight=this.props.iconMarginRight;
        // let iconHeight=this.props.iconHeight||wp(4);
        // let viewLeftWidth=this.props.viewLeftWidth || wp(12);
        // let viewMiddleWidth=this.props.viewMiddleWidth || wp(66);
        // let viewRightWidth=this.props.viewRightWidth || wp(12);

        return(
            <View style={[styles.container,{marginTop:marginTop}]} >

                <TouchableOpacity onPress={this.props.onPress} style={[styles.containerTouchable,{backgroundColor:bgColor},{width:btnWidth},{height:btnHeight},{borderRadius:btnRadius},{paddingLeft:iconPaddingLeft},{marginStart:btnMarginStart},{marginRight:btnMarginRight},{paddingRight:btnPaddingRight}]}>
                    <View style={styles.imgLeft}>
                        <Image style={[styles.img,{tintColor:imgLeftColor},{height:iconHeight},{width:iconWidth},{marginLeft:imgLeftMarginLeft}]} source={this.props.imgLeft}/>
                    </View>
                    <View style={styles.imgMiddle}>

                        <Text style={[styles.text,{color:textColor},{fontSize:fontSize},{marginRight:textMarginRight}]}>{this.props.title}</Text>
                    </View>
                    <View style={styles.imgRight}>
                        <Image style={[styles.img,{tintColor:imgRightColor,marginRight:iconMarginRight},{height:iconHeight},{width:iconWidth},{paddingRight:iconPaddingRight}]} source={this.props.imgRight}/>
                    </View>
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
        justifyContent:'space-between',
        height: hp(6),
        // width:wp(100),
        // marginStart:wp(3),
        // marginBottom:hp(2),
    },
    imgLeft: {
        width:'15%',
        // alignItems:'flex-start',
        // paddingLeft:wp(3),
        // backgroundColor:'pink',
        // marginLeft:wp(0)
        paddingLeft:wp(3)
    },
    imgMiddle: {
        width:'70%',
        // backgroundColor:'green',
        alignItems:'center'

    },
    imgRight: {
        width:'15%',
        // backgroundColor:'orange',
        alignItems: 'flex-end',
        paddingRight:'3%'


    },
    img: {
        height:hp(7),
        width:wp(7),
        resizeMode:'contain',
        // tintColor:'#fff',
    },
    text: {
        fontSize: wp(4),
        fontWeight:'700',
        color: '#fff',
        textAlign:'center',
        // fontFamily:'Montserrat-Regular',
    }




});


