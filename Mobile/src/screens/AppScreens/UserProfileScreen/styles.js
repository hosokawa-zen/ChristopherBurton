import { StyleSheet,Platform } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
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
    container:
    {
        flex: 0.9,
        paddingTop: Platform.OS === 'ios' ? wp(2):0

    },

    userName: {
        flex: 0.06,
        // backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center",

    },
    userNameAddress: {
        flex: 0.05,
        // backgroundColor: "pink",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    PicContainer:{
      alignItems:'center'
    },
    socialMedia: {
        flex: 0.05,
        // backgroundColor: "pink",
        justifyContent: "center",
        // alignItems: "center",
        paddingLeft: wp(4),
        paddingTop:10

    },
    RevToneContainer: {
        flex: 0.05,
        // backgroundColor: "pink",
        justifyContent: "center",
        // alignItems: "center",
        paddingLeft: wp(4),

    },
    divider: {
        flex: 0.001,
        marginTop: 4,
        backgroundColor: "grey"
    },
    socialMediaIcon: {
        flex: 0.12,
        // backgroundColor: "pink",
        paddingTop: wp(2),
        flexDirection: "row",
        // justifyContent: "center"
        alignItems: "center",
        paddingLeft: wp(2)
    },
    userNameTextStyle: {
        fontWeight: "bold",
        fontSize: wp(6),
        color: colors.white
    },
    userNameAddressTextStyle: {
        // fontWeight: "bold",
        fontSize: wp(3.5),
        color: colors.white
    },
    socialMediaTextStyle: {
        fontSize: wp(4.3),
        fontWeight: 'bold',
        color: colors.white
    },
    socialMediaIconStyle:
    {
        height: wp(12),
        width: wp(12),
        resizeMode: 'contain',
        marginLeft:5



        // tintColor: colors.black,
    },
    userProfileStyle: {
        height: wp(40),
        width: wp(40),
        resizeMode: 'contain',

    },
    flatListContainer: {
        flex: 0.6,
        // backgroundColor: "red",
        paddingHorizontal: wp(4),
        paddingTop:10


    },



});
export default styles;
