import React  ,{ useState}from 'react';
import { View,Text,TextInput,StyleSheet,Image,ImageBackground,TouchableOpacity,ScrollView,Switch} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../assets/colors';


class FriendlistItem extends React.Component{

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

        let upperTextColor =  this.props.upperTextColor;
        let lowerTextColor = this.props.lowerTextColor;

        let leftIconImage = this.props.leftIconImage;
        let arrowImage = this.props.arrowImage;
        let switchItem = this.props.switchItem;
        let rightSecondIconImageTop = this.props.rightSecondIconImageTop;
        let rightSecondIconImageBottom = this.props.rightSecondIconImageBottom;

        let leftIconColor = this.props.leftIconColor || colors.white;
        let textColor = this.props.textColor || colors.white;


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
                style={[styles.container,{backgroundColor:backgroundColor,height:height}]}>

                <View style={styles.leftIconContainer}>
                    <Image
                        // source={images.ic_play}
                        style={[styles.leftIconStyle,{height:leftIconSize, width:leftIconSize}]}
                        source={leftIconImage}
                    />
                </View>

                <View style={styles.centerTextContainer}>

                    <Text style={[styles.textStyleUpper,{color:textColor}]}>{name}</Text>
                    {/*<Text style={styles.textStylelower}>{lowerText}</Text>*/}

                </View>
                <View style={styles.rightIconContainer}>

                        <TouchableOpacity>
                            <Image
                                // source={images.ic_play}
                                style={[styles.leftIconStyle,{height:rightIconSize, width:rightIconSize,
                                    tintColor:rightIconColor}]}
                                source={arrowImage}
                            />
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
            backgroundColor:colors.dark_green,
            flexDirection:'row',
            marginVertical:wp(0.2),
            paddingHorizontal:wp(5),
            // borderRadius:wp(2)
            // paddingHorizontal:wp(3),
            borderBottomWidth:wp(0.1),
            borderBottomColor:colors.light_green,
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
            // paddingRight:wp(3),
            flex:0.08,

            // backgroundColor:colors.blue,
        },
    leftIconStyle:
        {
            height:wp(10),
            width:wp(10),
            resizeMode:'contain',
        },
    rightIconStyle:
        {
            height:wp(10),
            width:wp(10),
            resizeMode:'contain',
        },

    textStyleUpper:
        {
            fontSize:wp(4.5),
            color:colors.most_blue_button,
        },
    textStylelower:
        {
            fontSize:wp(3.5),
            color:colors.white,
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

export default FriendlistItem;