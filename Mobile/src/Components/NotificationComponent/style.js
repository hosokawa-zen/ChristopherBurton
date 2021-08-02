import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles= StyleSheet.create({
    mainContainer:{
        // height:hp(100),
        // width:wp(100),
        // justifyContent:'center',
        // alignItems:'center',
        // marginTop:hp(1),
        // backgroundColor:'grey',
    },
    container:{
        // height: hp(16),
        width:wp(94),
        backgroundColor:'#ffffff',
        borderBottomWidth:1,
        borderColor:'#9ec600',
        // paddingTop: hp(5),
        // justifyContent: 'center',
        // paddingTop: '4%',
        // paddingVertical: '4%',
        paddingLeft: '1%',

    },

    imgContainer:{
        flexDirection:'row',
        // justifyContent:'flex-start',
        alignItems:'center',
        // height:'100%',
        // width:'65%',
        // backgroundColor: 'green',
    },
    imgView:{
        paddingRight:'3%',
    },
    textView:{
        // alignItems:'center',
        // width:'75%',
        // backgroundColor: 'green'
    },
    img:{
        height:hp(10),
        width:wp(12.5),
        resizeMode: 'contain',
        // tintColor:'red',
    },
    textRight:{
        fontSize: hp(1.8),
        color:'blue',
        // backgroundColor:'green',
        // textAlign: 'center',
        paddingTop:'1%',
        textDecorationLine:'underline'

    },
    textSubHeading:{
        fontSize:hp(1.7),
        // fontWeight:'bold'
    },
    buttonsView:{
        flexDirection: 'row',
        justifyContent:'flex-end',
        paddingRight: '3.1%',
        paddingTop: '1%',
        paddingBottom:'5%',
    }

});



export default styles;
