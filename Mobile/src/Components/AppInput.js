import React from 'react';
import { Image, StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from '../../assets/colors';

class AppInput extends React.Component {
    render() {
        let style = this.props.style;
        let shadow = this.props.shadow;
        let height = this.props.height || 53;
        let width = this.props.width || '80%';
        let marginTop = this.props.marginTop || 5;
        let marginBottom = this.props.marginBottom || 5;
        let marginLeft = this.props.marginLeft;
        let marginRight = this.props.marginRight;
        let paddingLeft = this.props.paddingLeft || '0%';
        let paddingRight = this.props.paddingRight || '0%';
        let paddingTop = this.props.paddingTop;
        let paddingBottom = this.props.paddingBottom;
        let borderColor = this.props.borderColor || colors.white;
        let borderWidth = this.props.borderWidth || 0.5;
        let borderRadius = this.props.borderRadius || wp(1);
        let backgroundColor = this.props.backgroundColor || colors.app_header_color;
        let rightIconSize = this.props.rightIconSize || 20;
        let borderBottomColor = this.props.borderBottomColor;
        let borderBottomWidth = this.props.borderBottomWidth;
        return (
            <View style={this.props.style !== undefined ? style : [styles.inputFieldTextView, shadow, {
                height: height, borderBottomWidth: borderBottomWidth
                , width: width, marginTop: marginTop, paddingBottom: paddingBottom, marginBottom: marginBottom,
                borderBottomColor: borderBottomColor,
                paddingTop: paddingTop, backgroundColor: backgroundColor,
                paddingLeft: paddingLeft, borderWidth: borderWidth,
                paddingRight: paddingRight
                , borderColor: borderColor, borderRadius: borderRadius
            }]}>
                {this.props.leftIconPath !== undefined ?
                <View style={styles.leftImageViewStyle}>
                    <Image style={this.props.imageStyle !== undefined ? this.props.imageStyle :
                        { height: 15, width: 15, resizeMode: 'contain', marginLeft: '3%', tintColor: this.props.tintColor || colors.black }}
                           source={this.props.leftIconPath} />
                </View>: null
                }
                <TextInput
                    value={this.props.value}
                    secureTextEntry={this.props.secureEntry}
                    style={[styles.inputFieldText, this.props.textInputStyle, { color: this.props.textInputColor, textAlign: this.props.textAlign }]}
                    onChangeText={this.props.onChangeText}
                    autoCapitalize='none'
                    placeholder={this.props.placeholder}
                    placeholderTextColor={this.props.placeholderTextColor || 'grey'}
                    onSubmitEditing={this.props.onSubmitEditing}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    ref={this.props.ref}
                    multiline={this.props.multiline}
                    maxHeight={this.props.maxHeight}
                    autoGrow={this.props.autoGrow}
                    onContentSizeChange={this.props.onContentSizeChange}
                    onEndEditing={this.props.onEndEditing}
                    keyboardType={this.props.keyboardType}
                />
                {this.props.rightIconPath !== undefined &&
                <View style={styles.rightImageViewStyle}>
                    <TouchableWithoutFeedback onPress={this.props.onRightIconPress}>
                        <Image
                            source={this.props.rightIconPath}
                            style={{
                                height: rightIconSize, width: rightIconSize, resizeMode: 'contain',
                                tintColor: this.props.tintColor || colors.white,
                                marginLeft:this.props.marginLeft
                            }} />
                    </TouchableWithoutFeedback>
                </View>
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    inputFieldTextView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
    },
    inputFieldText: {
        paddingLeft: '3%',
        height: '100%',
        width: '80%',
        fontSize: 15,
        // textAlign: 'center',
        // marginVertical:'5%',
        // borderLeftColor:colors.deep_grey,
        // borderLeftWidth:wp(0.1),
        color: colors.white,
    },
    leftImageViewStyle:
        {
            height: '100%',
            backgroundColor:'red',
            width: '12%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: wp(2),
            // borderRightColor: colors.app_pink_color,
            // borderRightWidth:wp(0.1),
        },
    rightImageViewStyle:
        {
            height: '100%',
            // backgroundColor:'red',
            width: '12%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: wp(2),
            // borderRightColor:colors.grey,
            // borderRightWidth:wp(0.1),
        }
});
export default AppInput;
