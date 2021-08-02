import React from 'react';
import {View, Text, Image, StyleSheet,TouchableOpacity} from 'react-native';
import images from "../../../assets/images";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SimpleButton from '../SimpleButton';
import styles from './style';
import Button from '../Button/Button';




export default class NotificationComponent extends React.Component {


    render() {

        return(
            <View style={styles.mainContainer}>

                <View style={styles.container}>

                        <View style={styles.imgContainer}>
                            <View style={styles.imgView}>
                                <Image style={styles.img} source={this.props.image} />
                            </View>
                            <View style={styles.textView}>
                                <Text>{this.props.time}</Text>
                                <Text style={styles.textSubHeading}>{this.props.title}</Text>
                                <TouchableOpacity>
                                    <Text style={styles.textRight}>{this.props.text}</Text>
                                </TouchableOpacity>
                            </View>

                        </View>


                    { this.props.buttons &&
                        <View style={styles.buttonsView}>


                            <Button
                                height={hp(4)}
                                width={wp(35)}
                                buttonText={'Repost'}
                                bgColor={'#3275cc'}
                                fontSize={10}
                                onPress={() => this.props.navigation.navigate('')}
                            />


                            <Button
                                height={hp(4)}
                                width={wp(35)}
                                buttonText={'Cancel Request'}
                                bgColor={'#dd2e3f'}
                                marginStart={'5%'}
                                fontSize={10}
                                onPress={() => this.props.navigation.navigate('')}
                            />

                        </View>
                    }




                </View>

            </View>
        );
    }
}


