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
        flex: 0.09,
    },
    upperView:
    {
        flex: 0.45,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:colors.white

    },
    midView:
    {
        flex: 0.55,
        alignItems: 'center',
        paddingTop: wp(2),
        // backgroundColor:colors.blue

    },
    lowerView:
    {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',

    },
    imageStyles:
    {
        height: '65%',
        width: '65%',
        resizeMode: 'contain'
    },
    textStyle:
    {
        fontSize: wp(5),
        paddingTop: wp(3),
        color: colors.white,
        textAlign: 'center',
        // fontWeight: 'bold',

    },
    buttonStyles:
    {
        borderRadius: wp(2),
        height: hp(8),
        width: '100%',
        paddingLeft: wp(5),
        backgroundColor: colors.white,
        marginBottom: wp(2),

    },
    iconBtn: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        // tintColor:colors.white,
    },
    btn: {
        height: 50,
        width: '80%',
        paddingLeft: '5.5%',
        paddingRight: 5,
        borderRadius: 5,
        // backgroundColor:colors.bright_green_color,
        marginBottom: 10
    },
    heightContainer: {
        height: hp(5),
        width: '80%',
        // backgroundColor: "yellow",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    heightLeft: {
        height: '1.5%',
        width: '40%',
        backgroundColor: "grey",
        marginRight: hp(2)
    },
    heightRight: {
        height: '1.5%',
        width: '40%',
        backgroundColor: "grey",
        marginLeft: hp(2)

    },
    OrStyle: {
        fontSize: wp(4),
        color: colors.white,
        fontWeight: "bold",
    },

});
export default styles;
