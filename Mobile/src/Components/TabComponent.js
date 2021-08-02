import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../assets/colors';


export default class TabComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            leftBorderWidth:2.5,
            middleBorderWidth:0,
            rightBorderWidth:0,
            leftTextColor: colors.moss_bright,
            middleTextColor: '#999999',
            rightTextColor: '#999999',
            leftBottomColor:colors.moss_bright,
            middleBottomColor:colors.white,
            rightBottomColor:colors.white,
        }

    }

    onLeftPress=()=>{
        if(this.state.leftTextColor === '#999999'){
            this.setState({leftTextColor:colors.moss_bright,middleTextColor:'#999999',rightTextColor:'#999999',leftBorderWidth:2.5,middleBorderWidth:0,rightBorderWidth:0,leftBottomColor:colors.moss_bright,middleBottomColor:colors.white,rightBottomColor:colors.white})
        }

        this.props.onLeftPress();
    };

    onMiddlePress=()=>{
        if(this.state.middleTextColor === '#999999' ){
            this.setState({leftTextColor:'#999999',middleTextColor:colors.moss_bright,rightTextColor:'#999999',leftBorderWidth:0,middleBorderWidth:2.5,rightBorderWidth:0,leftBottomColor:colors.white,middleBottomColor:colors.moss_bright,rightBottomColor:colors.white})
    }
        this.props.onMiddlePress();

    };

    onRightPress=()=>{
        if(this.state.rightTextColor === '#999999'){
            this.setState({leftTextColor:'#999999',middleTextColor:'#999999',rightTextColor:colors.moss_bright,leftBorderWidth:0,middleBorderWidth:0,rightBorderWidth:2.5,leftBottomColor:colors.white,middleBottomColor:colors.white,rightBottomColor:colors.moss_bright})
        }

        this.props.onRightPress();

    };

    render() {
        return(
            <View style={styles.mainContainer} >

           <View style={{flexDirection: 'row',justifyContent:"center",alignItems:"center" }}>


               <TouchableOpacity  onPress={()=>this.onLeftPress() } style={{backgroundColor:'transparent',
                   width:wp(30),
                   height:hp(7),
                   justifyContent:"center"
                   ,alignItems:"center",
                   borderBottomWidth:this.state.leftBorderWidth,
                   borderBottomColor:this.state.leftBottomColor,
               }}>

                   <Text style={{color:this.state.leftTextColor ,fontSize:wp(3.7),}} >{this.props.leftText}</Text>

               </TouchableOpacity>



                   <TouchableOpacity onPress={()=>this.onMiddlePress()}  style={{backgroundColor:'transparent',
                       width:wp(30)
                       ,height:hp(7),
                       justifyContent:"center",
                       alignItems:"center",
                       borderBottomWidth:this.state.middleBorderWidth,
                       borderBottomColor:this.state.middleBottomColor
                   }}>
                       <Text  style={{color:this.state.middleTextColor,fontSize:wp(3.7),}}>{this.props.middleText}</Text>
                   </TouchableOpacity>


                   <TouchableOpacity onPress={()=>this.onRightPress()}  style={{backgroundColor:'transparent',
                       width:wp(30)
                       ,height:hp(7),
                       justifyContent:"center",
                       alignItems:"center",
                       borderBottomWidth:this.state.rightBorderWidth,
                       borderBottomColor:this.state.rightBottomColor
                   }}>
                       <Text  style={{color:this.state.rightTextColor,fontSize:wp(3.7),}}>{this.props.rightText}</Text>
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

    container: {
        flexDirection:'row',
        alignItems: 'center',
        // backgroundColor: 'green'
    },


});


