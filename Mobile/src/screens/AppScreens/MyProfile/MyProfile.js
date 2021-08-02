//====> System files <====//

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import React from 'react'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'


//====> Local files <====//

import SocialAccountComponent from '../../../Components/AppComponents/SocialAccountComponent/SocialAccountComponent'
import RecordRevComponent from '../../../Components/AppComponents/RecordRevComponent/RecordRevComponent'
import AppHeader from '../../../Components/AppHeader'
import images from '../../../../assets/images'
import styles from './style'

export default class MyProfile extends React.Component {
  //====> Constructor files <====//

  constructor (props) {
    super(props)
    this.userId = ''
    this.audioPlayer = new AudioRecorderPlayer();

    this.state = {
      paused: false,
      loaded: false,
      playing: false,
      user: null,
      avatar: '',
      name: '',
      position: '',
      email: '',
      myRevtones: [],
      myRevtoneNames: [],
      myRingtone: null,
      myNotification: null,

      //====> Social Account Array <====//

      socialAccount: [
        {
          id: 1,
          imageSocial: images.icn_facebook_blue,
          title: 'Facebook',
        },
        {
          id: 2,
          imageSocial: images.icn_Instagram,
          title: 'Instagram',
        },
        {
          id: 3,
          imageSocial: images.icn_youtube,
          title: 'Youtube',
        },
        {
          id: 4,
          imageSocial: images.icn_twitter,
          title: 'Twitter',
        },
      ],

      //====> Favorites Array <====//

      favorites: [
        {
          id: 1,
          title: 'Add a revtone',
        },
      ],

      //====> RingTones Array <====//

      ring_tones: [
        {
          id: 1,
          imageSocial: images.icn_play_small,
          title: 'Ringtones',
          dropDownTitle: 'Select a ringtone',
        },
        {
          id: 2,
          imageSocial: images.icn_play_small,
          title: 'Notification',
          dropDownTitle: 'Select a ringtone',
        },
      ],

      ringtones: [],
      notifications: [],

      //====> Scores Array <====//

      scores: [
        {
          id: 1,
          imageSocial: images.icn_play_small,
          title: 'Highest RevTone Score',
          numberText: '0',
        },
        {
          id: 2,
          imageSocial: images.icn_play_small,
          title: 'Current RevTone Score',
          numberText: '0',
        },
      ],
    }
  }

  componentDidMount () {
    this.getUser()
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    this.getUser()
  }

  getUser = () => {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid
        this.getUserInfo()
      } else {
        if (this.props.navigation) {
          this.props.navigation.navigate('LoginScreen')
        }
      }
    })
  }

  loadRevtones = () => {
    database()
      .ref('/revton')
      .on('value', snapshot => {
        let revtones = []
        snapshot.forEach(child => {
          revtones = [
            ...revtones,
            {
              keyId: Math.floor(Math.random() * 1000),
              id: child.key,
              carModel: child.val().carModel,
              carMake: child.val().carMake,
              userId: child.val().userId,
              audios: child.val().audios,
            },
          ]
        })
        let myRevtones = []
        revtones.forEach(rev => {
          if (rev.userId == this.userId) {
            // rev.audios.forEach(aud => {
            myRevtones = [...myRevtones, rev]
            // })
          }
        })

        if (myRevtones.length == 0)
          myRevtones = [
            {
              id: 1,
              title: 'Add a revtone',
            },
          ]

        this.setState({
          // favorites: [...myRevtones],
          ringtones: [...myRevtones],
          notifications: [...myRevtones],
          user: {
            ...this.state.user,
            // favorites: myRevtones,
            ringtones: myRevtones,
            notifications: myRevtones,
          },
          myRevtones,
          myRevtoneNames: this.ringtonesForDropdown(myRevtones),
        })
      })
  }

  getUserInfo = () => {
    database()
      .ref(`users/`)
      .on('value', snapshot => {
        if (snapshot.exists()) {
          const uid = this.userId
          let user = ''
          snapshot.forEach(child => {
            if (child.val().userId == uid) {
              user = child.val()
            }
          })
          if (user) {
            const avatar = user.avatar ? user.avatar : ''
            const firstName = user.firstName ? user.firstName : ''
            const lastName = user.lastName ? user.lastName : ''
            const age = user.email ? user.age : ''
            const address = user.address ? user.address : ''
            const favorites = user.favorites ? user.favorites : ''
            const myRingtone = user.myRingtone ? user.myRingtone : ''
            const myNotification = user.myNotification
              ? user.myNotification
              : ''
            let scores = this.getRevtoneScores(user)

            this.loadRevtones()

            this.setState({
              user,
              avatar,
              scores,
              favorites,
              myRingtone,
              myNotification,
            })
          }
        } else {
          console.log("Can't get user info")
        }
      })
  }

  getRevtoneScores = user => {
    let data = [
      {
        id: 1,
        imageSocial: images.icn_play_small,
        title: 'Highest RevTone Score',
        numberText: user.maxScore ? user.maxScore : 0,
      },
      {
        id: 2,
        imageSocial: images.icn_play_small,
        title: 'Current RevTone Score',
        numberText: user.currentScore ? user.currentScore : 0,
      },
    ]
    return data
  }

  ringtonesForDropdown = ringtones => {
    let rts = ringtones
    let names = []
    rts.forEach(r => {
      if (r.audios) {
        r.audios.forEach(a => {
          names = [...names, a.name + ' ' + r.carMake + ' ' + r.carModel]
        })
      }
    })
    //this.setState({categoryNames: names})
    return names
  }

  onSelectRevtone = (index, value) => {
    // alert(index)
    let selectedRingtone = this.state.myRevtones[index]
    this.setState({selectedRingtone})
  }

  getDefaultRevtoneButtonText = item => {
    if (item.title == 'Ringtones') {
      return this.state.myRingtone
        ? this.state.myRingtone.title
        : 'Please select'
    } else if (item.title == 'Notification') {
      return this.state.myNotification
        ? this.state.myNotification.title
        : 'Please select'
    }
  }

  initAudioPlayer = () => {
    // AudioPlayer.onFinished = () => {
    //   console.log('finished playback')
    //   this.setState({paused: true, loaded: false, playing: false})
    // }
    // AudioPlayer.setFinishedSubscription()
    //
    // AudioPlayer.onProgress = data => {
    //   console.log('progress', data)
    // }
    // AudioPlayer.setProgressSubscription()
  }

  play = async (audioPath) => {
    if (this.state.loaded) {
      await this.audioPlayer.pausePlayer();
      this.setState({paused: false, playing: true})
    } else {
      await this.audioPlayer.startPlayer(audioPath);
      this.audioPlayer.addPlayBackListener((e) => {
       console.log({
          currentPositionSec: e.currentPosition,
          currentDurationSec: e.duration,
          playTime: this.audioPlayer.mmssss(Math.floor(e.currentPosition)),
          duration: this.audioPlayer.mmssss(Math.floor(e.duration)),
        });
      });
      this.setState({paused: false, loaded: true, playing: true})
    }
  }

  pause = async () => {
    await this.audioPlayer.pausePlayer();
    this.setState({paused: true, playing: false})
  }

  playAudio = async (item) => {
    if (this.state.playing) await this.pause()
    else await this.play(item.audioPath)
  }

  onBack = async () => {
    this.props.navigation.goBack()
    if (this.state.playing)  await this.audioPlayer.pausePlayer();
    this.setState({paused: true, playing: false})
  }

  onSocialImagePress = item => {
    if (item.imageSocial == 84) {
      if (item.title == 'Ringtones' && this.state.myRingtone != '') {
        this.playAudio(this.state.myRingtone)
      } else if (
        item.title == 'Notifications' &&
        this.state.myNotification != ''
      ) {
        this.playAudio(this.state.myNotification)
      }
    }
  }

  //====> Social Account Method <====//

  social_account = item => {
    return (
      <SocialAccountComponent
        title={item.title}
        imageSocial={item.imageSocial}
        iconMedia={true}
        removeBtn={false}
        // onPress={() => this.props.navigation.navigate('')}
      />
    )
  }

  //====> Favorite Method <====//

  favorite_ringtone = item => {
    return (
      <SocialAccountComponent
        title={item.title + ' ' + item.revInfo}
        // imageSocial={item.imageSocial}
        iconMedia={false}
        removeBtn={false}
        onlyText={true}
        // onPress={() => this.props.navigation.navigate('')}
      />
    )
  }

  //====> RingTone Method <====//

  my_ringtones = item => {
    return (
      <SocialAccountComponent
        title={item.title}
        imageSocial={item.imageSocial}
        // dropDownTitle={item.dropDownTitle}
        iconMedia={true}
        removeBtn={false}
        dropDown={true}
        dropDownMusic={false}
        dropdownItems={this.state.myRevtoneNames}
        defaultRevtoneButtonText={this.getDefaultRevtoneButtonText(item)}
        onSelectRevtone={(index, value) => this.onSelectRevtone(index, value)}
        onSocialImagePress={() => this.onSocialImagePress(item)}
        // onPress={() => this.props.navigation.navigate('')}
      />
    )
  }

  //====> Scores Method <====//

  rev_scores = item => {
    return (
      <RecordRevComponent
        title={item.title}
        numberText={item.numberText}
        textNumber={true}
        // onPress={() => this.props.navigation.navigate('')}
      />
    )
  }

  //====> Render Method <====//

  render () {
    const {user, avatar, name, email} = this.state;
    console.log('user', user);
    return (
      <View style={styles.mainContainer}>
        {/*====> Header View <====*/}

        <View style={styles.headerView}>
          <AppHeader
            title={'My PROFILE'}
            leftIconPath={images.back_arrow}
            onLeftIconPress={() => this.onBack()}
          />
        </View>

        <View style={styles.bottomContainer}>
          {/*====> Scroll View <====*/}

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, paddingBottom: hp(24)}}>
            <TouchableOpacity
              style={styles.imgView}
              onPress={() =>
                this.props.navigation.navigate('EditProfile', {
                  user: user,
                  userId: this.userId,
                })
              }>
              <Image
                style={styles.image}
                source={avatar ? {uri: avatar} : images.avatar}
              />
              <Text style={styles.name}>
                {user
                  ? `${user.firstName} ${user.lastName}` + ( user.age?`, ${user.age}`:'')
                  : 'Hi, Client'}
              </Text>
              <Text style={styles.location}>{user && user.address}</Text>
            </TouchableOpacity>

            {/*====> Social Account FlatList View <====*/}

            <View style={styles.socialAccountView}>
              <Text style={styles.headingText}>Social Media Accounts</Text>
              {
                this.state.socialAccount.length>0?
                  <FlatList
                    style={{marginTop: 10}}
                    data={this.state.socialAccount}
                    renderItem={({item}) => this.social_account(item)}
                    keyExtractor={item => item.id}
                  />
                    :
                    <Text style={styles.noText}>No Social Accounts Added</Text>
              }
            </View>

            {/*====> Favorites FlatList View <====*/}

            <View style={styles.socialAccountView}>
              <Text style={styles.headingText}>Favorites</Text>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
                {
                  this.state.favorites.length > 0 ?
                    <FlatList
                      style={{marginTop: 10, height:Platform.OS === 'ios' ? hp(34) : hp(36)}}
                      data={this.state.favorites}
                      renderItem={({item}) => this.favorite_ringtone(item)}
                      keyExtractor={item => item.id}
                    />
                      :
                      <Text style={styles.noText}>No Favourites Added</Text>
                }
              </ScrollView>
            </View>

            {/*====> RingTones FlatList View <====*/}

            <View style={styles.revScores}>
              <Text style={styles.headingText}>My Ringtones</Text>
              <FlatList
                style={{marginTop: 10}}
                data={this.state.ring_tones}
                renderItem={({item}) => this.my_ringtones(item)}
                keyExtractor={item => item.keyId}
              />
            </View>

            {/*====> RevTones Scores FlatList View <====*/}

            <View style={styles.revScores}>
              <Text style={styles.headingText}>RevTone Scores</Text>
              <FlatList
                style={{marginTop: 10}}
                data={this.state.scores}
                renderItem={({item}) => this.rev_scores(item)}
                keyExtractor={item => item.id}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}
