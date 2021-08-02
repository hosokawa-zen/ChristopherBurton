//====> System files <====//

import React from 'react';
import { View, Text,} from 'react-native';

//====> Local files <====//

import styles from './styles'
import colors from '../../../../assets/colors';
import images from '../../../../assets/images';
import AppHeader from '../../../Components/AppHeader';

import PDFView from 'react-native-view-pdf';

class PrivacyPolicy extends React.Component {

    //====> Constructor Method <====//

    constructor(props) {
        super(props);
        this.url = "https://firebasestorage.googleapis.com/v0/b/revtones-9775d.appspot.com/o/docs%2FRev%20Tones%20-%20Privacy%20Policy.pdf?alt=media&token=f5ef22e6-1979-4755-a9d9-47af591f8b8a";

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
                        title={"PRIVACY POLICY"}
                        bgColor={colors.app_header_color}
                        leftIconPath={images.back_arrow}
                        onLeftIconPress={() => this.props.navigation.goBack()}


                    />
                </View>

                {/*====> Text View <====*/}


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

export default PrivacyPolicy;
