//====> System files <====//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

//====> Local files <====//

import AppHeader from "../../../Components/AppHeader";
import images from "../../../../assets/images";
import colors from "../../../../assets/colors";
import AppInput from "../../../Components/AppInput";
import CheckBox from "../../../Components/CheckBox";
import styles from "./style";

export default class QuestionsOptions extends React.Component {
    //====> Constructor Method <====//
    
    constructor(props) {
        super(props);
        this.state = {
            notes: "",
            displacement: "",
            modification: "",
            
            carStocks: [
                { title: "YES", checked: false },
                { title: "NO", checked: false },
            ],
            carStockChecked: { title: "", checked: false },
            cylinders: [
                { title: "2", checked: false },
                { title: "4", checked: false },
                { title: "6", checked: false },
                { title: "8", checked: false },
                { title: "10", checked: false },
                { title: "12", checked: false },
                { title: "14", checked: false },
                { title: "16", checked: false },
            ],
            cylinderChecked: { title: "", checked: false },
            configurations: [
                { title: "V", checked: false },
                { title: "Horizontal", checked: false },
                { title: "Straight", checked: false },
                { title: "Flat", checked: false },
            ],
            configurationChecked: { title: "", checked: false },
            aspirateds: [
                { title: "YES", checked: false },
                { title: "NO", checked: false },
            ],
            aspiratedChecked: { title: "", checked: false },
            aspiratedEngines: [
                { title: "Turbo", checked: false },
                { title: "Supercharged", checked: false },
            ],
            aspiratedEngineChecked: { title: "", checked: false },
            headers: [
                { title: "YES", checked: false },
                { title: "NO", checked: false },
            ],
            headerChecked: { title: "", checked: false },
            cams: [
                { title: "YES", checked: false },
                { title: "NO", checked: false },
            ],
            camChecked: { title: "", checked: false },
            exausts: [
                { title: "YES", checked: false },
        { title: "NO", checked: false },
    ],
    exaustChecked: { title: "", checked: false },
};
}

componentDidMount() {
    if(this.props.route.params.carInfo) {
        let carInfo = this.props.route.params.carInfo
        console.log('@@@@@@@@carInfo: ', carInfo)
        this.setState({
            notes: carInfo.notes,
            modification: carInfo.modification,
            displacement: carInfo.displacement,
            headerText: carInfo.headerText,
            camText: carInfo.camText,
            exaustText: carInfo.camText,
            carStockChecked: carInfo.carStockChecked,
            cylinderChecked: carInfo.cylinderChecked,
            configurationChecked: carInfo.configurationChecked,
            aspiratedChecked: carInfo.aspiratedChecked,
            headerChecked: carInfo.headerChecked,
            camChecked: carInfo.camChecked,
            exaustChecked: carInfo.exaustChecked,
            aspiratedEngineChecked: carInfo.aspiratedEngineChecked,
        })
    }
}

onSave = () => {
    const {
        carStockChecked,
        cylinderChecked,
        configurationChecked,
        aspiratedChecked,
        headerChecked,
        camChecked,
        exaustChecked,
        notes,
        displacement,
        modification,
        headerText,
        camText,
        exaustText,
        aspiratedEngineChecked,
    } = this.state

    this.props.navigation.navigate('NewRevtoneScreen', {'carInfo': {
        carStockChecked,
        cylinderChecked,
        configurationChecked,
        aspiratedChecked,
        headerChecked,
        camChecked,
        exaustChecked,
        notes,
        displacement,
        modification,
        headerText,
        camText,
        exaustText,
        aspiratedEngineChecked,
    }})
}

checkCarStocks = (flag, title) => {
    this.state.carStocks.map((c, i) => {
        if (c.title == title) {
            c.checked = flag;
        if (flag)
          this.setState({
            carStockChecked: c,
          });
      } else {
        c.checked = false;
      }
    });
  };

  checkCylinders = (flag, title) => {
    this.state.cylinders.map((c, i) => {
      if (c.title == title) {
        c.checked = flag;
        if (flag)
          this.setState({
            cylinderChecked: c,
          });
      } else {
        c.checked = false;
      }
    });
  };

  checkConfigurations = (flag, title) => {
    this.state.configurations.map((c, i) => {
      if (c.title == title) {
        c.checked = flag;
        if (flag)
          this.setState({
            configurationChecked: c,
          });
      } else {
        c.checked = false;
      }
    });
  };

  checkAspirated = (flag, title) => {
    this.state.aspirateds.map((c, i) => {
      if (c.title == title) {
        c.checked = flag;
        if (flag)
          this.setState({
            aspiratedChecked: c,
          });
      } else {
        c.checked = false;
      }
    });
  };

  checkAspiratedEngine = (flag, title) => {
    this.state.aspiratedEngines.map((c, i) => {
      if (c.title == title) {
        c.checked = flag;
        if (flag)
          this.setState({
            aspiratedEngineChecked: c,
          });
      } else {
        c.checked = false;
      }
    });
  };

  checkHeader = (flag, title) => {
    this.state.headers.map((c, i) => {
      if (c.title == title) {
        c.checked = flag;
        if (flag)
          this.setState({
            headerChecked: c,
          });
      } else {
        c.checked = false;
      }
    });
  };

  checkCam = (flag, title) => {
    this.state.cams.map((c, i) => {
      if (c.title == title) {
        c.checked = flag;
        if (flag)
          this.setState({
            camChecked: c,
          });
      } else {
        c.checked = false;
      }
    });
  };

  checkExaust = (flag, title) => {
    this.state.exausts.map((c, i) => {
      if (c.title == title) {
        c.checked = flag;
        if (flag)
          this.setState({
            exaustChecked: c,
          });
      } else {
        c.checked = false;
      }
    });
  };


  //====> Render Method  <====//

  render() {
    return (
      <View style={styles.mainContainer}>
        {/*====> Header View <====*/}

        <View style={styles.headerView}>
          <AppHeader
            title={"Questions"}
            // lefticonSize={20}
            leftIconPath={images.back_arrow}
            onLeftIconPress={() => this.props.navigation.goBack()}
            rightText={"SAVE"}
            onRightIconPress={() => this.onSave()}
          />
        </View>

        <View style={styles.bottomContainer}>
          {/*====> Scroll View <====*/}

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: "14%" }}
          >
            {/*====> Stock View <====*/}

            <View style={styles.stockView}>
              <Text style={styles.title}>is your car stock?</Text>
              <View style={styles.checkBoxView}>
                <CheckBox
                  checkTitle={"YES"}
                  checked={
                    this.state.carStockChecked["title"] == "YES"
                      ? this.state.carStockChecked.checked
                      : false
                  }
                  update={(flag) => this.checkCarStocks(flag, "YES")}
                />
                <CheckBox
                  checkTitle={"NO"}
                  checked={
                    this.state.carStockChecked["title"] == "NO"
                      ? this.state.carStockChecked.checked
                      : false
                  }
                  update={(flag) => this.checkCarStocks(flag, "NO")}
                />
              </View>
            </View>

            {/*====> Engine Displacement View <====*/}

            <View style={styles.displacementView}>
              <Text style={styles.title}>Engine Displacement:</Text>
              <AppInput
                borderRadius={0.01}
                backgroundColor={colors.app_header_color}
                textInputColor={colors.white}
                width={"100%"}
                borderWidth={0.3}
                borderColor={"white"}
                value={this.state.displacement}
                onChangeText={(text) => this.setState({ displacement: text })}
              />
            </View>

            {/*====> Cylinders View <====*/}

            <View style={styles.cylindersView}>
              <Text style={styles.title}>Cylinders:</Text>
              <View style={{ width: "70%" }}>
                <View style={styles.checkBoxViewCylinders}>
                  <View>
                    <CheckBox
                      checkTitle={"2"}
                      checked={
                        this.state.cylinderChecked["title"] == "2"
                          ? this.state.cylinderChecked.checked
                          : false
                      }
                      update={(flag) => this.checkCylinders(flag, "2")}
                    />
                    <CheckBox
                      marginTop={7}
                      checkTitle={"10"}
                      checked={
                        this.state.cylinderChecked["title"] == "10"
                          ? this.state.cylinderChecked.checked
                          : false
                      }
                      update={(flag) => this.checkCylinders(flag, "10")}
                    />
                  </View>
                  <View>
                    <CheckBox
                      checkTitle={"4"}
                      checked={
                        this.state.cylinderChecked["title"] == "4"
                          ? this.state.cylinderChecked.checked
                          : false
                      }
                      update={(flag) => this.checkCylinders(flag, "4")}
                    />
                    <CheckBox
                      marginTop={7}
                      checkTitle={"12"}
                      checked={
                        this.state.cylinderChecked["title"] == "12"
                          ? this.state.cylinderChecked.checked
                          : false
                      }
                      update={(flag) => this.checkCylinders(flag, "12")}
                    />
                  </View>

                  <View>
                    <CheckBox
                      checkTitle={"6"}
                      checked={
                        this.state.cylinderChecked["title"] == "6"
                          ? this.state.cylinderChecked.checked
                          : false
                      }
                      update={(flag) => this.checkCylinders(flag, "6")}
                    />
                    <CheckBox
                      marginTop={7}
                      checkTitle={"14"}
                      checked={
                        this.state.cylinderChecked["title"] == "14"
                          ? this.state.cylinderChecked.checked
                          : false
                      }
                      update={(flag) => this.checkCylinders(flag, "14")}
                    />
                  </View>

                  <View>
                    <CheckBox
                      checkTitle={"8"}
                      checked={
                        this.state.cylinderChecked["title"] == "8"
                          ? this.state.cylinderChecked.checked
                          : false
                      }
                      update={(flag) => this.checkCylinders(flag, "8")}
                    />
                    <CheckBox
                      marginTop={7}
                      checkTitle={"16"}
                      checked={
                        this.state.cylinderChecked["title"] == "16"
                          ? this.state.cylinderChecked.checked
                          : false
                      }
                      update={(flag) => this.checkCylinders(flag, "16")}
                    />
                  </View>
                </View>
              </View>
            </View>

            {/*====> Configuration View <====*/}

            <View style={styles.configurationView}>
              <Text style={styles.title}>Configuration:</Text>
              <View style={{ width: "50%" }}>
                <View style={styles.checkBoxViewConfiguration}>
                  <View>
                    <CheckBox
                      checkTitle={"V"}
                      checked={
                        this.state.configurationChecked["title"] == "V"
                          ? this.state.configurationChecked.checked
                          : false
                      }
                      update={(flag) => this.checkConfigurations(flag, "V")}
                    />
                    <CheckBox
                      marginTop={7}
                      checkTitle={"Flat"}
                      checked={
                        this.state.configurationChecked["title"] == "Flat"
                          ? this.state.configurationChecked.checked
                          : false
                      }
                      update={(flag) => this.checkConfigurations(flag, "Flat")}
                    />
                  </View>

                  <View style={{ paddingRight: "10%" }}>
                    <CheckBox
                      checkTitle={"Horizontal"}
                      checked={
                        this.state.configurationChecked["title"] == "Horizontal"
                          ? this.state.configurationChecked.checked
                          : false
                      }
                      update={(flag) =>
                        this.checkConfigurations(flag, "Horizontal")
                      }
                    />
                    <CheckBox
                      marginTop={7}
                      checkTitle={"Straight"}
                      checked={
                        this.state.configurationChecked["title"] == "Straight"
                          ? this.state.configurationChecked.checked
                          : false
                      }
                      update={(flag) =>
                        this.checkConfigurations(flag, "Straight")
                      }
                    />
                  </View>
                </View>
              </View>
            </View>

            {/*====> Naturally Aspirated View <====*/}

            <View style={styles.stockView}>
              <Text style={styles.title}>Naturally Aspirated:</Text>
              <View style={styles.checkBoxView}>
                <CheckBox
                  checkTitle={"YES"}
                  checked={
                    this.state.aspiratedChecked["title"] == "YES"
                      ? this.state.aspiratedChecked.checked
                      : false
                  }
                  update={(flag) => this.checkAspirated(flag, "YES")}
                />
                <CheckBox
                  checkTitle={"NO"}
                  checked={
                    this.state.aspiratedChecked["title"] == "NO"
                      ? this.state.aspiratedChecked.checked
                      : false
                  }
                  update={(flag) => this.checkAspirated(flag, "NO")}
                />
              </View>
            </View>

            {/*====> Naturally Aspirated View <====*/}

            <View style={styles.forcedView}>
              <Text style={styles.title}>Naturally Aspirated:</Text>
              <View>
                <CheckBox
                  checkTitle={"Turbo"}
                  checked={
                    this.state.aspiratedEngineChecked["title"] == "Turbo"
                      ? this.state.aspiratedEngineChecked.checked
                      : false
                  }
                  update={(flag) => this.checkAspiratedEngine(flag, "Turbo")}
                />
                <CheckBox
                  marginTop={7}
                  checkTitle={"Supercharged"}
                  checked={
                    this.state.aspiratedEngineChecked["title"] == "Supercharged"
                      ? this.state.aspiratedEngineChecked.checked
                      : false
                  }
                  update={(flag) =>
                    this.checkAspiratedEngine(flag, "Supercharged")
                  }
                />
              </View>
            </View>

            {/*====> Engine Modifications View <====*/}

            <View style={styles.displacementView}>
              <Text style={styles.title}>Engine Modifications:</Text>
              <AppInput
                borderRadius={0.01}
                backgroundColor={colors.app_header_color}
                textInputColor={colors.white}
                width={"100%"}
                borderWidth={0.3}
                borderColor={"white"}
                value={this.state.modification}
                onChangeText={(text) => this.setState({ modification: text })}
              />
            </View>

            {/*====> Headers View <====*/}

            <View style={styles.stockView}>
              <Text style={styles.title}>Headers?</Text>
              <View style={styles.checkBoxView}>
                <CheckBox
                  checkTitle={"YES"}
                  checked={
                    this.state.headerChecked["title"] == "YES"
                      ? this.state.headerChecked.checked
                      : false
                  }
                  update={(flag) => this.checkHeader(flag, "YES")}
                />
                <CheckBox
                  checkTitle={"NO"}
                  checked={
                    this.state.headerChecked["title"] == "NO"
                      ? this.state.headerChecked.checked
                      : false
                  }
                  update={(flag) => this.checkHeader(flag, "NO")}
                />
              </View>
            </View>

            {/*====> Input View <====*/}

            <View style={styles.displacementView}>
              <AppInput
                placeholder={"if yes, What Brand?"}
                borderRadius={0.01}
                backgroundColor={colors.app_header_color}
                textInputColor={colors.white}
                width={"100%"}
                borderWidth={0.3}
                borderColor={"white"}
                value={this.state.headers}
                onChangeText={(text) => this.setState({ headerText: text })}
              />
            </View>

            {/*====> Cam View <====*/}

            <View style={styles.stockView}>
              <Text style={styles.title}>Cam?</Text>
              <View style={styles.checkBoxView}>
                <CheckBox
                  checkTitle={"YES"}
                  checked={
                    this.state.camChecked["title"] == "YES"
                      ? this.state.camChecked.checked
                      : false
                  }
                  update={(flag) => this.checkCam(flag, "YES")}
                />
                <CheckBox
                  checkTitle={"NO"}
                  checked={
                    this.state.camChecked["title"] == "NO"
                      ? this.state.camChecked.checked
                      : false
                  }
                  update={(flag) => this.checkCam(flag, "NO")}
                />
              </View>
            </View>

            {/*====> Input View <====*/}

            <View style={styles.displacementView}>
              <AppInput
                placeholder={"if yes, What Brand?"}
                borderRadius={0.01}
                backgroundColor={colors.app_header_color}
                textInputColor={colors.white}
                width={"100%"}
                borderWidth={0.3}
                borderColor={"white"}
                value={this.state.cam}
                onChangeText={(text) => this.setState({ camText: text })}
              />
            </View>

            {/*====> Modified View <====*/}

            <View style={styles.stockView}>
              <Text style={styles.title}>Modified exaust?</Text>
              <View style={styles.checkBoxView}>
                <CheckBox
                  checkTitle={"YES"}
                  checked={
                    this.state.exaustChecked["title"] == "YES"
                      ? this.state.exaustChecked.checked
                      : false
                  }
                  update={(flag) => this.checkExaust(flag, "YES")}
                />
                <CheckBox
                  checkTitle={"NO"}
                  checked={
                    this.state.exaustChecked["title"] == "NO"
                      ? this.state.exaustChecked.checked
                      : false
                  }
                  update={(flag) => this.checkExaust(flag, "NO")}
                />
              </View>
            </View>

            {/*====> Input View <====*/}

            <View style={styles.displacementView}>
              <AppInput
                placeholder={"if yes, What Brand?"}
                borderRadius={0.01}
                backgroundColor={colors.app_header_color}
                textInputColor={colors.white}
                width={"100%"}
                borderWidth={0.3}
                borderColor={"white"}
                value={this.state.modified}
                onChangeText={(text) => this.setState({ exaustText: text })}
              />
            </View>

            {/*====> Input View <====*/}

            <View style={styles.displacementView}>
              <Text style={styles.title}>
                Tell us what brought you into the car culture?
              </Text>
              <AppInput
                borderRadius={0.01}
                backgroundColor={colors.app_header_color}
                textInputColor={colors.white}
                width={"100%"}
                borderWidth={0.3}
                borderColor={"white"}
                value={this.state.notes}
                onChangeText={(text) => this.setState({ notes: text })}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
