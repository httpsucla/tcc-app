import { IP_ARDUINO } from "./ipArduino";
import axios from "axios";

export default class GavetaService {

    static inserirRemedioArduino = async (nroGaveta, horario, qtdeRemedios, dosagem) => {
        horario = horario.replace(/:/g, '%3A');
        console.log('utilizou a service')
        let request = 'http://' + IP_ARDUINO + '/setDataGaveta' + nroGaveta + '?params=' + horario + '000120' + qtdeRemedios + dosagem;
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
}
