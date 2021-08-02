import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from "../../../assets/images";
import {Collapse, CollapseBody, CollapseHeader} from "accordion-collapse-react-native";
import styles from './style';


export default class CollapseComponent extends React.Component {


    render() {

        let collapseWidth=this.props.collapseWidth||wp(70);
        let collapseHeight=this.props.collapseHeight||wp(10);
        let borderColor=this.props.borderColor;
        let borderWidth=this.props.borderWidth;
        let marginTop=this.props.marginTop;
        let paddingHorizontal=this.props.paddingHorizontal || '3%';
        let borderBottomWidth=this.props.borderBottomWidth;
        let borderRadius=this.props.borderRadius;
        let textColor=this.props.textColor;

        return(

            <View style={[styles.container,{height:collapseHeight,width: collapseWidth,borderColor:borderColor,marginTop:marginTop,borderWidth:borderWidth,borderBottomWidth:borderBottomWidth,borderRadius:borderRadius}]}>
                <Collapse>
                    <CollapseHeader>
                        <View style={[styles.viewTitle,{paddingHorizontal:paddingHorizontal}]}>
                        <View>
                        <Text style={[styles.text,{color:textColor}]}>{this.props.title}</Text>
                        </View>
                        <View>
                            <Image style={{height:hp(3),width:wp(3),resizeMode: 'contain',tintColor:'#c1c1c1'}} source={images.icn_button_expand} />
                        </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={styles.collapseBody}>
                        <View style={styles.bodyView}>
                        <TouchableOpacity>
                            <Text style={styles.bodyText}>one</Text>
                        </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.bodyText}>Two</Text>
                            </TouchableOpacity>

                        </View>

                    </CollapseBody>
                </Collapse>

            </View>

        );
    }
}


