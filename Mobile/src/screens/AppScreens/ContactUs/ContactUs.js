//====> System files <====//
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View,StyleSheet} from 'react-native';
import Textarea from 'react-native-textarea';
import React from 'react';

//====> Local files <====//
import AppInput from '../../../Components/Inputs/AppInput';
import Button from '../../../Components/Button/Button';
import AppHeader from '../../../Components/AppHeader';
import colors from '../../../../assets/colors';
import images from '../../../../assets/images';
import styles from './styles';




class ContactUs extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            showPassword : true,
        }
    }


    //====> Render Method <====//

    render()
    {
        return(

            <View style={styles.mainContainer}>

                {/*====> Header View <====*/}

                <View style={styles.headerView}>

                    <AppHeader
                        headerHeight='100%'
                        title={'Contact Us'}
                        titleFontSize={wp(5)}
                        leftIconPath={images.ic_arrow_back}
                        lefticonSize={wp(5)}

                    />

                </View>


                {/*====> Inputs View <====*/}

                    <View style={styles.midView}>

                        <AppInput
                            height={hp(8.7)}
                            borderRadius={wp(2)}
                            placeholder={'John'}
                            width={'95%'}
                            textInputColor={colors.white}
                            paddingLeft={wp(2)}
                            placeholderTextColor={colors.white}
                            // borderColor={colors.white}
                            // leftIconPath={images.ic_user}
                            tintColor={colors.white}
                            marginBottom={wp(1)}
                            backgroundColor={colors.dark_green}
                            // borderWidth={wp(0.1)}
                        />
                        <AppInput
                            height={hp(8.7)}
                            borderRadius={wp(2)}
                            placeholder={'Smith'}
                            width={'95%'}
                            textInputColor={colors.white}
                            paddingLeft={wp(2)}
                            placeholderTextColor={colors.white}
                            // borderColor={colors.white}
                            // leftIconPath={images.ic_user}
                            tintColor={colors.white}
                            marginBottom={wp(1)}
                            backgroundColor={colors.dark_green}
                            // borderWidth={wp(0.1)}
                        />
                        <AppInput
                            height={hp(8.7)}
                            borderRadius={wp(2)}
                            placeholder={'john@gmail.com'}
                            width={'95%'}
                            textInputColor={colors.white}
                            paddingLeft={wp(2)}
                            placeholderTextColor={colors.white}
                            // borderColor={colors.white}
                            // leftIconPath={images.ic_user}
                            tintColor={colors.white}
                            marginBottom={wp(1)}
                            backgroundColor={colors.dark_green}
                            // borderWidth={wp(0.1)}
                        />

                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            // onChangeText={this.onChange}
                            // defaultValue={this.state.text}
                            maxLength={300}
                            placeholder={'Message'}
                            placeholderTextColor={colors.white}
                            underlineColorAndroid={'transparent'}
                        />

                    </View>

                {/*====> Button View <====*/}

                    <View style={styles.lowerView}>


                        <Button
                            style={styles.buttonStyles}
                            title={'Send'}
                            buttonBackgroundColor={colors.light_green}
                            titleFontSize={wp(5)}
                            tintColor={colors.white}
                            titleColor={colors.app_theme_dark}
                        />


                    </View>

            </View>
        )
    }
}


export default ContactUs;
