import React from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';
import images from "../../../assets/images";
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import NotificationComponent from '../NotificationComponent/NotificationComponent';
import colors from '../../../assets/colors';



export default class MessageComponent extends React.Component {



    render() {
        return(

            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

                <TouchableOpacity
                    onPress={this.props.onPress}
                    style={styles.mainContainer}>


                    <View style={styles.container}>
                        <View style={styles.containerInnerUpperView}>
                            <Image style={styles.img}

                                   source={this.props.image}
                            />

                            <View style={{paddingLeft:'5%'}}>
                                <View style={{width:'78%',flexDirection:'row',justifyContent: 'space-between'}}>
                                    <Text style={styles.titleUpperView}>{this.props.title}</Text>
                                    <View style={{flexDirection:'row',}}>
                                        <Image style={{height:15,width:15,resizeMode: 'contain'}}

                                               source={images.ic_calender_2}
                                        />

                                        <Text style={{paddingLeft:'2%',fontSize:12,fontStyle:'italic',fontWeight: 'bold'}}>{this.props.date}</Text>
                                    </View>
                                </View>
                                <Text style={styles.textUpperView}>{this.props.text}</Text>
                            </View>

                        </View>
                    </View>

                </TouchableOpacity>

             </View>

        );
    }
}


const styles = StyleSheet.create({

    mainContainer:{
        backgroundColor: colors.item_background,
        height:100,
        width:'94%',
        justifyContent:'center',
        // paddingLeft:'3%',
        //     paddingTop:'2%'
        marginTop:10,
    },
    container:{
        // flexDirection:'row',
        // alignItems:'center',
        // justifyContent:'space-between',
        paddingLeft:'3%'
    },
    img:{
        height: 40,
        width: 40,
        resizeMode:"contain",
        paddingRight:'7%',
    },
    containerInnerUpperView:{
        flexDirection:'row',
        alignItems:'center',
    },
    titleUpperView:{
        fontSize:wp(3.7),
        fontWeight:'bold',
        // color:'#999999',
        // paddingBottom:'2%'
    },
    textUpperView:{
        fontSize:wp(3),
        // color:'#999999'
        paddingTop:'2%'
    },
    containerInnerBottomView:{
        alignItems:'center',
    },






});



