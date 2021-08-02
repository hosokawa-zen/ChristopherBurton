//====> System files <====//

import { View, Text} from 'react-native';
import React from 'react';

//====> Local files <====//


import AppHeader from '../../../Components/AppHeader';
import colors from '../../../../assets/colors';
import images from '../../../../assets/images';
import styles from './styles'



class QuestionScreen extends React.Component {

    //====> Constructor Method <====//

    constructor(props) {
        super(props);


    }

    //====> Render Method <====//

    render() {
        let carInfo = this.props.route.params.carInfo
        return (

            <View style={styles.mainContainer}>

                {/*====> Header View <====*/}

                <View style={styles.headerView}>
                    <AppHeader
                        title={"QUESTIONS"}
                        bgColor={colors.app_header_color}
                        leftIconPath={images.back_arrow}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                    />
                </View>

                {/*====> Info View <====*/}

                <View style={styles.container}>

                    <View style={styles.userName}>
                        <Text style={styles.leftQuestion}>Is your car stock?</Text>
                        <Text style={styles.rightAnswer}>{carInfo && carInfo.carStockChecked.title}</Text>
                    </View>
                    <View style={styles.userName}>
                        <Text style={styles.leftQuestion}>Engine Displacement</Text>
                        <Text style={styles.rightAnswer}>{carInfo && carInfo.displacement}</Text>
                    </View>
                    <View style={styles.userName}>
                        <Text style={styles.leftQuestion}>Cylinders</Text>
                        <Text style={styles.rightAnswer}>{carInfo && carInfo.cylinderChecked.title}</Text>
                    </View>
                    <View style={styles.userName}>
                        <Text style={styles.leftQuestion}>Configuration:</Text>
                        <Text style={styles.rightAnswer}>{carInfo && carInfo.configurationChecked.title}</Text>
                    </View>
                    <View style={styles.userName}>
                        <Text style={styles.leftQuestion}>Naturally Aspirated?</Text>
                        <Text style={styles.rightAnswer}>{carInfo && carInfo.aspiratedChecked.title}</Text>
                    </View>
                    <View style={styles.userName}>
                        <Text style={styles.leftQuestion}>Forced Induction?</Text>
                        <Text style={styles.rightAnswer}>{carInfo && carInfo.aspiratedEngineChecked.title}</Text>
                    </View>
                    <View style={styles.userName}>
                        <Text style={styles.leftQuestion}>Headers?</Text>
                        <Text style={styles.rightAnswer}>{carInfo && carInfo.headerText}</Text>
                    </View>
                    <View style={styles.userName}>
                        <Text style={styles.leftQuestion}>Cem?</Text>
                        <Text style={styles.rightAnswer}>{carInfo && carInfo.camText}</Text>
                    </View>
                    <View style={styles.userName}>
                        <Text style={styles.leftQuestion}>Modified exaust?</Text>
                        <Text style={styles.rightAnswer}>{carInfo && carInfo.exaustText}</Text>
                    </View>

                </View>
            </View>
        )
    }
}

export default QuestionScreen;
