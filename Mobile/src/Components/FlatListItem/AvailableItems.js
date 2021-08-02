import React from 'react';
import { View,Text,TextInput,StyleSheet,Image,ImageBackground,TouchableOpacity,ScrollView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../assets/colors';

class AvailableItems extends React.Component{

    constructor(props) {
        super(props);

        this.state={
            viewShow:true,
        }

    }

    render()
    {




        return(

            // <View style={styles.mainContainer}>

                <View style={styles.topTextContainer}>

                    <View style={styles.topLeftContainer}>

                        <Text style={styles.betNameText}>{this.props.betName}</Text>
                        <View style={styles.viewBottomText}>
                            <Text style={styles.producedBy}>Posted By :</Text>
                            <Text style={[styles.producedBy,{fontWeight:'bold'}]}>john</Text>

                        </View>

                    </View>

                    <View style={styles.topRightContainer}>
                        <Text style={[styles.tokens,{color:colors.light_green}]}>25</Text>
                        <Text style={styles.tokens}>TOKENS</Text>
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
            // backgroundColor:colors.white
        },

    topTextContainer:
        {
            width:'100%',
            height:wp(20),
            // backgroundColor:colors.dark_green,
            flexDirection:'row',
            // justifyContent:'space-between',
            alignItems:'center',
            borderColor:colors.light_green,
            borderWidth:wp(0.5),
            // margin:wp(3),
            marginVertical:wp(1.2),
            borderRadius:wp(3),

        },
    topLeftContainer:
        {
            // justifyContent:'center',
            // alignItems:'center',
            flex:0.75,
            paddingLeft:wp(3)
            // backgroundColor:colors.dark_green,
        },
    topRightContainer:
        {
            justifyContent:'center',
            alignItems:'center',
            flex:0.25,

            // backgroundColor:colors.dark_red,
        },

    betNameText:
        {
            fontSize: wp(5.5),
            color:colors.white,
            fontWeight:'bold'
        },
    tokens:
        {
            fontSize: wp(4.5),
            color:colors.white,
            fontWeight:'bold'
        },
    viewBottomText:
        {
            flexDirection:'row',
        },
    producedBy:
        {
            fontSize:wp(3.5),
            color:colors.white,
        },





});

export default AvailableItems;