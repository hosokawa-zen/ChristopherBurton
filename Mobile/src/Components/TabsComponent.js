import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../assets/colors';


export default class TabsComponent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            leftBorderWidth:2.5,
            rightBorderWidth:0,
            leftTextColor:colors.moss_bright,
            rightTextColor:"#999999",
            leftBottomBorderColor:colors.moss_bright,
            rightBottomBorderColor: colors.white,


        }

    }

    onLeftPress=()=>{
        if(this.state.leftTextColor==='#999999'){
            this.setState({leftTextColor:colors.moss_bright,rightTextColor:"#999999",leftBorderWidth:2.5,rightBorderWidth:0,})
        }

        this.props.onLeftPress();
    };


    onRightPress=()=>{
        if(this.state.rightTextColor==='#999999'){
            this.setState({rightTextColor:colors.moss_bright,leftTextColor:"#999999",leftBorderWidth:0,rightBorderWidth:2.5})
        }

        this.props.onRightPress();

    };

    render() {
        return(
            <View style={styles.mainContainer} >

                <View style={{flexDirection: 'row',justifyContent:"center",alignItems:"center",backgroundColor:colors.white}}>


                    <TouchableOpacity  onPress={()=>this.onLeftPress() } style={{backgroundColor:'transparent',
                        width:wp(45),
                        height:hp(7),
                        justifyContent:"center"
                        ,alignItems:"center",
                        borderBottomWidth:this.state.leftBorderWidth,
                        borderBottomColor:colors.moss_bright
                    }}>

                        <Text style={{color:this.state.leftTextColor,fontSize:wp(3.7),}} >{this.props.leftText}</Text>

                    </TouchableOpacity>


                    <TouchableOpacity onPress={()=>this.onRightPress()}  style={{backgroundColor:'transparent',
                        width:wp(45)
                        ,height:hp(7),
                        justifyContent:"center",
                        alignItems:"center",
                        borderBottomWidth:this.state.rightBorderWidth,
                        borderBottomColor:this.state.leftBottomBorderColor,
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
    text: {
        color:'grey',
        // fontFamily:'Montserrat-Regular'
    },
    container: {
        flexDirection:'row',
        alignItems: 'center',
        // backgroundColor: 'green'
    },

});


