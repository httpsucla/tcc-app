import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#292929f3',
        fontSize: 20,
        marginTop: 5
    },
    inputContainer: {
        flex: 1,
        marginTop: 30,
        width: '90%',
        padding: 20,
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
    button: {
        marginTop: 25,
        height: 50,
        backgroundColor: '#414BB2',
        borderRadius: 2,
        paddingHorizontal: 110,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    input: {
        marginTop: 10,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch'
    },
    campolista: {
        flexDirection: 'row',
        marginTop: 5,
        height: 60,
        backgroundColor: '#fff',
        borderColor: '#292929f3',
        borderWidth: 2,
        borderRadius: 15,
        flex: 1,
        marginBottom: 10,
        justifyContent: 'space-between'
    },
    campoconteudo: {  
        justifyContent: 'center',
        paddingHorizontal: 12
    }
});