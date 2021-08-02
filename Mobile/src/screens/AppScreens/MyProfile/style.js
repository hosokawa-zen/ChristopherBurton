import {Platform, StyleSheet} from 'react-native';
import colors from '../../../../assets/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
        height:hp(27),
        backgroundColor:colors.app_header_color,
        alignItems:'center',
        justifyContent:'center',
    },
    image:{
        height:'65%',
        width:'65%',
        resizeMode:'contain',
        borderRadius: wp(20),
    },
    // userImageContainer: {
    //     width: "75%",
    //     height: "75%",
    //     backgroundColor: colors.app_header_color,
    //     // backgroundColor: colors.blue,

    //     // width: "40%",
    //     justifyContent: "center",
    //     alignItems: "center"
    // },

    // userProfileImage: {
    //     width: wp(23),
    //     height: wp(23),
    //     resizeMode: 'cover',
    //     borderRadius: wp(12),
    // },

    name:{
        fontSize:wp(5.4),
        color:colors.white,
        fontWeight: 'bold',
        paddingTop:'4%'
    },
    location:{
        fontSize:wp(4),
        color:colors.white,
        paddingTop:'1%'
    },
    headingText:{
        fontSize:wp(4.5),
        fontWeight:'bold',
        color:colors.white,
        paddingBottom:'1.5%'
    },
    viewHeading:{
        borderBottomWidth:1,
        paddingBottom: '3%',
        borderColor: colors.white
    },
    socialAccountView:{
        height:Platform.OS === 'ios' ? hp(34) : hp(36),
        width:wp(94),
        alignSelf:'center',
        marginTop: 15,
        flexGrow: 1,
    },
    revScores:{
        height:Platform.OS === 'ios' ? hp(19) : hp(21),
        width:wp(94),
        alignSelf:'center',
        marginTop: 15,
        // backgroundColor: 'red',
    },




});

export default styles;
