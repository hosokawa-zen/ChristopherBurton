import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,FlatList,ImageBackground,TouchableWithoutFeedback} from 'react-native';
import AppHeader from "../../../Components/AppHeader";
import images from "../../../../assets/images";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';
import Button from '../../Button/Button';
import RevtoneCategoryComponent from '../RevtoncategoryComponent/RevtoncategoryComponent';





export default class CarProfileComponent extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            paused: false,
        }
    }

    onPlayPress = () => {
        this.setState({
            paused: !this.state.paused
        })
        this.props.onPlay(this.state.paused)
    }


    render() {
        return(
            <View style={styles.mainContainer}>

                <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
                    <TouchableOpacity style={styles.imgView} onPress={this.onPlayPress}>
                        <Image style={styles.img} source={images.icn_play_small}/>
                    </TouchableOpacity>
                    <View style={styles.textView}>
                        <Text style={styles.textTitle}>{this.props.title}</Text>
                    </View>
                    <View style={styles.playView}>
                        <Button style={styles.btnStyle} titleStyle={styles.titleStyle} title={'Download Ringtone'} onPress={() => this.props.onDownloadPress()}/>
                        <TouchableOpacity onPress={() => this.props.onFlagPress()}>
                            <Image style={styles.icon} source={this.props.is_favorite?images.full_flag:images.flag} />
                        </TouchableOpacity>
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
        // backgroundColor:colors.black,
        // justifyContent: 'center'
    },
    container:{
        height:hp(7),
        width:wp(92),
        backgroundColor:colors.app_header_color,
        // borderRadius:wp(2),
        flexDirection:'row',
        borderTopWidth:0.3,
        borderBottomWidth:0.3,
        borderColor:colors.white
    },
    imgView:{
        height: '100%',
        width: '15%',
        justifyContent: 'center',
        // alignItems:'center'
        paddingLeft:'2%',
        // backgroundColor: 'red',
    },
    img:{
        height:33,
        width:33,
        resizeMode:'contain',
        // borderRadius:wp(2),


    },
    textView:{
        height: '100%',
        width: '25%',
        // backgroundColor: 'blue',
        // borderRadius:wp(2),
        // borderTopRightRadius:wp(2),
        // borderBottomRightRadius:wp(2),
        justifyContent:'center',
        paddingLeft: '1%'
    },
    playView:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        height: '100%',
        width: '60%',
        paddingRight:'2%',
        // backgroundColor:colors.app_brown,
        // borderRadius:wp(2),
        // justifyContent:'center',
        // paddingLeft:'4%'
        // alignItems: 'center',
    },
    icon:{
        height:20,
        width:20,
        resizeMode:'contain',
        // borderRadius:wp(2),
        // borderTopLeftRadius:wp(2),
        // borderBottomLeftRadius:wp(2)
    },
    textTitle:{
        fontSize:wp(4),
        fontWeight:'bold',
        color:colors.white
    },
    btnStyle:{
        height:'65%',
        width:'85%',
        borderRadius: 7
    },
    titleStyle:{
        fontSize: 14,
        fontWeight: 'bold',
        color:colors.white
    }





});




