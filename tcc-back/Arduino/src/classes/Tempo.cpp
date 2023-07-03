#include "Arduino.h"



class Tempo
{
private:
        long timeInSeconds;
        int dia;
        int mes;
        int ano;

public:
    //data 29062023
    Tempo(String hora,String data){
        String horas = hora.substring(0,2);
        String minutos = hora.substring(3,5);

        this->timeInSeconds = (horas.toInt() * 3600 ) + (minutos.toInt() * 60);

        dia = data.substring(0,2).toInt();
        mes = data.substring(2,4).toInt();
        ano =  data.substring(4,8).toInt();
    }
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

        if((h / 24) >= 1  ){
            h=0;
            addDia();
            timeInSeconds = m * 60 + s;

        }    
        hora +=  h < 10 ?  '0'+(String)h +':' : (String)h + ':'; 
        Serial.println(hora);
        
        hora += m < 10 ? '0'+(String)m : (String)m ;
        
        return hora;
    }

    String somar(long tempo){
        this->timeInSeconds = this->timeInSeconds + tempo;
        
        return convertString();
    }

    void addDia(){
        Serial.println("DATA ANTIGA: "+(String)dia+"/"+(String)mes+"/"+(String)ano);

        if((mes == 4) or  (mes == 6) or (mes == 9) or (mes == 11)){
            if(dia == 30){
                mes++;
                dia = 1;
            }else{
                dia++;
            }
        }else{
            if(mes == 2){
                if(dia == 28){
                    mes++;
                    dia=1;
                }else{
                    dia++;
                }
            }else{
                if(dia == 31){
                    if(mes == 12){
                        ano++;
                        mes=1;
                        dia=1;
                    }else{
                        mes++;
                        dia=1;
                    }
                }else{
                    dia++;
                }
            }
        }

          Serial.println("DATA NOVA: "+(String)dia+"/"+(String)mes+"/"+(String)ano);

    }

    String getData(){
        return  (dia < 10 ?  '0'+ (String)dia : (String)dia ) +"/"+   (mes < 10 ?  '0'+ (String)mes : (String)mes) +"/"+(String)ano;
    }
};
