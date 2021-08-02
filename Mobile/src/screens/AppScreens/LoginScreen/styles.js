import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from '../../../../assets/colors';
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        backgroundColor: colors.app_header_color
    },

    headerView:
    {
        flex: 0.1
    },
    upperView:
    {
        flex: 0.35,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:colors.white

    },
    midView:
    {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: wp(2),
        // backgroundColor:colors.blue

    },

    lowerView:
    {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:colors.white

    },
    imageStyles:
    {
        height: '75%',
        width: '75%',
        resizeMode: 'contain'
    },
    textStyle:
    {
        fontSize: wp(4),
        color: colors.white,
        textAlign: 'center',
        textDecorationLine: "underline",
    },
    buttonStyles:
    {
        borderRadius: wp(2),
        height: hp(8.5),
        width: '80%',
        // paddingLeft:wp(5),
        backgroundColor: colors.white,
        marginBottom: wp(4),

    },
    checkBoxContainer:
    {
        flex: 0.4,
        // backgroundColor: colors.app_pink_colors,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: wp(60)

        // marginTop:wp(1),
        // paddingHorizontal:wp(8)

    },
    checkBoxIcon:
    {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'flex-end',
        // backgroundColor:colors.dark_gold
    },
    checkBoxText:
    {
        flex: 0.6,
        // paddingHorizontal:wp(2),
        // justifyContent: 'center',
        // backgroundColor:colors.dark_orange,
    },
    checkBoxIconStyle:
    {
        height: wp(4.8),
        width: wp(4.8),
        resizeMode: 'contain',
        tintColor: colors.black,
    },
    checkBoxTextStyle:
    {
        fontSize: wp(3.5),
        color: colors.white,

    }

});

export default styles;
