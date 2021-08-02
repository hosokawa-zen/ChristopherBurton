import {StyleSheet} from 'react-native';
import colors from '../../../../assets/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const styles = StyleSheet.create({

    mainContainer:
        {
            flex:1,
            backgroundColor:colors.app_theme_dark
        },

    headerView:
        {
            flex:0.1,
        },

    midView:
        {
            flex:0.7,
            alignItems:'center',
            padding:wp(5),
            // backgroundColor:colors.blue,
            borderTopWidth:wp(0.07),
            borderTopColor:colors.white,

        },
    buttonView:
        {
            height:wp(30),
            width:'100%',
            justifyContent:'flex-end',
            alignItems:'center',
            paddingTop:wp(2),
            // paddingHorizontal:wp(10),
        },
    lowerView:
        {
            flex:0.2,
            justifyContent:'flex-end',
            alignItems:'center',
            marginTop: wp(10),
            // backgroundColor:colors.white

        },
    imageStyles:
        {
            height:'60%',
            width:'60%',
            resizeMode:'contain'
        },
    textStyle:
        {
            fontSize:wp(4),
            color:colors.white,
            textAlign:'center',
            // textDecorationLine: "underline",
        },
    buttonStyles:
        {
            borderRadius:wp(2),
            height: hp(8),
            width: '75%',
            // paddingLeft:wp(5),
            backgroundColor:colors.white,
            marginBottom:wp(4),

        },
    textareaContainer: {
        height:wp(70),
        width:'95%',
        padding:wp(2),
        marginTop:wp(1),
        borderRadius:wp(2),
        backgroundColor:colors.dark_green,
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height:'100%',
        fontSize: 14,
        color:colors.white,
    },

});

export default styles;
