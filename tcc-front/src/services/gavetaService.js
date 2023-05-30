import { IP_ARDUINO } from "./ipArduino";
import axios from "axios";

export default class GavetaService {

    static inserirRemedioArduino = async (nroGaveta, horario, intervalo, qtdeRemedios, dosagem) => {
        horario = horario.replace(/:/g, '%3A');
        if (String(horario).length < 4){
          horario = '0' + horario;
        }

        intervalo = intervalo*60*60;
        intervalo = String(intervalo).padStart(6, '0');

        console.log(horario)

        let request = 'http://' + IP_ARDUINO + '/setDataGaveta' + nroGaveta + '?params=' + horario + intervalo + qtdeRemedios + dosagem;
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
}
