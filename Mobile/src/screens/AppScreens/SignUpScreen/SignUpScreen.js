//====> System files <====//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import {View, Text, Image, TouchableOpacity, Modal, Alert} from 'react-native'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import RNProgressHud from 'progress-hud'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'

//====> Local files <====//

import SignUpModel from '../../../Components/SignUpModel/SignUpModel'
import Button from '../../../Components/Button/Button'
import AppHeader from '../../../Components/AppHeader'
import AppInput from '../../../Components/AppInput'
import colors from '../../../../assets/colors'
import images from '../../../../assets/images'
import styles from './styles'

class SignUpScreen extends React.Component {
  //====> Constructor Method <====//

  constructor (props) {
    super(props)

    this.state = {
      modalVisible: false,
      view: 'this',
      showPassword: true,
      password: '',
      checkValue: false,
      email: '',
      password: '',
      emailValidate: false,
      charLengthValidate: false,
      charLetterValidate: false,
      charNumberValidate: false,
      charSpecValidate: false,
    }
    this.userId = ''
  }

  signupWithEmailPassword = () => {
    try {
      const self = this
      if (
        this.state.emailValidate &&
        this.state.charLengthValidate &&
        this.state.charLetterValidate &&
        this.state.charNumberValidate &&
        this.state.charSpecValidate
      ) {
        RNProgressHud.showWithStatus('Loading...')
        auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(credential => {
            RNProgressHud.dismiss()
            if (credential.user) {
              const user_id = credential.user.uid
              console.log('=================> credential: ', credential)
              var update = {}
              update[`users/${user_id}/userId`] = user_id
              update[`users/${user_id}/role`] = 3
              update[`users/${user_id}/password`] = this.state.password
              update[`users/${user_id}/email`] = this.state.email
              if (credential.displayName) {
                update[`users/${user_id}/firstName`] = ''
                update[`users/${user_id}/lastName`] = credential.displayName
              } else {
                update[`users/${user_id}/firstName`] = ''
                update[`users/${user_id}/lastName`] = 'Client'
              }
              update[`users/${user_id}/address`] = 'Your address'
              update[`users/${user_id}/age`] = ''
              if (credential.photoURL) {
                update[`users/${user_id}/avatar`] = credential.photoURL
              } else {
                update[`users/${user_id}/avatar`] = ''
              }

              database()
                .ref()
                .update(update)
              
              // let load = {
              //   userId: user_id,
              //   role: 3,
              //   password: this.state.password,
              //   email: this.state.email,
              //   firstName: '',
              //   lastName: credential.displayName ? credential.displayName : 'Client',
              //   address: 'Your address',
              //   age: '',
              //   avatar: credential.photoURL ? credential.photoURL : '',
              // }

              // const userRef = database().ref('users/')
              // const newUser = userRef.push()
              // newUser.set({...load})

              this.userId = user_id
              // self.setModalVisible(true)
              alert('Successfully created your account')

              AsyncStorage.setItem('firstBoot', '1')

              // create a new user on real-time database
              // let load = {
              //   ...this.state.user,
              //   currentScore: 0,
              //   maxScore: 0,
              // }

              // if (this.state.user && this.state.user.userId) {
              //   alert('updating the user account on database')
              //   let updates = {}
              //   updates[`users/${this.state.user.userId}/`] = {...load}
              //   database()
              //     .ref()
              //     .update(updates)
              //     .then(function () {
              //       //alert("Data updated successfully.");
              //       //   history.replace('/admin/revtones');
              //     })
              //     .catch(function (error) {
              //       alert('Data could not be updated.' + error)
              //     })
              // } else {
              //   alert('creating a user account on database')
              //   let userRef = database().ref(`users/`)
              //   let newUser = userRef.push()
              //   newUser.set({...load})
              // }

            }
          })
          .catch(error => {
            console.log(error)
            alert('error1: ' + error.message)
            RNProgressHud.dismiss()
          })
      }
    } catch (error) {
      alert('error2: ' + JSON.stringify(error))
      RNProgressHud.dismiss()
    }
  }

  validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  validateSpecialChar = password => {
    const re = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    return re.test(String(password).toLowerCase())
  }

  validateNumber = password => {
    return /\d/.test(password)
  }

  validateLetter = password => {
    return /[A-Za-z]/g.test(password)
  }

  onChangeEmail = value => {
    this.setState({email: value})
    this.setState({emailValidate: this.validateEmail(value)})
  }

  onChangePassword = value => {
    this.setState({password: value})
    this.setState({charLengthValidate: value.length >= 6})
    this.setState({charSpecValidate: this.validateSpecialChar(value)})
    this.setState({charNumberValidate: this.validateNumber(value)})
    this.setState({charLetterValidate: this.validateLetter(value)})
    // if(value.length >= 6 &&  this.validateLetter(value)) {
    this.setState({passwordStrength: 'easy'})
    if (this.validateNumber(value)) {
      this.setState({passwordStrength: 'medium'})
      if (this.validateSpecialChar(value)) {
        this.setState({passwordStrength: 'hard'})
      }
    }
    // }
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

  togglePassword () {
    this.setState({showPassword: !this.state.showPassword})
  }

  //====> Modal Method <====//

  // setModalVisible = (visible) => {
  //     this.setState({ modalVisible: visible });

  // };

  //====> OnTerm Method <====//

  onTerm () {
    this.setState({modalVisible: false})
    this.props.navigation.navigate('TermsAndCondtions')
  }

  //====> OnPrivacy Method <====//

  onPrivacy () {
    this.setState({modalVisible: false})
    this.props.navigation.navigate('PrivacyPolicy')
  }

  //====> OnAgree Method <====//

  onAgree () {
    this.setState({modalVisible: false})
    this.signupWithEmailPassword()

    // this.props.navigation.navigate('drawer')
  }

  //====> OnCancel Method <====//

  onCancel () {
    this.setState({modalVisible: false})
  }

  //====> Render Method <====//

  render () {
    const {modalVisible} = this.state

    return (
      <View style={styles.mainContainer}>
        {/*====> Header View <====*/}

        <View style={styles.headerView}>
          <AppHeader
            title={'SIGN UP'}
            bgColor={colors.app_header_color}
            leftIconPath={images.back_arrow}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>

        {/*====> Input View <====*/}

        <View style={{flex: 0.91}}>
          <View style={styles.midView}>
            <AppInput
              placeholder={'Enter Email'}
              textInputColor={colors.white}
              placeholderTextColor={colors.placeholder_color}
              onChangeText={text => {
                this.onChangeEmail(text)
              }}
              value={this.state.email}
            />

            <AppInput
              placeholder={'Enter Password'}
              textInputColor={colors.white}
              placeholderTextColor={colors.placeholder_color}
              secureEntry={this.state.showPassword}
              onRightIconPress={() => this.togglePassword()}
              rightIconPath={images.ic_eye}
              value={this.state.password}
              onChangeText={text => {
                this.onChangePassword(text)
              }}
            />

            {/*====> Checks View <====*/}

            <View style={[styles.checkBoxContainer, {paddingTop: wp(4)}]}>
              <View style={styles.checkBoxIcon}>
                <Image
                  style={styles.checkBoxIconStyle}
                  // source={images.ic_filter_active}
                  source={
                    this.state.charLengthValidate
                      ? images.ic_filter_active
                      : images.ic_filter_inactive
                  }
                />
              </View>
              <View style={styles.checkBoxText}>
                <Text style={styles.checkBoxTextStyle}>
                  At least 6 characters long
                </Text>
              </View>
            </View>

            <Text style={styles.passwordStrength}>
              Password Strength: {this.state.passwordStrength}
            </Text>

            <View style={styles.checkBoxContainer}>
              <View style={styles.checkBoxIcon}>
                <Image
                  style={styles.checkBoxIconStyle}
                  //   source={images.ic_filter_active}
                  source={
                    this.state.charLetterValidate
                      ? images.ic_filter_active
                      : images.ic_filter_inactive
                  }
                />
              </View>
              <View style={styles.checkBoxText}>
                <Text style={styles.checkBoxTextStyle}>Contains a letter</Text>
              </View>
            </View>
            <View style={styles.checkBoxContainer}>
              <View style={styles.checkBoxIcon}>
                <Image
                  style={styles.checkBoxIconStyle}
                  // source={images.ic_filter_active}
                  source={
                    this.state.charNumberValidate
                      ? images.ic_filter_active
                      : images.ic_filter_inactive
                  }
                />
              </View>
              <View style={styles.checkBoxText}>
                <Text style={styles.checkBoxTextStyle}>Contains a number</Text>
              </View>
            </View>
            <View style={styles.checkBoxContainer}>
              <View style={styles.checkBoxIcon}>
                <Image
                  //   style={styles.checkBoxIconStyleError}
                  style={styles.checkBoxIconStyle}
                  // source={images.ic_error}
                  source={
                    this.state.charSpecValidate
                      ? images.ic_filter_active
                      : images.ic_filter_inactive
                  }
                />
              </View>
              <View style={styles.checkBoxText}>
                <Text style={styles.checkBoxTextStyle}>
                  Contains a special character
                </Text>
              </View>
            </View>
          </View>

          {/*====> Button View <====*/}

          <View style={styles.buttonView}>
            <Button
              title={'Start'}
              onPress={() => this.setModalVisible(true)}
            />
          </View>

          {/*====> Login Button View <====*/}

          <View style={styles.lowerView}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LoginScreen')}>
              <Text
                style={[
                  styles.textStyle,
                  {
                    color: colors.white,
                    marginTop: wp(2),
                  },
                ]}>
                Already have an account?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LoginScreen')}>
              <Text
                style={[
                  styles.textStyle,
                  {
                    textDecorationLine: 'underline',
                    color: colors.app_red,
                    marginTop: wp(2),
                  },
                ]}>
                Login here
              </Text>
            </TouchableOpacity>
          </View>

          {/*====> Modal <====*/}

          <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!modalVisible)
            }}>
            {/*====> SignUp Modal <====*/}

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
      </View>
    )
  }
}

export default SignUpScreen
