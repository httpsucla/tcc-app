import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    box: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    modalView: {
        bottom: 0,
        position: 'absolute',
        height: '50%',
        backgroundColor: '#fff',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingLeft: 25,
        paddingRight: 25
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: '100%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    buttonOpen: {
        backgroundColor: '#4CAF50',
    },
    buttonClose: {
        backgroundColor: "#414BB2",
    },
    buttonDelete: {
        backgroundColor: "#f72a2a",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalTitle: {
        marginVertical: 30,
        fontSize: 18
    },
    modalText: {
        marginVertical: 20,
        textAlign: "center"
    },
    indicator: {
        width: 50,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 5
    },
    closeModalButton: {
        marginTop: 30,
        marginRight: 30,
        display: 'flex',
        alignItems: 'flex-end'
    },
    dataVazio: {
        textAlign: 'center',
        borderWidth:1,
        borderRadius:10,
        borderColor:'gray',
        paddingHorizontal:20,
        paddingVertical:12
    }
})