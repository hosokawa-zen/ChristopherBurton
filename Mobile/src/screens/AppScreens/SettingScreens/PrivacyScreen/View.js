
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StatusBar } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import images from '../../../../../assets/images';
import colors from '../../../../../assets/colors';
import AppHeader from '../../../../Components/AppHeader';
import styles from './Styles'

import PDFView from 'react-native-view-pdf';


class PrivacyScreen extends React.Component {

    constructor(props) {
        super(props);

        this.url = "https://firebasestorage.googleapis.com/v0/b/revtones-9775d.appspot.com/o/docs%2FRev%20Tones%20-%20Privacy%20Policy.pdf?alt=media&token=f5ef22e6-1979-4755-a9d9-47af591f8b8a";

        this.state = {

            dummyText: 'It is a long established fact that a reader will be distracted by the' +
                ' readable content of a page when looking at its layout. The point of using ' +
                'Lorem Ipsum is that it has a more-or-less normal distribution of letters, as\n'
        }
    }

    render() {
        const resourceType = 'url';

        return (

            <View style={styles.mainContainer}>

                {/* //================================ StatusBar ======================================// */}

                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.appDarkBlue} translucent={false} />

                {/* //================================ Header ======================================// */}

                <View style={styles.headerView}>

                    <AppHeader
                        headerHeight='100%'
                        leftIconPath={images.headerLeftBack}
                        lefticonSize={wp(5)}
                        title={'PRIVACY POLICY'}
                        titleFontSize={wp(5)}
                        onLeftIconPress={() => this.props.navigation.goBack()}

                    />
                </View>

                {/* //================================ Text Container ======================================// */}

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
            </View>
        )
    }
}
export default PrivacyScreen;
