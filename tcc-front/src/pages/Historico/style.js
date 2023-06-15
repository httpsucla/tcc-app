import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        paddingTop: 100
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
        textAlignVertical: 'center',
        marginTop: 20,
    },
    textFilter: {
        paddingHorizontal: 5,
        fontSize: 18,
        color: 'white',
    },
    button: {
        marginVertical: 10,
        height: 50,
        marginHorizontal: 20,
        backgroundColor: '#569099',
        borderRadius: 2,
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
    containerFiltro: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        paddingTop: 50
    },
    buttonFiltro: {
        marginVertical: 10,
        height: 50,
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
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 10
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
    },

    textWarning: {
        display: 'flex',
        margin: 20,
        fontStyle: 'italic',
    },

    SwitchStyle: {
        flexDirection: 'row',
        marginTop: 20,
        marginRight: 0
    },
    SwitchText: {
        flexDirection: 'row',
        marginTop: 15
    }

});