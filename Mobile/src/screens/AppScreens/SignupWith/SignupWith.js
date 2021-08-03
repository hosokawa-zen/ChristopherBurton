//====> System files <====//

import {BackHandler, Image, Modal, Platform, Text, View} from 'react-native'
import React from 'react'
import auth, {firebase} from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin'
import {AccessToken, LoginManager} from 'react-native-fbsdk';

import {appleAuth, appleAuthAndroid,} from '@invertase/react-native-apple-authentication'
import 'react-native-get-random-values'
import {v4 as uuid} from 'uuid'

//====> Local files <====//
import SignUpModel from '../../../Components/SignUpModel/SignUpModel'
import colors from '../../../../assets/colors'
import Button from '../../../Components/Button/Button'
import images from '../../../../assets/images'
import styles from './styles'

class SignupWith extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        }
        this.userId = ''
    }

    componentDidMount() {
        const {navigation} = this.props;
        this.unSubscribeFocus = navigation.addListener('focus', () => {
            this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                return true;
            });
        });
        this.unSubscribeBlur = navigation.addListener('blur', () => {
            if (this.backHandler && this.backHandler.remove) {
                this.backHandler.remove();
                this.backHandler = null;
            }
        });
        this.unSubscribeSwipe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
        })

    }

    componentWillUnmount() {
        if (this.unSubscribeFocus) {
            this.unSubscribeFocus();
        }
        if (this.unSubscribeBlur) {
            this.unSubscribeBlur();
        }
        if (this.unSubscribeSwipe) {
            this.unSubscribeSwipe();
        }
    }

    signupWithGoogle = async () => {
        try {
            await GoogleSignin.configure({
                webClientId:
                    '47349031067-vtd15llagg72ddr2bq58hakh0s2205sn.apps.googleusercontent.com',
                offlineAccess: true,
            })
            await GoogleSignin.hasPlayServices()
            const {idToken} = await GoogleSignin.signIn()
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            auth()
                .signInWithCredential(googleCredential)
                .then(userCredential => {
                    if (userCredential.user) {
                        const user_id = userCredential.user.uid
                        this.saveUser(userCredential)
                        this.userId = user_id
                        this.setModalVisible(true)
                    }
                });
        } catch (error) {
            console.log(error)
            alert(error.message)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }

    saveUser = credential => {
        try {
            const user_id = credential.user.uid;
            const names = credential.user.displayName.split(' ');
            var update = {
                'userId' : user_id,
                'firstName' : names[0],
                'lastName' : names[1]??'',
                'role' : 3,
                'password': '',
                'email' : credential.user.email,
                'avatar' : credential.user.photoURL
            };

            database()
                .ref(`users/${user_id}`)
                .update(update)

        } catch (error) {
            alert(JSON.stringify(error))
        }
    }

    signupWithFaceBook = async () => {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                throw 'Something went wrong obtaining access token';
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

            console.log('facebookCredential: ', facebookCredential)

            auth()
                .signInWithCredential(facebookCredential)
                .then(userCredential => {
                    if (userCredential.user) {
                        const user_id = userCredential.user.uid
                        this.saveUser(userCredential)
                        this.userId = user_id
                        this.setModalVisible(true)
                    }
                });
        } catch (err) {
            console.log('error', err);
        }
    }

    singupWithApple = async () => {
        if (Platform.OS === 'ios') {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            })
            const {identityToken, nonce} = appleAuthRequestResponse
            if (identityToken) {
                const appleCredential = firebase.auth.AppleAuthProvider.credential(
                    identityToken,
                    nonce,
                )
                const userCredential = await firebase
                    .auth()
                    .signInWithCredential(appleCredential)
                if (userCredential.user) {
                    this.saveUser(userCredential)
                    const user_id = userCredential.user.uid
                    this.userId = user_id
                    this.setModalVisible(true)
                }
            }
        } else {
            const rawNonce = uuid()
            const state = uuid()

            try {
                appleAuthAndroid.configure({
                    clientId: 'com.example.client-android',
                    redirectUri: 'https://example.com/auth/callback',
                    scope: appleAuthAndroid.Scope.ALL,
                    responseType: appleAuthAndroid.ResponseType.ALL,
                    nonce: rawNonce,
                    state,
                })
                const response = await appleAuthAndroid.signIn()
                if (response) {
                    const id_token = response.id_token
                    const appleCredential = firebase.auth.AppleAuthProvider.credential(
                        id_token,
                        rawNonce,
                    )
                    const userCredential = await firebase
                        .auth()
                        .signInWithCredential(appleCredential)
                    if (userCredential.user) {
                        this.saveUser(userCredential)
                        this.userId = userCredential.user.uid;
                        this.setModalVisible(true)
                    }
                }
            } catch (error) {
                if (error && error.message) {
                    alert(error.message)
                    switch (error.message) {
                        case appleAuthAndroid.Error.NOT_CONFIGURED:
                            console.log('appleAuthAndroid not configured yet.')
                            break
                        case appleAuthAndroid.Error.SIGNIN_FAILED:
                            console.log('Apple signin failed.')
                            break
                        case appleAuthAndroid.Error.SIGNIN_CANCELLED:
                            console.log('User cancelled Apple signin.')
                            break
                        default:
                            break
                    }
                }
            }
        }
    }

    setModalVisible = visible => {
        this.setState({modalVisible: visible})
    }

    navigateScreen() {
        if (this.props && this.props.navigation) {
            this.props.navigation.navigate('TermsAndCondtions')
            this.setModalVisible(!this.state.modalVisible)
        }
    }

    Privacy() {
        if (this.props && this.props.navigation) {
            this.props.navigation.navigate('PrivacyScreen')
            this.setModalVisible(!this.state.modalVisible)
        }
    }

    onAgree = () => {
        this.setState({modalVisible: false})
        this.props.navigation.navigate('drawer')
    }

    onCancel() {
        this.setState({modalVisible: false})
    }

    onPrivacy() {
        this.setState({modalVisible: false})
        this.props.navigation.navigate('PrivacyPolicy')
    }

    onTerm() {
        this.setState({modalVisible: false})
        this.props.navigation.navigate('TermsAndCondtions')
    }

    navigteToHome() {
        try {
            var update = {}
            update[`users/${this.userId}/term_accepted`] = true
            database()
                .ref()
                .update(update)
            if (this.props && this.props.navigation) {
                this.props.navigation.navigate('drawer')
                this.setModalVisible(!this.state.modalVisible)
            }
        } catch (error) {
            alert(JSON.stringify(error))
        }
    }

    //====> Render Method <====//

    render() {
        const {modalVisible} = this.state

        return (
            <View style={styles.mainContainer}>
                {/*====> Image View <====*/}

                <View style={styles.upperView}>
                    <Image style={styles.imageStyles} source={images.logo}></Image>
                    <Text style={styles.textStyle}>Sign Up With</Text>
                </View>

                {/*====> Buttons View <====*/}

                <View style={styles.midView}>
                    {/*====> Facebook Button <====*/}

                    <Button
                        title={'Sign up with Facebook'}
                        iconPlace={'left'}
                        icon={images.ic_facebook}
                        iconStyle={styles.iconBtn}
                        bgColor={colors.facebook}
                        style={styles.btn}
                        // onPress={() => this.props.navigation.navigate('drawer')}
                        onPress={() => {
                            this.signupWithFaceBook()
                        }}
                    />

                    {/*====> Google Button <====*/}

                    <Button
                        title={'Sign up with Google'}
                        iconPlace={'left'}
                        style={styles.btn}
                        icon={images.ic_google}
                        tintColorIcon={'none'}
                        bgColor={colors.white}
                        titleStyle={{color: colors.black, fontWeight: 'bold', fontSize: 16}}
                        iconStyle={styles.iconBtn}
                        // onPress={() => this.props.navigation.navigate('drawer')}
                        onPress={() => {
                            this.signupWithGoogle()
                        }}
                    />

                    {/*====> Apple Button <====*/}

                    { Platform.OS === 'ios' ?
                    <Button
                        title={'Sign up with Apple'}
                        iconPlace={'left'}
                        icon={images.ic_apple}
                        bgColor={colors.white}
                        style={styles.btn}
                        titleStyle={{color: colors.black, fontWeight: 'bold', fontSize: 16}}
                        iconStyle={styles.iconBtn}
                        tintColorIcon={colors.black}
                        // onPress={() => this.props.navigation.navigate('drawer')}
                        onPress={() => {
                            this.singupWithApple()
                        }}
                    /> : null}

                    {/*====> Lines View <====*/}

                    <View style={styles.heightContainer}>
                        <View style={styles.heightLeft}></View>
                        <Text style={styles.OrStyle}>OR</Text>
                        <View style={styles.heightRight}></View>
                    </View>

                    {/*====> Email Button <====*/}

                    <Button
                        title={'Sign up with Email'}
                        iconPlace={'left'}
                        icon={images.ic_email}
                        style={styles.btn}
                        bgColor={colors.app_button_color}
                        iconStyle={[styles.iconBtn]}
                        tintColorIcon={colors.black}
                        titleStyle={{color: colors.white, fontWeight: 'bold', fontSize: 16}}
                        onPress={() => this.props.navigation.navigate('SignUpScreen')}
                    />

                    {/*====> Already Account Button <====*/}

                    <Button
                        title={'Already have an account?'}
                        iconPlace={'left'}
                        icon={images.ic_user}
                        style={styles.btn}
                        bgColor={colors.most_blue_button}
                        iconStyle={[styles.iconBtn]}
                        onPress={() => this.props.navigation.navigate('LoginScreen')}
                    />
                </View>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!modalVisible)
                    }}>
                    <SignUpModel
                        onPressCancel={() => this.onCancel()}
                        onPressTerm={() => this.onTerm()}
                        onPressPrivacy={() => this.onPrivacy()}
                        onPressOkay={() => {
                            this.onAgree()
                        }}
                    />
                </Modal>
            </View>
        )
    }
}

export default SignupWith
