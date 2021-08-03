//====> System files <====//

import {View, Text, FlatList, Modal} from 'react-native'
import React from 'react'
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'

//====> Local files <====//

import SearchRevComponent from '../../../Components/AppComponents/SearchRevComponent/SearchRevComponent'
import AppHeader from '../../../Components/AppHeader'
import images from '../../../../assets/images'
import styles from './style'
import {Select} from "../../../Components/Select";

export default class SearchRevtones extends React.Component {
  //====> Constructor Method <====//

  constructor (props) {
    super(props)
    this.category = null
    this.sortIndex = 0
    this.audioPlayer = new AudioRecorderPlayer();

    this.state = {
      revtons: [],
      audioFile: '',
      paused: false,
      playing: false,
      loaded: false,
      filterItems: null,
      currentAudio: '',
      //====> Search Array <====//

      searchCars: [],
      sort: 0,
    }
    this.sortOptions = [
      {value: 0, text: 'Alphabetical Order'},
      {value: 1, text: 'Most Viewed'},
      {value: 2, text: 'Most Used'}
    ];
  }

  async componentDidMount () {
    await this.loadRevtones()
  }

  async UNSAFE_componentWillReceiveProps (nextProps) {
    let carMake = nextProps.route.params.carMake
    let carModel = nextProps.route.params.carModel
    let carYearFrom = nextProps.route.params.carYearFrom
    let carYearTo = nextProps.route.params.carYearTo
    if (
      carMake != null &&
      carModel != null &&
      carYearFrom != null &&
      carYearTo != null
    ) {
      this.setState({
        filterItems: {carMake, carModel, carYearFrom, carYearTo},
      })
    }
    await this.loadRevtones()
  }

  loadRevtones = async () => {
    this.category = this.props.route.params.category

    if (this.category) {
      database()
        .ref('/revton')
        .on('value', snapshot => {
          let revtons = []
          snapshot.forEach(child => {
            if (child.val().category.name == this.category.name) {
              revtons = [
                ...revtons,
                {
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
            }
          })

          this.setState({revtons: [...revtons]})

          this.sort(this.sortIndex)

          this.filter(this.state.filterItems)

          this.initAudioPlayer()
        })
    }
  }

  initAudioPlayer = () => {
  }

  play = async (audioPath) => {
    if (this.state.loaded && this.state.currentAudio === audioPath) {
      await this.audioPlayer.resumePlayer();
      this.setState({paused: false, playing: true})
    } else {
      await this.audioPlayer.stopPlayer();
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
      this.setState({paused: false, loaded: true, playing: true, currentAudio: audioPath})
    }
  }

  pause = async () => {
    await this.audioPlayer.pausePlayer();
    this.setState({paused: true, playing: false})
  }

  playAudio = async (paused, item) => {
    let load = {...item, playCount: item.playCount + 1}
    let updates = {}
    updates[`revton/${item.id}`] = {...load}
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
    if (this.state.playing && this.state.currentAudio === item.audio) await this.pause()
    else await this.play(item.audio)
  }

  filter = items => {
    if (items == null) return
    let revtons = this.state.revtons
    let filtered = revtons.filter(rev => {
      if (rev.carMake.toLowerCase().includes(items.carMake.toLowerCase())) {
        if (rev.carModel.toLowerCase().includes(items.carModel.toLowerCase())) {
          if (
            items.carYearFrom !== '' &&
            parseInt(rev.carYear) < parseInt(items.carYearFrom)){
            return false;
          }
          if(
            items.carYearTo !== '' &&
            parseInt(rev.carYear) > parseInt(items.carYearTo)
          ){
            return false;
          }
            return true
        }
      }
      return false;
    })
    this.setState({revtons: filtered})
  }

  sort = (index = 0) => {
    this.setState({sort: index});
    this.sortIndex = index
    let revtons = this.state.revtons
    if (index == 0) {
      revtons.sort((a, b) => {
        let titleA = a.carMake.toUpperCase()
        let titleB = b.carMake.toUpperCase()
        return titleA.localeCompare(titleB)
      })
      this.setState({revtons})
    } else if (index == 1) {
      revtons.sort((a, b) => {
        let visitCA = a.visitCount
        let visitCB = b.visitCount
        return visitCB - visitCA
      })
      this.setState({revtons})
    } else if (index == 2) {
      revtons.sort((a, b) => {
        let pCA = a.playCount
        let pCB = b.playCount
        return pCB - pCA
      })
      this.setState({revtons})
    }
  }

  visitCarProfile = item => {
    let nav = this.props.navigation
    let load = {...item, visitCount: item.visitCount + 1}
    let updates = {}
    updates[`revton/${item.id}`] = {...load}
    database()
      .ref()
      .update(updates)
      .then(function () {
        //alert("Data updated successfully.");
        //   history.replace('/admin/revtones');
        nav.navigate('CarProfile', {revton: item})
      })
      .catch(function (error) {
        alert('Data could not be updated.' + error)
      })
  }

  onNavigate = () => {
    if (this.state.playing) AudioPlayer.pause()
    this.setState({paused: true, playing: false})
    this.props.navigation.navigate('SearchScreen', {
      filters: this.state.filterItems,
    })
  }

  onBack = () => {
    this.props.navigation.goBack()
    if (this.state.playing) AudioPlayer.pause()
    this.setState({paused: true, playing: false})
  }

  //====> Search Rev Method <====//

  search_rev (item) {
    return (
      <SearchRevComponent
        image={item.photo != '' ? {uri: item.photo} : images.car_1}
        title={item.carMake + ' ' + item.carModel}
        yearCar={item.carYear}
        typeCar={item.category.name}
        onPlay={paused => this.playAudio(paused, item)}
        onPress={() => this.visitCarProfile(item)}
      />
    )
  }

  render () {
    const { sort } = this.state;
    return (
      <View style={styles.mainContainer}>
        {/*====> Header View <====*/}

        <View style={styles.headerView}>
          <AppHeader
            title={'Search Revtones'}
            // lefticonSize={20}
            leftIconPath={images.back_arrow}
            rightIconOnePath={images.ic_sort_1}
            onLeftIconPress={() => this.onBack()}
            onRightIconPress={() => this.onNavigate()}
          />
        </View>

        {/*====> Container View <====*/}

        <View style={styles.bottomContainer}>
          <View style={styles.categoryView}>
            <Text style={styles.titleText}>
              Category: {this.category && this.category.name}
            </Text>

            {/*====> DropDown View <====*/}

            <View style={styles.dropdownView}>
              <Select
                options={this.sortOptions}
                value={sort}
                onChange={selected => this.sort(selected)}
              />
            </View>
          </View>

          {/*====> FlatList View <====*/}

          <View style={styles.flatListView}>
            <FlatList
              data={this.state.revtons}
              renderItem={({item}) => this.search_rev(item)}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    )
  }
}
