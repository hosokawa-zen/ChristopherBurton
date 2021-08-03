//====> System files <====//

import { createStackNavigator,CardStyleInterpolators  } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Image, TouchableOpacity, View, Text, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import auth, {firebase} from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

//====> Local files <====//

import RevtoneCategoryComponent from '../Components/AppComponents/RevtoncategoryComponent/RevtoncategoryComponent';
import SocialAccountComponent from '../Components/AppComponents/SocialAccountComponent/SocialAccountComponent';
import CarProfileComponent from '../Components/AppComponents/CarProfileComponent/CarProfileComponent';
import SearchRevComponent from '../Components/AppComponents/SearchRevComponent/SearchRevComponent';
import RecordRevComponent from '../Components/AppComponents/RecordRevComponent/RecordRevComponent';
import RevtonesCategories from './AppScreens/RevtonesCategories/RevtonesCategories';
import TermsAndCondtions from './AppScreens/TermsAndConditions/TermsAndCondtions';
import SendFeedback from './AppScreens/SettingScreens/SendFeedBackScreen/View';
import QuestionsOptions from './AppScreens/QuestionsOptions/QuestionsOptions';
import SettingsScreen from './AppScreens/SettingScreens/SettingScreen/View';
import ReenterPassword from './AppScreens/RenterPassword/ReenterPassword';
import SearchRevtones from './AppScreens/SearchRevtones/SearchRevtones';
import ResetPassword from './AppScreens/ResetPassword/ResetPassword';
import PrivacyPolicy from './AppScreens/PrivacyPolicy/PrivacyPolicy';
import SignUpScreen from './AppScreens/SignUpScreen/SignUpScreen';
import TrimAudioScreen from './AppScreens/TrimRevtone/View';
import NewRevtoneScreen from './AppScreens/CreateNewRevtone/View';
import EditProfile from './AppScreens/EditProfile/EditProfile';
import LoginScreen from './AppScreens/LoginScreen/LoginScreen';
import styles from '../Components/AppComponents/MyNav/styles';
import QuestionScreen from './AppScreens/QuestionScreen/View';
import UserProfile from './AppScreens/UserProfileScreen/View';
import RevtoneGameScreen from './AppScreens/RevtoneGame/View';
import CarProfile from './AppScreens/CarProfile/CarProfile';
import SignupWith from './AppScreens/SignupWith/SignupWith';
import RecordRevtone from './AppScreens/RecordRevtone/View';
import MyRevtoneScreen from './AppScreens/MyRevtones/View';
import SearchScreen from './AppScreens/SearchFilters/View';
import MyProfile from './AppScreens/MyProfile/MyProfile';
import SplashScreen from "./SplashScreen/SplashScreen";
import AboutApp from './AppScreens/AboutApp/AboutApp';
import {DrawerItem} from '@react-navigation/drawer';
import OnBoarding from './OnBoarding/OnBoarding';
import colors from '../../assets/colors';
import images from "../../assets/images";
import SyncSocialMediaAccountScreen from "./AppScreens/SettingScreens/SyncSocialMediaAccountScreen/View";


let userId = ''
let userInfo = null
let avatarUri = ''

// User
function getUser() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        userId = user.uid;
        getUserInfo();
      }
    });
  };

  function getUserInfo() {
    database()
      .ref(`users/`)
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          const uid = userId;
          let user = "";
          snapshot.forEach((child) => {
            if (child.val().userId == uid) {
              user = child.val();
            }
          });
          if (user) {
            const avatar = user.avatar != '' ? user.avatar : '';
            userInfo = user
            avatarUri = avatar
          }
        } else {
          console.log("Can't get user info");
        }
      });
  };

//================================ Drawer Function ======================================//
function CustomDrawerContent(props) {
    getUser()

    const onLogout = async() => {
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
                    onPress: async () => {
                        await firebase.auth().signOut().then(() => {
                            props.navigation.navigate('LoginScreen');
                        })
                    }
                }
            ],
            { cancelable: false }
        )
    }

    return (

        <View {...props} style={styles.drawerMainContainer}>
            <View style={styles.userInfoContainer}>
                <TouchableOpacity style={styles.userImageContainer}
                                  onPress={() => props.navigation.navigate('MyProfile')}
                >
                    <Image source={userInfo && avatarUri != '' ? {uri: avatarUri} : images.avatar} style={styles.userProfileImage} resizeMode={"contain"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.userTextContainer}>
                    <Text style={styles.userNameText}>{userInfo ? `Hi, ${userInfo.firstName} ${userInfo.lastName}` : `Hi, Client`}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.drawerItemsContainer} >

                <DrawerItem
                    style={[styles.drawerItemStyles,{backgroundColor:colors.app_button_color}]}
                    label={() => <Text style={styles.drawerItemLabelText} >{"Search Revtones"}</Text>}
                    icon={() => <Image source={images.icn_search_revtones} style={[styles.drawerItemImage,{tintColor:colors.white}]} />}
                    onPress={() => props.navigation.navigate('RevtonesCategories')}
                />


                <DrawerItem
                    style={[styles.drawerItemStyles,{backgroundColor:colors.app_button_color}]}
                    label={() => <Text style={styles.drawerItemLabelText} >{"My RevTones"}</Text>}
                    icon={() => <Image source={images.icn_rev_tones} style={[styles.drawerItemImage,{tintColor:colors.white}]} />}
                    onPress={() => props.navigation.navigate('MyRevtones')}
                />

                <DrawerItem
                    style={[styles.drawerItemStyles,{backgroundColor:colors.app_button_color}]}
                    label={() => <Text style={styles.drawerItemLabelText} >{"RevTone Game"}</Text>}
                    icon={() => <Image source={images.icn_play_small} style={[styles.drawerItemImage,{tintColor:colors.white}]} />}
                    onPress={() => props.navigation.navigate('RevtoneGame')}
                />

                <DrawerItem
                    style={styles.drawerItemStyles}
                    label={() => <Text style={styles.drawerItemLabelText} >{"Settings"}</Text>}
                    icon={() => <Image source={images.icn_settings} style={[styles.drawerItemImage,{tintColor:colors.white}]} />}
                    onPress={() => props.navigation.navigate('SettingsScreen')}
                />


                <DrawerItem
                    style={styles.drawerItemStyles}
                    label={() => <Text style={styles.drawerItemLabelText} >{"Logout"}</Text>}
                    icon={() => <Image source={images.icn_logout} style={[styles.drawerItemImage,{tintColor:'grey'}]} />}
                    onPress={onLogout}
                />

                {/*<DrawerItem*/}
                {/*    style={[styles.drawerItemStyles, { marginTop: wp(35) }]}*/}
                {/*    label={() => <Text style={styles.drawerItemLabelText} >{"Switch to Seller Account"}</Text>}*/}
                {/*    icon={() => <Image source={images.ic_switch_to_buyer} style={styles.drawerItemImage}*/}
                {/*    />}*/}
                {/*//

                {/*<DrawerItem style={[styles.drawerItemStylesLogin, { backgroundColor: colors.AppRedColor, }]}*/}
                {/*            label={() => <Text style={[styles.drawerItemLabelText, { color: colors.bright_red, fontWeight: 'bold' }]}>{"Logout"}</Text>}*/}
                {/*            icon={() => <Image source={images.ic_logout_settings} style={[styles.drawerItemImage, { tintColor: colors.bright_red }]} />}*/}
                {/*            onPress={() => props.navigation.navigate('LoginScreen')} />*/}

            </View>

        </View>

    );
}



//================================ Drawer Navigator ======================================//

const Drawer = createDrawerNavigator();
function drawerNav() {
    return (
        <Drawer.Navigator
            initialRouteName="RevtonesCategories"
            drawerContent={props => CustomDrawerContent(props)}>
            <Drawer.Screen name="RevtonesCategories" component={RevtonesCategories} />
            <Drawer.Screen name="MyRevtones" component={MyRevtoneScreen} />
            <Drawer.Screen name="RevtoneGame" component={RevtoneGameScreen} />
            <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />

        </Drawer.Navigator>
    );
}






const RootStack = createStackNavigator();


export default function Stack() {
    return(
           <NavigationContainer>
               <RootStack.Navigator
               headerMode={'none'}
               initialRouteName={'splashScreen'}
               screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}
               >

                   <RootStack.Screen name="splashScreen" component={SplashScreen} />
                   <RootStack.Screen name="onBoarding" component={OnBoarding}/>
                   <RootStack.Screen name="SignupWith" component={SignupWith}/>
                   <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
                   <RootStack.Screen name="LoginScreen" component={LoginScreen}/>
                   <RootStack.Screen name="ResetPassword" component={ResetPassword}/>
                   <RootStack.Screen name="ReenterPassword" component={ReenterPassword}/>
                   <RootStack.Screen name="TermsAndCondtions" component={TermsAndCondtions}/>
                   <RootStack.Screen name="PrivacyPolicy" component={PrivacyPolicy}/>
                   <RootStack.Screen name="SendFeedback" component={SendFeedback}/>
                   <RootStack.Screen name="SyncSocial" component={SyncSocialMediaAccountScreen}/>
                   <RootStack.Screen name="AboutApp" component={AboutApp}/>

                   {/*New App Screens*/}

                   <RootStack.Screen name="QuestionScreen" component={QuestionScreen}/>
                   <RootStack.Screen name="TrimAudioScreen" component={TrimAudioScreen}/>
                   <RootStack.Screen name="RecordRevtone" component={RecordRevtone}/>
                   <RootStack.Screen name="UserProfile" component={UserProfile}/>
                   <RootStack.Screen name="SearchScreen" component={SearchScreen}/>
                   <RootStack.Screen name="SearchRevtones" component={SearchRevtones}/>
                   <RootStack.Screen name="CarProfile" component={CarProfile}/>
                   <RootStack.Screen name="EditProfile" component={EditProfile}/>
                   <RootStack.Screen name="MyProfile" component={MyProfile}/>
                   <RootStack.Screen name="NewRevtoneScreen" component={NewRevtoneScreen}/>
                   {/*<RootStack.Screen name="RecordRevtones" component={RecordRevtones}/>*/}
                   <RootStack.Screen name="QuestionsOptions" component={QuestionsOptions}/>
                   {/*<RootStack.Screen name="SearchFilters" component={SearchFilters}/>*/}
                   <RootStack.Screen name="drawer" component={drawerNav} />



                   {/*New App Components*/}

                   <RootStack.Screen name="RevtoneCategoryComponent" component={RevtoneCategoryComponent} />
                   <RootStack.Screen name="SearchRevComponent" component={SearchRevComponent} />
                   <RootStack.Screen name="CarProfileComponent" component={CarProfileComponent} />
                   <RootStack.Screen name="RecordRevComponent" component={RecordRevComponent} />
                   <RootStack.Screen name="SocialAccountComponent" component={SocialAccountComponent} />

               </RootStack.Navigator>
           </NavigationContainer>

    )

}



