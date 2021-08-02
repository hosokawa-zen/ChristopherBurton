import React from 'react';
import { View,Text,TextInput,StyleSheet,Image,ImageBackground,TouchableOpacity,ScrollView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../assets/colors';
import images from '../../../assets/images';


class FlatListItem extends React.Component{

    constructor(props) {
        super(props);

        this.state={
            viewShow:true,
        }

    }

    render()
    {

        let flexDirection = this.props.flexDirection || 'column';
        let leftIconSize = this.props.leftIconSize;
        let leftIconBorderRadius = this.props.leftIconBorderRadius;
        let rightIconSize = this.props.rightIconSize;
        let secondIconSIze = this.secondIconSIze;

        let bottomBorderWidth = this.props.borderWidth;
        let bottomBorderColor = this.props.bottomBorderColor;

        let upperTextColor =  this.props.upperTextColor;
        let lowerTextColor = this.props.lowerTextColor;

        let leftIconImage = this.props.leftIconImage;
        let rightFirstIconImage = this.props.rightFirstIconImage;
        let rightSecondIconImageTop = this.props.rightSecondIconImageTop;
        let rightSecondIconImageBottom = this.props.rightSecondIconImageBottom;


        let backgroundColor = this.props.backgroundColor || colors.black_shadow;
        let height = this.props.height || hp(12);

        let upperText = this.props.upperText || 'empty';
        let lowerText = this.props.lowerText ;




        return(

            // <View style={styles.mainContainer}>

                <View style={[styles.container,{backgroundColor:backgroundColor,height:height}]}>

                    <View style={styles.leftIconContainer}>
                        <Image
                            // source={images.ic_play}
                        style={[styles.leftIconStyle,{height:leftIconSize, width:leftIconSize}]}
                               source={leftIconImage}
                        />
                    </View>

                    <View style={styles.centerTextContainer}>

                        <Text style={styles.textStyleUpper}>{upperText}</Text>
                        <Text style={styles.textStylelower}>{lowerText}</Text>

                    </View>
                    <View style={styles.rightIconContainer}>

                        <View style={styles.firstIconContainer}>

                            <Image source={images.ic_filter_inactive}
                                   style={[styles.rightIconStyle,{height:rightIconSize,width:rightIconSize}]}
                                source={rightFirstIconImage}

                            />

                        </View>

                        <View style={styles.secondIconConatiner}>

                            <Image source={images.ic_filter_inactive}
                                   style={[styles.rightIconStyle,{height:rightIconSize,width:rightIconSize}]}
                                source={rightSecondIconImageTop}

                            />
                            {/*<Image*/}
                            {/*    // source={images.ic_filter_inactive}*/}
                            {/*       style={[styles.rightIconStyle,{height:rightIconSize,width:rightIconSize}]}*/}
                            {/*    // source={leftIconImage}*/}

                            {/*/>*/}

                        </View>
                    </View>
                </View>
            // </View>
        )
    }
}

const styles = StyleSheet.create({

    mainContainer:
        {
            flex:1,
            justifyContent:'center',
            backgroundColor:colors.white
        },

    container:
        {
            height:hp(15),
            width:'100%',
            backgroundColor:colors.grey,
            flexDirection:'row',
            paddingHorizontal:wp(2),
            marginVertical:wp(0.5)
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
            flex:0.55,
            paddingLeft:wp(2),
            // backgroundColor:colors.dark_orange,

        },
    rightIconContainer:
        {
            justifyContent:'center',
            alignItems:'center',
            flex:0.3,
            flexDirection: 'row',
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
    rightSecondIconStyle:
        {
            height:wp(10),
            width:wp(10),
            resizeMode:'contain',
        },
    textStyleUpper:
        {
            fontSize:wp(5),
            color:colors.white,
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

export default FlatListItem;