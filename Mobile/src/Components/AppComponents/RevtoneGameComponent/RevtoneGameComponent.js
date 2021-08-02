import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import {color} from 'react-native-reanimated'
// import images from "../../assets/images";
// import colors from '../../assets/colors';
import colors from '../../../../assets/colors'

export default class RevtoneGameComponent extends React.Component {
  constructor (props) {
    super(props)
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

  render () {
    return (
      // <View style={styles.mainContainer}>
      <View style={styles.main}>
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={styles.carImage}>
            <Image style={styles.imageStyles} source={this.props.image} />
          </View>

          <View style={styles.mainText}>
            <Text style={styles.mainTextStyle}>{this.props.title}</Text>
          </View>
        </TouchableOpacity>
      </View>

      // </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  main: {
    width: '50%',
    height: hp(18),
    paddingHorizontal: wp(2),
    // backgroundColor: '#251510',
    // flexDirection: "row",
    // borderColor: colors.app_button_color,
    // borderTopColor: colors.app_button_color,
    // borderBottomColor: colors.app_button_color,
    // borderBottomWidth: 1.5,
    // borderTopWidth: 1.5,
    marginTop: wp(1),
  },
  mainText: {
    width: '100%',
    height: '20%',

    // backgroundColor: "pink",
    justifyContent: 'center',
    alignItems: 'center',
    // paddingLeft: wp(5)
  },
  imageStyles: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: wp(1),
  },
  carImage: {
    width: '100%',
    height: '80%',
    // backgroundColor: "yellow",
    justifyContent: 'center',
    alignItems: 'center',
    // alignItems: "flex-end"
  },
  removeButton: {
    width: '30%',
    height: hp(12),
    // backgroundColor: "gold",
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTextStyle: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: wp(3.5),
  },
  btn: {
    height: 50,
    width: '80%',
    paddingLeft: '5.5%',
    paddingRight: 5,
    // borderWidth: 1,
    borderRadius: 6,
    // top:0,
    // bottom:5,
    // backgroundColor:colors.bright_green_color,
    // marginBottom: 10
  },
})
