import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image} from 'react-native';
import styles from "./style";


export default class InputField extends React.Component {

    render() {

        return(

            <View style={styles.containerView}>
                <TextInput
                    style={styles.textInput}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={this.props.placeholderTextColor}
                    value={this.props.value}
                    onChangeText={this.props.onChangeText}
                />
            </View>

        );
    }
}



