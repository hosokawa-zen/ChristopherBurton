//====> System files <====//

import {View, FlatList, Modal} from 'react-native'
import React from 'react'
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'

//====> Local files <====//

import Revtones from '../../../Components/AppComponents/RevtonesComponent/Revtones'
import Button from '../../../Components/Button/Button'
import AppHeader from '../../../Components/AppHeader'
import images from '../../../../assets/images'
import colors from '../../../../assets/colors'
import styles from './styles'
import UploadGuide from '../../../Components/AppComponents/UploadGuideModal/UploadGuide';
import AsyncStorage from '@react-native-async-storage/async-storage'


class MyRevtoneScreen extends React.Component {
  //====> Constructor Method <====//

  constructor (props) {
    super(props)
    this.userId = ''
    this.state = {
      firstBoot: false,
      uploadGuideModalVisible: false,
      user: null,
      Revtones: [],

      //====> RevTone Array <====//

      Revtonessss: [
        {
          id: 1,
          title: 'MUSICXXXA',
        },
        {
          id: 2,
          title: 'MUSICXXXB',
        },
        {
          id: 3,
          title: 'MUSICXXXC',
        },
        {
          id: 4,
          title: 'MUSICXXXD',
        },
      ],
    }
  }

  componentDidMount () {
    this.getUserRevtones()
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    this.getUserRevtones()
  }

  getUserRevtones = () => {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid
        this.loadRevtones()
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
        console.log('User data: ', snapshot.val())
        snapshot.forEach(child => {
          revtones = [
            ...revtones,
            {
              id: child.key,
              avatar: child.val().avatar,
              carMake: child.val().carMake,
              carModel: child.val().carModel,
              carYear: child.val().carYear,
              category: child.val().category,
              keywords: child.val().keywords,
              notes: child.val().notes,
              photo: child.val().photo,
              audio: child.val().audio,
              carInfo: child.val().carInfo,
              audios: child.val().audios,
              userId: child.val().userId,
            },
          ]
        })

        let myRevtones = []
        revtones.forEach(rev => {
          if (rev.userId == this.userId) {
            if (rev.audios) {
              rev.audios.forEach(a => {
                myRevtones = [
                  ...myRevtones,
                  {
                    keyId: Math.floor(Math.random() * 1000000),
                    id: rev.id,
                    avatar: rev.avatar,
                    carMake: rev.carMake,
                    carModel: rev.carModel,
                    carYear: rev.carYear,
                    category: rev.category,
                    keywords: rev.keywords,
                    notes: rev.notes,
                    photo: rev.photo,
                    audio: rev.audio,
                    carInfo: rev.carInfo,
                    audios: rev.audios,
                    audioFromFirebase: a,
                    userId: rev.userId,
                  },
                ]
              })
            } else {
              myRevtones = [
                ...myRevtones,
                {
                  keyId: Math.floor(Math.random() * 1000),
                  id: rev.id,
                  avatar: rev.avatar,
                  carMake: rev.carMake,
                  carModel: rev.carModel,
                  carYear: rev.carYear,
                  category: rev.category,
                  keywords: rev.keywords,
                  notes: rev.notes,
                  photo: rev.photo,
                  audio: rev.audio,
                  carInfo: rev.carInfo,
                  audios: rev.audios,
                  userId: rev.userId,
                },
              ]
            }
          }
        })

        this.setState({
          Revtones: [...myRevtones],
        })

        AsyncStorage.getItem('firstBoot').then(async firstBoot => {
          if (firstBoot == '1') {
            this.setState({firstBoot: true})
            this.setUploadGuideModalVisible(true);
          }
        })
      })
  }

  onRemove = item => {
    // alert('remove?' + item.id)
    // if(window.confirm("Are you sure you want to delete this item?")) {
    let revtones = this.state.Revtones
    revtones.forEach(rev => {
      if (rev.keyId == item.keyId) {
        if (rev.audios && rev.audios.length > 0) {
          rev.audios = rev.audios.filter(a => {
            if (a.path != item.audioFromFirebase.path) return true
          })
        }
        item.audios = rev.audios
      }
    })

    if (item.audios == null || (item.audios && item.audios.length == 0)) {
      if (item.id) {
        database()
          .ref(`/revton/${item.id}`)
          .remove()
      }
    } else {
      let updates = {}
      updates[`revton/${item.id}`] = {...item}
      database()
        .ref()
        .update(updates)
        .then(function () {
          // alert('Data updated successfully.')
        })
        .catch(function (error) {
          alert('Data could not be updated.' + error)
        })
    }
  }

  //====> RevTone Method <====//

  music (item) {
    return (
      <Revtones
        title={
          item.audioFromFirebase
            ? item.audioFromFirebase.name +
              ' ' +
              item.carMake +
              ' ' +
              item.carModel
            : 'audio' + ' ' + item.carMake + ' ' + item.carModel
        }
        onPressUpdate={() =>
          this.props.navigation.navigate('NewRevtoneScreen', {revton: item})
        }
        onPressRemove={() => this.onRemove(item)}
      />
    )
  }

  setUploadGuideModalVisible = (visible) => {
      this.setState({ uploadGuideModalVisible: visible });
      if(!visible) AsyncStorage.setItem('firstBoot', '0')
  };

  inVisibleUploadGuide() {
      this.setState({ uploadGuideModalVisible: false })
  }

  //====> Render Method <====//

  render () {
    const {uploadGuideModalVisible} = this.state
    return (
      <View style={styles.mainContainer}>
        {/*====> Header View <====*/}

        <View style={styles.headerView}>
          <AppHeader
            title={'MY REVTONES'}
            bgColor={colors.app_header_color}
            leftIconPath={images.icn_menu}
            onLeftIconPress={() => this.props.navigation.openDrawer()}
          />
        </View>

        {/*====> FlatList View <====*/}

        <View style={styles.container}>
          <FlatList
            data={this.state.Revtones}
            renderItem={({item}) => this.music(item)}
            keyExtractor={item => item.keyId}
          />
        </View>

        {/*====> Button View <====*/}

        <View style={styles.buttonContainer}>
          <Button
            title={'Add New Revtones'}
            style={styles.btn}
            bgColor={colors.app_button_color}
            titleStyle={{
              color: colors.white,
              fontWeight: 'bold',
              fontSize: 14,
            }}
            onPress={() =>
              this.props.navigation.navigate('NewRevtoneScreen', {revton: null})
            }
          />
        </View>

        <Modal
            animationType="slide"
            transparent={true}
            visible={uploadGuideModalVisible}
            onRequestClose={() => {
                this.setUploadGuideModalVisible(!uploadGuideModalVisible);
            }}>
            <UploadGuide
                neverShowAgain={true}
                onPressOkay={() => {
                    this.setUploadGuideModalVisible(!uploadGuideModalVisible)
                }}
                onPressCancel={() => {
                    this.setUploadGuideModalVisible(!uploadGuideModalVisible)
                }}

            />
        </Modal>
      </View>
    )
  }
}

export default MyRevtoneScreen
