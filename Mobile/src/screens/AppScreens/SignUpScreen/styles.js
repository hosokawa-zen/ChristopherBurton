import { StyleSheet,Platform } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from '../../../../assets/colors';


const styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        backgroundColor: colors.app_header_color
    },

    headerView:
    {
        // height:wp(13),
        // width:'100%',
        flex: 0.1,
        backgroundColor: colors.app_header_color

    },

    midView:
    {
        // height:wp(70),
        // width:'100%',
        paddingTop: wp(7),
        flex:Platform.OS === 'ios' ? 0.4 : 0.45,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:colors.grey1

    },
    buttonView:
    {
        // height:wp(30),
        // width:'100%',
        flex: Platform.OS === 'ios' ? 0.45 : 0.40,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: wp(2),
        // paddingHorizontal:wp(10),
        // backgroundColor:'green'
    },
    lowerView:
    {
        // height:wp(30),
        // width:'100%',
        flex: 0.14,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor: colors.dark_green

    },
    imageStyles:
    {
        height: '55%',
        width: '55%',
        resizeMode: 'contain'
    },
    textStyle:
    {
        fontSize: wp(4),
        color: colors.white,
        textAlign: 'center',
    },
    buttonStyles:
    {
        borderRadius: wp(2),
        height: hp(7),
        width: '75%',
        // paddingLeft:wp(5),
        backgroundColor: colors.white,
        marginBottom: wp(4),

    },
    checkBoxContainer:
    {
        flex: 0.35,
        // backgroundColor: "red",
        justifyContent: 'center',
        flexDirection: 'row',
        // marginTop:wp(1),
        paddingHorizontal: wp(11),
        paddingTop:wp(2.5)

    },
    checkBoxIcon:
    {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        // backgroundColor: colors.dark_gold
    },
    checkBoxText:
    {
        flex: 0.9,
        paddingHorizontal: wp(2),
        justifyContent: 'center',
        // backgroundColor: colors.dark_orange,
    },
    checkBoxIconStyle:
    {
        height: wp(4),
        width: wp(4),
        resizeMode: 'contain',
        // tintColor: colors.black,
    },
    checkBoxIconStyleError: {
        height: wp(4),
        width: wp(4),
        resizeMode: 'contain',
        tintColor: colors.app_red
    },
    checkBoxTextStyle:
    {
        fontSize: wp(3.6),
        color: colors.white,

    },
    passwordStrength: {
        fontStyle: "italic",
        color: colors.white,
        paddingRight: wp(28),
        marginVertical: wp(1),
        paddingTop:wp(1)

    },

});
export default styles;
