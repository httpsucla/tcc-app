import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        
    },
    title: {
        color: '#292929f3',
        fontSize: 20,
        marginTop: 5
    },
    filters: {
        flexDirection: 'row',
        margin: 25,
        marginBottom: 0,
        justifyContent: 'space-between'

    },
    lupa: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center'
    },
    days: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center'
    },
    fontFilter: {
        fontSize: 16,
        color:'black',
        
    },
    button: {
        margin: 25,
        marginTop: 10,
        marginBottom: 15,
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
    container1: {
        paddingTop: 100,
        paddingHorizontal: 30,
      },
    

    containerFiltro: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
    },
    titleFiltro: {
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
    inputCampo: {
        marginBottom: 10,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        fontSize: 16,
        alignItems: 'stretch'
    },
    textFiltro: {
        margin: 10,
        fontSize: 16,
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center'
    },
    calendario:{
        marginBottom: 25,
        paddingLeft: 4,
        fontSize: 16,
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center'
    },
    textRemove:{
        fontSize: 16,
        color:'black',
        fontStyle: 'italic'
    }
});