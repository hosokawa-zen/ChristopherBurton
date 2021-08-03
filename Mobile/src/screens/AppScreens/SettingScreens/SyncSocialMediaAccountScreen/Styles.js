
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import {Platform, StyleSheet} from "react-native";
import colors from '../../../../../assets/colors';
//================================ Local Imported Files ======================================//



const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        backgroundColor: colors.app_header_color,
    },
    headerView:
    {
        backgroundColor: colors.app_header_color,
        flex: 0.09
    },
    headingText:{
        fontSize:wp(4.5),
        fontWeight:'bold',
        color:colors.white,
        paddingBottom:'1.5%'
    },

    socialAccountView:{
        width:wp(94),
        alignSelf:'center',
        marginTop: 12,
        // backgroundColor: 'red',
        flex: 0.91
    },
    itemContainer: {
        flexDirection: 'row',
        flex: 1,
        marginVertical: 8,
        alignItems: 'center'
    },
    itemContent: {
        flexDirection: 'row',
        flexGrow: 1,
        alignItems: 'center'
    },
    img: {
        width: 48,
        height: 48,
    },
    textTitle:{
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 12
    },
    btnStyle: {
        height: 48,
        width: 120,
        borderRadius: 8
    }
});
export default Styles;
