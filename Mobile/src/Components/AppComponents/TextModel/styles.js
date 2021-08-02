import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from 'react-native';
import colors from '../../../../assets/colors';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'rgba(22, 108, 172, 0.2)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modelText:
    {
        fontSize: wp(3.8)
    },
    mainModelContainer: {
        height: hp(58),
        width: wp(80),
        padding: wp(3),
        backgroundColor: "#E3E3E3",
        alignItems: 'center',
        borderRadius: wp(4)
        // alignSelf: 'center',
    },
    ModelMessageTextColorContainer: {
        color: colors.app_button_color,
        fontSize: wp(3.8)
    },
    ModelMessageColorContainer: {
        height: '100%',
        width: '25%',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        // backgroundColor:colors.placeholder_color
    },
    ModelMessagePrivacyContainer: {
        height: '100%',
        width: '66%',
        alignItems: "flex-start"
    },
    ModelMessageAndContainer: {
        height: '100%',
        width: '10%',
        alignItems: 'flex-start',
    },
    ModelMessageAndConditionContainer: {
        height: '100%',
        width: '24%',
        alignItems: 'flex-start',
    },
    ModelMessageBothTwoContainer: {
        height: wp(7),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    AgreeTextStyleContainer: {
        // fontWeight: 'bold',
        fontSize: wp(4.2),

        color: colors.most_blue_button
    },
    closeTextStyleContainer: {
        fontSize: wp(4.2),

        color: colors.app_red
    },
    ModelTitleContainer: {
        height: '10%',
        width: '100%',
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: wp(3),
        // backgroundColor: "pink",
    },

    ModelMessageSimpleContainer: {
        height: '100%',
        width: '80%',
        justifyContent: 'flex-end',
        // backgroundColor:colors.dark_green,
    },
    ModelMessageContainer: {
        height: '58%',
        width: '100%',
        // backgroundColor: 'red',
        justifyContent: "center",
        alignItems: "center"
        // alignSelf: "center"
    },
    ModelMessageBothContainer: {
        height: '50%',
        width: '100%',
        flexDirection: 'row',
        alignItems: "flex-end"
    },
    ModelTitleTextContainer: {
        // fontWeight: 'bold',
        fontSize: wp(3.8),
        textAlign: "center"
    },
    ModelTitle: {
        fontWeight: 'bold',
        fontSize: wp(4.5),
        // textAlign: "center"
    },
    rateTextStyleContainer: {
        color: colors.black,
        fontWeight: 'bold',
    },
    ratingViewContainer: {
        height: '30%',
        width: '90%',
    },
    rateViewContainer: {
        height: '15%',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    secondTextViewContainer: {
        height: '20%',
        width: '80%',
    },
    socialViewContainer: {
        height: '15%',
        width: '80%',
        flexDirection: "row",
        justifyContent: 'center'
    },
    secondTextStyleContainer: {
        color: colors.black,
        textAlign: 'center'
    },
    buttonViewContainer: {
        height: '30%',
        width: '100%',
        // flexDirection:'row',
        // justifyContent: 'flex-end',
        // alignItems: 'flex-end',
        // backgroundColor: 'pink'
    },
    countinueStyle: {
        height: '50%',
        width: '100%',
        // backgroundColor: "yellow",
        justifyContent: "center",
        alignItems: "center"
    },
    closeStyle: {
        height: '50%',
        width: '100%',
        // backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center"
    },
    CancelViewContainer: {
        height: '100%',
        width: '30%',
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        alignContent: 'center',
    },
    okViewContainer: {
        height: '100%',
        width: '70%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 4,
    }
});

export default styles;
