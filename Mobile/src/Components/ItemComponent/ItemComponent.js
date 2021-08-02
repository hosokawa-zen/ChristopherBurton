import React from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity,Platform} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../assets/colors';
import images from '../../../assets/images';
import Button from '../Button/Button';
import styles from './style';



export default class ItemComponent extends React.Component {



    render() {
        return(

            // <View style={{flex:1,justifyContent: 'center',alignItems:'center',}}>
            <View>
                {this.props.orderTypeView ?
                    <Text style={styles.textOrderType}>{this.props.orderType}</Text>
                    : null
                }
                <TouchableOpacity style={styles.mainContainer} onPress={this.props.onPressTouchable}>
                    <View style={styles.leftSide}>
                        <Image style={styles.img} source={this.props.mainImage}  />
                    </View>
                    <View style={styles.middleSide}>
                        <Text style={{fontWeight:'bold'}}>{this.props.title}</Text>
                        <Text style={{paddingTop:'3%',color:'#999999'}}>{this.props.description}</Text>
                        {this.props.quantityView &&
                            <View>
                            <Text style={{fontWeight:'bold',paddingTop: Platform.OS === 'ios' ?'20%' :'4%'}}>Quantity</Text>
                            <Text style={{color:colors.moss_bright,paddingTop:'4%'}}>{this.props.number}</Text>
                            </View>
                        }
                        {this.props.counterView &&
                        <View>
                            <Text style={{fontWeight:'bold',paddingTop: Platform.OS === 'ios' ? '17%' : '4%'}}>Quantity</Text>
                            <View style={{flexDirection: 'row',width:'60%',paddingTop:'4%',justifyContent:'space-between',}}>
                                <TouchableOpacity>
                                    <Image style={styles.icon} source={images.ic_minus_quantity}  />
                                </TouchableOpacity>
                                <Text>{this.props.counterNumber}</Text>
                                <TouchableOpacity>
                                    <Image style={styles.icon} source={images.ic_add_quantity}  />
                                </TouchableOpacity>
                            </View>
                        </View>
                        }
                        {this.props.dateView ?
                        <View>
                            <Text style={{color:colors.placeholder_text_color}}>{this.props.date}</Text>
                        </View> : null
                        }


                    </View>

                    <View style={styles.rightSide}>
                        <View style={{flexDirection: 'row',alignItems: 'center'}}>
                            <Text style={{color:colors.moss_light,fontWeight:'bold'}}>{this.props.rightText}</Text>
                            {this.props.viewIcon &&
                            <TouchableOpacity style={{paddingLeft:'7%'}}>
                                <Image style={styles.icon} source={this.props.rightIcon}  />
                            </TouchableOpacity>
                             }
                            {this.props.orderView &&
                                 <Text>{this.props.orderNumber}</Text>
                            }
                            {this.props.priceCartView &&
                            <Text style={styles.textPriceCart}>{this.props.priceCart}</Text>
                            }
                         </View>

                        {this.props.viewPrice ?
                            <Text style={{fontWeight:'bold',color:colors.moss_bright}}>{this.props.price}</Text> :null
                        }

                        {this.props.textBtn &&

                            <Button
                                title={this.props.textBtnTitle}
                                style={{height:35,width:'80%',backgroundColor:'green'}}
                            />

                        }

                        {this.props.buttonView ?

                        <Button
                            onPress={this.props.onPressButton}
                            title={this.props.button}
                            style={{height:30,width:'80%',backgroundColor:colors.moss_bright}}
                        /> : null
                        }

                        {this.props.buttonRemove &&

                        <Button
                            onPress={this.props.onPressRemoveButton}
                            title={'Remove'}
                            bgColor={'#fa5554'}
                            style={{height:30,width:'80%',}}
                        />
                        }

                        {this.props.orderConditionView ?
                            <View style={styles.orderConditionView}>
                                <Text style={{fontSize:wp(3),color:colors.moss_bright}}>{this.props.orderConditionText}</Text>
                            </View>   : null

                        }


                    </View>


                </TouchableOpacity>
            </View>


              // </View>

        );
    }
}





