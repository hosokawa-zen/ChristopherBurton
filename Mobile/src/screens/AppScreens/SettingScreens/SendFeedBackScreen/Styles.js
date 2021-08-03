
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";
import colors from '../../../../../assets/colors';
//================================ Local Imported Files ======================================//



const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        backgroundColor: colors.app_header_color,
    },
    headerView:
    {
        backgroundColor: colors.app_header_color,
        height: 72,
    },
    middleView: {
        marginHorizontal: wp(3),
        // backgroundColor: "red"
    },
    LastView: {
        marginHorizontal: wp(3),
        justifyContent: "center",
        alignItems: "center"
    },
    uploadButtonView: {
        marginTop: 30,
        width: '100%',
        justifyContent: "flex-end",
        alignItems: "center",

    },
    saveButtonView: {
        width: '100%',
        height: '50%',
        justifyContent: "center",
        alignItems: "center",
    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4),

    },
    NameView: {
        marginTop: wp(2),
        height: hp(10),

    },
    commonInputName: {
        fontSize: wp(4),
        color: colors.white,
        // paddingLeft: wp(1)


    },
    EmailView: {
        marginTop: wp(7),
        height: hp(10),

    },
    SubjectView: {
        marginTop: wp(7),
        // marginTop: wp(2),
        height: hp(10),

    },
    MessageView: {
        marginTop: wp(7),

        height: hp(15),

    },
    CharacterView: {
        height: hp(10),
        // backgroundColor: colors.white,
        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingRight: wp(1.5)


    },
    CharacterStyle: {
        color: colors.white
    },
    buttonStyles:
    {
        borderRadius: wp(1),
        height: hp(7),
        width: '100%',
    },
});
export default Styles;
