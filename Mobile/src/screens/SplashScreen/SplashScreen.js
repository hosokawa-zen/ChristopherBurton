//====> System files <====//

import {Image,ImageBackground} from 'react-native';
import React from 'react';

//====> Local files <====//

import styles from "./styles";
import images from "../../../assets/images";
import auth from "@react-native-firebase/auth";


class SplashScreen extends React.Component {


//====> ComponentDidMount Method <====//

    componentDidMount() {
        setTimeout(async () => {
            const user = await auth().currentUser;
            if(user){
                this.props.navigation.navigate('drawer')
            } else {
                this.props.navigation.navigate('onBoarding');
            }
        }, 2000);
    }


//====> Render Method <====//

    render()
    {
        return(

            //====> ImageBackground <====//
            <ImageBackground style={styles.mainContainer} imageStyle={styles.imgBack}  source={images.img_background} >
                  <Image style={styles.container} source={images.splash}/>
            </ImageBackground>
        )
    }
}



export default SplashScreen;
