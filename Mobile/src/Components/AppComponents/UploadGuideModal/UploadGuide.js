import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

import styles from './styles'
import { Rating, AirbnbRating } from 'react-native-ratings';
class UploadGuide extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            dummyText: '1. Upload your file to your mac computer.\n\n2. Drag the file in your \"iTunes\".\n\n3. Make sure your file is not longer than 30 seconds.\n\n4. Select your file -> Go to \"File\" -> \"Convert\" -> create AAC version.\n\n5. In the drop-downed Menu top left of iTunes change from \"Music\" to \"Tone\".\n\n6. Locate your file and select it as the ringtone.',

        }
    }

    render() {
        return (

            <View style={styles.mainContainer}>



                <View style={styles.container}>

                    <View style={styles.topTitle}>
                        <Text style={styles.textRateApp}>
                            How to Upload Your Ringtone
                        </Text>
                    </View>
                    <View style={styles.textDescriptionContainer}>
                        <Text style={styles.textDescription}>{this.state.dummyText}</Text>
                    </View>

                    {/* <View style={styles.ratingContainer}>
                        <AirbnbRating
                            count={5}
                            reviewSize={0}
                            size={28}
                        />
                    </View> */}
                    <View style={styles.buttonViewContainer}>
                        <View style={{ height: wp(0.08), backgroundColor: '#99999977', marginTop: wp(40) }}></View>
                        {/* <TouchableOpacity onPress={this.props.onPressOkay} style={styles.countinueStyle}  >
                            <Text style={styles.AgreeTextStyleContainer}>
                                Rate Now
                                    </Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={this.props.onPressCancel} style={styles.closeStyle}>
                            <Text style={styles.closeTextStyleContainer}>
                                {this.props.neverShowAgain ? "Do not show this again" : "Close"}
                                </Text>
                        </TouchableOpacity>

                    </View>


                </View>
            </View>
        )
    }
}

export default UploadGuide;
