
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {View, Text, StatusBar, FlatList, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//




import styles from './Styles'

import images from '../../../../../assets/images';
import AppHeader from '../../../../Components/AppHeader';
import colors from '../../../../../assets/colors';
import Button from "../../../../Components/Button/Button";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import {socials, openGotoSocialApp} from '../../../../socials';

class SyncSocialMediaAccountScreen extends React.Component {

    constructor(props) {
        super(props);
        this.userId = '';
        this.state = {
            user: {},
            mySocials: [],
            socialAccount: socials
        }
    }

    componentDidMount () {
        this.getUser()
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        this.getUser()
    }

    getUser = () => {
        auth().onAuthStateChanged(user => {
            if (user) {
                this.userId = user.uid
                this.getUserInfo()
            } else {
                if (this.props.navigation) {
                    this.props.navigation.navigate('LoginScreen')
                }
            }
        })
    }

    getUserInfo = () => {
        database()
            .ref(`users/`)
            .on('value', snapshot => {
                if (snapshot.exists()) {
                    const uid = this.userId
                    let user = ''
                    snapshot.forEach(child => {
                        if (child.val().userId == uid) {
                            user = child.val()
                        }
                    })
                    if (user) {
                        const mySocials = user.mySocials ?? []

                        this.setState({
                            user,
                            mySocials,
                        })
                    }
                } else {
                    console.log("Can't get user info")
                }
            })
    }

    //====> Social Account Method <====//

    onPressItem = (id) => {
        openGotoSocialApp(id);
    }

    onToggleItem = (is_added, item_id) => {
        if(is_added){
            const mySocials = this.state.mySocials.filter(i => i !== item_id);
            this.setState({mySocials});
        } else {
            const mySocials = [...this.state.mySocials, item_id];
            this.setState({mySocials});
        }
    }

    social_account = item => {
        const is_added = this.state.mySocials.includes(item.id);
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.itemContent} onPress={() => this.onPressItem(item.id)}>
                    <Image style={styles.img} source={item.imageSocial}/>
                    <Text
                        ellipsizeMode={'tail'}
                        numberOfLines={1}
                        style={styles.textTitle}>{item.title}</Text>
                </TouchableOpacity>
                <Button style={styles.btnStyle} bgColor={is_added?colors.app_red:colors.most_blue_button} titleStyle={styles.titleStyle}
                        title={is_added?'Remove':'Add'} onPress={() => this.onToggleItem(is_added, item.id)}/>
            </View>
        )
    }

    onSocialAccountSave = () => {
        try {
            if (this.state.user && this.state.user.userId) {
                let updates = {
                    mySocials: this.state.mySocials
                }
                database()
                    .ref(`users/${this.state.user.userId}`)
                    .update(updates)
                    .then(() => {
                        alert("Data updated successfully.");
                        this.props.navigation.goBack();
                    })
                    .catch(function (error) {
                        alert('Data could not be updated.' + error)
                    })
            }
        } catch (e) {
            alert(e.message)
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
                        title={"Sync Social Media Account"}
                        bgColor={colors.app_header_color}
                        leftIconPath={images.back_arrow}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                    />

                </View>
                <View style={styles.socialAccountView}>
                    <Text style={styles.headingText}>Social Media Accounts</Text>
                    <FlatList
                        style={{marginTop: 10, flexGrow: 1}}
                        data={this.state.socialAccount}
                        renderItem={({item}) => this.social_account(item)}
                        keyExtractor={item => item.id}
                    />

                    <View style={{alignItems: 'center', marginTop: 15}}>
                        <Button
                            title={'Save'}
                            onPress={() => this.onSocialAccountSave()}
                        />
                    </View>
                </View>
            </View>
        )
    }
}
export default SyncSocialMediaAccountScreen;
