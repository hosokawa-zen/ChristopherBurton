//====> System files <====//
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  Platform,
  Modal,
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Swiper from 'react-native-swiper'
import React from 'react'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'
import ImageView from 'react-native-image-view'
import RNFS from 'react-native-fs'

//====> Local files <====//
import PurchaseModel from '../../../Components/AppComponents/RateModel/PurchaseView'
import CarProfileComponent from '../../../Components/AppComponents/CarProfileComponent/CarProfileComponent'
import Button from '../../../Components/Button/Button'
import AppHeader from '../../../Components/AppHeader'
import images from '../../../../assets/images'
import colors from '../../../../assets/colors'
import styles from './style'
import {openGotoSocialApp, socials} from "../../../socials";

export default class CarProfile extends React.Component {
  constructor (props) {
    super(props)
    this.userId = ''
    this.myId = ''
    this.audioPlayer = new AudioRecorderPlayer();
    ;(this.listRingtones = [
      {
        id: 1,
        title: 'Start up',
        audioPath: '',
      },
      {
        id: 2,
        title: 'Idle',
        audioPath: '',
      },
      {
        id: 3,
        title: 'Reviving',
        audioPath: '',
      },
    ]),
      (this.state = {
        paused: false,
        loaded: false,
        playing: false,
        downloadItem: '',
        modalVisible: false,
        isImageViewVisible: false,
        imagesList: [
          {
            source: images.car_2,
            title: 'Demo',
          },
        ],
        user: null,
        avatar: '',
        revton: null,
        favorites: [],
        mySocials: [],
        me: null,
      })
  }

  componentDidMount () {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.myId = user.uid
        this.getMyInfo()
      } else {
        if (this.props.navigation) {
          this.props.navigation.navigate('LoginScreen')
        }
      }
    })
    let rev = this.props.route.params.revton
    if (rev) {
      this.setState({
        revton: rev,
        imagesList: [
          // ...this.state.imagesList,
          {
            source: rev.photo != '' ? {uri: rev.photo} : images.car_2,
            title: rev.title,
          },
        ],
      })

      this.getUser(rev)

      console.log('rev', rev);
      if(rev.audios){
        let ringtones = []
        rev.audios.forEach((a, i) => {
          let ringtone = {
            id: Math.floor(Math.random() * 100000000),
            title: a.name,
            audioPath: a.path,
            revInfo: rev.carMake + ' ' + rev.carModel,
          }
          ringtones.push(ringtone)
        })

        this.listRingtones = ringtones
      }

      this.initAudioPlayer()
    }
  }

  getUser = rev => {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.userId = rev.userId

        this.getUserInfo()
      } else {
        if (this.props.navigation) {
          this.props.navigation.navigate('LoginScreen')
        }
      }
    })
  }

  getMyInfo = () => {
    database()
      .ref(`users/`)
      .on('value', snapshot => {
        if (snapshot.exists()) {
          const uid = this.myId
          let user = ''
          snapshot.forEach(child => {
            if (child.val().userId == uid) {
              user = child.val()
            }
          })
          if (user) {
            this.setState({
              me: user,
              favorites: user.favorites??[],
              mySocials: user.mySocials??[]
            })
          }
        } else {
          console.log("Can't get user info")
        }
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
            const avatar = user.avatar != '' ? user.avatar : ''

            this.setState({
              user,
              avatar,
            })
          }
        } else {
          console.log("Can't get user info")
        }
      })
  }

  initAudioPlayer = () => {
  }

  play = async (audioPath) => {
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
    let rev = this.state.revton
    let load = {...rev, playCount: rev.playCount + 1}
    let updates = {}
    updates[`revton/${rev.id}`] = {...load}
    database()
      .ref()
      .update(updates)
      .then(function () {
        //alert("Data updated successfully.");
        //   history.replace('/admin/revtones');
      })
      .catch(function (error) {
        alert('Data could not be updated.' + error)
      })

    if (this.state.playing) await this.pause();
    else await this.play(item.audioPath)
  }

  onBack = async () => {
    if (this.state.playing) await this.audioPlayer.pausePlayer();
    this.setState({paused: true, playing: false})
    this.props.navigation.goBack()
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible})
  }

  onCancel = () => {
    this.setState({modalVisible: false})
  }

  downloadAndSaveFile = file => {
    if (!file) return
    const fileUrl = file.audioPath;

    const downloadDirPath = Platform.OS === 'android'?`${RNFS.DownloadDirectoryPath}`:`${RNFS.DocumentDirectoryPath}`;

    const filePath = downloadDirPath+ '/' + file.title + ' ' + this.state.revton.carMake + ' ' + this.state.revton.carModel + '.mp3';

    console.log('path', downloadDirPath, filePath);
    RNFS.exists(downloadDirPath).then((res) => {
      console.log('exist', res);
      if(!res){
        RNFS.mkdir(downloadDirPath).then(() => {
          this.saveFile(fileUrl, filePath);
        })
      } else {
        this.saveFile(fileUrl, filePath);
      }
    })
  }

  saveFile = (fileUrl, filePath) => {
    RNFS.downloadFile({
      fromUrl: fileUrl,
      toFile: filePath,
    }).promise.then(result => {
      console.log('------------------> Look in: ', result) //here you get temporary path
      alert('Successfully downloaded. You can find it in Download or Document folder.')
    })
        .catch(e => {
          console.log(e, 'error')
        })
  }

  downloadRevtone = () => {
    this.setModalVisible(false)
    if (this.state.revton.userId === this.myId) alert('this was made by you')
    else {
      console.log(
        '--------------------------> downloadItem info: ',
        this.state.downloadItem,
      )
      this.downloadAndSaveFile(this.state.downloadItem)
    }
  }

  onDownloadPress = item => {
    this.setState({
      downloadItem: item,
      modalVisible: true,
    })
  }

  onFlagPress = item => {
    console.log('------------------> me ', this.state.me)
    let isMyFavorite = false
    if (this.state.favorites) {
      this.state.favorites.forEach(fav => {
        if (fav.audioPath === item.audioPath && fav.title === item.title) {
          isMyFavorite = true
        }
      })
    }

    if (!isMyFavorite) {
      let load = {
        ...this.state.me,
        favorites: this.state.favorites
          ? [...this.state.favorites, item]
          : [item],
      }
      let updates = {}
      updates[`users/${this.myId}/`] = {...load}
      database()
        .ref()
        .update(updates)
        .then(function () {
          // alert("Data updated successfully.");
          //   history.replace('/admin/revtones');
        })
        .catch(function (error) {
          alert('Data could not be updated.' + error)
        })
    }
  }

  //====> List Ringtone Method <====//

  list_ringtones (item) {
    const is_favorite = this.state.favorites.find(f=>(f.audioPath === item.audioPath && f.title === item.title));
    console.log('is_favorite', is_favorite);
    return (
      <CarProfileComponent
        title={item.title}
        //onPress={() => this.setModalVisible(true)}
        onDownloadPress={() => this.onDownloadPress(item)}
        onPlay={paused => this.playAudio(paused, item)}
        is_favorite={is_favorite}
        onFlagPress={() => this.onFlagPress(item)}
      />
    )
  }

  //====> Render Method <====//

  render () {
    let revton = this.props.route.params.revton
    const {
      user,
      avatar,
      modalVisible,
      isImageViewVisible,
      imagesList,
    } = this.state
    return (
      <View style={styles.mainContainer}>
        {/*====> Header View <====*/}

        <View style={styles.headerView}>
          <AppHeader
            title={'CAR PROFILE'}
            leftIconPath={images.back_arrow}
            onLeftIconPress={() => this.onBack()}
          />
        </View>
        <View style={styles.bottomContainer}>
          {/*====> Swiper View <====*/}

          <View style={styles.sliderCotainer}>
            <Swiper
              showsButtons={false}
              loop={true}
              autoplay={false}
              ref={'swiper'}
              activeDotColor={colors.white}
              paginationStyle={{
                bottom: wp(6),
                left: null,
                right: wp(5),
              }}
              dot={<View style={styles.dot} />}
              dotColor={colors.grey}
              activeDot={<View style={styles.activeDot} />}>
              {/*====> ImageBackground View <====*/}

              <View style={styles.slides}>
                <TouchableOpacity
                  onPress={() => this.setState({isImageViewVisible: true})}>
                  <ImageBackground
                    style={styles.imageBackGround}
                    source={
                      user && revton.photo != ''
                        ? {uri: revton.photo}
                        : images.car_2
                    }
                    resizeMode={'cover'}>
                    <View style={styles.dotTextView}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('UserProfile', {
                            userInfo: user,
                          })
                        }>
                        <Image
                          style={styles.icon}
                          source={avatar ? {uri: avatar} : images.avatar}
                        />
                      </TouchableOpacity>
                      <View style={{paddingLeft: '2%'}}>
                        <Text style={styles.createdText}>Created by</Text>
                        <Text style={styles.nameText}>
                          {user
                            ? `${user.firstName} ${user.lastName}`
                            : `Joe Vulcano`}
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>

              {/*====> ImageBackground View <====*/}

              <View style={styles.slides}>
                <ImageBackground
                  style={styles.imageBackGround}
                  source={images.car_1}
                  resizeMode={'cover'}>
                  <View style={styles.dotTextView}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('UserProfile')
                      }>
                      <Image style={styles.icon} source={images.avatar} />
                    </TouchableOpacity>
                    <View style={{paddingLeft: '2%'}}>
                      <Text style={styles.createdText}>Created by</Text>
                      <Text style={styles.nameText}>Joe Vulcano</Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>

              {/*====> ImageBackground View <====*/}

              <View style={styles.slides}>
                <ImageBackground
                  style={styles.imageBackGround}
                  source={images.car_2}
                  resizeMode={'cover'}>
                  <View style={styles.dotTextView}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('UserProfile')
                      }>
                      <Image style={styles.icon} source={images.avatar} />
                    </TouchableOpacity>
                    <View style={{paddingLeft: '2%'}}>
                      <Text style={styles.createdText}>Created by</Text>
                      <Text style={styles.nameText}>Joe Vulcano</Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>

              {/*====> ImageBackground View <====*/}

              <View style={styles.slides}>
                <ImageBackground
                  style={styles.imageBackGround}
                  source={images.car_1}
                  resizeMode={'cover'}>
                  <View style={styles.dotTextView}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('UserProfile')
                      }>
                      <Image style={styles.icon} source={images.avatar} />
                    </TouchableOpacity>
                    <View style={{paddingLeft: '2%'}}>
                      <Text style={styles.createdText}>Created by</Text>
                      <Text style={styles.nameText}>Joe Vulcano</Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </Swiper>
          </View>

          {/*====> Car Info View <====*/}

          <View style={styles.carInfoView}>
            <Text style={styles.title}>
              {revton && revton.carMake + ' ' + revton.carModel}
            </Text>
            <Text style={styles.infoText}>{revton && revton.notes}</Text>

            <View style={styles.iconsView}>
              {
                this.state.mySocials.map(i => {
                  const social = socials.find(s => s.id === i);
                  if(social){
                    return (
                        <TouchableOpacity onPress={() => openGotoSocialApp(i)}>
                          <Image
                              style={styles.iconSocial}
                              source={social.imageSocial}
                          />
                        </TouchableOpacity>
                    )
                  }
                  return null;
                })
              }
            </View>
            <View style={{alignItems: 'center', marginTop: '4%'}}>
              <Button
                title={'Car Details'}
                onPress={() =>
                  this.props.navigation.navigate('QuestionScreen', {
                    carInfo: revton ? revton.carInfo : null,
                  })
                }
              />
            </View>
          </View>

          {/*====> Flat List View <====*/}

          <View style={styles.flatListView}>
            <FlatList
              data={this.listRingtones}
              renderItem={({item}) => this.list_ringtones(item)}
              keyExtractor={item => item.id}
            />
          </View>
        </View>

        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible)
          }}>
          {/*====> Modal Options <====*/}

          <PurchaseModel
            onPressOkay={() => this.downloadRevtone()}
            onPressCancel={() => this.onCancel()}
          />
        </Modal>

        <ImageView
          glideAlways
          images={imagesList}
          imageIndex={0}
          animationType='fade'
          isVisible={isImageViewVisible}
          // renderFooter={this.renderFooter}
          onClose={() => this.setState({isImageViewVisible: false})}
          onImageChange={index => {
            console.log(index)
          }}
        />
      </View>
    )
  }
}
