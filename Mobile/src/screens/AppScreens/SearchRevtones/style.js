import {Platform, StyleSheet} from 'react-native';
import colors from '../../../../assets/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles= StyleSheet.create({
    mainContainer:{
        flex:1,
        // alignItems:'center',
    },
    headerView:{
        flex: 0.1,
        // backgroundColor: 'green',
    },
    bottomContainer:{
        flex: 0.9,
        // backgroundColor:colors.app_header_color
    },
    categoryView:{
        flex:Platform.OS === 'ios' ? 0.14 : 0.15,
        backgroundColor: colors.app_header_color,
        alignItems: 'center'
    },
    dropdownView:
        {
            width: '100%',
            paddingHorizontal: 12,
            backgroundColor:colors.app_header_color,
        },
    flatListView:{
        flex: Platform.OS === 'ios' ? 0.86 : 0.86,
        backgroundColor: colors.app_header_color

    },
    titleText:{
        fontSize:wp(4),
        fontWeight:'bold',
        color:colors.app_button_color,
        paddingVertical:'2%'
    }

});


export default styles;
