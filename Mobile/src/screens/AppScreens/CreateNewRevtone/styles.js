import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet,Platform } from "react-native";
import colors from '../../../../assets/colors';


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

    mainView:
    {
        flex: 0.9,
        paddingHorizontal: wp(3),
        paddingTop: Platform.OS === 'ios' ? wp(3) : wp(1),
        // backgroundColor:colors.blue

    },
    revTonesContainer: {
        marginTop: wp(2),
        height: hp(7),
        width: '100%',
        borderRadius: 5,
        backgroundColor: colors.app_button_color,
        flexDirection: "row",
        alignItems: "center"
    },
    leftImageContainer: {
        height: hp(9),
        width: '10%',
        // backgroundColor: colors.app_button_color,
        paddingLeft: wp(4),
        justifyContent: "center",
        alignItems: "center"

    },
    recordFileStyle: {
        color: colors.white,
        fontSize: wp(4),
    },
    carStyle: {
        color: colors.white,
        marginTop: wp(3),
        fontSize: wp(4),

    },
    carStyleInput: {
        height: wp(16),
        width: '100%',
        // backgroundColor: "green"
    },
    imageStyles:
    {
        height: wp(8),
        width: wp(8),
        resizeMode: 'contain'

    },
    revTonesStyle: {
        color: colors.white,
        fontSize: wp(4),
        fontWeight: "bold",
        paddingLeft: wp(32),

    },
    buttonContainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center"
        // backgroundColor: "red",

    },
    btn: {
        height: hp(7),
        width: '100%',
        paddingLeft: '5.5%',
        paddingRight: 5,
        // borderWidth: 1,
        borderRadius: 5,
        // backgroundColor:colors.bright_green_color,
        marginTop: 10
    },
    dropdownView:
    {
        height: hp(6),
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
    descriptionStyle: {
        height: hp(20),
        width: '100%',
        // backgroundColor: "red"

    },

});

export default styles;
