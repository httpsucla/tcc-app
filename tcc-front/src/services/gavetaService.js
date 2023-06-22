import { IP_ARDUINO } from "./ipArduino";
import axios from "axios";
import { Share } from 'react-native';
import { Linking } from "react-native";
import { Alert } from 'react-native';


export default class GavetaService {

    static inserirRemedioArduino = async (nroGaveta, horario, intervalo, qtdeRemedios, dosagem, idRemedio) => {
        horario = horario.replace(/:/g, '%3A');
        if (String(horario).length < 4){
          horario = '0' + horario;
        }
        if (String(dosagem).length < 2){
          dosagem = '0' + dosagem
        }
        if (String(idRemedio).length < 2){
          idRemedio = '0' + idRemedio
        }

        intervalo = intervalo*60*60;
        intervalo = String(intervalo).padStart(6, '0');

        console.log(horario)

        let request = 'http://' + IP_ARDUINO + '/setDataGaveta' + nroGaveta + '?params=' + horario + intervalo + qtdeRemedios + dosagem + idRemedio;
        console.log(request)
        axios.get(request)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    };

   static retirarRemedioArduino = async (nroGaveta) => {
        axios.get('http://' + IP_ARDUINO + '/?clean=' + nroGaveta + 1)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    };
    
    static shareToWhatsApp = async (number, message) => {
      const text = `${message}`;
      const url =
      'whatsapp://send?text=' + 
       text +
      '&phone=' + number;
  
      try {
        await Linking.openURL(url);
      } catch (error) {
        Alert.alert(
          'Erro ao compartilhar relatório',
          'Não foi possivel enviar relatório no Whatsapp, verifique se o aplicativo está instalado ou se o contato está cadastrado!',
          [
          {text: 'OK'},
          ], 
          { cancelable: false }
          )
        console.log('Erro ao compartilhar no WhatsApp:', error);
      }
    };
}
