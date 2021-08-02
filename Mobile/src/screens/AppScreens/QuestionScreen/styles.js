import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from '../../../../assets/colors';
import { StyleSheet } from "react-native";


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
        flex: 0.9,
        paddingHorizontal: wp(4),
        paddingTop:wp(4)

    },

    userName: {
        flex: 0.05,
        justifyContent: "space-between",
        flexDirection: "row"

    },
    leftQuestion: {
        // fontWeight: "bold",
        fontSize: wp(4),
        color: colors.white
    },
    rightAnswer: {
        fontWeight: "bold",
        fontSize: wp(4),
        color: colors.white
    },






});
export default styles;
