import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 100
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
    marginVertical: 20,
  },
  modalContent: {
    fontSize: 16,
    textAlign: 'left',
    marginVertical: 5,
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
    alignItems: 'flex-start',
    marginHorizontal: 20,
  },
  flatlistItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 20,
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
  closeModalButton: {
    marginTop: 30,
    marginRight: 30,
    display: 'flex',
    alignItems: 'flex-end'
  },
  indicator: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 5
  }
});