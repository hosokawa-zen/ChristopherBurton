import colors from '../../../../assets/colors';
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        backgroundColor: colors.app_header_color,
    },

    headerView:
    {
        flex: 0.1,
        backgroundColor: colors.app_header_color

    },
    container:
    {
        flex: 0.7,
        alignSelf:'center'
    },
    buttonContainer: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center"
        // backgroundColor: "red",

    },








});
export default styles;
