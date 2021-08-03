//====> System files <====//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  PermissionsAndroid,
  ScrollView,
  Platform, KeyboardAvoidingView,
} from 'react-native'
import React from 'react'
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import {launchImageLibrary} from 'react-native-image-picker'

//====> Local files <====//

import TextModel from '../../../Components/AppComponents/TextModel/View'
import Button from '../../../Components/Button/Button'
import AppHeader from '../../../Components/AppHeader'
import AppInput from '../../../Components/AppInput'
import images from '../../../../assets/images'
import colors from '../../../../assets/colors'
import styles from './styles'
import {Select} from "../../../Components/Select";

const scrollPersistTaps = {
  keyboardShouldPersistTaps: 'always',
  keyboardDismissMode: 'interactive'
};

class NewRevtoneScreen extends React.Component {
  //====> Constructor Method <====//

  constructor (props) {
    super(props)
    this.categoryIndex = 0
    this.userId = ''
    this.id = ''
    this.car = ''
    this.state = {
      // showPassword: true,
      modalVisible: false,
      avatar: '',
      audio: '',
      audioSrc: '',
      audioPath: '',
      audioName: '',
      carMake: '',
      carModel: '',
      carYear: '',
      category: null,
      keywords: '',
      notes: '',
      photo: '',
      photoSrc: '',
      photoName: '',
      categories: [],
      selectedCategory: '',
      id: '',
      carInfo: null,
      categoryNames: [],
      audios: [],
      audioFromFirebase: null,
    }
  }

  componentDidMount () {
    if (this.props.route.params.revton != null) {
      this.id = this.props.route.params.revton.id
    }

    auth().onAuthStateChanged(user => {
      if (user) {
        console.log('user is logged in')
        this.userId = user.uid
      } else {
        if (this.props && this.props.navigation) {
          this.props.navigation.navigation('')
        }
      }
    })
    if (this.id != '') {
      let revton = this.props.route.params.revton
      console.log(revton)
      this.setState({
        carYear: revton.carYear,
        carMake: revton.carMake,
        carModel: revton.carModel,
        audio: revton.audio,
        audios: revton.audios,
        audioFromFirebase: revton.audioFromFirebase,
        audioSrc: revton.audio,
        avatar: revton.avatar,
        keywords: revton.keywords,
        notes: revton.notes,
        photo: revton.photo,
        category: revton.category,
        title: revton.title,
        carInfo: revton.carInfo,
        selectedCategory: revton.category,
        id: revton.id,
      })
    }

    database()
      .ref('/categories')
      .on('value', snapshot => {
        let ctgs = []
        snapshot.forEach(child => {
          ctgs.push({
            name: child.val().name,
            photo: child.val().photo,
            id: child.key,
          })
        })

        let cnames = this.categoriesForDropdown(ctgs)
        this.setState({
          categories: ctgs
        })
        this.setState({
          categoryNames: cnames,
        })

        this.categoryIndex = 0
      })
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    let prevParams = this.props.route.params
    let params = nextProps.route.params
    if (
      (params.audioPath && params.audios) ||
      Object.is(prevParams.audioPath, params.audioPath) == false
    ) {
      this.setState({
        audioPath: nextProps.route.params.audioPath,
        audioName: nextProps.route.params.audioName,
        audios: nextProps.route.params.audios,
      })
    }
    if (params.revton && Object.is(prevParams.revton, params.revton) == false) {
      let revton = nextProps.route.params.revton
      this.setState({
        carYear: revton.carYear,
        carMake: revton.carMake,
        carModel: revton.carModel,
        carInfo: revton.carInfo,
        audioSrc: revton.audio,
        audios: revton.audios,
        audio: revton.audio,
        avatar: revton.avatar,
        keywords: revton.keywords,
        notes: revton.notes,
        photo: revton.photo,
        category: revton.category,
        selectedCategory: revton.category,
      })

      console.log('RECEIVED PARAMS: audios: ' + this.state.audios)
      console.log('revton', revton);
      this.categoryIndex = this.getCategoryIndex()
    }
    if (
      params.carInfo &&
      Object.is(prevParams.carInfo, params.carInfo) == false
    ) {
      let car = {...nextProps.route.params.carInfo}
      this.setState({carInfo: {...car}})
    }
  }

  requestMicrophonePermission = async () => {
    try {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.MICROPHONE,
        {
          title: 'Microphone Permission',
          message: 'App needs to access microphone',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use microphone')
      } else {
        console.log('Microphone permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  requestWriteInternalStoragePermission = async () => {
    try {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_INTERNAL_STORAGE,
        {
          title: 'Write Internal Storage Permission',
          message: 'App needs to write internal storage',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can write internal storage')
      } else {
        console.log('Write internal storage permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  requestWriteExternalStoragePermission = async () => {
    try {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Write External Storage Permission',
          message: 'App needs to write external storage',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can write external storage')
      } else {
        console.log('Write external storage permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  requestRecordAudioPermission = async () => {
    try {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Record Audio Permission',
          message: 'App needs to record audio',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can record audio')
      } else {
        console.log('Record permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  getCategoryIndex = () => {
    let i = 0
    this.state.categories.forEach(c => {
      if (c.name == this.state.selectedCategory.name) return i
      i++
    })
    return i
  }

  audioIsFromServer = audio => {
    let audioIsFromServer = false
    if (audio) {
      audioIsFromServer = audio.split(':')[0] == 'https'
    }
    return audioIsFromServer
  }

  uploadAudio = async audio => {
    let audioLink = ''
    if (audio.path != '') {
      audioLink = await new Promise((resolve, reject) => {
        const url = '/audio/' + this.userId + '/' + audio.name
        storage()
          .ref(url)
          .putFile(audio.path)
          .then(snapshot => {
            storage()
              .ref(url)
              .getDownloadURL()
              .then(link => {
                console.log('resolve.......')
                resolve(link)
              })
              .catch(error => {
                console.log('reject.......')
                reject('')
              })
          })
          .catch(error => {
            console.log('catch.......')
            reject('')
          })
      })
    }

    if (audioLink != '') {
      return audioLink
    } else if (audioLink == '' && this.audioIsFromServer(audio.path)) {
      return audio.path
    }
  }

  addNewRevtone = async () => {
    const {
      id,
      avatar,
      audioSrc,
      audioPath,
      audioName,
      carMake,
      carModel,
      carYear,
      category,
      keywords,
      notes,
      photo,
      photoSrc,
      photoName,
      audio,
      carInfo,
      categories,
      selectedCategory,
      audios,
    } = this.state

    /* if(audio == '' || carMake == '' || carYear == '' || carModel == '' || category == '' || photo == '') {
        alert('Please input all items')
        return
    } */
    let aud =
      Platform.OS === 'android'
        ? 'file://' + this.state.audioPath
        : this.state.audioPath
    let audioT = audio
    var audioIsFromServer = false
    if (audio) {
      audioIsFromServer = audioT.split(':')[0] == 'https'
    }

    let photoT = photo
    var photoIsFromServer = false
    if (photo) {
      photoIsFromServer = photoT.split(':')[0] == 'https'
    }

    let load = {
      avatar: 'avatars/1.jpg',
      audio: audioPath == '' && audioIsFromServer ? audio : aud, // save audio firebase src path...
      carMake: carMake,
      carModel: carModel,
      carYear: carYear,
      carInfo: carInfo,
      category: category,
      keywords: keywords,
      notes: notes,
      photo: photoSrc == '' && photoIsFromServer ? photo : photoSrc, // save photo firebase src path...
      userId: this.userId,
      playCount: 0,
      visitCount: 0,
      audios: audios,
    }

    load.category = selectedCategory
    let i = 0
    var audioPromises = []
    let audiosT = []
    if (audios && audios.length > 0) {
      audios.forEach(a => {
        if (a != '' && a.path != undefined && a.path != '') {
          var audioLink = ''
          if (!this.audioIsFromServer(a.path)) {
            audioLink = new Promise((resolve, reject) => {
              const url =
                '/audio/' +
                this.userId +
                '/' +
                a.name +
                Math.floor(Date.now() * Math.random() * 1000000)
              storage()
                .ref(url)
                .putFile('file://' + a.path, {contentType: 'audio/wav'})
                .then(snapshot => {
                  storage()
                    .ref(url)
                    .getDownloadURL()
                    .then(link => {
                      console.log('resolve.......1')
                      resolve({
                        link,
                        name: a.name,
                        path: a.path,
                      })
                    })
                    .catch(error => {
                      console.log('reject.......2')
                      reject('')
                    })
                })
                .catch(error => {
                  console.log('catch.......3')
                  reject('')
                })
            })
          } else {
            audioLink = new Promise((resolve, reject) => {
              resolve({
                name: a.name,
                link: a.path,
              })
            })
          }
          audioPromises.push(audioLink)
        }

        i++
      })

      var audioLinks = await new Promise.all(audioPromises)

      audioLinks.forEach((element, index) => {
        if (element.link != '') {
          audiosT[index] = {
            name: element.name,
            path: element.link,
          }
          load.audio = element.link
        } else if (
          (element.link == undefined || element.link == '') &&
          this.audioIsFromServer(element.path)
        ) {
          audiosTemp[index] = {
            name: element.name,
            path: element.path,
          }
          load.audio = element.link
        }
      })

      load.audios = audiosT
      if (audiosT.length > 0) load.audio = audiosT[0].path

      console.log('==================> audios: ', load.audios)
    }

    let photoLink = ''
    if (photoSrc != '') {
      photoLink = await new Promise((resolve, reject) => {
        let url = '/photo/' + this.userId + '/' + photoName
        storage()
          .ref(url)
          .putFile(load.photo)
          .then(snapshot => {
            storage()
              .ref(url)
              .getDownloadURL()
              .then(link => {
                console.log('resolve.......4')
                resolve(link)
              })
              .catch(error => {
                console.log('reject.......5')
                reject('')
              })
          })
          .catch(error => {
            console.log('catch.......6')
            reject('')
          })
      })
    }

    if (photoLink != '') {
      load.photo = photoLink
      this.setState({
        photoSrc: photoLink,
      })
    } else if (photoLink == '' && photoIsFromServer) {
      load.photo = photo
    }

    if (this.id != '') {
      //alert("updating");
      console.log('====================> updating: ', load)
      let updates = {}
      updates[`revton/${this.state.id}`] = {...load}
      database()
        .ref()
        .update(updates)
        .then(function () {
          //alert("Data updated successfully.");
        })
        .catch(function (error) {
          alert('Data could not be updated.' + error)
        })
    } else {
      console.log('===================> adding: ', load)
      //alert("adding");
      let revtons = database().ref('revton')
      let newRevton = revtons.push()
      newRevton.set({...load})
    }

    this.onCancel()

    this.props.navigation.navigate('MyRevtones')
  }

  handleCategory = (key, name) => {
    setCategory(key)
    categoryTitleRef.current = name
  }

  //====> Modal Visible Method <====//

  setModalVisible = visible => {
    this.setState({modalVisible: visible})
  }

  //====> On Cancel Modal Method <====//

  onCancel () {
    this.setState({modalVisible: false})
  }

  categoriesForDropdown = categories => {
    let ctgs = categories
    let names = []
    ctgs.forEach(c => {
      names = [...names, c.name]
    })
    return names
  }

  onSelectCategory = (index) => {
    let selectedCategory = this.state.categories[index];
    console.log('select category', selectedCategory);
    if(selectedCategory){
      this.setState({selectedCategory})
    }
  }

  choosePhoto = async () => {
    await this.requestWriteExternalStoragePermission()
    let options = {
      title: 'Select Image',
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
      } else {
        let uploadUri =
          Platform.OS === 'ios'
            ? response.uri.replace('file://', '')
            : response.uri
        this.setState({
          photo: uploadUri,
          photoSrc: uploadUri,
          photoName: response.fileName,
        })
      }
    })
  }

  onPressRecordAudio = async () => {
    await this.requestRecordAudioPermission()
    // await this.requestMicrophonePermission()
    // await this.requestWriteInternalStoragePermission()
    await this.requestWriteExternalStoragePermission()
    this.props.navigation.navigate('RecordRevtone', {
      audioFromFirebase: this.state.audioFromFirebase,
      audios: this.state.audios,
    })
  }

  //====> Render Method <====//

  render () {
    const {modalVisible, categoryNames, selectedCategory} = this.state
    const categoryOptions = categoryNames.map((i, index) => ({value: index, text: i}));
    let selectIndex = null;
    categoryNames.forEach((i, index) => { if(selectedCategory && i === selectedCategory.name){ selectIndex = index; }});
    console.log('category', categoryOptions, selectedCategory, selectIndex)
    return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainContainer}>
        {/*====> Header View <====*/}

        <View style={styles.headerView}>
          <AppHeader
            title={this.id ? `UPDATE REVTONE` : 'CREATE NEW REVTONE'}
            bgColor={colors.app_header_color}
            leftIconPath={images.back_arrow}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>

        {/*====> Scroll View <====*/}

          <ScrollView
            {...scrollPersistTaps}
            contentContainerStyle={[styles.mainView, {flexGrow: 1, paddingBottom: hp(4)}]}>
            <Text style={styles.recordFileStyle}>Record Audio File</Text>

            {/*====> RevTone Button <====*/}

            <TouchableOpacity
              style={styles.revTonesContainer}
              onPress={() => this.onPressRecordAudio()}>
              <View style={styles.leftImageContainer}>
                <Image style={styles.imageStyles} source={images.ic_mic} />
              </View>
              <Text style={styles.revTonesStyle}>RevTones</Text>
            </TouchableOpacity>

            {/*====> Input View <====*/}

            <Text style={styles.carStyle}>Car Year:</Text>
            <View style={styles.carStyleInput}>
              <AppInput
                // placeholder={'Email'}
                textInputColor={colors.white}
                placeholderTextColor={colors.placeholder_color}
                width={'100%'}
                height={60}
                value={this.state.carYear}
                onChangeText={text => this.setState({carYear: text})}
              />
            </View>

            {/*====> Input View <====*/}

            <Text style={styles.carStyle}>Car Make:</Text>
            <View style={styles.carStyleInput}>
              <AppInput
                // placeholder={'Email'}
                textInputColor={colors.white}
                placeholderTextColor={colors.placeholder_color}
                width={'100%'}
                height={60}
                value={this.state.carMake}
                onChangeText={text => this.setState({carMake: text})}
              />
            </View>

            {/*====> Input View <====*/}

            <Text style={styles.carStyle}>Car Model:</Text>
            <View style={styles.carStyleInput}>
              <AppInput
                // placeholder={'Email'}
                textInputColor={colors.white}
                placeholderTextColor={colors.placeholder_color}
                width={'100%'}
                height={60}
                value={this.state.carModel}
                onChangeText={text => this.setState({carModel: text})}
              />
            </View>
            <Text style={styles.carStyle}>Add Photo</Text>

            {this.state.photo != '' && (
                <View style={styles.imageContainer}>
                  <Image
                    source={{uri: this.state.photo}}
                    style={styles.imageStyles2}
                  />
                </View>
            )}
            {/*====> Button View <====*/}

            <View style={styles.buttonContainer}>
              <Button
                title={'Upload'}
                style={styles.btn}
                bgColor={colors.app_button_color}
                titleStyle={{
                  color: colors.white,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
                onPress={() => this.choosePhoto()}
              />
            </View>

            {/*====> DropDown View <====*/}

            <Text style={styles.carStyle}>Category:</Text>
            <View style={styles.dropdownView}>
              <Select
                options={categoryOptions}
                placeholder={'Select Car Category...'}
                value={ selectIndex }
                onChange={(v) => this.onSelectCategory(v)}
              />
            </View>

            {/*====> Input View <====*/}

            <Text style={styles.carStyle}>Description:</Text>
            <View style={styles.descriptionStyle}>
              <AppInput
                // placeholder={'Email'}
                placeholderTextColor={colors.placeholder_color}
                textInputColor={colors.white}
                width={'100%'}
                height={hp(18)}
                value={this.state.notes}
                onChangeText={text => this.setState({notes: text})}
              />
            </View>

            {/*====> Button View <====*/}

            <View style={styles.buttonContainer}>
              <Button
                title={'Car Details (Optional)'}
                style={styles.btn}
                bgColor={colors.app_button_color}
                titleStyle={{
                  color: colors.white,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
                onPress={() =>
                  this.props.navigation.navigate('QuestionsOptions', {
                    carInfo: this.state.carInfo,
                  })
                }
              />
            </View>

            {/*====> Button View <====*/}

            <View style={styles.buttonContainer}>
              <Button
                title={this.id ? `Update` : `Add`}
                style={styles.btn}
                bgColor={colors.app_button_color}
                titleStyle={{
                  color: colors.white,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
                onPress={() => this.setModalVisible(true)}
              />
            </View>

            {/*====> Modal <====*/}

            <Modal
              animationType='slide'
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!modalVisible)
              }}>
              {/*====> Modal Options <====*/}

              <TextModel
                onPressOkay={() => this.addNewRevtone()}
                onPressCancel={() => this.onCancel()}
              />
            </Modal>
          </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export default NewRevtoneScreen
