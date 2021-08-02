import React from 'react';
import {
    Text,
    Platform,
    TouchableWithoutFeedback,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View, Image, SafeAreaView,
} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../assets/colors';



class  ButtonComponent extends React.Component{

    constructor(props){
        super(props)
    }


    render() {
        const {style,buttonText,BackgroundImage,TextStyle,isImagePath,onPress,rightText,title,textStyle,marginTop,bgColor,borderRadius,height,width,textColor,decorationLine,fontSize,fontWeight,marginStart,borderWidth,borderColor,
            isImageStyle}=this.props;
        return (
            <TouchableOpacity
                onPress={onPress} style={[style !==undefined ? style :[styles.container]]}
            >
                <ImageBackground source={BackgroundImage}
                                 resizeMode={"stretch"}
                                 style={styles.imgBackground}
                >
                    <View
                        style={styles.mainView}
                    >
                        { isImagePath !== undefined  ?
                            <View style={styles.viewImage}>
                                <Image source={isImagePath} style={[isImageStyle!==undefined ? isImageStyle :styles.isImageStyle]} resizeMode={"contain"}/>

                            </View>
                            : <View style={styles.viewImage}/>}

                            <Text style={[textStyle !==undefined ? textStyle : styles.textStyle ]}>{this.props.title!== undefined ? this.props.title : 'Button'}</Text>


                        <Text style={styles.rightText}>{rightText}</Text>
                    </View>

                </ImageBackground>

            </TouchableOpacity>

        );
    }
}

export default ButtonComponent;



const styles = StyleSheet.create({
    container: {
        height:hp(6),
        width:wp(85),
        // backgroundColor:colors.app_color,
        // borderWidth: 1,
        backgroundColor:'grey',
        marginTop:10,

    },
    imgBackground: {
        width:"100%",
        height:"100%",
        justifyContent:'center',
    },
    mainView:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
    },
    viewImage:{
        width:'20%',
        // backgroundColor:'pink'
        paddingLeft:'3%'
    },
    isImageStyle:{
        width:35,
        height:35,
        // marginEnd:5,

    },
    textStyle:{
        color:'red',
        width:'60%',
        height:'100%',
        // backgroundColor: 'gold',
        textAlign:'center',
        borderWidth:3,
        fontSize:16,
        fontWeight:'bold',
    },
    rightText:{
        height:'100%',
        width:'20%',
        textAlign: 'center',
    }



});




