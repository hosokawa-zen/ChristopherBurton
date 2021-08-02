
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StatusBar } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//




import styles from './Styles'

import images from '../../../../../assets/images';
import AppHeader from '../../../../Components/AppHeader';
import colors from '../../../../../assets/colors';
import Button from '../../../../Components/Button/Button';
import AppInput from '../../../../Components/AppInput';

class SendFeedback extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <View style={styles.mainContainer}>
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
                <View style={styles.middleView}>
                    <View style={styles.NameView}>
                        <Text style={styles.commonInputName}>Name</Text>
                        <AppInput
                            height={hp(8)}
                            placeholder={'Name'}
                            width={'100%'}
                            colortextInput={colors.white}
                            placeholderTextColor={colors.dark_grey}
                            backgroundColor={colors.grey}
                        />

                    </View>
                    <View style={styles.EmailView}>
                        <Text style={styles.commonInputName}>Email Address</Text>

                        <AppInput
                            height={hp(8)}
                            placeholder={'Email Address'}
                            width={'100%'}
                            colortextInput={colors.white}
                            placeholderTextColor={colors.dark_grey}
                            backgroundColor={colors.grey}
                        />
                    </View>
                    <View style={styles.SubjectView}>
                        <Text style={styles.commonInputName}>Subject/Concern</Text>

                        <AppInput
                            height={hp(8)}
                            placeholder={'Subject/Comments'}
                            width={'100%'}
                            colortextInput={colors.white}
                            placeholderTextColor={colors.dark_grey}
                            backgroundColor={colors.grey}
                        />

                    </View>
                    <View style={styles.MessageView}>
                        <Text style={styles.commonInputName}>Message</Text>

                        <AppInput
                            height={hp(22)}
                            placeholder={'Message'}
                            width={'100%'}
                            colortextInput={colors.white}
                            placeholderTextColor={colors.dark_grey}
                            backgroundColor={colors.grey}
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
                            titleColor={colors.dark_red}
                            titleStyle={[styles.titleStyles]}
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
            </View>
        )
    }
}
export default SendFeedback;
