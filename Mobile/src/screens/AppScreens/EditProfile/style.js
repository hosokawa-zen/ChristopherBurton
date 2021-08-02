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
        height:hp(25),
        backgroundColor:colors.app_header_color,
        alignItems:'center',
        justifyContent:'center',
    },
    image:{
        height:140,
        width:140,
        resizeMode:'contain',
        borderRadius: 70
    },

    // userImageContainer: {
    //     width: hp(25),
    //     height: "75%",
    //     backgroundColor: colors.app_header_color,
    //     // backgroundColor: colors.blue,

    //     // width: "40%",
    //     justifyContent: "center",
    //     alignItems: "center"
    // },

    // userProfileImage: {
    //     width: "70%",
    //     height: "70%",
    //     resizeMode: 'contain',
    //     borderRadius: wp(12),
    // },

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
        height:Platform.OS === 'ios' ? hp(43) : hp(45),
        width:wp(94),
        alignSelf:'center',
        marginTop: 12,
        // backgroundColor: 'red',

    },
    revScores:{
        height:Platform.OS === 'ios' ? hp(29) : hp(31),
        width:wp(94),
        alignSelf:'center',
        marginTop: 12,
        // backgroundColor: 'red',
    },




});


export default styles;
