import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet,Platform } from "react-native";
import colors from '../../../../assets/colors';


const styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        backgroundColor: colors.app_header_color,

    },

    headerView:
    {
        flex: 0.1,
        backgroundColor: colors.app_header_color

    },
    timeTextStyle: {
        fontSize: wp(8),
        color: colors.white,
        alignSelf: "center"
    },
    modelTextStyle: {
        fontSize: wp(4),
        color: colors.white,
        paddingTop: wp(4)
    },
    yearTextStyle: {
        fontSize: wp(4),
        color: colors.white,
        paddingTop: wp(4),
        paddingHorizontal: wp(3)
    },
    makeCategory: {
        flex: 0.1,
        backgroundColor: "red"
    },
    bothCategory: {
        flex: 0.12,
        // backgroundColor: "red",
        flexDirection: "row"
    },
    dropdownView:
    {
        height: hp(5.5),
        width: wp(92),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        // marginBottom: wp(2.5),
        paddingHorizontal: '5%',
        backgroundColor: colors.app_header_color,
        paddingBottom: '10%',
        borderRadius: wp(1),
        paddingRight: '7%',
        borderWidth: 0.5,
        borderColor: colors.white
    },
    dropdownYearView: {
        height: hp(5.5),
        width: wp(41),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        // marginBottom: wp(2.5),
        paddingHorizontal: '5%',
        backgroundColor: colors.app_header_color,
        paddingBottom: '10%',
        borderRadius: wp(1),
        paddingRight: '7%',
        borderWidth: 0.5,
        borderColor: colors.white,
        flexDirection: "row",
        // paddingLeft:wp(2)
    },
    buttonView: {
        flex: 0.1,
        // backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonStyles:
    {
        borderRadius: wp(1),
        height: hp(7),
        width: '90%',
        marginBottom:25
    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4),
        fontWeight: "bold"

    },
    micContainer: {
        height: hp(25),
        width: '100%',
        backgroundColor: '#24140F',
        borderWidth: 1,
        borderColor: colors.app_button_color,
        marginTop: wp(3),
        justifyContent: "center",
        alignItems: "center"
    },
    playContainer: {
        height: hp(25),
        width: '100%',
        marginTop: wp(3),
        justifyContent: "center",
        alignItems: "center"
    },
    trimmerContainer: {
        height: hp(25),
        width: '100%',
        backgroundColor: '#24140F',
        borderWidth: 1,
        borderColor: colors.app_button_color,
        marginTop: wp(3),
        justifyContent: "center",
        alignItems: "center"
    },
    trimmerStyle: {
        backgroundColor: '#24140F',
        borderWidth: 1,
        borderColor: colors.app_button_color,
    },
    container:
    {
        flex: 0.45,
        // backgroundColor: "red"
        paddingHorizontal: wp(4),
        paddingTop: Platform.OS === 'ios' ? wp(2) :0,
    },
    flatListContainer: {
        flex: 0.4,
        // backgroundColor: "red",
        paddingHorizontal: wp(4),
    },
    imageStyles:
    {
        height: wp(22),
        width: wp(22),
        resizeMode: 'contain'

    },

});
export default styles;
