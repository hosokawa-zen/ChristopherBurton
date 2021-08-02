import React from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import AppInput from '../AppInput';
import colors from '../../../assets/colors';

class DialogueModel extends React.Component{

    render()
    {
        return(
            <TouchableOpacity
                onPress={this.props.onPressOuterView}
                style={styles.container}>

                <View style={styles.modelView}>
                    <View style={styles.titleView}>
                        <Text style={styles.newBetText}>New Bet</Text>
                    </View>
                    <View style={styles.inputsView}>
                        <AppInput
                            height={hp(6.5)}
                            borderColor={'#999999'}
                            borderBottomWidth={wp(0.5)}
                            placeholder={'Bet Name'}
                            width={'100%'}
                            backgroundColor={'transparent'}
                            placeholderTextColor={colors.black}
                        />
                        <AppInput
                            height={hp(6.5)}
                            borderColor={'#999999'}
                            borderBottomWidth={wp(0.5)}
                            placeholder={'Bet Description'}
                            width={'100%'}
                            backgroundColor={'transparent'}
                            placeholderTextColor={colors.black}
                        />
                        <AppInput
                            height={hp(6.5)}
                            borderColor={'#999999'}
                            borderBottomWidth={wp(0.5)}
                            placeholder={'No of Bets'}
                            width={'100%'}
                            backgroundColor={'transparent'}
                            placeholderTextColor={colors.black}
                        />

                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity
                        onPress={this.props.onPressSubmit}
                        >
                            <Text style={[styles.newBetText,{color:'green'}]}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>

                </View>


            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({

   container:
       {
           flex:1,
           backgroundColor:'transparent',
           justifyContent:'center',
           alignItems:'center'
       },
    modelView:
        {
            height:wp(75),
            width:wp(70),
            borderRadius:wp(1),
            backgroundColor: colors.white,
            padding:wp(4),
        },

    titleView:
        {
            height:'12%',
            width:'100%',
            justifyContent:'center',
            // backgroundColor:colors.gold,
        },
    inputsView:
        {
            height:'75%',
            width:'100%',
            // backgroundColor:colors.white,
            // justifyContent:'center',

        },
    buttonView:
        {
            height:'13%',
            width:'100%',
            // backgroundColor:colors.light_green,
            justifyContent:'flex-end',
            alignItems:'flex-end',
            // marginTop:5

        },
    newBetText:
        {
            fontSize:wp(4),
            fontWeight:'bold',
        }


});

export default DialogueModel;
