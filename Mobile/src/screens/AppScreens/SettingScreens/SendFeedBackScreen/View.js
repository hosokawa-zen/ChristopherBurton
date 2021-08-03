
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {View, Text, StatusBar, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//




import styles from './Styles'

import images from '../../../../../assets/images';
import AppHeader from '../../../../Components/AppHeader';
import colors from '../../../../../assets/colors';
import Button from '../../../../Components/Button/Button';
import AppInput from '../../../../Components/AppInput';
import database from "@react-native-firebase/database";

class SendFeedback extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
        }
    }

    validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
    }

    onSendFeedback = () => {
        const {name, email, subject, message} = this.state;
        if(!name.length){
            alert('Please input name');
            return;
        }
        if(!email.length){
            alert('Please input email address');
            return;
        }
        if(!this.validateEmail(email)){
            alert('Please input valid email address');
            return;
        }
        if(!subject.length){
            alert('Please input subject');
            return;
        }
        if(!message.length){
            alert('Please input message');
            return;
        }

        const feedback = {
            name: name,
            email: email,
            subject: subject,
            message: message
        }

        try{
            let feedbackdb = database().ref('feedback')
            let newFeedback = feedbackdb.push()
            newFeedback.set({...feedback})
            alert('Feedback sent successfully');
            this.props.navigation.goBack();
        } catch (e) {
            alert('Sending feedback failed');
        }
    }


    render() {
        const {name, email, subject, message} = this.state;
        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainContainer}>
                {/* //================================ StatusBar ======================================// */}

                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.appDarkBlue} translucent={false} />
                {/* //================================ Header ======================================// */}
                <View style={styles.headerView}>


                    <AppHeader
                        title={"SEND FEEDBACK"}
                        bgColor={colors.app_header_color}
                        leftIconPath={images.back_arrow}
                        onLeftIconPress={() => this.props.navigation.goBack()}


                    />

                </View>
                {/* //================================ Middle Container ======================================// */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow: 1, paddingBottom: hp(10)}}>
                <View style={styles.middleView}>
                    <View style={styles.NameView}>
                        <Text style={styles.commonInputName}>Name</Text>
                        <AppInput
                            height={hp(8)}
                            placeholder={'Name'}
                            width={'100%'}
                            textInputColor={colors.white}
                            placeholderTextColor={colors.dark_grey}
                            backgroundColor={colors.grey}
                            value={name}
                            onChangeText={text =>
                                this.setState({name: text})
                            }
                        />

                    </View>
                    <View style={styles.EmailView}>
                        <Text style={styles.commonInputName}>Email Address</Text>

                        <AppInput
                            height={hp(8)}
                            placeholder={'Email Address'}
                            width={'100%'}
                            textInputColor={colors.white}
                            placeholderTextColor={colors.dark_grey}
                            backgroundColor={colors.grey}
                            value={email}
                            onChangeText={text =>
                                this.setState({email: text})
                            }
                        />
                    </View>
                    <View style={styles.SubjectView}>
                        <Text style={styles.commonInputName}>Subject/Concern</Text>

                        <AppInput
                            height={hp(8)}
                            placeholder={'Subject/Comments'}
                            width={'100%'}
                            textInputColor={colors.white}
                            placeholderTextColor={colors.dark_grey}
                            backgroundColor={colors.grey}
                            value={subject}
                            onChangeText={text =>
                                this.setState({subject: text})
                            }
                        />

                    </View>
                    <View style={styles.MessageView}>
                        <Text style={styles.commonInputName}>Message</Text>

                        <AppInput
                            height={hp(22)}
                            placeholder={'Message'}
                            width={'100%'}
                            textInputColor={colors.white}
                            placeholderTextColor={colors.dark_grey}
                            backgroundColor={colors.grey}
                            value={message}
                            onChangeText={text =>
                                this.setState({message: text})
                            }
                        />
                    </View>
                    <View style={styles.CharacterView}>
                        <Text style={styles.CharacterStyle}>5000 Remaining Characters</Text>
                    </View>
                </View>
                {/* //================================ Buttons ======================================// */}
                <View style={styles.LastView}>
                    <View style={styles.uploadButtonView}>
                        <Button
                            height={hp(7)}
                            width={'90%'}
                            style={styles.buttonStyles}
                            title={'Send'}
                            bgColor={colors.app_button_color}
                            titleColor={colors.dark_black}
                            titleStyle={[styles.titleStyles]}
                            onPress={this.onSendFeedback}
                        />
                    </View>
                    {/* <View style={styles.saveButtonView}>
                        <Button
                            height={hp(8)}
                            width={'90%'}
                            style={styles.buttonStyles}
                            title={'SAVE'}
                            bgColor={colors.AppRedColor}
                            titleColor={colors.dark_red}
                            titleStyle={[styles.titleStyles]}
                        />
                    </View> */}
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}
export default SendFeedback;
