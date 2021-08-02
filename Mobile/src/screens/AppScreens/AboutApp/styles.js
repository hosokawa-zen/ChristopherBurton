import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
            flex: 0.09
        },
    upperView:
        {
            flex: 0.48,
            // justifyContent: 'flex-end',
            alignItems: 'center',
            // backgroundColor: colors.white,
            // borderTopColor: colors.white,
            // borderTopWidth: wp(0.2)

        },
    midView:
        {
            flex: 0.39,
            // justifyContent:'flex-start',
            alignItems: 'center',
            // paddingTop:wp(2),
            // backgroundColor:colors.blue

        },

    lowerView:
        {
            flex: 0.15,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor:colors.white

        },
    imageStyles:
        {
            height: '75%',
            width: '75%',
            resizeMode: 'contain'
        },
    textStyle:
        {
            fontSize: wp(4),
            color: colors.white,
            textAlign: 'center'

        },
    buttonStyles:
        {
            borderRadius: wp(2),
            height: hp(8),
            width: '80%',
            // paddingLeft:wp(5),
            // backgroundColor:colors.white,
            marginBottom: wp(4),

        },
    textContainer:
        {
            flex: 0.35,
            // paddingHorizontal:wp(10),
            paddingTop: wp(8),
            alignItems: 'center',
            // backgroundColor:'red'


        },
    textContainer1:
        {
            flex: 0.85,
            paddingHorizontal: wp(5),
            paddingTop: wp(5),
            alignItems: 'center',
            // backgroundColor:'red'

        },
    textbottomStylesr:
        {
            fontSize: wp(4),
            color: colors.white,
            // textAlign:'center'
        }

});


export default styles;
