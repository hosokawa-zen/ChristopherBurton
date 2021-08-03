//====> System files <====//

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

import AudioRecorderPlayer from 'react-native-audio-recorder-player'

//====> Local files <====//

import RevtoneGameComponent from '../../../Components/AppComponents/RevtoneGameComponent/RevtoneGameComponent'
import AppHeader from '../../../Components/AppHeader'
import images from '../../../../assets/images'
import styles from './styles'
import colors from '../../../../assets/colors'

const MAX_QUESTION_NUMBER = 10
const MAX_COUNTDOWN = 15

class RevtoneGameScreen extends React.Component {
  //====> Constructor Method <====//

  constructor (props) {
    super(props)
    this.userId = ''
    this.questionNumber = 0
    this.firstBoot = true
    this.finishedRound = false
    this.clockCall = ''
    this.audioPlayer = new AudioRecorderPlayer();
    this.state = {
      user: null,
      prevScore: 0,
      paused: false,
      isPlaying: false,
      loaded: false,
      timer: MAX_COUNTDOWN,

      //====> RevTone Array <====//
      revtons: [],
      answerRevton: null,
      questionRevtons: [],
      correct: 0,
      Revtones: [
        {
          id: 1,
          title: 'Mitsubishi',
          image: images.car_1,
        },
        {
          id: 2,
          title: 'Toyota',
          image: images.car_2,
        },
        {
          id: 3,
          title: 'Honda',
          image: images.car_1,
        },
        {
          id: 4,
          title: 'Nissan',
          image: images.car_2,
        },
      ],
    }
  }

  componentDidMount () {
    this.getUser()
    this.loadRevtones()
    this.initAudioPlayer()
  }

  componentWillUnmount () {
    clearInterval(this.clockCall)
  }

  startTimer = () => {
    this.clockCall = setInterval(() => {
      this.decrementClock()
    }, 1000)
  }

  decrementClock = () => {
    if (this.state.timer === 1) {
      clearInterval(this.clockCall)
      this.finishedRound = true
      this.loadRevtones()
    }
    this.setState(prevstate => ({timer: prevstate.timer - 1}))
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
            this.setState({
              user,
              prevScore: user.maxScore,
            })
          }
        } else {
          console.log("Can't get user info")
        }
      })
  }

  setScore = score => {
    let maxScore = this.state.prevScore < score ? score : this.state.prevScore
    let load = {
      ...this.state.user,
      currentScore: score,
      maxScore: maxScore,
    }

    if (this.state.user && this.state.user.userId) {
      let updates = {}
      updates[`users/${this.state.user.userId}/`] = {...load}
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
    } else {
      let userRef = database().ref(`users/`)
      let newUser = userRef.push()
      newUser.set({...load})
    }
  }

  loadRevtones = async () => {
    if (
      !this.firstBoot &&
      !this.finishedRound &&
      this.questionNumber < MAX_QUESTION_NUMBER
    ) {
      alert('Please finish this round')
      return
    }

    this.finishedRound = false

    if (this.questionNumber >= MAX_QUESTION_NUMBER) {
      alert('Your score: ' + this.state.correct + '/' + MAX_QUESTION_NUMBER)
      // this.setScore(this.state.correct)
      return
    }

    if (this.clockCall != '') {
      clearInterval(this.clockCall)
    }

    if (this.firstBoot) this.setState({timer: MAX_COUNTDOWN})
    else this.setState({timer: MAX_COUNTDOWN + 1})
    this.startTimer()

    if (!this.state.paused) this.pause()

    this.questionNumber++
    // let rand = Math.floor(Math.random() * 4)
    let revtons = []
    if (this.firstBoot) {
      let snapshot = await database()
        .ref('/revton')
        // .startAt(rand)
        // .limitToFirst(4)
        // .limitToLast(4)
        .once('value')
      snapshot.forEach(child => {
        revtons = [
          ...revtons,
          {
            title: child.val().title,
            photo: child.val().photo,
            carYear: child.val().carYear,
            category: child.val().category,
            audio: child.val().audio,
            audios: child.val().audios,
            carInfo: child.val().carInfo,
            carModel: child.val().carModel,
            avatar: child.val().avatar,
            carMake: child.val().carMake,
            notes: child.val().notes,
            userId: child.val().userId,
            visitCount: child.val().visitCount,
            playCount: child.val().playCount,
            id: child.key,
          },
        ]
      })

      this.firstBoot = false
    } else {
      revtons = this.state.revtons
    }

    let questionRevtons = this.selectQuestionRevtones(revtons)
    let answerRevton = this.selectAnswerRevtone(questionRevtons)

    this.setState({
      revtons,
      questionRevtons,
      answerRevton,
    })
    this.playAudio()
  }

  shuffle = revs => {
    return revs.sort(() => Math.random() - 0.5)
  }

  selectQuestionRevtones = revtons => {
    let revs = revtons

    if (revtons.length < 4) return revtons

    let rand = Math.floor(Math.random() * (revtons.length - 4))
    return this.shuffle(revs.slice(rand, rand + 4))
  }

  selectAnswerRevtone = questionRevtons => {
    let revs = questionRevtons
    let AnswerRev = []
    revs.forEach(child => {
      child.audios.forEach(audioChild => {
        AnswerRev = [
          ...AnswerRev,
          {
            revId: child.id,
            name: audioChild.name,
            path: audioChild.path,
            carYear: child.carYear,
          },
        ]
      })
    })
    if (AnswerRev.length < 4) return AnswerRev[0]
    let rand = Math.floor(Math.random() * 4)
    console.log('------------------AnswerRev----------------')
    console.log(AnswerRev)
    return AnswerRev[rand]
  }

  assessment = item => {
    clearInterval(this.clockCall)
    this.pause()
    this.clockCall = null
    if (this.questionNumber >= MAX_QUESTION_NUMBER) {
      alert('Your score: ' + this.state.correct + '/' + MAX_QUESTION_NUMBER)
      return
    }

    let answerRevton = this.state.answerRevton
    if (answerRevton.revId == item.id) {
      alert('correct')
      this.setState({
        correct: this.state.correct + 1,
      })
    } else {
      alert('wrong')
    }

    this.finishedRound = true
    this.loadRevtones()
  }

  prepareRevtones = () => {}

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

  stop = async () => {
    await this.audioPlayer.stopPlayer();
    this.setState({paused: true, playing: false})
  }

  playAudio = () => {
    if (!this.clockCall) this.startTimer()
    let item = this.state.answerRevton
    console.log('.................item')
    console.log(item)
    if (item.path == '') return
    if (this.state.isPlaying) this.pause()
    else this.play(item.path)
  }

  onGoBack = () => {
    clearInterval(this.clockCall)
    this.pause()
    this.clockCall = null
    this.questionNumber = 0 //MAX_QUESTION_NUMBER
    this.setState({timer: MAX_COUNTDOWN, correct: 0})
    this.props.navigation.goBack()
  }

  //====> ReVTone Game Method <====//

  menu (item) {
    return (
      <RevtoneGameComponent
        title={item.title}
        image={item.photo != '' ? {uri: item.photo} : images.car_1}
        onPress={() => this.assessment(item)}
        // onPress={() => this.props.navigation.navigate('')}
      />
    )
  }

  //====> Render Method <====//

  render () {
    return (
      <View style={styles.mainContainer}>
        <StatusBar backgroundColor={colors.black} />

        {/*====> Header View <====*/}

        <View style={styles.headerView}>
          <AppHeader
            title={'REVTONE GAME'}
            bgColor={colors.app_header_color}
            leftIconPath={images.back_arrow}
            onLeftIconPress={() => this.onGoBack()}
          />
        </View>

        {/*====> Score View <====*/}

        <View style={styles.container}>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreTextStyle}>
              SCORE: {this.state.correct}/{MAX_QUESTION_NUMBER}
            </Text>
          </View>
          <View style={styles.playContainer}>
            <TouchableOpacity>
              <Image
                style={styles.imageStyles}
                source={images.btn_previous_song}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.playAudio()}>
              <Image
                style={styles.imageStylesPlay}
                source={images.ic_play_big}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.loadRevtones()}>
              <Image style={styles.imageStyles} source={images.btn_next_song} />
            </TouchableOpacity>
          </View>

          {/*====> Year View <====*/}

          <View style={styles.scoreContainer}>
            <Text style={styles.hintTextStyle}>{`HINT: SONG RELEASED ${this
              .state.answerRevton && this.state.answerRevton.carYear}`}</Text>
          </View>

          {/*====> Image View <====*/}

          <View style={styles.timeContainer}>
            <Image style={styles.timeStyles} source={images.icn_timer} />
            <Text
              style={
                styles.timeTextStyle
              }>{`00:${this.state.timer.toString().padStart(2, '0')}`}</Text>
          </View>

          {/*====> FlatList View <====*/}

          <View style={styles.flatListContaisner}>
            <FlatList
              numColumns={2}
              data={this.state.questionRevtons}
              renderItem={({item}) => this.menu(item)}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default RevtoneGameScreen
