
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {View, FlatList, StatusBar, Image, Text, TouchableOpacity, Modal, Alert} from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//






import styles from "./Styles";
import colors from '../../../../../assets/colors';
import images from '../../../../../assets/images';
import AppHeader from '../../../../Components/AppHeader';
import SettingsItem from '../../../../Components/AppComponents/SettingsItem/SettingItem';
import RateApp from '../../../../Components/AppComponents/RateModel/RateApp';
import UploadGuide from '../../../../Components/AppComponents/UploadGuideModal/UploadGuide';


class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            uploadGuideModalVisible: false,
            //================================ Data array ======================================//
            Data: [
                // {
                //     id: 1,
                //     title: 'Notifications',
                //     firstIcon: images.ic_bell,
                //     toggleSwitchButton: true,
                //     leftIconColor: colors.AppRedColor,
                // },

                {
                    id: 1,
                    title: 'Sync Social Media Account',
                    firstIcon: images.arrow_left,
                    secondIcon: images.ic_chevron_right,
                    // leftIconColor: 'red',
                },
                {
                    id: 2,
                    title: 'Rate App',
                    firstIcon: images.icn_rate_app,
                    // leftIconColor: colors.AppRedColor,
                },

                {
                    id: 3,
                    title: 'Send Feedback',
                    firstIcon: images.icn_send_feedback,
                    secondIcon: false,
                    leftIconColor: colors.AppRedColor,
                },
                {
                    id: 4,
                    title: 'How to Upload Your Revtone',
                    firstIcon: images.icn_about_the_app,
                    secondIcon: images.ic_right,
                    leftIconColor: colors.AppRedColor,
                },
                {
                    id: 5,
                    title: 'About the App',
                    firstIcon: images.icn_about_the_app,
                    secondIcon: images.ic_right,
                    leftIconColor: colors.AppRedColor,

                },
                {
                    id: 6,
                    title: 'Privacy Policy',
                    firstIcon: images.icn_privacy_policy,
                    secondIcon: images.ic_right,
                    leftIconColor: colors.AppRedColor,

                },
                {
                    id: 7,
                    title: 'Terms And Conditions',
                    firstIcon: images.icn_terms,
                    secondIcon: images.ic_right,
                    leftIconColor: colors.AppRedColor,

                },
                {
                    id: 8,
                    title: 'Log Out',
                    firstIcon: images.icn_logout,
                    secondIcon: images.ic_chevron_right,
                    leftIconColor: colors.AppRedColor,

                },
            ]
        }
    }

    //================================ Model Functions ======================================//

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    };

    inVisible() {
        this.setState({ modalVisible: false })
    }

    setUploadGuideModalVisible = (visible) => {
        this.setState({ uploadGuideModalVisible: visible });
    };

    inVisibleUploadGuide() {
        this.setState({ uploadGuideModalVisible: false })
    }

    onClickListItem(id) {
        switch (id) {

            case 1:
                this.props.navigation.navigate('SyncSocial');
                break;

            case 2:
                this.setModalVisible(true);
                break;

            case 3:
                this.props.navigation.navigate('SendFeedback');
                break;

            case 4:
                this.setUploadGuideModalVisible(true);
                break;

            case 5:
                this.props.navigation.navigate('AboutApp');
                break;

            case 6:
                this.props.navigation.navigate('PrivacyPolicy');
                break;
            case 7:
                this.props.navigation.navigate('TermsAndCondtions');
                break;
            case 8:
                Alert.alert(
                    'Log Out',
                    'Are you sure you want to log out?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel'
                        },
                        {
                            text: 'Confirm',
                            style: 'destructive',
                            onPress: () => this.props.navigation.navigate('LoginScreen')
                        }
                    ],
                    { cancelable: false }
                )
                break;
        }
    }
    //================================ Setting Item Function ======================================//
    list(item) {
        return (
            <SettingsItem
                onPress={() => {
                    this.onClickListItem(item.id)
                }}
                upperText={item.title}
                leftIconImage={item.firstIcon}
                arrowImage={item.secondIcon}
                switchItem={item.switchItem}
                rightIconColor={colors.grey1}
                rightIconSize={wp(4.5)}
                leftIconSize={wp(4.5)}
                height={hp(9)}
                backgroundColor={'#191919'}
                // leftIconColor={item.color}
                textColor={item.color}
                toggleSwitchButton={item.toggleSwitchButton}
            />
        )
    }
    render() {
        const { modalVisible, uploadGuideModalVisible } = this.state;
        return (
            <View style={styles.mainContainer}>
                {/* //================================ StatusBar ======================================// */}

                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.appDarkBlue} translucent={false} />
                {/* //================================ Header ======================================// */}
                <View style={styles.headerView}>
                    <AppHeader
                        title={"SETTINGS"}
                        bgColor={colors.app_header_color}
                        leftIconPath={images.icn_menu}
                        onLeftIconPress={() => this.props.navigation.openDrawer()}
                    />
                </View>
                {/* //================================ FlatList ======================================// */}
                <View style={styles.container}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={this.state.Data}
                        renderItem={({ item }) => this.list(item)}
                        keyExtractor={item => item.id}
                    />

                </View>
                {/* //================================ Model ======================================// */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!modalVisible);
                    }}>
                    <RateApp
                        onPressOkay={() => {
                            this.setModalVisible(!modalVisible)
                        }}
                        onPressCancel={() => {
                            this.setModalVisible(!modalVisible)
                        }}

                    />
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={uploadGuideModalVisible}
                    onRequestClose={() => {
                        this.setUploadGuideModalVisible(!uploadGuideModalVisible);
                    }}>
                    <UploadGuide
                        onPressOkay={() => {
                            this.setUploadGuideModalVisible(!uploadGuideModalVisible)
                        }}
                        onPressCancel={() => {
                            this.setUploadGuideModalVisible(!uploadGuideModalVisible)
                        }}

                    />
                </Modal>
                {/* //================================ Logout ======================================// */}
                {/* <TouchableOpacity style={styles.logout}
                    onPress={() => this.props.navigation.navigate('LoginScreen')}
                >
                    <Image
                        style={styles.logoutIcon}
                        source={images.ic_logout_settings}
                    />
                    <Text style={[styles.textStyle, {
                        color: colors.white
                    }]}>Log Out</Text>

                </TouchableOpacity> */}
            </View>
        )
    }
}
export default SettingsScreen;
