#include "Arduino.h"


class Tempo
{
private:
        long timeInSeconds;

public:
//exemplo de entrada 16:20
    Tempo(String hora){
        String horas = hora.substring(0,2);
        String minutos = hora.substring(3,5);

        this->timeInSeconds = (horas.toInt() * 3600 ) + (minutos.toInt() * 60);
      
    }
    Tempo(int hora){
        this->timeInSeconds = hora;
    }
    String convertString(){
        // 006700
        String hora ;
        
        
        int h = timeInSeconds / 3600;
        int m =  (timeInSeconds % 3600) / 60;
        int s =  (timeInSeconds % 3600) % 60;

        hora +=  h < 10 ?  '0'+(String)h +':' : (String)h + ':'; 
        Serial.println(hora);
        
        hora += m < 10 ? '0'+(String)m : (String)m ;
        
        return hora;
    }

    String somar(long tempo){
        this->timeInSeconds = this->timeInSeconds + tempo;
        return convertString();
    }
};
