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
        fontWeight: 'bold',
        marginTop: 20
    },
    text: {
        color: '#292929f3',
        fontSize: 18
    },
    textItalic: {
        fontStyle: 'italic',
        color: '#808080'
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
    lista: {
        flex: 1,
        marginTop: 10,
        width: '90%',
        padding: 20
    },
    campolista: {
        flexDirection: 'row',
        marginTop: 5,
        backgroundColor: '#fff',
        borderColor: '#292929f3',
        borderWidth: 2,
        borderRadius: 15,
        flex: 1,
        marginBottom: 10,
        paddingHorizontal: 15,
        paddingVertical: 15,
        justifyContent: 'space-between'
    },
    campoconteudo: {  
        justifyContent: 'center',
        fontSize: 18
    },
    componentenumero: {
        flexDirection: 'column',
        paddingVertical: 10
    },
    campo: {
        flexDirection: 'row',
        marginTop: 5,
        backgroundColor: '#fff',
        borderColor: '#f7f7f7',
        borderBottomWidth: 1,
        marginBottom: 10,
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    emptyList : {
        fontStyle: 'italic',
        color: '#292929f3',
        fontSize: 20,
        paddingHorizontal: 20,
        textAlign: 'center',
        marginVertical: 30
    }
});