import React from 'react';
import {Text, ImageBackground, StyleSheet, TouchableOpacity, View, Image,} from 'react-native';
import colors from '../../../assets/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const detaultButtonTitle = 'Button';

class  Button extends React.Component{

    onPressDefault = () => {
        console.log('Button is pressed');
    };

    renderIcon () {
        const {icon,iconStyle} = this.props;
        let styleIcon   = iconStyle    !== undefined? iconStyle : styles.icon;
        return (
                    <Image source={icon} style={[styleIcon,{tintColor: this.props.tintColorIcon || colors.white}]} resizeMode={'contain'}/>

        )
    }

    renderTitleText () {
        let {titleStyle, title, icon, iconPlace} = this.props;

        let btnTitleStyle   = titleStyle    !== undefined? titleStyle : styles.textStyle;
        let btnTitle        = title         !== undefined? title :  detaultButtonTitle;
        let isIcon          = icon          !== undefined;

        let width   = '100%';
        if (isIcon && (iconPlace === 'left' || iconPlace === 'right')){
            width = '80%'
        }

        return (
            <View style={[styles.textContainer, {borderWidth:0, borderColor:'green', width:width}]}>
                {isIcon && iconPlace === 'leftCenter'?this.renderIcon():null}
                <Text style={btnTitleStyle}>{btnTitle}</Text>
                {isIcon && iconPlace === 'rightCenter'?this.renderIcon():null}

            </View>

        )
     }

    render() {
        const {style, BackgroundImage, title, icon, iconPlace='left', onPress} = this.props;

        // Setting Button Style
        let touchableStyle = style !==undefined ? style : styles.container;
        let isIcon  = icon !== undefined;
        let bgColor  = this.props.bgColor || colors.app_button_color;


        return (
            <TouchableOpacity onPress={onPress!==undefined?onPress:this.onPressDefault} style={[touchableStyle,{backgroundColor: bgColor}]}>
                <ImageBackground source={BackgroundImage} resizeMode={"stretch"} style={styles.imgBackground}>

                    <View style={{flex:1, flexDirection:'row', alignItems:'center',}}>

                        {isIcon && iconPlace === 'left'?this.renderIcon():null}

                        {(title === undefined || title.length > 0) && this.renderTitleText()}

                        {isIcon && iconPlace === 'right'?this.renderIcon():null}
                    </View>

                </ImageBackground>
            </TouchableOpacity>
        );
    }
}

export default Button;



const styles = StyleSheet.create({
    container: {
        height:50,
        width:'90%',
        paddingLeft: 5,
        paddingRight:5,
        // borderWidth: 0.5,
        borderRadius:5,
        // top:0,
        // bottom:5,
        // backgroundColor:colors.bright_green_color,
        marginBottom:10,
    },
    imgBackground: {
        width:"100%",
        height:"100%",
        justifyContent:'center',
    },

    icon:{
        width:'9%',
        height:'50%',
        borderWidth:0,
        tintColor:colors.white,
        resizeMode:'contain'
        // borderColor:'red',
    },

    textContainer:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        // paddingLeft:'7%'

    },

    textStyle:{
        color:colors.white,
        fontSize:16,
        fontWeight:'bold',
        // fontFamily:'Montserrat-Bold',
    },


});




