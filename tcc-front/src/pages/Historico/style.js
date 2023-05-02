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
        marginHorizontal: 25,
        marginVertical: 20,
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
        flexDirection: 'row',
        alignItems: 'center',
        textAlignVertical: 'center'
    },
    textFilter: {
        paddingHorizontal: 5,
        fontSize: 18,
        color: '#292929f3',
    },
    button: {
        marginVertical: 10,
        marginHorizontal: 25,
        height: 50,
        backgroundColor: '#414BB2',
        borderRadius: 2,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowOpacity: 20,
        shadowColor: '#ccc'
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
    calendario: {
        marginBottom: 25,
        paddingLeft: 4,
        fontSize: 16,
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
    },
    textRemove: {
        paddingHorizontal: 5,
        fontSize: 18,
        color: '#292929f3',
        fontStyle: 'italic'
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