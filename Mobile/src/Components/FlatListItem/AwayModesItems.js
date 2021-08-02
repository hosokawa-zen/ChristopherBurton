import { View, Image, Text, StyleSheet ,TouchableOpacity} from 'react-native';
import React from  'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../assets/colors';

class AwayModesItems extends React.Component {
    render() {
        return (
            <View style={styles.awayModesConatiner}>
                <View style={styles.imageConatiner}>
                    <View style={styles.leftConatiner}>
                        <Image source={this.props.leftIconProps} style={styles.imageContainer} />
                        <Text style={styles.textDrivingSytleConatiner}>{this.props.titleProps}</Text>
                    </View>
                    <View style={styles.RightConatiner}>

                        <TouchableOpacity>
                            <Image source={this.props.rightIconTwoProps} style={styles.imageContainer} />

                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image source={this.props.rightIconOneProps} style={styles.imageContainer} />

                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.textConatiner}>
                    <Text style={styles.textSytleConatiner} >The suggested approach is to start developing from larger screens (i.e. tablets). That way you are less prone to forget adding responsive values for all properties of type number. </Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({

    awayModesConatiner: {
        height:wp(50),
        padding: wp(5),
        marginVertical:wp(0.5),
        backgroundColor:colors.dark_red,
    },
    imageConatiner: {
        height:wp(8),
        width:'100%',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems:'flex-start',
        // backgroundColor:colors.grey
    },
    textConatiner: {
        height:wp(30),
        width:'100%',
        backgroundColor:colors.white,
        padding:wp(4),
        borderRadius: wp(2),
        justifyContent: "center",
    },
    imageContainer: {
        height: wp(4),
        width: wp(4),
        alignSelf: 'center',
        resizeMode: 'contain',
        marginRight:wp(2),
        tintColor:colors.white,
    },
    leftConatiner: {
        flexDirection: "row",
        alignItems: 'center',
    },
    RightConatiner: {
        flexDirection: "row",
        alignItems: 'center',
    },
    textSytleConatiner: {
        fontSize: wp(3.2)
    },
    textDrivingSytleConatiner: {
        color: 'white',
        fontSize: wp(4),
        fontWeight:'bold'
    },
});
export default AwayModesItems;