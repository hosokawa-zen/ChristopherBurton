import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,Platform,FlatList,ImageBackground,TouchableWithoutFeedback} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';
import Button from '../../Button/Button';
import {Select} from "../../Select";





export default class SocialAccountComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const options = this.props.items?this.props.items.map((i, index) => ({value: index, text: i})):[];
        const dropdownOptions = this.props.dropdownItems?this.props.dropdownItems.map((i, index) => ({value: index, text: i})):[];

        return(
            <View style={styles.mainContainer}>

                <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
                    {this.props.iconMedia ?
                        <TouchableOpacity style={styles.imgView} onPress={this.props.onSocialImagePress}>
                            <Image style={styles.img} source={this.props.imageSocial}/>
                        </TouchableOpacity>
                        : null
                    }

                    <View style={[styles.textView,{paddingLeft:this.props.onlyText ? 0 : '0%',width:this.props.iconMedia ? '55%' : '70%'}]}>
                            <Text
                                ellipsizeMode={'tail'}
                                numberOfLines={1}
                                style={[styles.textTitle,{width:this.props.widthText}]}>{this.props.title}</Text>

                        {this.props.dropDownMusic ?
                            <View style={styles.dropdownViewMusic}>
                                <Select
                                    options={options}
                                    iconInvisible
                                    placeholder={"Please Select"}
                                    value={this.props.defaultIndex}
                                    onChange={(value) => this.props.onSelectRingtone(value, this.props.items[value])}
                                />
                            </View>: null }
                        {this.props.numberView ?
                            <Text style={styles.numberText}>{this.props.number}</Text> : null

                        }
                    </View>
                    <View style={styles.playView}>
                        {this.props.removeBtn ?
                            <Button style={styles.btnStyle} bgColor={colors.app_red} titleStyle={styles.titleStyle}
                                    title={'Remove'} onPress={this.props.onRemoveTrigger}/>
                                     : null
                         }
                        {this.props.shwoRightText ?
                            <View style={styles.dropdownView}>
                                <Text style={styles.rightText}>{this.props.rightText}</Text>
                            </View> : null
                        }

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
        // marginTop: 250
    },
    container:{
        height:hp(7),
        width:wp(92),
        backgroundColor:colors.app_header_color,
        // borderRadius:wp(2),
        flexDirection:'row',
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:colors.deep_grey,
    },
    imgView:{
        height: '100%',
        width: '15%',
        justifyContent: 'center',
        // alignItems:'center'
        // paddingLeft:'2%',
        // backgroundColor: 'red',
    },
    img:{
        height:40,
        width:40,
        resizeMode:'contain',
        // borderRadius:wp(2),


    },
    textView:{
        height: '100%',
        width: '55%',
        // backgroundColor: 'blue',
        // borderRadius:wp(2),
        // borderTopRightRadius:wp(2),
        // borderBottomRightRadius:wp(2),
        justifyContent:'space-between',
        // paddingLeft: '2%',
        flexDirection: 'row',
        alignItems:'center'
    },
    playView:{
        // flexDirection: 'row',
        // justifyContent:'flex-end',
        alignItems: 'flex-end',
        height: '100%',
        width: '30%',
        // paddingRight:'2%',
        // backgroundColor:colors.app_red,
        // borderRadius:wp(2),
        justifyContent:'center',
        // paddingLeft:'4%'
        // alignItems: 'center',
    },
    icon:{
        height:32,
        width:32,
        resizeMode:'contain',
        // borderRadius:wp(2),
        // borderTopLeftRadius:wp(2),
        // borderBottomLeftRadius:wp(2)
    },
    textTitle:{
        fontSize:wp(3.6),
        fontWeight:'bold',
        color:colors.white
    },
    numberText:{
        fontSize:wp(5),
        fontWeight:'bold',
        color:colors.app_orange,
        paddingRight:'7%',
        paddingLeft:'3%'
    },
    btnStyle:{
        height:'65%',
        width:'100%',
        borderRadius: 5,
    },
    titleStyle:{
        fontSize: 15,
        fontWeight: 'bold',
        color:colors.white
    },
    dropdownView:
        {
            // marginBottom:wp(2.5),
            paddingHorizontal:'5%',
            backgroundColor:colors.app_header_color,
        },

    rightText: {
        color: colors.white
    },

    dropdownViewMusic:
        {
            marginTop: 8,
            paddingHorizontal:'5%',
            marginRight:12
        },







});




