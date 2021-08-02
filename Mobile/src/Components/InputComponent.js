import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from "../../assets/images";

export default class InputComponent extends React.Component {

    render() {
        let bgColor=this.props.bgColor || '#ffffff';
        let iconHeight=this.props.iconHeight || hp(5);
        let iconWidth=this.props.iconWidth || wp(5);
        let inputRadius=this.props.inputRadius;
        let inputHeight=this.props.inputHeight;
        let inputWidth=this.props.inputWidth;
        let borderWidth=this.props.borderWidth;
        let imgLeftColor=this.props.imgLeftColor;
        let borderBottomWidth=this.props.borderBottomWidth;
        let borderColor=this.props.borderColor;
        let paddingBottom=this.props.paddingBottom;
        let inputMarginTop=this.props.inputMarginTop;
        let leftImgMarginRight=this.props.leftImgMarginRight;
        let iconWidthRight=this.props.iconWidthRight || wp(4.5);
        let iconHeightRight=this.props.iconHeightRight || hp(4.5);
        return(


            <View style={[styles.containerView,{borderRadius:inputRadius,backgroundColor: bgColor,borderBottomWidth:borderBottomWidth,borderColor:borderColor,marginTop:inputMarginTop},{height:inputHeight,width:inputWidth,borderWidth:borderWidth}]}>
                {this.props.showImg ? <Image style={[styles.img,{height:iconHeight,tintColor: imgLeftColor,marginRight:leftImgMarginRight},{width: iconWidth}]} source={this.props.imgLeft} />
                : null
                }
                <TextInput
                    style={[styles.textInput,{paddingBottom:paddingBottom}]}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={this.props.placeholderTextColor}
                    value={this.props.value}
                    onChangeText={this.props.onChangeText}
                />
                <TouchableOpacity onPress={this.props.onPressRight}>
                <Image style={[styles.img,{height:iconHeightRight},{width: iconWidthRight}]} source={this.props.imgRight} />
                </TouchableOpacity>
            </View>



        );
    }
}

const styles= StyleSheet.create({
    containerView: {
        backgroundColor:"#EBEBEB",
        paddingHorizontal:wp(3),
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        height: hp(7),
        // borderWidth:wp(0.1),
        // paddingBottom:wp(2)
    },
    textInput: {
        flex:1,
        // paddingLeft:wp(2),
    },
    img: {
        height:hp(5),
        width:wp(5),
        resizeMode:'contain',
        tintColor:'grey',
    },
    text: {
        fontSize: wp(4),
        // fontWeight:'700',
        color: '#fff',
        textAlign:'center',
        // fontFamily:'Montserrat-Regular'
    }




});


