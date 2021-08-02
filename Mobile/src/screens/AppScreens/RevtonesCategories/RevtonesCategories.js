//====> System files <====//

import {View, StyleSheet, FlatList} from 'react-native'
import React from 'react'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import RNProgressHud from 'progress-hud'

//====> System files <====//

import RevtoneCategoryComponent from '../../../Components/AppComponents/RevtoncategoryComponent/RevtoncategoryComponent'
import AppHeader from '../../../Components/AppHeader'
import images from '../../../../assets/images'
import colors from '../../../../assets/colors'
import styles from './style'

export default class RevtonesCategories extends React.Component {
  //====> Constructor Method <====//

  constructor (props) {
    super(props)
    this.state = {
      listCars: [],
    }
  }

  componentDidMount () {
    database()
    .ref('/categories')
    .on('value', snapshot => {
        let cars = []
        console.log('User data: ', snapshot.val())
        snapshot.forEach(child => {
          cars.push({
            name: child.val().name,
            image: child.val().photo,
            id: child.key,
          })
        })
        this.setState({
          listCars: cars,
        })
      })

    
  }

  //====> Category Method <====//

  rev_category (item) {
    return (
      <RevtoneCategoryComponent
        image={item.image}
        title={item.name}
        backgroundColor={item.backgroundColor}
        onPress={() => this.props.navigation.navigate('SearchRevtones', {category: {...item}})}
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
            title={'REVTONES CATEGORIES'}
            leftIconPath={images.icn_menu}
            onLeftIconPress={() => this.props.navigation.openDrawer()}
          />
        </View>

        {/*====> FlatList View <====*/}

        <View style={styles.bottomContainer}>
          <FlatList
            data={this.state.listCars}
            renderItem={({item}) => this.rev_category(item)}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    )
  }
}
