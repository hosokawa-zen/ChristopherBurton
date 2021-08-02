import {StyleSheet} from "react-native";
import colors from "../../../assets/colors";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const styles = StyleSheet.create({

    mainContainer:
        {
            flex:1,
            // backgroundColor:colors.app_red,
            alignItems:'center',
            justifyContent:'center',

        },
    imgBack:{
        height:'100%',
        width:'100%',
        resizeMode:'cover'
    },
    container:{
        height:'80%',
        width:'80%',
        resizeMode:'contain'
    }
});

export default styles;
