import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import styles from "./styles";
class TextModel extends React.Component {



    render() {
        return (
            <View style={styles.mainContainer}>

                <View style={styles.mainModelContainer} >
                    <View style={styles.ModelTitleContainer}>
                        <Text style={styles.ModelTitle}>
                            Create New RevTone
                            </Text>
                    </View>
                    <View style={styles.ModelMessageContainer}>
                        <Text style={styles.ModelTitleTextContainer}>
                            Thank you for participating in our community of car enthusiast. We at RevTone are building what we hope to be the most complete collection of car sounds ringtones and rely on your support to achieve this goa. By creating a RevTone you will be contrbuting to the collection and giving other users an access to a wide range of car sound ringtones. By continuing you will agree to share your RevTone with our community.
                            </Text>

                    </View>
                    <View style={styles.buttonViewContainer}>
                        <View style={{ height: wp(0.1), backgroundColor: 'grey' }}></View>
                        <TouchableOpacity onPress={this.props.onPressOkay} style={styles.countinueStyle}  >
                            <Text style={styles.AgreeTextStyleContainer}>
                                Continue
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
        );
    }
}


export default TextModel;
