import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RadioButton from "./RadioButton";
import images from "../../assets/images";
import CheckBox from "./CheckBox";
export default class ModalView extends React.Component {

    render() {
        return(
            <View style={styles.mainContainer} >
                <View style={styles.modalContainer}>

                     <Text style={styles.textTitle}>8:00 AM</Text>

                     <View style={styles.viewCheck}>
                         <Text style={styles.text}>Only on this day</Text>
                         <CheckBox />
                     </View>
                    <View style={styles.viewLine} />

                    <View style={styles.viewCheck}>
                        <Text style={styles.text}>Same day and time every week</Text>
                        <CheckBox />
                    </View>
                    <View style={styles.viewLine} />

                    <View style={styles.viewCheck}>
                        <Text style={styles.text}>Same time every day M-F</Text>
                        <CheckBox />
                    </View>
                    <View style={styles.viewLine} />

                    <Text style={styles.textTime}>Same Time:</Text>

                    <View style={styles.viewDays}>
                        <CheckBox checkTitle={'M'} />
                        <CheckBox checkTitle={'T'} />
                        <CheckBox checkTitle={'W'} />
                        <CheckBox checkTitle={'TH'} />
                        <CheckBox checkTitle={'F'} />
                    </View>
                    <View  style={{alignItems:'center',marginTop:hp(2.5)}}>
                    <View style={styles.viewDay} >
                    <CheckBox checkTitle={'SA'} />
                    <CheckBox checkTitle={'SU'} />
                    </View>
                    </View>

                    <View style={[styles.viewLine,{height:hp(0.4)}]} />
                    <Text style={{
                        fontSize:wp(3.2),
                        fontFamily:'Montserrat-Regular',
                        marginVertical: hp(2),
                        textAlign:'center'
                    }}> Selection will apply to current month only. </Text>

                 <View style={styles.viewModalBtn}>
                      <TouchableOpacity>
                          <Text style={styles.textBtn}>Save</Text>
                      </TouchableOpacity>
                     <TouchableOpacity style={{marginLeft:wp(7)}}>
                         <Text style={styles.textBtn}>Cancel</Text>
                     </TouchableOpacity>
                 </View>

                </View>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    mainContainer:{
        // flex:1,
        // backgroundColor:'grey',
        // justifyContent:'center',
        // alignItems:'center',
    },
    textTitle: {
        fontSize:wp(3.8),
        textAlign:'left',
        // fontFamily:'Montserrat-Bold',
        marginTop:hp(2.5),
        marginLeft: wp(4),
    },
    text:{
        fontSize:wp(3.2),
        // fontFamily:'Montserrat-Regular'
    },
    modalContainer: {
         height:hp(63),
         width:wp(80),
        borderRadius:wp(0.5),
        backgroundColor: '#fff',
    },
    viewModalText:{
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(6),
        // backgroundColor:'green',
        borderTopLeftRadius: wp(3),
        borderTopRightRadius:wp(3),
    },

    viewModalBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: hp(5),
        // backgroundColor:'blue',
        marginTop:hp(2),
        // borderWidth: 2,
        paddingRight:wp(7),
    },
    textBtn:{
        fontSize:wp(3.8),
        textAlign:'right',
        color:'#E83428',
        // fontFamily:'Montserrat-Bold',
    },
    viewCheck:{
        flexDirection: 'row',
        alignItems:"center",
        justifyContent:'space-between',
        marginHorizontal:wp(4),
        marginTop:hp(3)
    },
    viewLine:{
        height:hp(0.2),
        width:wp(70),
        backgroundColor:'#E6E7E8',
        marginTop: hp(2),
        marginLeft:wp(4),

    },
    viewDays:{
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'green',
        justifyContent:'space-around',
        marginHorizontal: wp(5),
    },
    viewDay:{
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'green',
        justifyContent:'space-around',
        width:'50%',
    },
    textTime:{
        fontSize:wp(3.2),
        // fontFamily:'Montserrat-Regular',
        marginVertical:hp(2.5),
        marginLeft:wp(4),
    }




});


