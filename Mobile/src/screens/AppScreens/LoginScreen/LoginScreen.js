//====> System files <====//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import {View, Text, TouchableOpacity, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import auth from '@react-native-firebase/auth'
import RNProgressHud from 'progress-hud'

//====> System files <====//

import Button from '../../../Components/Button/Button'
import AppHeader from '../../../Components/AppHeader'
import AppInput from '../../../Components/AppInput'
import CheckBox from '../../../Components/CheckBox'
import colors from '../../../../assets/colors'
import images from '../../../../assets/images'
import styles from './styles'

class LoginScreen extends React.Component {
  //====> Constructor Method <====//

  constructor (props) {
    super(props)

    this.state = {
      isUser: true,
      showPassword: true,
      rememberColor: 'red',
      image: images.ic_filter_active,
      email: '',
      password: '',
      remember: false,
    }
    
    
  }

  componentDidMount() {
    AsyncStorage.getItem('remember').then(async remeber => {
      if (remeber == '1') {
        const email = await AsyncStorage.getItem('email')
        const password = await AsyncStorage.getItem('password')
        this.setState({email: email})
        this.setState({password: password})
        this.setState({remember: true})
      }
    })

  }

  rememberPassword = () => {
    this.setState({isUser: !this.state.isUser})
  }

  togglePassword () {
    this.setState({
      showPassword: !this.state.showPassword,
      isUser: !this.state.isUser,
    })
  }

  onRemeber = flag => {
    this.setState({remember: flag})
    if (!flag) {
      AsyncStorage.setItem('remember', '0')
    } else {
      AsyncStorage.setItem('email', this.state.email)
      AsyncStorage.setItem('password', this.state.password)
      AsyncStorage.setItem('remember', '1')
    }
  }

  toggleLogin () {
    try {
      RNProgressHud.showWithStatus('Loading...')
      auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          console.log('User account created & signed in!')
          // AsyncStorage.setItem('firstBoot', '1')

          if (this.state.remember) {
            AsyncStorage.setItem('email', this.state.email)
            AsyncStorage.setItem('password', this.state.password)
            AsyncStorage.setItem('remember', '1')
          }
          if (this.props && this.props.navigation) {
            this.props.navigation.navigate('drawer')
          }
          RNProgressHud.dismiss()
        })
        .catch(error => {
          RNProgressHud.dismiss()
          alert(error.message)
          console.error(error)
        })
    } catch (error) {
      alert(JSON.stringify(error.message))
    }
  }

  //====> Render Method <====//

  render () {
    return (
      <View style={styles.mainContainer}>
        {/*====> Header View <====*/}

        <View style={styles.headerView}>
          <AppHeader
            title={'LOGIN'}
            bgColor={colors.app_header_color}
            leftIconPath={images.back_arrow}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>

        {/*====> inputs View <====*/}

        <View style={styles.midView}>
          <AppInput
            placeholder={'Email'}
            textInputColor={colors.white}
            placeholderTextColor={colors.placeholder_color}
            value={this.state.email}
            onChangeText={text => this.setState({email: text})}
          />
          <AppInput
            placeholder={'Password'}
            textInputColor={colors.white}
            placeholderTextColor={colors.placeholder_color}
            secureEntry={this.state.showPassword}
            rightIconPath={images.ic_eye}
            marginLeft={30}
            onRightIconPress={() =>
              // this.props.navigation.navigate('resetPassword')
              this.togglePassword()
            }
            value={this.state.password}
            onChangeText={text => this.setState({password: text})}
          />

          {/*====> CheckBox View <====*/}

          <View style={styles.checkBoxContainer}>
            <CheckBox
              checked={this.state.remember}
              update={flag => {
                this.onRemeber(flag)
              }}
              checkTitle={'Remember Me'}
            />
            {/* <View style={styles.checkBoxIcon}>
              <CheckBox
                checked={this.state.remember}
                update={flag => {
                  this.onRemeber(flag)
                }}
                borderRadius={0.01}
                imgCheck={true}
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text style={styles.checkBoxTextStyle}>Remember Me</Text>
            </View> */}
          </View>
        </View>

        {/*====> Buttons View <====*/}

        <View style={styles.lowerView}>
          <Button
            title={'Login'}
            // onPress={() => this.props.navigation.navigate('drawer')}
            onPress={() => this.toggleLogin()}
          />

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ResetPassword')}>
            <Text
              style={[
                styles.textStyle,
                {
                  textDecorationLine: 'underline',
                  color: colors.app_button_color,
                  marginTop: wp(3),
                },
              ]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default LoginScreen
