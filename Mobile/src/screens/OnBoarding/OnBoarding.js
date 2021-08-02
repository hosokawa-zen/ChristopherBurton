//====> System files <====//

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View,Text,Image,ImageBackground,TouchableOpacity} from 'react-native';
import React from 'react';

//====> Local files <====//

import Button from "../../Components/Button/Button";
import colors from "../../../assets/colors";
import images from "../../../assets/images";
import Swiper from 'react-native-swiper';
import styles from "./styles";



class OnBoarding extends React.Component{

//====> Constructor Method <====//

    constructor(props) {
        super(props);


        this.state={
            newIndex:1,
            currentIndex:0,
        }
    }

//====> OnChane Index Method <====//

    onIndexChanged(index){
        this.setState({ currentIndex: index});
    }


    //====> Scroll Method <====//
    scrollItem(){
        if (this.state.currentIndex === 2){
            this.props.navigation.navigate('SignupWith');
            // this.refs.swiper.scrollBy(1);
        } else {
            this.refs.swiper.scrollBy(1)
        }
    }



//====> Render Method <====//

    render()
    {
        return(

//====> ImageBackground  <====//

            <ImageBackground style={styles.mainContainer} source={images.img_background}>

                {/*====> Swiper View <====*/}

                <View style={styles.upperView}>

                    <Swiper
                            showsButtons={false}
                            loop={false}
                            ref={'swiper'}
                            onIndexChanged={this.onIndexChanged.bind(this)}
                            activeDotColor={colors.white}
                            dotColor={colors.shadow_black}>

                        {/*====> Image View <====*/}

                        <View style={styles.slides}>

                            <View style={styles.imageView}>
                                <Image
                                    style={styles.imageStyles}
                                    source={images.logo}/>


                            </View>

                            {/*====> Info View <====*/}

                            <View style={styles.midView}>

                                <Text style={styles.textStyleWelcome}>Welcome to RevTones!</Text>
                                <Text style={styles.textDetail}>Join the big community of car enthusiasts and easily access
                                a wide collection of sounds from cards under categories like muscle cars, exotic cards, European cards,
                                    motorcycles, etc. anytime and anywhere. Download ringtones, save to favorites, and even set as an alert or
                                    notification tone.
                                </Text>

                            </View>

                        </View>


                        {/*====> Image View <====*/}
                        <View style={styles.slides}>

                            <View style={styles.imageView}>
                                <Image
                                    style={styles.imageStyles}
                                    source={images.logo}/>


                            </View>

                            {/*====> Info View <====*/}

                            <View style={styles.midView}>

                                <Text style={styles.textStyleWelcome}>Welcome to RevTones!</Text>
                                <Text style={styles.textDetail}>Join the big community of car enthusiasts and easily access
                                    a wide collection of sounds from cards under categories like muscle cars, exotic cards, European cards,
                                    motorcycles, etc. anytime and anywhere. Download ringtones, save to favorites, and even set as an alert or
                                    notification tone.
                                </Text>

                            </View>
                        </View>

                        {/*====> Image View <====*/}

                        <View style={styles.slides}>

                            <View style={styles.imageView}>
                                <Image
                                    style={styles.imageStyles}
                                    source={images.logo}/>


                            </View>

                            {/*====> Info View <====*/}

                            <View style={styles.midView}>

                                <Text style={styles.textStyleWelcome}>Welcome to RevTones!</Text>
                                <Text style={styles.textDetail}>Join the big community of car enthusiasts and easily access
                                    a wide collection of sounds from cards under categories like muscle cars, exotic cards, European cards,
                                    motorcycles, etc. anytime and anywhere. Download ringtones, save to favorites, and even set as an alert or
                                    notification tone.
                                </Text>

                            </View>
                        </View>


                    </Swiper>
                </View>

                {/*====> Button View <====*/}

                <View style={styles.lowerView}>
                    <Button
                    onPress={()=> this.scrollItem()}
                    title={'Next'}
                    />


                    {/*====> Button View <====*/}

                    <TouchableOpacity style={{width:wp('70%'), height:hp('7%'), alignItems:'center'}}
                                  onPress={() =>  this.props.navigation.navigate('SignupWith')}>
                    <Text style={{color: colors.app_button_color, fontSize: wp('4%'),
                        textDecorationLine: 'underline'}}>SKIP</Text>
                </TouchableOpacity>

            </View>

            </ImageBackground>
        )
    }
}


export default OnBoarding;
