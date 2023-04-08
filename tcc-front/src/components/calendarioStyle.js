import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        padding: 20,
        width: '90%',
        borderWidth: 2,
        borderColor: '#000',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalCloseButton: {
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    eventContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    eventImage: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
    eventTitle: {
      fontSize: 18,
      textAlign: 'left',
      marginVertical: 10,
      marginTop: 20,
      fontWeight: 'bold'
    },
    flatlistContentContainer: {
        alignItems: 'center',
      },
      flatlistItemText: {
        fontSize: 16,
        textAlign: 'left',
        marginVertical: 5,
      },
  });