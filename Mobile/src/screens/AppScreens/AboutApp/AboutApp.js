//====> System files <====//
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, Image,} from 'react-native';
import React from 'react';

//====> Local files <====//
import AppHeader from '../../../Components/AppHeader';
import colors from '../../../../assets/colors';
import images from '../../../../assets/images';
import styles from './styles';


class AboutApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            dummyText: 'It is a long established fact that a reader will be distracted by the' +
                ' readable content of a page when looking at its layout. The point of using ' +
                'Lorem Ipsum is that it has a more-or-less normal distribution of letters, as\n'
        }
    }

    //====> Render Method <====//

    render() {
        return (

            <View style={styles.mainContainer}>

                {/*====> Header View <====*/}

                <View style={styles.headerView}>

                    <AppHeader
                        title={"ABOUT THE APP"}
                        bgColor={colors.app_header_color}
                        leftIconPath={images.back_arrow}
                        onLeftIconPress={() => this.props.navigation.goBack()}


                    />
                </View>

                {/*====> ImageBackground View <====*/}

                <View style={styles.upperView}>
                    <Image
                        style={styles.imageStyles}
                        source={images.logo}
                    >
                    </Image>

                    <Text style={[styles.textStyle, { marginTop: wp(3) }]}>Version:1.00 </Text>
                    <Text style={[styles.textStyle, { marginTop: wp(1.5) }]}>Copyright 2020 - RevTones.com </Text>
                    <Text style={[styles.textStyle, { marginTop: wp(1.5) }]}>Developer Name Inc. </Text>

                </View>


                {/*====> Text View <====*/}

                <View style={styles.midView}>
                    <View style={styles.textContainer1}>
                        <Text style={styles.textbottomStylesr}>
                            {this.state.dummyText}

                        </Text>
                        <Text style={styles.textbottomStylesr}>
                            {this.state.dummyText}

                        </Text>
                    </View>

                </View>





            </View>
        )
    }
}



export default AboutApp;
