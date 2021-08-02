//====> System files <====//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import React from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native'
// import Trimmer from 'react-native-trimmer'
import RNFS from 'react-native-fs'
import DocumentPicker from 'react-native-document-picker'
import Share from 'react-native-share'

const {decode, encode} = require('base64-arraybuffer')
const toWav = require('audiobuffer-to-wav')
import createBuffer from 'audio-buffer-from'
import util from 'audio-buffer-utils'
import {AudioPlayer} from 'react-native-audio-recorder-player'

// import format from 'audio-format';

//====> Local files <====//

import RecordRevComponent from '../../../Components/AppComponents/RecordRevComponent/RecordRevComponent'
import Button from '../../../Components/Button/Button'
import AppHeader from '../../../Components/AppHeader'
import AppInput from '../../../Components/AppInput'
import images from '../../../../assets/images'
import colors from '../../../../assets/colors'
import styles from './styles'
import Trimmer from '../../../Components/Trimmer'

const scrubInterval = 50

class TrimAudioScreen extends React.Component {
  //====> Constructor Method <====//

  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      playing: false,
      paused: false,
      trimmerLeftHandlePosition: 0,
      trimmerRightHandlePosition: 1000,
      scrubberPosition: 500,
      playing: false,
      file: null,
      audioContent: null,
      totalDuration: 4000,
      key: null,
      isProcessing: false,

      //====> Data Array <====//

      Data: [
        {
          id: 1,
          title: 'Start Up',
          firstIcon: images.icn_play_small,
          secondIcon: images.ic_remove_sound,
        },
        {
          id: 2,
          title: 'Idle',
          firstIcon: images.icn_play_small,
          secondIcon: images.ic_remove_sound,
        },

        {
          id: 3,
          title: 'Rev ving',
          firstIcon: images.icn_play_small,
          secondIcon: images.ic_remove_sound,
        },
      ],
    }
  }

  componentDidMount () {
    const audioUri = this.props.route.params.audioUri
    if (audioUri) {
      console.log('--------------------> audioUri: ', audioUri)
      let audioUriT = audioUri
      let isDownloaded = false
      if (audioUriT != '' && typeof audioUriT == 'string')
        isDownloaded = audioUriT.split(':')[0] == 'https' ? true : false
      this.initFile(audioUri, isDownloaded)

      this.initAudioPlayer()
    }
  }

  //====> RecordRev Method <====//

  list (item) {
    return (
      <RecordRevComponent
        title={item.title}
        firstIcon={item.firstIcon}
        secondIcon={item.secondIcon}
      />
    )
  }

  onHandleChange = ({leftPosition, rightPosition}) => {
    this.setState({
      trimmerRightHandlePosition: rightPosition,
      trimmerLeftHandlePosition: leftPosition,
    })
  }

  onScrubbingComplete = newValue => {
    this.setState({playing: false, scrubberPosition: newValue})
  }

  playScrubber = () => {
    // alert('playing')
    this.setState({playing: true})
    this.playAudio(false, this.state.file)

    this.scrubberInterval = setInterval(() => {
      this.setState({
        scrubberPosition: this.state.scrubberPosition + scrubInterval,
      })
    }, scrubInterval)
  }

  pauseScrubber = () => {
    // alert('pausing')
    this.playAudio(true, this.state.file)
    clearInterval(this.scrubberInterval)

    this.setState({
      playing: false,
      scrubberPosition: this.state.trimmerLeftHandlePosition,
    })
  }

  trimSound = async (fileData, start, end) => {
    const decodeData = decode(fileData)
    const arrayBufferTrim = decodeData
    const audioBufferTrim = createBuffer(arrayBufferTrim, 'int32 le mono 44100')
    const firstSegment = util.slice(audioBufferTrim, 0, start)
    const lastSegment = util.slice(audioBufferTrim, end, audioBufferTrim.length)
    const finalize = util.concat(firstSegment, lastSegment)
    const slicedBuffer = util.slice(audioBufferTrim, start, end)
    const slicedArrayBufferWav = toWav(slicedBuffer)
    const finalizeArrayBufferWav = toWav(finalize)
    const slicedBase64Str = encode(slicedArrayBufferWav)
    const finalizeStr = encode(finalizeArrayBufferWav)
    const duration = slicedBuffer.length
    console.log('------------------------> trimmed: ', slicedBase64Str)

    const uid = (+new Date() + Math.random() * 100).toString(32)
    const uri = RNFS.DocumentDirectoryPath + '/' + uid + '.wav'
    RNFS.writeFile(uri, slicedBase64Str, 'base64').then(async success => {
      const content = await RNFS.readFile(uri, 'base64')
      this.setState({
        audioContent: content,
        file: uri,
        totalDuration: duration,
        trimmerLeftHandlePosition: 0,
        trimmerRightHandlePosition: 1000,
      })

      this.initFile(uri, false)

      console.log('----------------------> trimmed uri: ', uri)
    })
  }

  onTrim = async () => {
    const {
      audioContent,
      trimmerLeftHandlePosition,
      trimmerRightHandlePosition,
    } = this.state
    await this.trimSound(
      audioContent,
      trimmerLeftHandlePosition,
      trimmerRightHandlePosition,
    )
  }

  initFile = (fileUri, isDownloaded) => {
    let uri = ''
    if (isDownloaded) {
      const fileUrl = fileUri
      const filePath =
        RNFS.DocumentDirectoryPath + '/downloaded_audio_tmp.wav'

      RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: filePath,
      })
        .promise.then(result => {
          console.log('------------------> Look in: ', result) //here you get temporary path
          uri = filePath
          this.doInit(uri)
        })
        .catch(e => {
          console.log(e, 'error')
        })
    } else {
      uri = fileUri
      this.doInit(uri)
    }
  }

  doInit = async uri => {
    let content = await RNFS.readFile(uri, 'base64')
    let decodeData = decode(content)
    let audioBuffer = createBuffer(decodeData, 'int32 le mono 44100')
    let duration = audioBuffer.length
    console.log('------------------> initFile: ', content + ' ' + uri)
    this.setState({
      totalDuration: duration,
      audioContent: content,
      file: uri,
    })
  }

  pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      })

      console.log('-----------------------> pickedFile: ', res.uri)
      const content = await RNFS.readFile(res.uri, 'base64')
      const decodeData = decode(content)
      const audioBuffer = createBuffer(decodeData, 'int32 le mono 44100')
      const duration = audioBuffer.length

      this.setState({
        totalDuration: duration,
        audioContent: content,
      })

      // this.processFile(res)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err
      }
    }
  }

  // Pad to 2 or 3 digits, default is 2
  pad = (n, z) => {
    z = z || 2
    return ('00' + n).slice(-z)
  }

  msToTime = ss => {
    let s = parseInt(ss)
    let ms = s % 1000
    s = (s - ms) / 1000
    let secs = s % 60
    s = (s - secs) / 60
    let mins = s % 60
    let hrs = (s - mins) / 60

    return (
      hrs.toString().padStart(2, '0') +
      ':' +
      mins.toString().padStart(2, '0') +
      ':' +
      secs.toString().padStart(2, '0') +
      '.' +
      ms.toString().padStart(3, '0')
    )
  }

  initAudioPlayer = () => {
    AudioPlayer.onFinished = () => {
      console.log('finished playback')
      this.setState({paused: true, loaded: false, playing: false})
    }
    AudioPlayer.setFinishedSubscription()

    AudioPlayer.onProgress = data => {
      console.log('progress', data)
    }
    AudioPlayer.setProgressSubscription()
  }

  play = audioPath => {
    console.log('audio path: ', audioPath)
    if (this.state.loaded) {
      AudioPlayer.unpause()
      this.setState({paused: false, playing: true})
    } else {
      AudioPlayer.playWithUrl(audioPath)
      this.setState({paused: false, loaded: true, playing: true})
    }
  }

  pause = () => {
    AudioPlayer.pause()
    this.setState({paused: true, playing: false})
  }

  stop = () => {
    AudioPlay.stop()
    this.setState({paused: true, playing: false})
  }

  playAudio = (paused, item) => {
    console.log(item)
    let path;
    path = (Platform.OS == "android") ? "file://" + item : item;
    if (this.state.playing) this.pause()
    else this.play(path)
  }

  onBack = () => {
    if (this.state.playing) AudioPlayer.pause()
    this.setState({paused: true, playing: false})
    this.props.navigation.goBack()
  }

  //====> Render Method <====//

  render () {
    return (
      <View style={styles.mainContainer}>
        {/*====> Header View <====*/}

        <View style={styles.headerView}>
          <AppHeader
            title={'TRIM AUDIO'}
            bgColor={colors.app_header_color}
            leftIconPath={images.back_arrow}
            onLeftIconPress={() => this.onBack()}
          />
        </View>

        {/*====> Trimmer View <====*/}

        <View style={styles.container}>
          {/* <View style={styles.trimmerContainer}> */}
          {/* <Image style={styles.imageStyles} source={images.ic_mic} /> */}
          <Trimmer
            styles={styles.trimmerStyle}
            onHandleChange={this.onHandleChange}
            totalDuration={this.state.totalDuration}
            centerOnLayout={true}
            tintColor='#e4ce2d'
            initialZoomValue={0.85}
            maximumZoomLevel={0.85}
            markerColor='#ffffff'
            trackBackgroundColor='#251510'
            scrubberColor='#4c939a'
            scrubberPosition={this.state.scrubberPosition}
            trackBorderColor={styles.trimmerStyle.borderColor}
            trimmerLeftHandlePosition={this.state.trimmerLeftHandlePosition}
            trimmerRightHandlePosition={this.state.trimmerRightHandlePosition}
            onScrubbingComplete={this.onScrubbingComplete}
            onLeftHandlePressIn={() => console.log('onLeftHandlePressIn')}
            onRightHandlePressIn={() => console.log('onRightHandlePressIn')}
            onScrubberPressIn={() => console.log('onScrubberPressIn')}
          />
          {/* </View> */}
        </View>

        {/*====> Play/Stop View <====*/}

        <View style={styles.container}>
          <Text style={styles.timeTextStyle}>
            {this.msToTime(
              this.state.trimmerRightHandlePosition -
                this.state.trimmerLeftHandlePosition,
            )}
          </Text>
          <View style={styles.playContainer}>
            {this.state.playing ? (
              <TouchableOpacity onPress={() => this.pauseScrubber()}>
                <Image style={styles.imageStyles} source={images.img_play} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.playScrubber()}>
                <Image style={styles.imageStyles} source={images.img_play} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/*====> Button View <====*/}

        <View style={styles.buttonView}>
          <Button
            height={hp(7)}
            style={styles.buttonStyles}
            title={'Trim'}
            bgColor={colors.app_button_color}
            titleStyle={[styles.titleStyles]}
            onPress={this.onTrim}
          />
        </View>

        <View style={styles.buttonView}>
          <Button
            height={hp(7)}
            style={styles.buttonStyles}
            title={'Save'}
            bgColor={colors.app_button_color}
            titleStyle={[styles.titleStyles]}
            onPress={() =>
              this.props.navigation.navigate('RecordRevtone', {
                trimmedAudio: this.state.file,
              })
            }
          />
        </View>
      </View>
    )
  }
}

export default TrimAudioScreen
