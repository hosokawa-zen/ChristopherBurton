//====> System files <====//

import {View, Text} from 'react-native'
import React from 'react'

//====> Local files <====//

import Button from '../../../Components/Button/Button'
import AppHeader from '../../../Components/AppHeader'
import AppInput from '../../../Components/AppInput'
import images from '../../../../assets/images'
import colors from '../../../../assets/colors'
import styles from './styles'

class SearchScreen extends React.Component {
  //====> Constructor Method <====//

  constructor (props) {
    super(props)
    this.state = {
      carMake: '',
      carYearFrom: '',
      carYearTo: '',
      carModel: '',
    }
  }

  componentDidMount () {
    let filters = this.props.route.params.filters
    if (filters) {
      this.setState({
        carMake: filters.carMake,
        carModel: filters.carModel,
        carYearFrom: filters.carYearFrom,
        carYearTo: filters.carYearTo,
      })
    }
  }

  onPress = () => {
    this.props.navigation.navigate('SearchRevtones', {
      carMake: this.state.carMake,
      carModel: this.state.carModel,
      carYearFrom: this.state.carYearFrom,
      carYearTo: this.state.carYearTo,
    })
  }

  onChangeText = () => {}

  //====> Render Method <====//

  render () {
    return (
      <View style={styles.mainContainer}>
        {/*====> Header View <====*/}

        <View style={styles.headerView}>
          <AppHeader
            title={'SEARCH FILTERS'}
            bgColor={colors.app_header_color}
            leftIconPath={images.back_arrow}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>

        {/*====> Container View <====*/}

        <View style={styles.container}>
          <Text style={styles.makeTextStyle}>Make:</Text>

          {/*====> DropDown View <====*/}

          {/* <View style={styles.dropdownView}> */}
          <AppInput
            // placeholder={'Email'}
            style={styles.dropdownView}
            textInputColor={colors.white}
            placeholderTextColor={colors.placeholder_color}
            width={'100%'}
            height={60}
            value={this.state.carMake}
            onChangeText={text => this.setState({carMake: text})}
          />
          {/* <Dropdown
                            listViewWidth={'90%'}
                            options={["A", "B", "C", "D", "E", "F"]}
                            defaultButtontext={'All'}
                            dropdownStyle={{ height: '100%', width: "100%" }}
                            // style={{height: 50,width: "100%",backgroundColor:colors.dark_red}}
                            dropdownOptionsStyle={{ width: '92%', marginRight: '12%', marginTop: '6%' }}
                        /> */}
          {/* </View> */}

          <Text style={styles.modelTextStyle}>Model:</Text>

          {/*====> DropDown View <====*/}

          {/* <View style={styles.dropdownView}> */}
          <AppInput
            // placeholder={'Email'}
            style={styles.dropdownView}
            textInputColor={colors.white}
            placeholderTextColor={colors.placeholder_color}
            width={'100%'}
            height={60}
            value={this.state.carModel}
            onChangeText={text => this.setState({carModel: text})}
          />
          {/* <Dropdown
                            listViewWidth={'90%'}
                            options={["A", "B", "C", "D", "E", "F"]}
                            defaultButtontext={'All'}
                            dropdownStyle={{ height: '100%', width: "100%" }}
                            // style={{ height: 10, width: "100%", }}
                            dropdownOptionsStyle={{ height: 2, width: '92%', marginRight: '12%', marginTop: '6%' }}
                        /> */}
          {/* </View> */}

          <Text style={styles.modelTextStyle}>Year:</Text>
          <View style={styles.bothCategory}>
            {/*====> DropDown View <====*/}

            {/* <View style={styles.dropdownYearView}> */}
            <AppInput
              // placeholder={'Email'}
              style={styles.dropdownYearView}
              textInputColor={colors.white}
              placeholderTextColor={colors.placeholder_color}
              width={'100%'}
              height={60}
              value={this.state.carYearFrom}
              onChangeText={text => this.setState({carYearFrom: text})}
            />
            {/* <Dropdown
                                listViewWidth={'40%'}
                                options={["A", "B", "C", "D", "E", "F"]}
                                defaultButtontext={'All'}
                                dropdownStyle={{ height: '100%', width: "100%" }}
                                style={{ height: 10, width: "100%" }}
                                dropdownOptionsStyle={{ width: '40%', marginRight: '69%', marginTop: '6%' }}
                            /> */}
            {/* </View> */}

            <Text style={styles.yearTextStyle}>TO</Text>

            {/*====> DropDown View <====*/}

            {/* <View style={styles.dropdownYearView}> */}
            <AppInput
              // placeholder={'Email'}
              style={styles.dropdownYearView}
              textInputColor={colors.white}
              placeholderTextColor={colors.placeholder_color}
              width={'100%'}
              height={60}
              value={this.state.carYearTo}
              onChangeText={text => this.setState({carYearTo: text})}
            />
            {/* <Dropdown
                                listViewWidth={'40%'}
                                options={["A", "B", "C", "D", "E", "F"]}
                                defaultButtontext={'All'}
                                dropdownStyle={{ height: '100%', width: "100%" }}
                                style={{ height: 10, width: "100%" }}
                                dropdownOptionsStyle={{ width: '40%', marginLeft: '72%', marginTop: '6%' }}
                            /> */}
            {/* </View> */}
          </View>
        </View>

        {/*====> Button View <====*/}

        <View style={styles.buttonView}>
          <Button
            title={'Save'}
            titleStyle={{color: colors.white, fontWeight: 'bold', fontSize: 16}}
            onPress={() => this.onPress()}
          />
        </View>
      </View>
    )
  }
}

export default SearchScreen
