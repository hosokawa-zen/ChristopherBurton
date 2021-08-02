//====> System files <====//

import {View, Text, StyleSheet, Image} from 'react-native'
import React from 'react'

//====> Local files <====//

import Button from '../../../Components/Button/Button'
import AppHeader from '../../../Components/AppHeader'
import AppInput from '../../../Components/AppInput'
import colors from '../../../../assets/colors'
import images from '../../../../assets/images'
import styles from './styles'

class ReenterPassword extends React.Component {
  //====> Constructor Method <====//

  constructor (props) {
    super(props)

    this.state = {
      showPassword: true,
      showConfirmPassword: true,
    }
  }

  togglePassword () {
    this.setState({showPassword: !this.state.showPassword})
  }
  toggleConfirmPassword () {
    this.setState({showConfirmPassword: !this.state.showConfirmPassword})
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
            placeholder={'New Password'}
            textInputColor={colors.black}
            placeholderTextColor={colors.placeholder_color}
            secureEntry={this.state.showPassword}
            rightIconPath={images.ic_eye}
            onRightIconPress={() => this.togglePassword()}
            marginLeft={30}
          />
          <Text style={styles.passwordStrength}>Password Strength: Medium</Text>

          <AppInput
            placeholder={'Confirm Password'}
            textInputColor={colors.black}
            placeholderTextColor={colors.placeholder_color}
            secureEntry={this.state.showPassword}
            rightIconPath={images.ic_eye}
            onRightIconPress={() => this.togglePassword()}
            marginLeft={30}
          />

          {/*====> CheckBox View <====*/}

          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={styles.checkBoxIconStyle}
                source={images.ic_filter_active}
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text style={styles.checkBoxTextStyle}>Passwords Matches</Text>
            </View>
          </View>
        </View>

        {/*====> Button View <====*/}

        <View style={styles.lowerView}>
          <Button
            title={'Save Changes'}
            onPress={() => this.props.navigation.navigate('LoginScreen')}
          />
        </View>
      </View>
    )
  }
}

export default ReenterPassword
