//====> System files <====//

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, } from 'react-native';
import React from 'react';

//====> Local files <====//

import Button from '../../../Components/Button/Button';
import AppHeader from '../../../Components/AppHeader';
import colors from '../../../../assets/colors';
import images from '../../../../assets/images';
import styles from './styles'

import PDFView from 'react-native-view-pdf';


class TermsAndCondtions extends React.Component {

    //====> constructor Method <====//

    constructor(props) {
        super(props);

        this.url = "https://firebasestorage.googleapis.com/v0/b/revtones-9775d.appspot.com/o/docs%2Fterms_and_conditions.pdf?alt=media&token=b154d89a-a3e2-46b6-a554-b85a3c40a5ea";
        this.state = {

            dummyText: 'It is a long established fact that a reader will be distracted by the' +
                ' readable content of a page when looking at its layout. The point of using ' +
                'Lorem Ipsum is that it has a more-or-less normal distribution of letters, as\n'
        }
    }


    //====> Render Method <====//


    render() {
        const resourceType = 'url';
        return (

            <View style={styles.mainContainer}>

                {/*====> Header View <====*/}

                <View style={styles.headerView}>
                    <AppHeader
                        title={"TERMS AND CONDITIONS"}
                        bgColor={colors.app_header_color}
                        leftIconPath={images.back_arrow}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                    />
                </View>

                {/*====> Info View <====*/}

                <View style={styles.container}>

                    <PDFView
                        fadeInDuration={250.0}
                        style={{ flex: 1, width: '100%' }}
                        resource={this.url}
                        resourceType={resourceType}
                        onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
                        onError={(error) => console.log('Cannot render PDF', error)}
                    />


                </View>

                {/*====> Button View <====*/}

                <View style={styles.buttonContainer}>
                    <Button
                        height={hp(7)}
                        width={'100%'}
                        style={styles.buttonStyles}
                        title={'Agree and Continue'}
                        bgColor={colors.app_button_color}
                        titleColor={colors.dark_red}
                        titleStyle={[styles.titleStyles]}
                        // onPress={() => this.props.navigation.navigate('Payment', {key: this.props.route.params.key, price: this.props.route.params.price, count: this.props.route.params.count, deal: this.props.route.params.deal})}
                    />

                </View>
            </View>
        )
    }
}

export default TermsAndCondtions;
