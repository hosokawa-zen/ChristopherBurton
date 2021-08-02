//====> System files <====//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import {View, Text, StyleSheet, Alert} from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'

//====> Local files <====//

import Button from '../../../Components/Button/Button'
import AppHeader from '../../../Components/AppHeader'
import AppInput from '../../../Components/AppInput'
import colors from '../../../../assets/colors'
import images from '../../../../assets/images'
import styles from './styles'

class ResetPassword extends React.Component {
  //====> Constructor Method <====//

  constructor (props) {
    super(props)
    this.state = {
      email: '',
    }
  }

  //====> Alert Method <====//

  ShowAlert = (title, message) => {
    Alert.alert(title, message, [{text: 'OKAY'}])
  }

  onClick = () => {
    Alert.alert(
      'Reset Password',
      'We have sent a reset password link to your email.',
      [
        {
          text: 'OKAY',
          onPress: () => this.props.navigation.navigate('ReenterPassword'),
        },
      ],
    )
  }

  resetPassword = () => {
    try {
      auth().sendPasswordResetEmail(this.state.email)
      Alert.alert(
        'Reset Password',
        'We have sent a password reset link to your email',
        [
          {
            text: 'OKAY',
            // onPress: () => this.props.navigation.navigate('ReenterPassword'),
          },
        ],
      )
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  onChangeEmail = value => {
    this.setState({email: value})
  }

  //====> Render Method <====//

  render () {
    return (
      <View style={styles.mainContainer}>
        {/*====> Header View <====*/}

        <View style={styles.headerView}>
          <AppHeader
            title={'RESET PASSWORD'}
            bgColor={colors.app_header_color}
            leftIconPath={images.back_arrow}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>

        {/*====> Input View <====*/}

        <View style={styles.midView}>
          <AppInput
            placeholder={'Enter Email'}
            textInputColor={colors.white}
            placeholderTextColor={colors.placeholder_color}
            leftIconPath={images.ic_email}
            value={this.state.email}
            onChangeText={text => {
              this.onChangeEmail(text)
            }}
          />

          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>
              Input the email used to create your account. We will send you a
              link to reset your password.
            </Text>
          </View>
        </View>

        {/*====> Button View <====*/}

        <View style={styles.lowerView}>
          <Button
            title={'Reset Password'}
            onPress={() => this.resetPassword()}
          />
        </View>
      </View>
    )
  }
}

export default ResetPassword
