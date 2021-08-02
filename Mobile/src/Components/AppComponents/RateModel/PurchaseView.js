import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

import styles from './styles'
import {Rating, AirbnbRating} from 'react-native-ratings'
class PurchaseModel extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dummyText:
        'In-App Purchase of $0.99 will be charged to your app store account.',
    }
  }

  render () {
    return (
      <View style={styles.mainContainerPurchase}>
        <View style={styles.containerPurchase}>
          <View style={styles.textDescriptionContainer}>
            <Text style={styles.textDescriptionPurchase}>{this.state.dummyText}</Text>
          </View>

          <View style={styles.buttonViewContainerPurchase}>
            <TouchableOpacity
              onPress={this.props.onPressCancel}
              style={styles.closeStylePurchase}>
              <Text style={styles.closeTextStyleContainerPurchase}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.props.onPressOkay}
              style={styles.countinueStylePurchase}>
              <Text style={styles.AgreeTextStyleContainerPurchase}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default PurchaseModel
