import {Platform, StyleSheet} from 'react-native';
import colors from '../../../assets/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const styles = StyleSheet.create({

    mainContainer:{
        backgroundColor: colors.white,
        height: Platform.OS === 'ios' ? hp(18) : hp(19.5),
        width:wp(94),
        flexDirection:'row',
        shadowColor:colors.black,
        shadowOffset:{width:2,height:2},
        shadowOpacity:0.2,
        elevation:5,
        marginTop:2,
        marginBottom:5

    },
    img:{
        height: '70%',
        width: '80%',
        resizeMode:"cover",
        // backgroundColor: 'red'
    },
    leftSide:{
        height:'100%',
        width:'35%',
        alignItems:'center',
        justifyContent: 'center',
    },
    middleSide:{
        height:'100%',
        width:'30%',
        // alignItems:'center',
        // justifyContent: 'center',
        // backgroundColor: 'green',
        paddingTop:'5.5%',
    },
    rightSide:{
        height:'100%',
        width:'35%',
        // backgroundColor:'orange',
        alignItems: 'center',
        justifyContent:'space-between',
        paddingTop:'5%',
        paddingBottom:'22.5%'
    },
    icon:{
        height:20,
        width:20,
        resizeMode: 'contain',
    },
    textOrderType:{
        fontWeight:'bold',
        paddingVertical:'3%',
        paddingRight:'70%',
    },
    textPriceCart:{
        fontSize:wp(4),
        color:colors.moss_bright,
        fontWeight:'bold',
        paddingLeft:'50%',
    },
    orderConditionView:{
        height:30,
        width:'85%',
        borderWidth:1,
        borderColor:colors.moss_bright,
        alignItems:'center',
        justifyContent:'center',
        marginRight:'15%',
        marginBottom: '3%'
    }




});


export default styles;