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
    container:
    {
        flex: 0.9,
        paddingHorizontal: wp(5),
        borderTopColor: colors.white,
        // borderTopWidth: wp(0.2),
        marginTop: wp(2)

    },
    buttonContainer: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: "center",


    },

    textStylecontainer:
    {
        fontSize: wp(4),
        color: colors.white,
    },
    title: {
        fontSize: wp(4.3),
        fontWeight: 'bold',
        paddingVertical: '4%'
    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4.5),

    },
    buttonStyles:
    {
        // borderRadius: wp(1),
        height: hp(7),
        width: '100%',
    },

});
export default styles;
