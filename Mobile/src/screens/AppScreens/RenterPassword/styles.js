import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';
import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({

    mainContainer:
        {
            flex: 1,
            backgroundColor: colors.app_header_color
        },

    headerView:
        {
            flex: 0.1,
        },

    midView:
        {
            flex: 0.3,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: wp(7),
            // backgroundColor:colors.blue

        },
    passwordStrength: {
        fontStyle: "italic",
        color: colors.white,
        paddingRight: wp(28),
        marginVertical: 10

    },

    lowerView:
        {
            flex: 0.20,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: wp(10),
            // backgroundColor:colors.white

        },
    imageStyles:
        {
            height: '60%',
            width: '60%',
            resizeMode: 'contain'
        },
    textStyle:
        {
            fontSize: wp(4),
            color: colors.white,
            textAlign: 'center',
            // textDecorationLine: "underline",
        },
    buttonStyles:
        {
            borderRadius: wp(2),
            height: hp(8),
            width: '85%',
            // paddingLeft:wp(5),
            backgroundColor: colors.white,
            marginBottom: wp(4),

        },
    checkBoxContainer:
        {
            flex: 0.3,
            // backgroundColor:colors.bright_red,
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: wp(5),
            paddingHorizontal: wp(11)

        },
    checkBoxIcon:
        {
            flex: 0.1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            // backgroundColor:colors.dark_gold
        },
    checkBoxText:
        {
            flex: 0.9,
            paddingHorizontal: wp(2),
            justifyContent: 'center',
            // backgroundColor:colors.dark_orange,
        },
    checkBoxIconStyle:
        {
            height: wp(4),
            width: wp(4),
            resizeMode: 'contain',
            // tintColor: colors.black,
        },
    checkBoxTextStyle:
        {
            fontSize: wp(3.5),
            color: colors.white,

        }

});


export default styles;
