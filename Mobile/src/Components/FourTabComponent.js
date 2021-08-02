import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../assets/colors';


export default class FourTabComponent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            firstBorderWidth:2,
            secondBorderWidth:0,
            thirdBorderWidth:0,
            fourthBorderWidth:0,
            firstTextColor:colors.moss_bright,
            secondTextColor:colors.placeholder_text_color,
            thirdTextColor:colors.placeholder_text_color,
            fourthTextColor:colors.placeholder_text_color,
            firstBorderColor:colors.moss_bright,
            secondBorderColor:colors.placeholder_text_color,
            thirdBorderColor:colors.placeholder_text_color,
            fourthBorderColor:colors.placeholder_text_color,


        }

    }

    onFirstPress=()=>{
        if(this.state.firstTextColor===colors.placeholder_text_color){
            this.setState({firstTextColor:colors.moss_bright,secondTextColor:colors.placeholder_text_color,thirdTextColor:colors.placeholder_text_color,fourthTextColor:colors.placeholder_text_color,firstBorderColor:colors.moss_bright,secondBorderColor:colors.placeholder_text_color,thirdBorderColor:colors.placeholder_text_color,fourthBorderColor:colors.placeholder_text_color,firstBorderWidth:2,secondBorderWidth:0,thirdBorderWidth:0,fourthBorderWidth:0,})
        }

        this.props.onFirstPress();
    };

    onSecondPress=()=>{
        if(this.state.secondTextColor===colors.placeholder_text_color ){
            this.setState({firstTextColor:colors.placeholder_text_color,secondTextColor:colors.moss_bright,thirdTextColor:colors.placeholder_text_color,fourthTextColor:colors.placeholder_text_color,firstBorderColor:colors.placeholder_text_color,secondBorderColor:colors.moss_bright,thirdBorderColor:colors.placeholder_text_color,fourthBorderColor:colors.placeholder_text_color,firstBorderWidth:0,secondBorderWidth:3,thirdBorderWidth:0,fourthBorderWidth:0,})
        }
        this.props.onSecondPress();

    };

    onThirdPress=()=>{
        if(this.state.thirdTextColor===colors.placeholder_text_color){
            this.setState({firstTextColor:colors.placeholder_text_color,secondTextColor:colors.placeholder_text_color,thirdTextColor:colors.moss_bright,fourthTextColor:colors.placeholder_text_color,firstBorderColor:colors.placeholder_text_color,secondBorderColor:colors.placeholder_text_color,thirdBorderColor:colors.moss_bright,fourthBorderColor:colors.placeholder_text_color,firstBorderWidth:0,secondBorderWidth:0,thirdBorderWidth:3,fourthBorderWidth:0,})
        }

        this.props.onThirdPress();

    };
    onFourthPress=()=>{
        if(this.state.fourthTextColor===colors.placeholder_text_color){
            this.setState({firstTextColor:colors.placeholder_text_color,secondTextColor:colors.placeholder_text_color,thirdTextColor:colors.placeholder_text_color,fourthTextColor:colors.moss_bright,firstBorderColor:colors.placeholder_text_color,secondBorderColor:colors.placeholder_text_color,thirdBorderColor:colors.placeholder_text_color,fourthBorderColor:colors.moss_bright,firstBorderWidth:0,secondBorderWidth:0,thirdBorderWidth:0,fourthBorderWidth:3,})
        }

        this.props.onFourthPress();

    };

    render() {
        return(
            <View style={styles.mainContainer} >

                <View style={{flexDirection: 'row',justifyContent:"center",alignItems:"center" }}>


                    <TouchableOpacity  onPress={()=>this.onFirstPress() } style={{backgroundColor:'transparent',
                        width:wp(23),
                        height:hp(7),
                        justifyContent:"center"
                        ,alignItems:"center",
                        borderBottomWidth:this.state.firstBorderWidth,
                        borderBottomColor:this.state.firstBorderColor,
                    }}>

                        <Text style={{color:this.state.firstTextColor,fontSize:wp(3.3),textAlign:'center',fontWeight:'bold'}} >{this.props.firstTabText}</Text>

                    </TouchableOpacity>



                    <TouchableOpacity onPress={()=>this.onSecondPress()}  style={{backgroundColor:'transparent',
                        width:wp(23)
                        ,height:hp(7),
                        justifyContent:"center",
                        alignItems:"center",
                        borderBottomWidth:this.state.secondBorderWidth,
                        borderBottomColor:this.state.secondBorderColor,
                    }}>
                        <Text  style={{color:this.state.secondTextColor,fontSize:wp(3.3),textAlign:'center',fontWeight:'bold'}}>{this.props.secondTabText}</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={()=>this.onThirdPress()}  style={{backgroundColor:'transparent',
                        width:wp(23)
                        ,height:hp(7),
                        justifyContent:"center",
                        alignItems:"center",
                        borderBottomWidth:this.state.thirdBorderWidth,
                        borderBottomColor:this.state.thirdBorderColor,
                    }}>
                        <Text  style={{color:this.state.thirdTextColor,fontSize:wp(3.3),textAlign:'center',fontWeight:'bold'}}>{this.props.thirdTabText}</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={()=>this.onFourthPress()}  style={{backgroundColor:'transparent',
                        width:wp(23)
                        ,height:hp(7),
                        justifyContent:"center",
                        alignItems:"center",
                        borderBottomWidth:this.state.fourthBorderWidth,
                        borderBottomColor:this.state.fourthBorderColor,
                    }}>
                        <Text  style={{color:this.state.fourthTextColor,fontSize:wp(3.3),textAlign:'center',fontWeight:'bold'}}>{this.props.fourthTabText}</Text>
                    </TouchableOpacity>


                </View>




            </View>
        );
    }
}

const styles= StyleSheet.create({
    mainContainer:{
        // flex:1,
        // backgroundColor:'grey',



    },
    text: {
        color:'grey',
    },
    container: {
        flexDirection:'row',
        alignItems: 'center',
        // backgroundColor: 'green'
    },


});


