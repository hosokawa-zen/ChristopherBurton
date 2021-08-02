import React from 'react';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { View,Text,TextInput,StyleSheet,Image,ImageBackground,TouchableOpacity,ScrollView} from 'react-native';
import styles from "./styles";
class SignUpModel extends React.Component{



    render() {
        return (
            <View style={styles.mainContainer}>

                    <View style={styles.mainModelContainer} >
                        <View style={styles.ModelTitleContainer}>
                            <Text style={styles.ModelTitleTextContainer}>
                                Sign up
                            </Text>
                        </View>
                        <View style={styles.ModelMessageContainer}>
                            <View style={styles.ModelMessageBothContainer}>
                                <View style={styles.ModelMessageSimpleContainer}>
                                    <Text style={styles.modelText}>
                                        By signing up, you agree with the
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.ModelMessageColorContainer}
                                                  onPress={this.props.onPressTerm}>
                                    <Text style={styles.ModelMessageTextColorContainer}>
                                        Terms of
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.ModelMessageBothTwoContainer}>
                                <TouchableOpacity style={styles.ModelMessageAndConditionContainer}
                                                  onPress={this.props.onPressCondition}
                                >
                                    <Text style={styles.ModelMessageTextColorContainer}>Services</Text>
                                </TouchableOpacity>
                                <View style={styles.ModelMessageAndContainer}>
                                    <Text style={styles.modelText}>and </Text>
                                </View>
                                <TouchableOpacity style={styles.ModelMessagePrivacyContainer}
                                                  onPress={this.props.onPressPrivacy}
                                >
                                    <Text style={styles.ModelMessageTextColorContainer}>Privacy Policy. </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.buttonViewContainer}>
                                <TouchableOpacity  onPress={this.props.onPressOkay} >
                                    <Text style={styles.AgreeTextStyleContainer}>
                                        AGREE
                                    </Text>
                                </TouchableOpacity>

                            <TouchableOpacity  onPress={this.props.onPressCancel} >
                                <Text style={[styles.AgreeTextStyleContainer,{marginLeft:wp(3)}]}>
                                    CANCEL
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
        );
    }
}


    export default SignUpModel;
