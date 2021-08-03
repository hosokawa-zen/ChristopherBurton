//====> System files <====//
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native'
import React from 'react'
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage'
import ImageResizer from 'react-native-image-resizer'
import {launchImageLibrary} from 'react-native-image-picker'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'

//====> Local files <====//

import SocialAccountComponent from '../../../Components/AppComponents/SocialAccountComponent/SocialAccountComponent'
import Button from '../../../Components/Button/Button'
import AppHeader from '../../../Components/AppHeader'
import AppInput from '../../../Components/AppInput'
import images from '../../../../assets/images'
import colors from '../../../../assets/colors'
import styles from './style'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {openGotoSocialApp, socials} from "../../../socials";

export default class EditProfile extends React.Component {
  //====> Render Method <====//

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
      uploadUri: '',

      //====> Favorites Array <====//

      favorites: [
        {
          id: 1,
          title: 'Add a revtone',
        },
      ],

      //====> Scores Array <====//

      scores: [
        {
          id: 1,
          imageSocial: images.icn_play_small,
          title: 'highest RevTone Score',
          number: '0',
        },
        {
          id: 2,
          imageSocial: images.icn_play_small,
          title: 'highest RevTone Score',
          number: '0',
        },
      ],

      //====> RingTone Array <====//

      ring_tones: [
        {
          id: 1,
          imageSocial: images.icn_play_small,
          title: 'Ringtones',
          dropDownTitle: 'Select a ringtone',
          number: '0',
        },
        {
          id: 2,
          imageSocial: images.icn_play_small,
          title: 'Notifications',
          dropDownTitle: "Select a ringtone",
          number: '0',
        },
      ],
      mySocials: [],
      myRingtones: [],
      myRingtoneNames: [],
      myRingtoneAudios: [],
      ringtones: [],
      selectedRingtone: '',
      ringtoneNames: [],
      notifications: [],
      selectedNotification: '',
      notificationNames: [],
      maxScore: 0,
      currentScore: 0,
    }
  }

  componentDidMount () {
    if (this.props.route.params.userId) {
      this.userId = this.props.route.params.userId
      let user = this.props.route.params.user
      if (user) {
        let scores = this.getRevtoneScores(user)
        this.setState({
          user,
          avatar: user.avatar,
          scores,
          favorites: user.favorites,
          ringtones: user.ringtones,
          notifications: user.notifications,
          maxScore: user.maxScore,
          currentScore: user.currentScore,
          mySocials: user.mySocials??[],
          myRintone: user.myRingtone,
          myNotification: user.myNotification,
          myRingtones: user.ringtones,
          myRingtoneNames: this.ringtonesForDropdown(user.ringtones),
          selectedRingtone: user.myRingtone,
          selectedNotification: user.myNotification,
        })
      }
    }
  }

  getRevtoneScores = user => {
    let data = [
      {
        id: 1,
        imageSocial: images.icn_play_small,
        title: 'Highest RevTone Score',
        number: user.maxScore ? user.maxScore : 0,
      },
      {
        id: 2,
        imageSocial: images.icn_play_small,
        title: 'Current RevTone Score',
        number: user.currentScore ? user.currentScore : 0,
      },
    ]
    return data
  }

  choosePhoto = () => {
    let options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }

    launchImageLibrary(options, response => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
        //   } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
        // alert(response.customButton);
      } else {
        let uploadUri =
            Platform.OS === 'ios'
                ? response.uri.replace('file://', '')
                : response.uri
        this.setState({
          uploadUri,
          avatar: uploadUri,
        });
        // const imageUri = response.uri
        // const newWidth = 150
        // const newHeight = 150
        // const compressFormat = 'PNG'
        // const quality = 100
        // const rotation = 0
        // const outputPath = null
        //
        // ImageResizer.createResizedImage(
        //   imageUri,
        //   newWidth,
        //   newHeight,
        //   compressFormat,
        //   quality,
        //   rotation,
        //   outputPath,
        // ).then(response => {
        //   let uploadUri =
        //     Platform.OS === 'ios'
        //       ? response.uri.replace('file://', '')
        //       : response.uri
        //   this.setState({
        //     uploadUri,
        //     avatar: uploadUri,
        //   })
        // })
      }
    })
  }


  onSave = async navEnabled => {
    try {
      if (this.state.uploadUri) {
        await new Promise((resolve, reject) => {
          storage()
            .ref(`users/${this.userId}/avatar`)
            .putFile(this.state.uploadUri)
            .then(snapshot => {
              storage()
                .ref(`users/${this.userId}/avatar`)
                .getDownloadURL()
                .then(url => {
                  resolve('')
                  this.setState({avatar: url})
                })
                .catch(e => {
                  reject(e.message)
                })
            })
            .catch(e => {
              reject(e.message)
              alert('uploading error :' + e.message)
            })
        })
        this.setState({uploadUri: ''})
      }

      let load = {
        firstName: this.state.user.firstName,
        lastName: this.state.user.lastName,
        age: this.state.user.age,
        address: this.state.user.address,
        avatar: this.state.avatar,
        userId: this.userId,
        currentScore: this.state.currentScore ? this.state.currentScore : 0,
        maxScore: this.state.maxScore ? this.state.maxScore : 0,
        favorites: this.state.favorites,
        mySocials: this.state.mySocials,
        myRingtone: this.state.selectedRingtone,
        myNotification: this.state.selectedNotification,
      }

      if (this.state.user && this.state.user.userId) {
        let updates = {}
        updates[`users/${this.state.user.userId}/`] = {...load}
        database()
          .ref()
          .update(updates)
          .then(function () {
            alert("Data updated successfully.");
            //   history.replace('/admin/revtones');
          })
          .catch(function (error) {
            alert('Data could not be updated.' + error)
          })
      } else {
        let userRef = database().ref(`users/`)
        let newUser = userRef.push()
        newUser.set({...load})
      }
    } catch (e) {
      alert(e.message)
    }

    if (navEnabled) this.props.navigation.navigate('MyProfile')
  }

  onFavoriteRemove = item => {
    let favs = this.state.favorites
    let favorites = favs.filter(fav => {
      return item.id !== fav.id;
    })
    this.setState({
      favorites,
    })
  }

  onMyRingtonesRemove = item => {
    console.log('remove', item);
    if (item.title === 'Ringtones')
      this.setState({selectedRingtone: null})
    else if (item.title === 'Notifications')
      this.setState({selectedNotification: null})
  }

  onRevScoresRemove = item => {
    let data = []
    if (item.id == 1) {
      data = [
        {
          id: 1,
          imageSocial: images.icn_play_small,
          title: 'Highest RevTone Score',
          number: 0,
        },
        {
          id: 2,
          imageSocial: images.icn_play_small,
          title: 'Current RevTone Score',
          number: this.state.user.currentScore
            ? this.state.user.currentScore
            : 0,
        },
      ]

      this.setState({maxScore: 0})
    } else if (item.id == 2) {
      data = [
        {
          id: 1,
          imageSocial: images.icn_play_small,
          title: 'Highest RevTone Score',
          number: this.state.user.maxScore ? this.state.user.maxScore : 0,
        },
        {
          id: 2,
          imageSocial: images.icn_play_small,
          title: 'Current RevTone Score',
          number: 0,
        },
      ]

      this.setState({currentScore: 0})
    }

    this.setState({
      scores: [...data],
    })
  }

  ringtonesForDropdown = ringtones => {
    let rts = ringtones
    let names = []
    let audios = []
    rts.forEach(r => {
      if (r.audios) {
        r.audios.forEach(a => {
          names = [...names, a.name + ' ' + r.carMake + ' ' + r.carModel]
          audios = [...audios, a.path]
        })
      }
    })
    //this.setState({categoryNames: names})
    this.setState({myRingtoneAudios: audios})
    return names
  }

  onSelectRingtone = (index, value, item) => {
    if (item.title === 'Ringtones') {
      if(!index && !value){
        this.setState({selectedRingtone: null});
      } else {
        this.setState({
          selectedRingtone: {
            title: value,
            audioPath: this.state.myRingtoneAudios[index],
          },
        })
      }
    } else if (item.title === 'Notifications') {
      if(!index && !value){
        this.setState({selectedNotification: null});
      } else {
        this.setState({
          selectedNotification: {
            title: value,
            audioPath: this.state.myRingtoneAudios[index],
          },
        })
      }
    }
  }

  onSelectNotification = (index, value) => {
    let selectedNotification = this.state.myRingtones[index]
    this.setState({selectedNotification})
  }

  onSocialAccountSave = () => {
    this.onSave(false);
  }

  onFavoriteSave = () => {
    this.onSave(false)
  }

  onRingtoneSave = () => {
    this.onSave(false)
  }

  onRevScoreSave = () => {
    this.onSave(false)
  }

  initAudioPlayer = () => {
  }

  play = async audioPath => {
    if (this.state.loaded) {
      await this.audioPlayer.resumePlayer();
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
        if(e.currentPosition === e.duration){
          this.setState({paused: true, loaded: false, playing: false});
        }
      });
      this.setState({paused: false, loaded: true, playing: true})
    }
  }

  pause = async () => {
    await this.audioPlayer.pausePlayer();
    this.setState({paused: true, playing: false})
  }

  playAudio = async (paused, item) => {
    console.log(item)
    if (this.state.playing) await this.pause()
    else await this.play(item.path)
  }

  onBack = async () => {
    this.props.navigation.goBack()
    if (this.state.playing) await this.audioPlayer.stopPlayer();
    this.setState({paused: true, playing: false})
  }

  onSocialImagePress = async item => {
    if (item.imageSocial === 84) {
      if (item.title === 'Ringtones' && this.state.selectedRingtone !== '') {
        await this.playAudio(this.state.selectedRingtone)
      } else if (
        item.title === 'Notifications' &&
        this.state.selectedNotification !== ''
      ) {
        await this.playAudio(this.state.selectedNotification)
      }
    }
  }

  //====> Social Account Method <====//

  onPressItem = (id) => {
    openGotoSocialApp(id);
  }

  onToggleItem = (is_added, item_id) => {
    if(is_added){
      const mySocials = this.state.mySocials.filter(i => i !== item_id);
      this.setState({mySocials});
    } else {
      const mySocials = [...this.state.mySocials, item_id];
      this.setState({mySocials});
    }
  }

  social_account = item => {
    const is_added = this.state.mySocials.includes(item.id);
    return (
        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.itemContent} onPress={() => this.onPressItem(item.id)}>
            <Image style={styles.img} source={item.imageSocial}/>
            <Text
                ellipsizeMode={'tail'}
                numberOfLines={1}
                style={styles.textTitle}>{item.title}</Text>
          </TouchableOpacity>
          <Button style={styles.btnStyle} bgColor={is_added?colors.app_red:colors.most_blue_button} titleStyle={styles.titleStyle}
                  title={is_added?'Remove':'Add'} onPress={() => this.onToggleItem(is_added, item.id)}/>
        </View>
    )
  }

  //====> Favorite Method <====//

  favorite_ringtone = item => {
    return (
      <SocialAccountComponent
        title={item.title + ' ' + (item.revInfo??'')}
        imageSocial={item.imageSocial}
        iconMedia={false}
        removeBtn={item.title == 'Add a revtone' ? false : true}
        onlyText={true}
        onRemoveTrigger={() => this.onFavoriteRemove(item)}
      />
    )
  }

  //====> Scores Method <====//

  rev_scores = item => {
    return (
      <SocialAccountComponent
        title={item.title}
        imageSocial={item.imageSocial}
        iconMedia={true}
        removeBtn={true}
        number={item.number}
        numberView={true}
        onRemoveTrigger={() => this.onRevScoresRemove(item)}
      />
    )
  }

  //====> RingTones Method <====//

  my_ringtones = item => {
    let defaultIndex = null;
    if (item.title === 'Ringtones') {
      defaultIndex = this.state.selectedRingtone?this.state.myRingtoneNames.indexOf(this.state.selectedRingtone.title):null
    } else if (item.title === 'Notifications') {
      defaultIndex = this.state.selectedNotification?this.state.myRingtoneNames.indexOf(this.state.selectedNotification.title):null
    }

      return (
        <SocialAccountComponent
          title={item.title}
          items={this.state.myRingtoneNames}
          imageSocial={item.imageSocial}
          dropDownTitle={'Select a ringtone'}
          iconMedia={true}
          removeBtn={item.title == 'Add a revtone' ? false : true}
          dropDownMusic={true}
          defaultIndex={defaultIndex}
          widthText={'20%'}
          onRemoveTrigger={() => this.onMyRingtonesRemove(item)}
          onSelectRingtone={(index, value) =>
            this.onSelectRingtone(index, value, item)
          }
          onSocialImagePress={() => this.onSocialImagePress(item)}
        />
      )
  }

  //====> Render Method <====//

  render () {
    const {user, avatar} = this.state
    return (
      <View style={styles.mainContainer}>
        {/*====> Header View <====*/}

        <View style={styles.headerView}>
          <AppHeader
            title={'EDIT PROFILE'}
            leftIconPath={images.back_arrow}
            onLeftIconPress={() => this.onBack()}
            rightIconOnePath={images.check}
            onRightIconPress={() => this.onSave(true)}
          />
        </View>

        <View style={styles.bottomContainer}>
          {/*====> Scroll View <====*/}

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, paddingBottom: hp(10)}}>
            <TouchableOpacity onPress={this.choosePhoto} style={styles.imgView}>
              <Image
                style={styles.image}
                source={avatar ? {uri: avatar} : images.avatar}
              />
            </TouchableOpacity>

            {/*====> Input View <====*/}

            <View style={styles.inputsView}>
              <View style={styles.infoView}>
                <Text style={styles.infoTitle}>First Name</Text>
                <AppInput
                  placeholder={'Ernest'}
                  placeholderTextColor={colors.grey}
                  borderRadius={0.01}
                  textInputColor={colors.white}
                  backgroundColor={colors.app_header_color}
                  width={'100%'}
                  borderWidth={0.3}
                  borderColor={'white'}
                  value={user && user.firstName}
                  onChangeText={text =>
                    this.setState({user: {...user, firstName: text}})
                  }
                />
              </View>

              {/*====> Input View <====*/}

              <View style={[styles.infoView, {marginTop: 7}]}>
                <Text style={styles.infoTitle}>Last Name</Text>
                <AppInput
                  placeholder={'Bell'}
                  placeholderTextColor={colors.grey}
                  textInputColor={colors.white}
                  borderRadius={0.01}
                  backgroundColor={colors.app_header_color}
                  width={'100%'}
                  borderWidth={0.3}
                  borderColor={'white'}
                  value={user && user.lastName}
                  onChangeText={text =>
                    this.setState({user: {...user, lastName: text}})
                  }
                />
              </View>

              {/*====> DropDown View <====*/}

              <View style={[styles.infoView, {marginTop: 7}]}>
                <Text style={styles.infoTitle}>Age</Text>
                {/* <View style={styles.dropdownView}>
                  <Dropdown
                    listViewWidth={"94%"}
                    options={["A", "B", "C", "D", "E"]}
                    defaultButtontext={"Bell"}
                    dropdownStyle={{ height: "100%", width: "100%" }}
                    dropdownOptionsStyle={{
                      width: "93%",
                      marginRight: "11%",
                      marginTop: "5%",
                    }}
                  />
                </View> */}
                <AppInput
                  placeholder={'34'}
                  placeholderTextColor={colors.grey}
                  textInputColor={colors.white}
                  borderRadius={0.01}
                  backgroundColor={colors.app_header_color}
                  width={'100%'}
                  borderWidth={0.3}
                  borderColor={'white'}
                  value={user && user.age}
                  onChangeText={text =>
                    this.setState({user: {...user, age: text}})
                  }
                />
              </View>

              {/*====> Input View <====*/}

              <View style={[styles.infoView, {marginTop: 7}]}>
                <Text style={styles.infoTitle}>Address</Text>
                <AppInput
                  placeholder={'Los Angeles, CA'}
                  rightIconPath={images.ic_maker}
                  placeholderTextColor={colors.grey}
                  textInputColor={colors.white}
                  keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                  paddingRight={0.01}
                  marginLeft={8}
                  borderRadius={0.01}
                  backgroundColor={colors.app_header_color}
                  width={'100%'}
                  borderWidth={0.3}
                  borderColor={'white'}
                  value={user && user.address}
                  onChangeText={text =>
                    this.setState({user: {...user, address: text}})
                  }
                />
              </View>
            </View>

            {/*====> Social Account FlatList View <====*/}

            <View style={styles.socialAccountView}>
              <Text style={styles.headingText}>Social Media Accounts</Text>
              <FlatList
                style={{marginTop: 10}}
                data={socials}
                renderItem={({item}) => this.social_account(item)}
                keyExtractor={item => item.id}
              />

              {/*====> Button View <====*/}

              <View style={{alignItems: 'center', marginTop: 15}}>
                <Button
                  title={'Save'}
                  onPress={() => this.onSocialAccountSave()}
                />
              </View>
            </View>

            {/*====> Favorites FlatList View <====*/}

            <View style={styles.socialAccountView}>
              <Text style={styles.headingText}>Favorites</Text>
              {
                this.state.favorites && this.state.favorites.length?
                    <>
                      <FlatList
                        style={{marginTop: 10, maxHeight: 400}}
                        data={this.state.favorites}
                        renderItem={({item}) => this.favorite_ringtone(item)}
                        keyExtractor={item => item.id}
                      />

                      {/*====> Button View <====*/}

                      <View style={{alignItems: 'center', marginTop: 15}}>
                        <Button title={'Save'} onPress={() => this.onFavoriteSave()} />
                      </View>
                    </>
                    :
                    <Text style={styles.noText}>No Favorites Added</Text>
              }
            </View>

            {/*====> RingTones View <====*/}

            <View style={styles.revScores}>
              <Text style={styles.headingText}>My Ringtones</Text>
              {
                this.state.myRingtoneNames.length ?
                    <>
                      <FlatList
                        style={{marginTop: 10, height:Platform.OS === 'ios' ? hp(29) : hp(31)}}
                        data={this.state.ring_tones}
                        renderItem={({item}) => this.my_ringtones(item)}
                        keyExtractor={item => item.id}
                      />

                      {/*====> Button View <====*/}

                      <View style={{alignItems: 'center', marginTop: 15}}>
                        <Button title={'Save'} onPress={() => this.onRingtoneSave()} />
                      </View>
                    </>
                    :
                  <Text style={styles.noText}>No Ringtones Added</Text>
              }
            </View>

            {/*====> RevTone Score View <====*/}

            <View style={styles.revScores}>
              <Text style={styles.headingText}>RevTone Scores</Text>
              <FlatList
                style={{marginTop: 10}}
                data={this.state.scores}
                renderItem={({item}) => this.rev_scores(item)}
                keyExtractor={item => item.id}
              />

              {/*====> Button View <====*/}

              <View style={{alignItems: 'center', marginTop: 15}}>
                <Button title={'Save'} onPress={() => this.onRevScoreSave()} />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}
