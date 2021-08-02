import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from 'react-native-reanimated';
// import images from "../../assets/images";
// import colors from '../../assets/colors';
import colors from '../../../../assets/colors';
import Button from '../../Button/Button';

export default class Revtones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // radioButtonChecked:false

        }

    }

    // onRadioPress(){
    //     if (this.state.radioButtonChecked){
    //         this.setState({radioButtonChecked:false})
    //     }else{
    //         this.setState({radioButtonChecked:true})
    //     }}

    render() {
        return (
            // <View style={styles.mainContainer}>
            <View style={styles.main}>
                <View style={styles.mainText}>
                    <Text style={styles.mainTextStyle}>{this.props.title}</Text>
                </View>
                <View style={styles.updateButton}>
                    <Button
                        title={'Update'}
                        // iconPlace={'left'}
                        // icon={images.ic_user}
                        style={styles.btn}
                        bgColor={colors.white}
                        // iconStyle={[styles.iconBtn,]}
                        // tintColorIcon={colors.white}
                        titleStyle={{ color: colors.black, fontWeight: 'bold', fontSize: 14 }}
                    onPress={this.props.onPressUpdate}
                    />

                </View>
                <View style={styles.removeButton}>
                    <Button
                        title={'Remove'}
                        // iconPlace={'left'}
                        // icon={images.ic_user}
                        style={styles.btn}
                        bgColor={colors.app_button_color}
                        // iconStyle={[styles.iconBtn,]}
                        // tintColorIcon={colors.white}
                        titleStyle={{ color: colors.white, fontWeight: 'bold', fontSize: 14 }}
                        onPress={this.props.onPressRemove}
                    // onPress={() => this.props.navigation.navigate('signUpScreen')}
                    />
                </View>



            </View>

            // </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        // flex: 1,
        alignItems:'center'


    },
    main: {

        height: hp(12),
        width: wp(90),
        backgroundColor: '#251510',
        flexDirection: "row",
        // borderColor: colors.app_button_color,
        borderTopColor: colors.app_button_color,
        borderBottomColor: colors.app_button_color,
        borderBottomWidth: 1.5,
        borderTopWidth: 1.5,
        marginTop: wp(2)

    },
    mainText: {
        width: '40%',
        height: hp(12),
        // backgroundColor: "pink",
        justifyContent: "center",
        paddingLeft: wp(5)
    },
    updateButton: {
        width: '30%',
        height: hp(12),
        // backgroundColor: "yellow",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    removeButton: {
        width: '30%',
        height: hp(12),
        // backgroundColor: "gold",
        justifyContent: "center",
        alignItems: "center"
    },
    mainTextStyle: {
        color: colors.white,

    },
    btn: {
        height: 45,
        width: '85%',
        paddingLeft: '5.5%',
        paddingRight: 5,
        // borderWidth: 1,
        borderRadius: 6,
        // top:0,
        // bottom:5,
        // backgroundColor:colors.bright_green_color,
        // marginBottom: 10
    },




});


