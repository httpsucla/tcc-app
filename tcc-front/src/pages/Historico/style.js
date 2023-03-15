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
        
    },
    button: {
        margin: 25,
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
});