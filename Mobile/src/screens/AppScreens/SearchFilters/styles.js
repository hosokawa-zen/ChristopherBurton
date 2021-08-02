import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet ,Platform} from "react-native";
import colors  from '../../../../assets/colors';


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
    container:
    {
        flex: 0.8,
        paddingHorizontal: wp(4),
        paddingTop:Platform.OS === 'ios' ? wp(2) :0

    },
    makeTextStyle: {
        fontSize: wp(4),
        color: colors.white,
        paddingBottom: wp(2)
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
        // justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 10,
        marginBottom: wp(2.5),
        // paddingHorizontal: '5%',
        backgroundColor: colors.app_header_color,
        // paddingBottom: '10%',
        borderRadius: wp(1),
        // paddingRight: '7%',
        borderWidth: 0.5,
        borderColor: colors.white
    },
    dropdownYearView: {
        height: hp(5.5),
        width: wp(41),
        // justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 10,
        marginBottom: wp(2.5),
        // paddingHorizontal: '5%',
        paddingHorizontal: '2%',
        backgroundColor: colors.app_header_color,
        // paddingBottom: '10%',
        borderRadius: wp(1),
        // paddingRight: '7%',
        borderWidth: 0.5,
        borderColor: colors.white,
        // flexDirection: "row",
    },
    buttonView: {
        flex: 0.1,
        // backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center"
    },

});

export default styles;
