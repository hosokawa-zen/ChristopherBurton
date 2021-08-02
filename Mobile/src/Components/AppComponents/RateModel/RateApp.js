import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

import styles from './styles'
import { Rating, AirbnbRating } from 'react-native-ratings';
class RateApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            dummyText: 'If you love our app, we would appreciate you if you take a couple' +
                ' of seconds to rate us in the app market!',

        }
    }

    render() {
        return (

            <View style={styles.mainContainer}>



                <View style={styles.container}>

                    <View style={styles.topTitle}>
                        <Text style={styles.textRateApp}>
                            Rate App
                        </Text>
                    </View>
                    <View style={styles.textDescriptionContainer}>
                        <Text style={styles.textDescription}>{this.state.dummyText}</Text>
                    </View>

                    <View style={styles.ratingContainer}>
                        <AirbnbRating
                            count={5}
                            reviewSize={0}
                            size={28}
                        />
                    </View>
                    <View style={styles.buttonViewContainer}>
                        <View style={{ height: wp(0.1), backgroundColor: 'grey', marginTop: wp(4) }}></View>
                        <TouchableOpacity onPress={this.props.onPressOkay} style={styles.countinueStyle}  >
                            <Text style={styles.AgreeTextStyleContainer}>
                                Rate Now
                                    </Text>
                        </TouchableOpacity>
                        <View style={{ height: wp(0.1), backgroundColor: 'grey' }}></View>

                        <TouchableOpacity onPress={this.props.onPressCancel} style={styles.closeStyle}>
                            <Text style={styles.closeTextStyleContainer}>
                                Close
                                </Text>
                        </TouchableOpacity>

                    </View>


                </View>
            </View>
        )
    }
}

export default RateApp;