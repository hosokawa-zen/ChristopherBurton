import React from 'react';
import {Image, StyleSheet, TextInput, TouchableWithoutFeedback, View,Text} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import images from '../../../assets/images';
import colors from '../../../assets/colors';

class InviteFriendsItem extends React.Component{

    constructor(props) {
        super(props);

        this.state={

            rightIcon:images.ic_minus,
        }
    }

    inviteFriend()
    {


        if (this.state.rightIcon == images.ic_minus)
        {
            this.setState({rightIcon:images.ic_plus})
        }else if (this.state.rightIcon == images.ic_plus)
        {
            this.setState({rightIcon:images.ic_minus})

        }



    }


    render()
    {

        let style = this.props.style;
        let shadow = this.props.shadow;

        let height = this.props.height || 53;
        let width = this.props.width || '85%';

        let marginTop = this.props.marginTop || 5;
        let marginBottom = this.props.marginBottom;
        let marginLeft = this.props.marginLeft;
        let marginRight = this.props.marginRight;

        let paddingLeft = this.props.paddingLeft || '0%';
        let paddingRight = this.props.paddingRight;
        let paddingTop = this.props.paddingTop;
        let paddingBottom = this.props.paddingBottom;

        let borderColor = this.props.borderColor || '#9ec600';
        let borderWidth = this.props.borderWidth;
        let borderRadius = this.props.borderRadius;

        let backgroundColor = this.props.backgroundColor || 'white';

        let rightIconSize = this.props.rightIconSize || 25 ;

        let rightIconPath = this.props.rightIconPath || images.ic_add;


        return (
            <View style={[styles.inputFieldTextView,shadow,style,{height:height
                ,width:width,marginTop:marginTop,paddingBottom:paddingBottom,marginBottom:marginBottom,
                paddingTop:paddingTop,backgroundColor:backgroundColor,
                paddingLeft: paddingLeft,borderWidth: borderWidth
                ,borderColor:borderColor,borderRadius:borderRadius} ]}>
                {this.props.leftIconPath !== undefined &&

                <View style={styles.leftImageViewStyle}>
                    <Image style={this.props.imageStyle !== undefined ? this.props.imageStyle :
                        {height:20,width:20,resizeMode:'contain',marginLeft:'3%',tintColor:colors.grey } }
                           source={this.props.leftIconPath} /></View>
                }
                <View style={styles.textContainerStyles}>
                    <Text
                        style={[styles.inputFieldText, this.props.textInputStyle]}>{this.props.friendEmail}
                    </Text>
                </View>

                {this.props.rightIconPath !== undefined &&
                <TouchableWithoutFeedback onPress={()=>this.inviteFriend()}>
                    <Image
                        source={this.state.rightIcon}
                        style={{ height:rightIconSize,width:rightIconSize,resizeMode:'contain',
                            tintColor:this.props.tintColor}}/>
                </TouchableWithoutFeedback>}
            </View>
        )
    }


}

const styles = StyleSheet.create({

    inputFieldTextView:{
        flexDirection: 'row',
        alignItems: 'center',
        width:'90%',
        alignSelf: 'center',
    },
    inputFieldText: {
        paddingLeft: '3%',
        fontSize: 15,
        // marginVertical:'5%',
        // borderLeftColor:colors.deep_grey,
        // borderLeftWidth:wp(0.1),
        color:colors.white,

    },
    leftImageViewStyle:
        {
            height:'100%',
            // backgroundColor:'red',
            width: '15%',
            justifyContent:'center',
            alignItems:'center',
            paddingHorizontal:wp(2),
            // borderRightColor:colors.grey,
            // borderRightWidth:wp(0.1),
        },
    textContainerStyles:
        {
            justifyContent:'center',
            // alignItems:'center',
            width: '85%',
            height:'100%',

        }


});
export default InviteFriendsItem;