import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Platform, StyleSheet} from 'react-native';
import colors from '../../../../assets/colors';



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
    },
    imgView:{
        paddingVertical: 8,
        backgroundColor:colors.app_header_color,
        alignItems:'center',
        justifyContent:'center',
    },
    image:{
        height:140,
        width:140,
        resizeMode:'contain',
        borderRadius: 140
    },

    itemContainer: {
        width:'100%',
        flexDirection: 'row',
        flex: 1,
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemContent: {
        flexDirection: 'row',
        flexGrow: 1,
        alignItems: 'center'
    },
    img: {
        width: 48,
        height: 48,
    },
    textTitle:{
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 12
    },
    btnStyle: {
        height: 48,
        width: 120,
        borderRadius: 8
    },

    inputsView:{
        height:Platform.OS === 'ios' ? hp(40) : hp(47),
        // backgroundColor:'red',
        alignItems:'center',
    },
    infoView:{
        height:Platform.OS === 'ios' ? hp(9) : hp(11),
        width: '94%',
        // backgroundColor: 'red',

    },

    infoTitle:{
        fontSize:wp(4),
        color:colors.white
    },
    dropdownView:
        {
            height:hp(5.5),
            width:wp(94),
            justifyContent:'center',
            alignItems:'center',
            paddingHorizontal:'5%',
            backgroundColor:colors.app_header_color,
            paddingBottom:Platform.OS === 'ios' ? '10%' : '8%',
            borderRadius:wp(0.5),
            paddingRight:'7%',
            borderWidth:0.3,
            borderColor:colors.white,
            marginTop:10


        },
    ageView:{
        height:Platform.OS === 'ios' ? hp(9) : hp(11),
        marginTop: 7,
        // backgroundColor: 'red',
    },
    headingText:{
        fontSize:wp(4.5),
        fontWeight:'bold',
        color:colors.white,
        paddingBottom:'1.5%'
    },

    socialAccountView:{
        width:wp(94),
        alignSelf:'center',
        marginTop: 12,
        // backgroundColor: 'red',
    },
    revScores:{
        width:wp(94),
        alignSelf:'center',
        marginTop: 12,
        // backgroundColor: 'red',
    },
    noText: {
        marginTop: 12,
        textAlign: 'center',
        color: 'white'
    }



});


export default styles;
