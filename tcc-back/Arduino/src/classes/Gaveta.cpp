#include "Arduino.h"
#include "Tempo.cpp"
#include "Historico.cpp"
 
class Gaveta{



public : 
    boolean led_ativo = false;
    boolean gaveta_abriu = true;
    int led;

private :
    int id_remedio;
    int quantidade_dose;
    int quantidade_remedios;
    String proximo_horario;
    String intervalo;

public :
    int getIdRemedio(){
        return id_remedio;
    }

    void setIdRemedio(int param){
        this->id_remedio = param;
    }

    String getProximoHorario(){
        return this->proximo_horario;
    }

    void setProximoHorario(String horario){
        this->proximo_horario = horario;
    }


    int getQuantidadeRemedios(){
        return quantidade_remedios;
    }

    void setQuantidadeRemedios(int param){
        this->quantidade_remedios = param;
    }

    int getQuantidadeDose(){
        return this->quantidade_dose;
    }

    void setQuantidadeDose(int param){
        this->quantidade_dose = param;
    }
    
    String getIntervalo(){
        return this->intervalo;
    }

    void setIntervalo(String horario){
        this->intervalo = horario;
    }    

    void acendeLed(int state){
        digitalWrite(led, state);

    }

    void alert(){
        if(quantidade_remedios > 0){
            acendeLed(1);
            //calculaProximoHorario();
          //  printPadrao();
            this->gaveta_abriu = false;
        }
    }
    void abrirGaveta(String horario_abertura){
        acendeLed(0);
        calculaProximoHorario(horario_abertura);
        calculaRemedios();
        //printPadrao(); 
        this->gaveta_abriu = true;
    }
    boolean verificaAbertura(){
       return false;
    }
    Gaveta(){

    }

    Gaveta(int quantidade_remedios,int quantidade_dose, String proximo_horario, String intervalo, int led, int id_remedio){
        this->quantidade_remedios = quantidade_remedios;
        this->quantidade_dose = quantidade_dose;
        this->proximo_horario = proximo_horario;
        this->intervalo = intervalo;
        this->led = led;
        this->id_remedio=id_remedio;
    }

    String toString(){
        String resp = "{";
        resp += "\nId remedio: " + (String)this->id_remedio;
        resp += "\nQuantidade de remedio: " + (String)this->quantidade_remedios; 
        resp += ",\nDose: " + (String)this->quantidade_dose;
        resp += ",\nProximo horario: "+ this->proximo_horario;
        resp += ",\nIntervalo: "+ this->intervalo;
        resp += "\n}";
        return resp;
    }

private :
   
    void calculaProximoHorario(String horario_tomado){
        Tempo tempo = Tempo(horario_tomado);
        this->proximo_horario = tempo.somar(this->intervalo.toInt());
  //      this->gaveta_abriu = false;
    }

    void calculaRemedios(){
        this->quantidade_remedios = this->quantidade_remedios - quantidade_dose;
        if (this->quantidade_remedios < 0)
        {
            this->quantidade_remedios = 0;
        }      
    }

    void printPadrao(){
        Serial.println("Relatorio:");
        Serial.println(this->getQuantidadeRemedios());
        Serial.println("Proximo horario: " + this->getProximoHorario());
        Serial.println("----------------------------------------------");
    }

};