import { IP_ARDUINO } from "./ipArduino";
import axios from "axios";

export default class HistoricoService {

    static requestDataHora(callback){
        let request = 'http://' + IP_ARDUINO + '/gethistorico';
        console.log(request)

        axios.get(request)
        .then(response => {
          console.log('abaixo, resposta dentro do request')
          console.log(response.data);
          const arrayResponse = response.data;
          callback(arrayResponse);
        })
        .catch(error => {
          console.error(error);
        });
    };
}
