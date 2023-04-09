import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
    },
    title: {
        color: '#292929f3',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },
    inputContainer: {
        flex: 1,
        marginTop: 30,
        width: '90%',
        padding: 20,
        alignItems: 'stretch',
        backgroundColor: '#fff'
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
    button: {
        marginTop: 20,
        height: 60,
        backgroundColor: '#414BB2',
        borderRadius: 5,
        paddingHorizontal: 100,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowOpacity: 20,
        shadowColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonLista: {
        marginTop: 20,
        height: 60,
        backgroundColor: '#414BB2',
        borderRadius: 2,
        paddingHorizontal: 115,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowOpacity: 20,
        shadowColor: '#ccc',
    },
    calendario: {
        height: 50,
        color: '#4CAF50'
    },
    lista: {
        flex: 1,
        marginTop: 20,
        width: '90%',
        padding: 20
    },
    campolista: {
        flexDirection: 'row',
        marginVertical: 1,
        paddingHorizontal: 15,
        height: 75,
        backgroundColor: '#fff',
        borderRadius: 2,
        flex: 1,
        justifyContent: 'space-between'
    },
    campoconteudo: {
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    campoicone: {
        justifyContent: 'center',
        flexDirection: 'row'
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