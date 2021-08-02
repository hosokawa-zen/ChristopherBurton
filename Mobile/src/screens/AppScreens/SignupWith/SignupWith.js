//====> System files <====//

import {View, Text, Image, Alert, TouchableOpacity, Modal} from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'
import RNProgressHud from 'progress-hud'
import database from '@react-native-firebase/database'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
// var {FBLoginManager} = require('react-native-facebook-login');
import {FBLoginManager} from 'react-native-facebook-login'
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication'
import 'react-native-get-random-values'
import {v4 as uuid} from 'uuid'

//====> Local files <====//

import SignUpModel from '../../../Components/SignUpModel/SignUpModel'
import colors from '../../../../assets/colors'
import Button from '../../../Components/Button/Button'
import images from '../../../../assets/images'
import styles from './styles'

class SignupWith extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalVisible: false,
    }
    this.userId = ''
  }

  signupWithGoogle = async () => {
    try {
      await GoogleSignin.configure({
        iosClientId:
          '760785629906-05lg1jtnm6novhi2je6vf6ecregg464q.apps.googleusercontent.com',
        webClientId:
          '760785629906-aj6u1q5tgljte92u0lnvtl2u49j8jq96.apps.googleusercontent.com',
        offlineAccess: true,
      })
      await GoogleSignin.hasPlayServices()
      const credential = await GoogleSignin.signIn()
      const user_id = credential.user.id
      if (credential.user) {
        this.saveUser(credential)
        this.userId = user_id
        this.setModalVisible(true)
      }
    } catch (error) {
      console.log(error)
      alert(error.message)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  saveUser = credential => {
    try {
      const user_id = credential.user.id
      var update = {}
      update[`users/${user_id}/user_id`] = user_id
      update[`users/${user_id}/name`] = credential.user.name
      update[`users/${user_id}/role`] = 3
      update[`users/${user_id}/password`] = ''
      update[`users/${user_id}/email`] = credential.user.email
      update[`users/${user_id}/avatar`] = credential.user.photo
      database()
        .ref()
        .update(update)
      
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  signupWithFaceBook = () => {
    const LoginBehavior = {
      ios: FBLoginManager.LoginBehaviors.Browser,
      android: FBLoginManager.LoginBehaviors.Native,
    }

    FBLoginManager.setLoginBehavior(LoginBehavior[Platform.OS]) // defaults to Native

    FBLoginManager.loginWithPermissions(['email', 'user_friends'], function (
      error,
      data,
    ) {
      if (!error) {
        console.log('Login data: ', data)
        const token = data.credentials.token
        auth()
          .signInWithCredential(auth.FacebookAuthProvider.credential(token))
          .then(userCredential => {
            if (userCredential.user) {
              const user_id = credential.user.id
              this.saveUser(userCredential)
              this.userId = user_id
              this.setModalVisible(true)
            }
          })
      } else {
        alert(error.message)
        console.log('Error: ', error)
      }
    })
  }

  singupWithApple = async () => {
    if (Platform.OS == 'ios') {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      })
      const {identityToken, nonce} = appleAuthRequestResponse
      if (identityToken) {
        const appleCredential = firebase.auth.AppleAuthProvider.credential(
          identityToken,
          nonce,
        )
        const userCredential = await firebase
          .auth()
          .signInWithCredential(appleCredential)
        if (userCredential.user) {
          this.saveUser(userCredential)
          const user_id = credential.user.id
          this.userId = user_id
          this.setModalVisible(true)
        }
      }
    } else {
      const rawNonce = uuid()
      const state = uuid()

      try {
        appleAuthAndroid.configure({
          clientId: 'com.example.client-android',
          redirectUri: 'https://example.com/auth/callback',
          scope: appleAuthAndroid.Scope.ALL,
          responseType: appleAuthAndroid.ResponseType.ALL,
          nonce: rawNonce,
          state,
        })
        const response = await appleAuthAndroid.signIn()
        if (response) {
          const id_token = response.id_token
          const appleCredential = firebase.auth.AppleAuthProvider.credential(
            id_token,
            rawNonce,
          )
          const userCredential = await firebase
            .auth()
            .signInWithCredential(appleCredential)
          if (userCredential.user) {
            this.saveUser(userCredential)
            const user_id = credential.user.id
            this.userId = user_id
            this.setModalVisible(true)
          }
        }
      } catch (error) {
        if (error && error.message) {
          alert(error.message)
          switch (error.message) {
            case appleAuthAndroid.Error.NOT_CONFIGURED:
              console.log('appleAuthAndroid not configured yet.')
              break
            case appleAuthAndroid.Error.SIGNIN_FAILED:
              console.log('Apple signin failed.')
              break
            case appleAuthAndroid.Error.SIGNIN_CANCELLED:
              console.log('User cancelled Apple signin.')
              break
            default:
              break
          }
        }
      }
    }
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible})
  }

  navigateScreem () {
    if (this.props && this.props.navigation) {
      this.props.navigation.navigate('TermsAndCondtions')
      this.setModalVisible(!this.state.modalVisible)
    }
  }

  Privacy () {
    if (this.props && this.props.navigation) {
      this.props.navigation.navigate('PrivacyScreen')
      this.setModalVisible(!this.state.modalVisible)
    }
  }

  onAgree () {
    this.setState({modalVisible: false})
    this.signupWithEmailPassword()

    // this.props.navigation.navigate('drawer')
  }

  onCancel () {
    this.setState({modalVisible: false})
  }

  onPrivacy () {
    this.setState({modalVisible: false})
    this.props.navigation.navigate('PrivacyPolicy')
  }

  onTerm () {
    this.setState({modalVisible: false})
    this.props.navigation.navigate('TermsAndCondtions')
  }

  navigteToHome () {
    try {
      var update = {}
      update[`users/${this.userId}/term_accepted`] = true
      database()
        .ref()
        .update(update)
      if (this.props && this.props.navigation) {
        this.props.navigation.navigate('drawer')
        this.setModalVisible(!this.state.modalVisible)
      }
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  //====> Render Method <====//

  render () {
    const {modalVisible} = this.state
    
    return (
      <View style={styles.mainContainer}>
        {/*====> Image View <====*/}

        <View style={styles.upperView}>
          <Image style={styles.imageStyles} source={images.logo}></Image>
          <Text style={styles.textStyle}>Sign Up With</Text>
        </View>

        {/*====> Buttons View <====*/}

        <View style={styles.midView}>
          {/*====> Facebook Button <====*/}

          <Button
            title={'Sign up with Facebook'}
            iconPlace={'left'}
            icon={images.ic_facebook}
            iconStyle={styles.iconBtn}
            bgColor={colors.facebook}
            style={styles.btn}
            // onPress={() => this.props.navigation.navigate('drawer')}
            onPress={() => {
              this.signupWithFaceBook()
            }}
          />

          {/*====> Google Button <====*/}

          <Button
            title={'Sign up with Google'}
            iconPlace={'left'}
            style={styles.btn}
            icon={images.ic_google}
            tintColorIcon={'none'}
            bgColor={colors.white}
            titleStyle={{color: colors.black, fontWeight: 'bold', fontSize: 16}}
            iconStyle={styles.iconBtn}
            // onPress={() => this.props.navigation.navigate('drawer')}
            onPress={() => {
              this.signupWithGoogle()
            }}
          />

          {/*====> Apple Button <====*/}

          <Button
            title={'Sign up with Apple'}
            iconPlace={'left'}
            icon={images.ic_apple}
            bgColor={colors.white}
            style={styles.btn}
            titleStyle={{color: colors.black, fontWeight: 'bold', fontSize: 16}}
            iconStyle={styles.iconBtn}
            tintColorIcon={colors.black}
            // onPress={() => this.props.navigation.navigate('drawer')}
            onPress={() => {
              this.singupWithApple()
            }}
          />

          {/*====> Lines View <====*/}

          <View style={styles.heightContainer}>
            <View style={styles.heightLeft}></View>
            <Text style={styles.OrStyle}>OR</Text>
            <View style={styles.heightRight}></View>
          </View>

          {/*====> Email Button <====*/}

          <Button
            title={'Sign up with Email'}
            iconPlace={'left'}
            icon={images.ic_email}
            style={styles.btn}
            bgColor={colors.app_button_color}
            iconStyle={[styles.iconBtn]}
            tintColorIcon={colors.black}
            titleStyle={{color: colors.white, fontWeight: 'bold', fontSize: 16}}
            onPress={() => this.props.navigation.navigate('SignUpScreen')}
          />

          {/*====> Already Account Button <====*/}

          <Button
            title={'Already have an account?'}
            iconPlace={'left'}
            icon={images.ic_user}
            style={styles.btn}
            bgColor={colors.most_blue_button}
            iconStyle={[styles.iconBtn]}
            onPress={() => this.props.navigation.navigate('LoginScreen')}
          />
        </View>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible)
          }}>
          <SignUpModel
            onPressCancel={() => this.onCancel()}
            onPressTerm={() => this.onTerm()}
            onPressPrivacy={() => this.onPrivacy()}
            onPressOkay={() => {
              this.onAgree()
            }}
          />
        </Modal>
      </View>
    )
  }
}

export default SignupWith
