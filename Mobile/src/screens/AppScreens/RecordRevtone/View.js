//====> System files <====//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import React from 'react'
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native'
import {Buffer} from 'buffer'
// import Permissions from 'react-native-permissions'
import {AudioPlayer} from 'react-native-audio-player-recorder'
import AudioRecord from 'react-native-audio-record'
import RNFS from 'react-native-fs'

//====> Local files <====//

import RecordRevComponent from '../../../Components/AppComponents/RecordRevComponent/RecordRevComponent'
import Button from '../../../Components/Button/Button'
import AppHeader from '../../../Components/AppHeader'
import AppInput from '../../../Components/AppInput'
import images from '../../../../assets/images'
import colors from '../../../../assets/colors'
import styles from './styles'

class RecordRevtone extends React.Component {
  //====> Constructor Method <====//

  constructor (props) {
    super(props)
    this.audioCount = 0
    this.sound = null
    this.audioPath = ''
    this.audioName = ''
    this.state = {
      audioFile: '',
      recording: false,
      loaded: false,
      playing: false,
      paused: false,
      fileName: '',
      audios: [
        {
          id: 1,
          title: 'Start up',
          firstIcon: images.icn_play_small,
          secondIcon: images.ic_remove_sound,
          path: '',
        },
        {
          id: 2,
          title: 'Idle',
          firstIcon: images.icn_play_small,
          secondIcon: images.ic_remove_sound,
          path: '',
        },
        {
          id: 3,
          title: 'Reviving',
          firstIcon: images.icn_play_small,
          secondIcon: images.ic_remove_sound,
          path: '',
        },
      ],
      audiosArray: [],
      audiosForList: [],
    }
  }

  //====> RecordRev Method <====//

  componentDidMount = async () => {
    let audioFromFirebase = this.props.route.params.audioFromFirebase
    let audiosT = this.props.route.params.audios
    if (audioFromFirebase) {
      let audioT = {
        name: audioFromFirebase.name,
        firstIcon: images.icn_play_small,
        secondIcon: images.ic_remove_sound,
        path: audioFromFirebase.path,
        selected: false,
      }
      this.setState({audiosArray: [...audiosT]})
    }
    // await this.checkPermission()
    this.initAudioRecord()
    this.initAudioPlayer()
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    let trimmedAudio = nextProps.route.params.trimmedAudio
    let audiosT = this.state.audiosArray

    if (trimmedAudio) {
      console.log('=================> trrr', trimmedAudio)
      audiosT.forEach(a => {
        if(a.selected) {
          a.path = trimmedAudio
          a.selected = false
        }
      })

      this.setState({audiosArray: audiosT})
    }
  }

  checkPermission = async () => {
    const p = await Permissions.check('microphone')
    console.log('permission check', p)
    if (p === 'authorized') return
    return this.requestPermission()
  }

  requestPermission = async () => {
    const p = await Permissions.request('microphone')
    console.log('permission request', p)
  }

  initAudioRecord = () => {
    const uid = (+new Date() + Math.random() * 100).toString(32)
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: uid + 'test.wav',
    }

    AudioRecord.init(options)

    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64')
      console.log('chunk size', chunk.byteLength)
      // do something with audio chunk
    })
  }

  startRecord = () => {
    console.log('start record')
    this.setState({audioFile: '', recording: true, loaded: false})
    AudioRecord.start()
  }

  stopRecord = async () => {
    if (!this.state.recording) return
    console.log('stop record')
    let audioFile = await AudioRecord.stop()
    console.log('audioFile', audioFile)
    this.setState({audioFile, recording: false})

    this.addAudio(audioFile)
  }

  getAudiosForList = audios => {
    let audiosForListT = audios.filter(a => {
      if (a.path != '') return true
    })
    return audiosForListT
  }

  addAudio = async audioFile => {
    let audiosT = this.state.audios
    let audiosForListT = []
    let path = ''
    let name = ''

    let random = Math.floor(Date.now() / 1000)
    const content = await RNFS.readFile(audioFile, 'base64')
    path = RNFS.DocumentDirectoryPath + '/' + random + '.wav'
    name = random + '.wav'

    this.audioPath = path
    this.audioName = name

    RNFS.writeFile(path, content, 'base64')
      .then(success => {
        let audio = {
          id: random,
          name: this.state.fileName,
          firstIcon: images.icn_play_small,
          secondIcon: images.ic_remove_sound,
          path: path,
        }
        this.setState({
          audiosArray: [...this.state.audiosArray, audio],
        })
      })
      .catch(err => {
        alert(err.message)
      })
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
    if (this.state.playing) this.pause()
    else this.play(item.path)
  }

  handleRecord = () => {
    this.setState({
      recording: !this.state.recording,
    })
    if (this.state.recording) this.stopRecord()
    else this.startRecord()
  }

  onChangeFileName = text => {
    this.setState({
      fileName: text,
    })
  }

  onSave = () => {
    this.props.navigation.navigate('NewRevtoneScreen', {
      audioPath: this.audioPath,
      audioName: this.audioName,
      audios: this.state.audiosArray,
    })
  }

  

  onRemove = item => {
    let audios = this.state.audiosArray
    let filteredAudios = audios.filter(a => {
      if (a.path != item.path) return true
    })

    this.setState({audiosArray: filteredAudios})

    // let audiosForListT = this.getAudiosForList(audios)
    // this.setState({audios: [...audios], audiosForList: [...audiosForListT]})
  }

  onNavToTrimAudioScreen = item => {
    let audiosT = this.state.audiosArray
    audiosT.forEach(a => {
      if (a.path == item.path) a.selected = true
    })

    this.setState({audiosArray: [...audiosT]})
    console.log('=================> audiosT: ', audiosT)

    this.props.navigation.navigate('TrimAudioScreen', {
      audioUri: item.path,
      audioName: item.name,
    })
  }

  onBack = () => {
    if (this.state.playing) AudioPlayer.pause()
    this.setState({paused: true, playing: false})
    this.props.navigation.goBack()
  }

  list = item => {
    return (
      <RecordRevComponent
        title={item.name}
        firstIcon={item.firstIcon}
        secondIcon={item.secondIcon}
        navToTrimAudioScreen={() => this.onNavToTrimAudioScreen(item)}
        onPlay={paused => this.playAudio(paused, item)}
        onRemove={() => this.onRemove(item)}
      />
    )
  }

  //====> Render Method <====//

  render () {
    return (
      <View style={styles.mainContainer}>
        {/*====> Header View <====*/}

        <View style={styles.headerView}>
          <AppHeader
            title={'RECORD REVTONE'}
            bgColor={colors.app_header_color}
            leftIconPath={images.back_arrow}
            onLeftIconPress={() => this.onBack()}
          />
        </View>

        {/*====> Input View <====*/}

        <View style={styles.container}>
          <Text style={styles.makeTextStyle}>File Name:</Text>
          <AppInput
            height={hp(8)}
            placeholder={'Message'}
            width={'100%'}
            textInputColor={colors.white}
            backgroundColor={colors.grey}
            value={this.state.fileName}
            onChangeText={text => this.onChangeFileName(text)}
          />
          <View style={styles.micContainer}>
            <TouchableOpacity onPress={this.handleRecord}>
              {!this.state.recording ? (
                <Image style={styles.imageStyles} source={images.ic_mic} />
              ) : (
                <Text style={{color: '#ffffff', fontSize: 20}}>
                  Recording... To stop, please click again
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/*====> FlatList View <====*/}

        <View style={styles.flatListContainer}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={this.state.audiosArray}
            renderItem={({item}) => this.list(item)}
            keyExtractor={item => item.id}
          />
        </View>

        {/*====> Button View <====*/}

        <View style={styles.buttonView}>
          <Button
            height={hp(7)}
            style={styles.buttonStyles}
            title={'Save'}
            bgColor={colors.app_button_color}
            titleStyle={[styles.titleStyles]}
            onPress={() => this.onSave()}
          />
        </View>
      </View>
    )
  }
}

export default RecordRevtone
