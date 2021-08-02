import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import AppHeader from '../../../Components/AppHeader';
import images from '../../../../assets/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';
import Button from '../../Button/Button';
import RevtoneCategoryComponent from '../RevtoncategoryComponent/RevtoncategoryComponent';

export default class RecordRevComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false
    };
  }

  onPress = () => {
    this.setState({paused: !this.state.paused})
    this.props.onPlay(this.state.paused)
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
          <TouchableOpacity style={styles.imgView} onPress={() => this.onPress()}>
            <Image style={styles.img} source={images.icn_play_small} />
          </TouchableOpacity>
          <View style={styles.textView}>
            <Text style={styles.textTitle}>{this.props.title}</Text>
          </View>
          <View style={styles.playView}>
            {this.props.textNumber ? (
              <Text style={styles.numberText}>{this.props.numberText}</Text>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={this.props.navToTrimAudioScreen}>
                  <Image style={styles.icon} source={images.ic_active} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.removeButton} onPress={this.props.onRemove}>
                  <Image style={styles.icon} source={images.ic_remove_sound} />
                </TouchableOpacity>
              </>
            )}
            {/*{this.props.removeSound ?*/}
            {/*     : null*/}
            {/*}*/}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    // flex:1,
    alignItems: 'center',
    // backgroundColor:colors.black,
    // justifyContent: 'center'
  },
  container: {
    height: hp(7),
    width: wp(92),
    backgroundColor: colors.app_header_color,
    // borderRadius:wp(2),
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.deep_grey,
  },
  imgView: {
    height: '100%',
    width: '15%',
    justifyContent: 'center',
    // alignItems:'center'
    paddingLeft: '2%',
    // backgroundColor: 'red',
  },
  img: {
    height: 33,
    width: 33,
    resizeMode: 'contain',
    // borderRadius:wp(2),
  },
  textView: {
    height: '100%',
    width: '70%',
    // backgroundColor: 'blue',
    // borderRadius:wp(2),
    // borderTopRightRadius:wp(2),
    // borderBottomRightRadius:wp(2),
    justifyContent: 'center',
    paddingLeft: '1%',
  },
  playView: {
    flexDirection: 'row',
    // justifyContent:'space-between',
    alignItems: 'center',
    height: '100%',
    width: '15%',
    paddingRight: '2%',
    // backgroundColor:colors.app_brown,
    // borderRadius:wp(2),
    justifyContent: 'center',
    // paddingLeft:'4%'
    // alignItems: 'center',
  },
  icon: {
    height: 32,
    width: 32,
    resizeMode: 'contain',
    // borderRadius:wp(2),
    // borderTopLeftRadius:wp(2),
    // borderBottomLeftRadius:wp(2)
  },
  editButton: {
    // resizeMode:'contain',
    marginRight: 15,
    // borderRadius:wp(2),
    // borderTopLeftRadius:wp(2),
    // borderBottomLeftRadius:wp(2)
  },
  removeButton: {
    marginRight: 20,
  },
  textTitle: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: colors.white,
  },
  numberText: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: colors.app_orange,
  },
});
