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
        // backgroundColor:'grey'
    },
    sliderCotainer:{
        flex:Platform.OS === 'ios' ? 0.3 : 0.4,
    },
    imageBackGround:
        {
            height:'100%',
            width:'100%',
            justifyContent:'flex-end',
        },
    dotTextView:
        {
            flexDirection:'row',
            height:'25%',
            width:'100%',
            backgroundColor:'rgba(0, 0, 0, 0.5)',
            // justifyContent:'center',
            paddingHorizontal:wp(5),
            alignItems:'center'
        },
    createdText:{
        color:colors.white,
        fontWeight:'bold',
        fontSize:wp(2.8)
    },
    nameText:{
        color:colors.white,
        fontWeight:'bold',
        fontSize:wp(3.3)
    },
    icon:{
        height:35,
        width:35,
        resizeMode:'contain'
    },
    carInfoView:{
        flex: Platform.OS === 'ios' ? 0.3 : 0.5,
        // backgroundColor:'green'
    },
    flatListView: {
        flex:0.4,
        // backgroundColor: 'red',
    },
    iconsView:{
        flexDirection: 'row',
        alignSelf:'center',
        paddingTop:'5%',
        // backgroundColor:'red',
        width:'35%',
        justifyContent: 'space-between'
    },
    title:{
        textAlign:'center',
        fontSize:wp(4.5),
        fontWeight:'bold',
        color:colors.white,
        paddingVertical:'3%'
    },
    infoText:{
        textAlign:'center',
        fontSize:wp(3.7),
        fontWeight:'bold',
        color:colors.white,
        paddingHorizontal: '5%'
    },
    iconSocial:{
        height:36,
        width:36,
        resizeMode:'contain'
    },
    dot:{
        backgroundColor:'transparent',
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth:1.5,
        borderColor:colors.white,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    activeDot:{
        backgroundColor: colors.white,
        width: 12,
        height: 12,
        borderRadius: 6,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    }




});




export default styles;
