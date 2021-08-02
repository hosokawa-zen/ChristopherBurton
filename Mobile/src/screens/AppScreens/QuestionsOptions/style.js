import {StyleSheet} from 'react-native';
import colors from '../../../../assets/colors';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

const styles= StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:colors.app_header_color
        // alignItems:'center',
    },
    headerView:{
        flex: 0.1,
        // backgroundColor: 'green',
    },
    bottomContainer:{
        flex: 0.9,
        // backgroundColor:'grey',
        paddingHorizontal:'3%'
    },
    title:{
        fontSize:wp(4),
        color:colors.white,
        paddingVertical:'2%'
    },
    stockView:{
        flex:0.15,
        justifyContent:'space-between',
        flexDirection:'row',
        // backgroundColor: 'blue',
        alignItems:'center',
        marginTop:10,
        paddingVertical: '2%'
    },
    checkBoxView:{
        flexDirection:'row',
        width:'31%',
        justifyContent:'space-between',
    },
    checkBoxViewCylinders:{
        flexDirection:'row',
        justifyContent:'space-between',
        // backgroundColor:'orange',
    },
    displacementView:{
        flex:0.02,
        // backgroundColor: 'red',
        justifyContent:'center',

    },
    appInput:{
        height:45,
        width: '80%',
        // backgroundColor:'red'
    },
    cylindersView:{
        flex:0.1,
        flexDirection:'row',
        // backgroundColor: 'orange',
        justifyContent:'space-between',
        paddingVertical:'4%'
    },
    configurationView:{
        flex:0.1,
        flexDirection:'row',
        // backgroundColor: 'green',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:'4%'
    },
    checkBoxViewConfiguration:{
        flexDirection:'row',
        justifyContent:'space-between',
        // backgroundColor:'orange'
    },
    forcedView:{
        flex:0.05,
        justifyContent:'space-between',
        flexDirection:'row',
        // backgroundColor: 'green',
        alignItems:'center',
        paddingVertical:'2%'
    }


});


export default styles;
