import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50
    },
    title: {
        color: '#292929f3',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },
    text: {
        color: '#292929f3',
        fontSize: 18
    },
    textItalic: {
        fontStyle: 'italic',
        color: '#808080',
        marginTop: 4
    },
    inputContainer: {
        flex: 1,
        marginTop: 50,
        width: '90%',
        padding: 20,
        alignItems: 'stretch',
        backgroundColor: 'rgba(255, 255, 255)',
    },
    button: {
        marginTop: 25,
        height: 50,
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
    input: {
        marginTop: 10,
        height: 60,
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch'
    },
    lista: {
        flex: 1,
        marginTop: 10,
        width: '100%',
        paddingTop: 25
    },
    campolista: {
        flexDirection: 'row',
        marginTop: 5,
        borderColor: '#414BB2',
        backgroundColor: '#f7f7f7',
        borderRadius: 2,
        flex: 1,
        marginBottom: 10,
        paddingHorizontal: 15,
        paddingVertical: 15,
        justifyContent: 'space-between',
        borderWidth: 1.5,
        elevation: 5,
     
    },
    campoconteudo: {
        justifyContent: 'center',
        fontSize: 18,
    },
    componentenumero: {
        flexDirection: 'column',
        paddingVertical: 10
    },
    campo: {
        flexDirection: 'row',
        marginTop: 5,
        borderColor: '#569099',
        borderBottomWidth: 1,
        marginBottom: 10,
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    campoContato: {
        marginTop: 5,
        borderColor: '#569099',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingBottom: 20
    },
    campoNome: {
        borderColor: '#414BB2',
        borderWidth: 1.5,
        color: '#414BB2',
        borderRadius: 10,
        width: 100,
        textAlign: "center",
        marginTop: 5
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