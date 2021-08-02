import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import colors from '../../../../assets/colors';
import {StyleSheet} from 'react-native';

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

    midView:
        {
            flex: 0.7,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: wp(7),
            // backgroundColor:colors.blue

        },

    lowerView:
        {
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor:colors.white

        },
    imageStyles:
        {
            height: '65%',
            width: '65%',
            resizeMode: 'contain'
        },
    textStyle:
        {
            fontSize: wp(4),
            color: colors.white,
            textAlign: 'center'

        },
    textContainer:
        {
            // flex:0.5,
            paddingHorizontal: wp(10),
            paddingTop: wp(5),
            justifyContent: 'center',
            alignItems: 'center',

        }

});

export default styles;
