//====> System files <====//

import {Image,ImageBackground} from 'react-native';
import React from 'react';

//====> Local files <====//

import styles from "./styles";
import images from "../../../assets/images";


class SplashScreen extends React.Component {


//====> ComponentDidMount Method <====//

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('onBoarding');
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
