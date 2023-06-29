#include "Arduino.h"

class Historico
{
private :
    String hora_remedio;
    String hora_tomado;
    int id_remedio;
    int id_gaveta;

    
public :
    Historico(){

    }
    Historico(String hora_remedio, String hora_tomado, int id_remedio,int id_gaveta){
        this->hora_remedio = hora_remedio;
        this->hora_tomado = hora_tomado;
        this->id_remedio = id_remedio;
        this->id_gaveta = id_gaveta;
    }

    void setHoraRemedio(String horario){
        this->hora_remedio = horario;
    }
    String getHoraRemedio(){
        return this->hora_remedio;
    }
    void setHoraTomado(String horario){
        this->hora_tomado = horario;
    }
    String getHoraTomado(){
        return this->hora_tomado;
    }
    void setIdRemedio(int param){
        this->id_remedio = param;
    }
    int getIdRemedio(){
        return this->id_remedio;
    }
    void setIdGaveta(int param){
        this->id_gaveta = param;
    }
    int getIdGaveta(){
        return this->id_gaveta;
    }

    String toString(){
        String resp = "\n{";
        resp += "\n\"dataPrevista\": \"" + (String)this->hora_remedio; 
        resp += "\",\n\"dataAbertura\": \"" + (String)this->hora_tomado;
        resp += "\",\n\"idRemedio\": \"" + (String)this->id_remedio;
        resp += "\",\n\"idGaveta\": \"" + (String)this->id_gaveta;
        resp += "\"\n}";
        return resp;
    }
};