import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../assets/colors';

export default class RadioButton extends React.Component {
        constructor(props){
            super(props);
            this.state={
                radioButtonChecked:false

            }

        }

    onRadioPress(){
            if (this.state.radioButtonChecked){
                this.setState({radioButtonChecked:false})
            }else{
                this.setState({radioButtonChecked:true})
            }}

    render() {

        let textColor=this.props.textColor;

        return(
            <View style={styles.mainContainer} >
                <View style={styles.container}>

                        <TouchableOpacity onPress={()=>this.onRadioPress()} style={styles.touchViewRadio}>
                            {this.state.radioButtonChecked &&   <View style={styles.innerTouchViewRadio}/> }
                        </TouchableOpacity>

                    <View>
                        <Text style={[styles.text,{color: textColor}]}>{this.props.radioTitle}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    mainContainer:{

    },
    text: {
        // fontFamily:'Montserrat-Regular'
        paddingLeft:'2%'

    },
    container: {
        flexDirection:'row',
        alignItems: 'center',
        // backgroundColor: 'green'
        // marginTop:5
    },
    touchViewRadio: {
        height:wp(3.7),
        width:wp(3.7),
        backgroundColor: '#094165',
        borderRadius:wp(10),
        borderWidth:wp(0.3),
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight:wp(2),
        borderColor:colors.white
    },
    innerTouchViewRadio:{
        backgroundColor: colors.white,
        width:'80%',
        height:'80%',
        borderRadius:wp(5),
        margin:1,
    }



});


