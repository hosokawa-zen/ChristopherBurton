import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {StyleSheet,Platform} from "react-native";
import colors from "../../../assets/colors";



const styles = StyleSheet.create({

    mainContainer:
        {
            flex:1,
            // backgroundColor:colors.white
        },
    upperView:
        {
            flex:0.75,
            justifyContent:'flex-end',
            alignItems:'center',
            // backgroundColor:colors.most_blue_button

        },
    imageView:
        {

            flex: Platform.OS === 'ios' ? 0.60 : 0.50,
            justifyContent:'center',
            alignItems:'center',
            // backgroundColor:colors.white
        },

    midView:
        {
            flex:Platform.OS === 'ios' ? 0.40 : 0.50,
            alignItems:'center',
            paddingHorizontal:wp(7),
            // backgroundColor:colors.app_red


        },
    lowerView:
        {
            flex:0.25,
            justifyContent:'flex-end',
            alignItems:'center',
            // backgroundColor:colors.light_blue_apptheme,

        },
    imageStyles:
        {
            height:Platform.OS === 'ios' ? '60%' : '70%',
            width:Platform.OS === 'ios' ? '60%' : '70%',
            resizeMode:'contain'
        },
    textStyle:
        {
            fontSize:wp(5),
            color:colors.white,
            textAlign:'center',
        },
    textStyleWelcome:
        {
            fontSize:wp(5.5),
            color:colors.white,
            fontWeight:'bold',
            textAlign:'center',
        },
    buttonStyles:
        {
            borderRadius:wp(2),
            height: hp(8),
            width: '85%',
            backgroundColor:colors.light_green,
            marginBottom:wp(10),

        },
    slides:
        {
            flex:1,

        },
    textDetail:{
        fontSize:wp(3.9),
        // fontWeight: 'bold',
        color:colors.white,
        textAlign:'center',
        paddingTop:'4%',
        lineHeight:wp(5.5)
    }

});

export default styles;
