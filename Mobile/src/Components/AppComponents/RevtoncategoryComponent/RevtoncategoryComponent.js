import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,FlatList,ImageBackground,TouchableWithoutFeedback} from 'react-native';
import AppHeader from "../../../Components/AppHeader";
import images from "../../../../assets/images";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';





export default class RevtoneCategoryComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {


        }
    }


    render() {
        return(
            <View style={styles.mainContainer}>

                <TouchableOpacity onPress={this.props.onPress} style={[styles.container,{backgroundColor: this.props.backgroundColor || colors.shadow_black}]}>
                    <View style={styles.imgView}>
                    <Image style={styles.img} source={{uri: this.props.image}}/>
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.textTitle}>{this.props.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }
}




const styles= StyleSheet.create({
    mainContainer:{
        // flex:1,
        alignItems:'center',
        marginTop:10
    },
    container:{
        height:hp(12),
        width:wp(90),
        backgroundColor:colors.app_button_color,
        borderRadius:wp(2),
        flexDirection:'row'
    },
    imgView:{
        height: '100%',
        width: '35%',
        // backgroundColor: 'red',
        borderTopLeftRadius:wp(2),
        borderBottomLeftRadius:wp(2)    },
    img:{
        height:'100%',
        width:'100%',
        resizeMode:'cover',
        // borderRadius:wp(2),
        borderTopLeftRadius:wp(2),
        borderBottomLeftRadius:wp(2)

    },
    textView:{
        height: '100%',
        width: '65%',
        // backgroundColor: 'blue',
        // borderRadius:wp(2),
        borderTopRightRadius:wp(2),
        borderBottomRightRadius:wp(2),
        justifyContent:'center',
        paddingLeft:'4%'

    },
    textTitle:{
        fontSize:wp(4),
        fontWeight:'bold',
        color:colors.white
    }





});




