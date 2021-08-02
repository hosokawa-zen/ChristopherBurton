import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from '../../../../assets/colors';
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        backgroundColor: colors.app_header_color,
        // paddingHorizontal: wp(4)
    },

    headerView:
    {
        flex: 0.1,
        backgroundColor: colors.app_header_color

    },
    container:
    {
        flex: 0.9,
    },
    scoreContainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red"

    },
    timeContainer: {
        height:60,
        width: '35%',
        backgroundColor: "#D62A2A",
        alignSelf: "center",
        borderRadius: wp(7),
        alignItems: "center",
        flexDirection: "row"
    },
    flatListContaisner: {
        flex: 0.5,
        paddingTop: wp(2)
    },
    playContainer: {
        flex: 0.1,
        width: '45%',
        // backgroundColor: "red",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "center"

    },
    scoreTextStyle: {
        color: colors.white,
        fontSize: wp(5)

    },
    hintTextStyle: {
        color: "grey",
        fontSize: wp(4),
        fontStyle: 'italic'

    },
    timeTextStyle: {
        color: colors.white,
        fontSize: wp(4),
        // paddingLeft: wp()
        // fontStyle: 'italic'
    },
    imageStyles:
    {
        height: wp(10),
        width: wp(10),
        resizeMode: 'contain'

    },
    timeStyles: {
        height: wp(8),
        width: wp(8),
        resizeMode: 'contain',
        paddingLeft: wp(18)


    },
    imageStylesPlay: {
        height: wp(15),
        width: wp(15),
        resizeMode: 'contain'
    },






});
export default styles;
