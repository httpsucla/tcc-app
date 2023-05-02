import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
    },
    title: {
        color: '#292929f3',
        fontSize: 20,
        marginTop: 5
    },
    boxHour: {
        backgroundColor: '#292929f3',
        width: '80%',
        height: 55,
        textAlign: 'center',
        borderRadius: 25,
        flex: 1,
        marginVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5
    },
    boxHourText: {
        color: 'white',
        fontSize: 20,
        
    },
    boxesMedicamento: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between'
    },
    box: {
        height: 100,
        
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginBottom: 20,
        paddingHorizontal: 12,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5
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
        fontSize: 32
    },
    diasContent: {
        fontSize: 18,
        marginTop: 8
    },
    descricao: {
        justifyContent: 'flex-end',
        color: '#808080',
        display: 'flex',
        alignItems: 'flex-end'
    }
}); 