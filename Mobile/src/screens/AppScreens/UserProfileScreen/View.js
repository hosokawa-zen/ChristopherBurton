//====> System files <====//

import {View, Text, Image, FlatList} from 'react-native'
import React from 'react'

//====> Local files <====//

import RecordRevComponent from '../../../Components/AppComponents/RecordRevComponent/RecordRevComponent'
import AppHeader from '../../../Components/AppHeader'
import images from '../../../../assets/images'
import colors from '../../../../assets/colors'
import styles from './styles'

class UserProfile extends React.Component {
  //====> Constructor Method <====//

  constructor (props) {
    super(props)

    this.Data = [
    //   {
    //     id: 1,
    //     title: 'Highest RingTone Score',
    //     firstIcon: images.icn_play_small,
    //     numberText: '23',
    //   },
    //   {
    //     id: 2,
    //     title: 'Current RingTone Score',
    //     firstIcon: images.icn_play_small,
    //     numberText: '12',
    //   },
    ]
    this.state = {
      user: null,
      revtonScores: []
      //====> Data Array <====//
    }
  }

  componentDidMount () {
    console.log('====================> ', this.props)
    let user = this.props.route.params.userInfo
    if (user) {
      let revtonScores = this.getRevtoneScores(user)
      this.setState({
        user,
        revtonScores,
      })
    }
  }

  getRevtoneScores = (user) => {
    let data = [
      {
        id: 1,
        title: 'Highest RingTone Score',
        firstIcon: images.icn_play_small,
        numberText: user.maxScore ? user.maxScore : 0,
      },
      {
        id: 2,
        title: 'Current RingTone Score',
        firstIcon: images.icn_play_small,
        numberText: user.currentScore ? user.currentScore : 0,
      },
    ]
    return data
  }

  //====> Record Rev Method <====//

  list (item) {
    return (
      <RecordRevComponent
        title={item.title}
        numberText={item.numberText}
        textNumber={true}
      />
    )
  }

  //====> Render Method <====//

  render () {
    const {user} = this.state
    return (
      <View style={styles.mainContainer}>
        {/*====> Header View <====*/}

        <View style={styles.headerView}>
          <AppHeader
            title={'USER PROFILE'}
            bgColor={colors.app_header_color}
            leftIconPath={images.back_arrow}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>

        {/*====> Image View <====*/}

        <View style={styles.container}>
          <View style={styles.PicContainer}>
            <Image
              style={styles.userProfileStyle}
              source={user && user.avatar ? {uri: user.avatar} : images.avatar}
            />
          </View>

          {/*====> Info View <====*/}

          <View style={styles.userName}>
            <Text style={styles.userNameTextStyle}>
              {user
                ? `${user.firstName} ${user.lastName}, ${user.age}`
                : `Mark Morris, 22`}
            </Text>
          </View>
          <View style={styles.userNameAddress}>
            <Text style={styles.userNameAddressTextStyle}>
              {user ? `${user.address}` : `Log Angeles, CA`}
            </Text>
          </View>
          <View style={styles.socialMedia}>
            <Text style={styles.socialMediaTextStyle}>
              Social Media Accounts
            </Text>
          </View>

          {/*====> Divider View <====*/}

          <View style={styles.divider}></View>

          {/*====> Social Media Icons View <====*/}

          <View style={styles.socialMediaIcon}>
            <Image
              style={styles.socialMediaIconStyle}
              source={images.icn_facebook_blue}
            />
            <Image
              style={styles.socialMediaIconStyle}
              source={images.icn_Instagram}
            />
            <Image
              style={styles.socialMediaIconStyle}
              source={images.icn_youtube}
            />
            <Image
              style={styles.socialMediaIconStyle}
              source={images.icn_twitter}
            />
          </View>
          <View style={styles.RevToneContainer}>
            <Text style={styles.socialMediaTextStyle}>RevTone Scores</Text>
          </View>

          {/*====> FlatList View <====*/}

          <View style={styles.flatListContainer}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.revtonScores}
              renderItem={({item}) => this.list(item)}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default UserProfile
