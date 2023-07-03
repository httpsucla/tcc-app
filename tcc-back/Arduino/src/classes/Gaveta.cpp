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
    String dia_proximo_horario;
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

    String getDiaProximoHorario(){
        return this->dia_proximo_horario;
    }

    void setDiaProximoHorario(String dia){
        this->dia_proximo_horario = dia;
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
    void abrirGaveta(String horario_abertura,String data_abertura){
        acendeLed(0);
        calculaProximoHorario(horario_abertura,data_abertura);
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
        resp += "\n\"Id_remedio\": \"" + (String)this->id_remedio;
        resp += "\",\n\"Atrasado\": \"" + (String)this->gaveta_abriu;
        resp += "\",\n\"Quantidade_de_remedio\": \"" + (String)this->quantidade_remedios; 
        resp += "\",\n\"Dose\": \"" + (String)this->quantidade_dose;
        resp += "\",\n\"Proximo_horario\": \""+ this->proximo_horario +" "+this->dia_proximo_horario;
        resp += "\",\n\"Intervalo\": \""+ this->intervalo;
        resp += "\"\n}";
        return resp;
    }

private :
   
    void calculaProximoHorario(String horario_tomado, String data_tomado){
        String data_formatada = data_tomado.substring(0,2);
        data_formatada += data_tomado.substring(3,5);
        data_formatada += data_tomado.substring(6,10);
        Serial.print("data formatada: "+data_formatada);
        Tempo tempo = Tempo(horario_tomado,data_formatada);
        this->proximo_horario = tempo.somar(this->intervalo.toInt());
        this->dia_proximo_horario = tempo.getData();
        // if(tempo.virouDia() == true){
        //  this->dia_proximo_horario = this.addDia();//   
        // }
  //      this->gaveta_abriu = false;
    }

    String getDateTime(){
        return this->proximo_horario + " " + this->dia_proximo_horario;
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