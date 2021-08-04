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
        height: 72,
        backgroundColor: colors.app_header_color

    },

    midView:
    {
        paddingTop: wp(7),
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonView:
    {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: wp(10),
        // paddingHorizontal:wp(10),
        // backgroundColor:'green'
    },
    lowerView:
    {
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
        // backgroundColor: "red",
        justifyContent: 'center',
        flexDirection: 'row',
        // marginTop:wp(1),
        marginHorizontal: wp(11),
        marginTop:wp(2)

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
        color: colors.white,
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
