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
        flex:Platform.OS === 'ios' ? 0.11 : 0.15,
        backgroundColor: colors.app_header_color,
        alignItems: 'center'
    },
    dropdownView:
        {
            height:hp(5.5),
            width:wp(92),
            justifyContent:'center',
            alignItems:'center',
            // marginBottom:wp(2.5),
            paddingHorizontal:'5%',
            backgroundColor:colors.app_header_color,
            paddingBottom:Platform.OS === 'ios' ? '10%' : '8.5%',
            borderRadius:wp(1),
            paddingRight:'7%',
            borderWidth:2,
            borderColor:colors.white


        },
    flatListView:{
        flex: Platform.OS === 'ios' ? 0.89 : 0.86,
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
