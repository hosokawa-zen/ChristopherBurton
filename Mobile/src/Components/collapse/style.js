import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const styles= StyleSheet.create({
    container:{
        // marginTop:hp(20),
        // alignItems:'center',
        // justifyContent:'center',
        // backgroundColor:'#ffffff',


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

    text: {
        fontSize:14,
        // fontWeight:'700',
        textAlign:'center',
    },
    viewTitle:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        height:'100%',
        width: '100%',
        // backgroundColor: 'green',

    },
    collapseBody:{
        alignItems:'center',
        position:'absolute',
        marginTop:'32%',
        alignSelf:'center',
        width:'100%'
    },
    bodyView:{
        height:'100%',
        width:'85%',
        alignItems:'flex-start',
        backgroundColor:'#FFDFDC',
        paddingLeft:'5%',

    },
    bodyText:{
        fontSize: wp(3.3),
        lineHeight:25,
    }




});


export default styles;


