import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,ImageBackground,Platform} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from "../../assets/images";

export default class Header extends React.Component {

    render() {
        let bgColor=this.props.bgColor||"#9ec600";
        let textColor=this.props.textColor||"#A9B9AA";
        let imgLeftColor=this.props.imgLeftColor||"#A9B9AA";
        let imgRightColor=this.props.imgRightColor||"#A9B9AA";
        let imgRightHeight=this.props.imgRightHeight||hp(6);
        let imgRightWidth=this.props.imgRightWidth||wp(6);
        let headerHeight=this.props.headerHeight || Platform.OS === 'ios'? hp(10): hp(7.5);


        return(

                <View style={[styles.containerView,{backgroundColor:bgColor},{height:headerHeight}]}>

                    <TouchableOpacity onPress={this.props.onPress} style={styles.containerTouchableLogo}>
                        <Image style={[styles.img,{tintColor:imgLeftColor}]} source={this.props.imgLeft}/>
                    </TouchableOpacity>

                    <View style={[styles.containerText]}>
                        <Text style={[styles.text,{color:textColor}]}>{this.props.title}</Text>
                    </View>

                    <TouchableOpacity  onPress={this.props.onPressRight} style={styles.containerTouchableLogo}>
                        <Image style={[styles.img,{tintColor:imgRightColor,height:imgRightHeight,width:imgRightWidth}]} source={this.props.imgRight}/>
                    </TouchableOpacity>

                </View>



        );
    }
}

const styles= StyleSheet.create({
    containerView: {

        width:wp(100),
        // backgroundColor:"pink",
        paddingHorizontal:wp(3),
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        // paddingTop:'9%',
        // borderWidth:1

    },
    containerTouchableLogo: {
        marginTop: Platform.OS === 'ios'?'10%':0,
       //  width:wp(15),
       //  backgroundColor:'yellow',
       // justifyContent:"center",
       //  alignItems:"center",
       //  paddingLeft:wp(4),
       //  height:"100%"
    },
    containerText: {
        marginTop:Platform.OS === 'ios'?'10%':0,
        // width:wp(70),
        // backgroundColor: "orange",
        // justifyContent: 'center',
        // alignItems:'center',
        // height:'100%',
        // marginEnd:wp(15),
        // borderWidth:1


    },
    img: {
        height:hp(6),
        width:wp(6),
        resizeMode:'contain',
    },
    text: {
        fontSize: wp(4),
        fontWeight:'700',
        textAlign:'center',
        // fontFamily:'Montserrat-Regular'
    }

});


