import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const styles= StyleSheet.create({
    containerView: {
        // backgroundColor:"#ffffff",
        width:wp(90),
        // paddingHorizontal:wp(3),
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        height: hp(7),
        borderBottomWidth:wp(0.3),
        borderColor:'#939598',
    },
    textInput: {
        flex:1,
        // paddingLeft:wp(2),
    },





});


export default styles;
