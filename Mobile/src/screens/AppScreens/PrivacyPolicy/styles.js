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
        alignItems: 'center',
        padding: wp(5),
        borderTopColor: colors.white,
    },

    textContainer:
    {
        fontSize: wp(4),
        color: colors.white,
        // textAlign:'center'
    }

});
export default styles;
