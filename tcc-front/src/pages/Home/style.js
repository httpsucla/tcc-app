import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        paddingTop: 50
    },
    title: {
        color: '#292929f3',
        fontSize: 20,
        marginTop: 5
    },
    boxHour: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        width: '85%',
        height: 65,
        textAlign: 'center',
        borderRadius: 25,
        flex: 1,
        marginVertical: 50,
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
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
        fontSize: 32,
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
    }
}); 