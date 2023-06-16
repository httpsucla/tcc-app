import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50
    },
    gaveta: {
        flexDirection: 'column',
        padding: 15,
        
    },
    unidadeGaveta: {
        backgroundColor: 'rgb(255, 255, 255)',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 20,
        borderColor: '#569099',
        borderWidth: 3,
        elevation: 5,
        shadowOpacity: 0.4,
        shadowColor: '#000',
        shadowRadius: 4,
        shadowOffset: {
            width: 5,
            height: 5
        },
    },
    title: {
        color: '#292929f3',
        fontSize: 20,
        marginTop: 5
    },
    lista: {
        marginTop: '30%'
    },
    
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonLista: {
        marginBottom: 50,
        height: 60,
        backgroundColor: '#569099',
        borderRadius: 20,
        width: '50%',
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
});