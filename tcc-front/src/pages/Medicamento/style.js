import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        paddingTop: 100
    },
    title: {
        color: '#292929f3',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },
    inputContainer: {
        flex: 1,
        marginTop: 50,
        width: '90%',
        padding: 20,
        alignItems: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    input: {
        marginTop: 10,
        height: 60,
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch'
    },
    button: {
        marginVertical: 20,
        height: 60,
        width: '100%',
        backgroundColor: '#569099',
        borderRadius: 20, 
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowOpacity: 0.4,
        shadowColor: '#000',
        shadowRadius: 4,
        shadowOffset: {
            width: 5,
            height: 5
        },
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonLista: {
        marginTop: 20,
        height: 60,
        backgroundColor: '#569099',
        borderRadius: 20,
        borderWidth: 1,
        width: '85%',
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowOpacity: 0.4,
        shadowColor: '#000',
        shadowRadius: 4,
        shadowOffset: {
            width: 5,
            height: 5
        },
    },
    calendario: {
        height: 50,
        color: '#4CAF50'
    },
    lista: {
        flex: 1,
        marginTop: 25,
        width: '95%',
        paddingHorizontal: 20,
        paddingBottom: 100
    },
    campolista: {
        flexDirection: 'row',
        marginVertical: 1,
        paddingHorizontal: 15,
        height: 75,
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 2,
        flex: 1,
        justifyContent: 'space-between'
    },
    campoconteudo: {
        justifyContent: 'center',
        paddingHorizontal: 10,
        width: 200
    },
    campoicone: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    componentenumero: {
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    emptyList: {
        fontStyle: 'italic',
        color: '#292929f3',
        fontSize: 20,
        paddingHorizontal: 20,
        textAlign: 'center',
        marginVertical: 30
    }
});