import React  ,{ useState}from 'react';
import { View,Text,TextInput,StyleSheet,Image,ImageBackground,TouchableOpacity,ScrollView,Switch} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from "../../../assets/colors";

class AppointsmentsItem extends React.Component{

    constructor(props) {
        super(props);

        this.state={
            viewShow:true,
            switchOneValue: true,
        }

    }


    render()
    {

        // const {
        //     switchOneValue,
        //     switchTwoValue,
        // } = this.state;


        let flexDirection = this.props.flexDirection || 'column';
        let leftIconSize = this.props.leftIconSize;
        let leftIconBorderRadius = this.props.leftIconBorderRadius;
        let rightIconSize = this.props.rightIconSize;
        let secondIconSIze = this.secondIconSIze;
        let rightIconColor= this.props.rightIconColor || colors.white;
        let bottomBorderWidth = this.props.borderWidth;
        let bottomBorderColor = this.props.bottomBorderColor;
        let borderRadius = this.props.borderRadius || wp(1);

        let upperTextColor =  this.props.upperTextColor;
        let lowerTextColor = this.props.lowerTextColor;

        let leftIconImage = this.props.leftIconImage;
        let arrowImage = this.props.arrowImage;
        let switchItem = this.props.switchItem;
        let secondImage = this.props.secondImage;


        let leftIconColor = this.props.leftIconColor || colors.white;
        let textColor = this.props.textColor || colors.black;


        let backgroundColor = this.props.backgroundColor || colors.white;
        let height = this.props.height || hp(12);

        let name = this.props.name || 'empty';
        let lowerText = this.props.lowerText ;


        // const [isEnabled, setIsEnabled] = useState(false);
        // const toggleSwitch = () => setIsEnabled(previousState => !previousState);


        return(



            // <View style={styles.mainContainer}>

            <TouchableOpacity
                onPress={this.props.onPress}
                style={[styles.container,{backgroundColor:backgroundColor,height:height,borderRadius:borderRadius}]}>

                <View style={styles.leftIconContainer}>
                    <Image
                        // source={images.ic_play}
                        style={[styles.leftIconStyle,{height:leftIconSize, width:leftIconSize}]}
                        source={leftIconImage}
                    />
                </View>

                <View style={[styles.centerTextContainer,{paddingLeft:this.props.paddingLeft}]}>

                    <Text style={[styles.textStyleUpper,
                        {color:textColor,fontSize:this.props.fontSizeUppertext || wp(5),fontWeight:this.props.fontWeight}]}>{name}</Text>
                    <Text style={[styles.textStylelower,
                        {fontSize:this.props.fontSizeLowertext || wp(3.8),fontWeight:this.props.fontWeight}]}>{lowerText}</Text>

                </View>
                <View style={styles.rightIconContainer}>

                        <TouchableOpacity style={{flexDirection:'row'}}>
                            {  this.props.secondImage !== undefined ?

                                <Image
                                    // source={images.ic_play}
                                    style={[styles.leftIconStyle,{height:rightIconSize, width:rightIconSize,
                                        tintColor:this.props.rightIconSecondColor}]}
                                    source={secondImage}
                                />:null

                            }

                            { this.props.arrowImage !==undefined ?
                                <Image
                                    // source={images.ic_play}
                                    style={[styles.leftIconStyle,{height:rightIconSize, width:rightIconSize,
                                        tintColor:rightIconColor}]}
                                    source={arrowImage}
                                />:null
                            }


                        </TouchableOpacity>

                </View>
            </TouchableOpacity>
            // </View>
        )
    }
}

const styles = StyleSheet.create({

    mainContainer:
        {
            flex:1,
            justifyContent:'center',
            // backgroundColor:colors.white
        },

    container:
        {
            height:hp(10),
            width:'100%',
            // backgroundColor:colors.dark_green,
            flexDirection:'row',
            marginVertical:wp(1),
            paddingHorizontal:wp(5),
            borderRadius:wp(1),
            // paddingHorizontal:wp(3),
            // borderBottomWidth:wp(0.1),
            // borderBottomColor:colors.light_green,
        },
    leftIconContainer:
        {
            justifyContent:'center',
            alignItems:'center',
            flex:0.15,
            // backgroundColor:colors.gold,

        },
    centerTextContainer:
        {
            justifyContent:'center',
            flex:0.77,
            paddingLeft:wp(3),
            // backgroundColor:colors.dark_orange,

        },
    rightIconContainer:
        {
            justifyContent:'center',
            alignItems:'flex-end',
            // flexDirection:'row',
            // paddingRight:wp(3),
            flex:0.08,

            // backgroundColor:colors.blue,
        },
    leftIconStyle:
        {
            height:wp(10),
            width:wp(10),
            resizeMode:'contain',
            marginLeft:wp(3),
        },
    rightIconStyle:
        {
            height:wp(10),
            width:wp(10),
            resizeMode:'contain',
        },

    textStyleUpper:
        {
            fontSize:wp(5),
            color:colors.most_blue_button,
        },
    textStylelower:
        {
            fontSize:wp(3.8),
            color:colors.black,
        },
    firstIconContainer:
        {
            flex:1,
            // backgroundColor:colors.bright_red,
            alignItems:'center',
        },
    secondIconConatiner:
        {
            flex:1,
            alignItems:'center',
            // backgroundColor:colors.dark_grey,
        }




});

export default AppointsmentsItem;
