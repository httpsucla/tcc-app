import { StyleSheet } from 'react-native';

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
        marginTop: 5
    },
    boxHour: {
        backgroundColor: 'rgb(255, 255, 255)',
        width: '85%',
        height: 65,
        textAlign: 'center',
        borderRadius: 25,
        borderColor: '#569099',
        borderWidth: 3,
        flex: 1,
        marginVertical: 20,
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
    boxHourText: {
        //  color: '#414BB2'
        color: '#000',
        
        fontSize: 20,
        fontWeight: 600
    },
    boxesMedicamento: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between'

    },
    box: {
        height: 100,
        backgroundColor: 'rgb(255, 255, 255)',
        marginHorizontal: 10,
        borderRadius: 20,
        marginBottom: 20,
        paddingHorizontal: 12,
        paddingVertical: 10,
        elevation: 5,
        shadowOpacity: 0.4,
        shadowColor: '#000',
        shadowRadius: 4,
        shadowOffset: {
            width: 5,
            height: 5
        },
    },
    boxGrafico: {
        height: 250,
        width: 320
    },
    boxData: {
        height: 100,
        width: 150
    },
    boxNome: {
        height: 100,
        width: 320
    },
    boxContent: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 2,
        alignItems: 'center'
    },
    valorContent: {
        fontSize: 30,
        //  color: '#414BB2'
        color: '#000'
    },
    diasContent: {
        fontSize: 18,
        marginTop: 8,
        //  color: '#414BB2'
        color: '#000'
    },
    descricao: {
        justifyContent: 'flex-end',
        color: 'black',
        display: 'flex',
        alignItems: 'flex-end'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonLista: {
        marginBottom: 50,
        height: 60,
        backgroundColor: '#569099',
        borderRadius: 20,
        width: '95%',
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