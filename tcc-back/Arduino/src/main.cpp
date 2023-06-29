// Libraries
#include <SPI.h>
#include <Ethernet.h>
#include <aREST.h>
#include <avr/wdt.h>
#include <DS1307.h>
#include <classes/Gaveta.cpp>

//Modulo RTC DS1307 ligado as portas A4 e A5 do Arduino 
DS1307 rtc(A4, A5);

//Enter a MAC address for your controller below.
byte mac[] = { 0x90, 0xA2, 0xDA, 0x0E, 0xFE, 0x40 };

// IP address in case DHCP fails
IPAddress ip(192,168,25,100);

// Ethernet server
EthernetServer server(80);

// Create aREST instance
aREST rest = aREST();

//gavetas
Gaveta gavetas[] = {Gaveta(0,0,"00:00","000120",4,0),Gaveta(0,0,"00:00","000120",5,0),Gaveta(0,0,"00:00","000120",6,0)};
String dataGaveta1 = "";
String dataGaveta2 = "";
String dataGaveta3 = "";
String historicoReturn = "";

//historico
Historico historico[] = {Historico("","",0,0),Historico("","",0,0),Historico("","",0,0),Historico("","",0,0),Historico("","",0,0),Historico("","",0,0),Historico("","",0,0),Historico("","",0,0),Historico("","",0,0),Historico("","",0,0)};
int contHistorico = 0;

 // Variables to be exposed to the API
String hora_arduino;


// Declare functions to be exposed to the API
int ledControl(String command);

int abrirGaveta(String gaveta);

int setGaveta1(String horario);

int setGaveta2(String horario);

int setGaveta3(String horario);

int setGaveta(String horario, int gaveta);

String historicoToString(); 

void setaAnalogVal();

int setDataGaveta1(String params);

int setDataGaveta2(String params);

int setDataGaveta3(String params);

int setDataGaveta(String params, int gaveta);

String getDataGaveta1(String params);

String getDataGaveta2(String params);

String getDataGaveta3(String params);

void callback(int led,int state);

int setTime(String hour);

void verificaEvento();

int cleanGaveta(String gaveta);

void verificaAberturaGaveta();

int digitalPin3 = 11; //pino sensor3

int analogPin3 = A2; //pino analogico3

int digitalPin2 = 9; //pino sensor2

int analogPin2 = A1; //pino analogico2

int digitalPin1 = 8; //pino sensor1

int analogPin1 = A0; //pino analogico1


int digitalVal;

int analogVal[3];

int controleSetupReserva = true;

const int buzzer = 12;

void setup(void)
{
  controleSetupReserva = false;
  pinMode(6, OUTPUT); //Led1
  pinMode(5, OUTPUT); //Led2
  pinMode(4, OUTPUT); //Led3
  pinMode(buzzer, OUTPUT);

  pinMode(digitalPin3, INPUT);  //Sensor magnetico
  pinMode(digitalPin2, INPUT);  //Sensor magnetico
  pinMode(digitalPin1, INPUT);  //Sensor magnetico
 
  // Start Serial
  Serial.begin(115200);

  // Init variables and expose them to REST API
  rest.variable("hora_arduino",&hora_arduino);
  rest.variable("Gaveta 1",&dataGaveta1);
  rest.variable("Gaveta 2",&dataGaveta2);
  rest.variable("Gaveta 3",&dataGaveta3);
  rest.variable("gethistorico",&historicoReturn,false);

  // Function to be exposed
  rest.function("led",ledControl);
  rest.function("time",setTime);
  rest.function("gaveta",abrirGaveta);
  rest.function("setGaveta1",setGaveta1); //alterar**, novo nome: setTimeGaveta1
  rest.function("setGaveta2",setGaveta2); //alterar**, novo nome: setTimeGaveta2
  rest.function("setGaveta3",setGaveta3); //alterar**, novo nome: setTimeGaveta3
  rest.function("setDataGaveta1",setDataGaveta1);
  rest.function("setDataGaveta2",setDataGaveta2);
  rest.function("setDataGaveta3",setDataGaveta3);
  rest.function("cleanData",cleanGaveta);

  // Give name & ID to the device (ID should be 6 characters long)
  rest.set_id("008");
  rest.set_name("tcc_tads");

  // Start the Ethernet connection and the server
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    // no point in carrying on, so do nothing forevermore:
    // try to congifure using IP address instead of DHCP:
    Ethernet.begin(mac, ip);
  }
  server.begin();
  Serial.print("server is at ");
  Serial.println(Ethernet.localIP());

  //setTime("");

  // Start watchdog
  wdt_enable(WDTO_4S);
}

void loop() {  
  // listen for incoming clients
 

  if(controleSetupReserva){
    Serial.println("reserva:"+controleSetupReserva);
    setup();
  }

  EthernetClient client = server.available();
  rest.handle(client);
  wdt_reset();
  hora_arduino = rtc.getTimeStr(FORMAT_SHORT);
  setaAnalogVal();
  // Serial.println("sensor 1: "+(String)analogVal[0]);
  // Serial.println("sensor 2: "+(String)analogVal[1]);
  // Serial.println("sensor 3: "+(String)analogVal[2]);
  
  dataGaveta1 = gavetas[0].toString();
  dataGaveta2 = gavetas[1].toString();
  dataGaveta3 = gavetas[2].toString();
  
  historicoReturn = historicoToString();
  
  verificaEvento();
  verificaAberturaGaveta();
  //verificaTempoMaximoLed();
  //Mostra as informações no Serial Monitor
  //Serial.print("Hora : ");
  //Serial.print(rtc.getTimeStr(FORMAT_SHORT));
  //Serial.print(" ");
  //Serial.print("Data : ");
  //Serial.print(rtc.getDateStr(FORMAT_SHORT));
  //Serial.print(" ");
  //Serial.println(rtc.getDOWStr(FORMAT_SHORT));
   
}

void disparaBuzzer(){
          tone(buzzer, 1000); // Send 1KHz sound signal...
          delay(1000);        // ...for 1 sec
          noTone(buzzer);     // Stop sound...
}

void setaAnalogVal(){
    analogVal[0] = digitalRead(digitalPin1);
    analogVal[1] = digitalRead(digitalPin2);
    analogVal[2] = digitalRead(digitalPin3);
}


void verificaAberturaGaveta(){
  for(int i=0; i<3; i++){

  if(!gavetas[i].gaveta_abriu){
  if(analogVal[i] == 1 ){
    //grava historico
    if(contHistorico<10){
      historico[contHistorico] =  Historico(gavetas[i].getProximoHorario(),hora_arduino,gavetas[i].getIdRemedio(),i);
      Serial.println("contador historico: "+(String)contHistorico);
    }else{
      contHistorico=0;
      historico[contHistorico] =  Historico(gavetas[i].getProximoHorario(),hora_arduino,gavetas[i].getIdRemedio(),i);
      Serial.println("contador historico: "+(String)contHistorico);
    }
    Serial.println(historicoToString());
    contHistorico++;
    
    gavetas[i].abrirGaveta(hora_arduino);
  }else{
    disparaBuzzer();
  }
  }
}
}

void verificaEvento(){
  String horaRemedio;
  for(int i=0;i<3;i++){
    horaRemedio = gavetas[i].getProximoHorario();
    if(horaRemedio == hora_arduino  && gavetas[i].getQuantidadeRemedios() > 0){
        gavetas[i].alert();      
    }
  }
}

String historicoToString(){
    
    String resp = "[";

    for(int i=0; i < 10; i++){
      //if(i != 0){
      //  resp += "\"Historico"+(String)i+"\":";
    //  }
  //  Serial.println(i);
//    Serial.println(historico[i].toString());

     resp += historico[i].toString();
      
      if(i != 9){
        resp += ",";
      }
    }
    resp += "]";
    return resp;  
}

int setGaveta1(String horario){
  setGaveta(horario,0);
}
int setGaveta2(String horario){
  setGaveta(horario,1);
}
int setGaveta3(String horario){
  setGaveta(horario,2);
}

//00:00
int setGaveta(String horario, int gaveta){
  String horas = horario.substring(0,2);
  String minutos = horario.substring(5,7);
  Serial.println(horario);
  horario= horas + ":" + minutos;
  Serial.println(horario);
  Tempo tempo = Tempo(horario);
  Serial.println("tempo convertido:" + tempo.convertString());

  gavetas[gaveta].setProximoHorario(horario); 

  return 0;
}
//recebe o numero da gaveta ou recebe -1 para limnpar tudo
int cleanGaveta(String gaveta){
    int index = gaveta.toInt();
    
    if(index > 0 ){
      gavetas[index -1] = Gaveta();
      return 0;
    }else{
      int nGavetas = sizeof(gavetas)/sizeof(gavetas[0]);
      for(int i = 0; i < nGavetas; i++ ){
        gavetas[i] = Gaveta(); 
      }
      return 0;
    }

    return -1;
}

int setDataGaveta1(String params){
  setDataGaveta(params,0);
}
int setDataGaveta2(String params){
  setDataGaveta(params,1);
}
int setDataGaveta3(String params){
  setDataGaveta(params,2);
}
//       01456 789123 45 67
//params=00:00,000060,30,02
int setDataGaveta(String params, int gaveta){
  String horario = params.substring(0,2) + ':' + params.substring(5,7);
  String intervalo = params.substring(7,13); 
  String remedios = params.substring(13,15);
  String dose = params.substring(15,17);
  String id = params.substring(17,19);
   Serial.println("horario: "+horario);
   Serial.println("intervalo: "+intervalo);
   Serial.println("remedios: "+remedios);
   Serial.println("dose: "+dose);
 
  gavetas[gaveta].setProximoHorario(horario); 
  gavetas[gaveta].setIntervalo(intervalo);
  gavetas[gaveta].setQuantidadeRemedios(remedios.toInt());
  gavetas[gaveta].setQuantidadeDose(dose.toInt());
  gavetas[gaveta].setIdRemedio(id.toInt());
  return 0;
}

String getDataGaveta1(String params){
  return gavetas[0].toString();
}

String getDataGaveta2(String params){
  return gavetas[1].toString();
}
String getDataGaveta3(String params){
  return gavetas[2].toString();
}


int abrirGaveta(String gaveta){
 // gavetas[gaveta.toInt()].abrirGaveta();
  return 0;
}

void callback(int led,int state)
{
digitalWrite(led, state);

}

// Custom function accessible by the API
int ledControl(String command) {

  // Get state from command
  int state = command.toInt();
  digitalWrite(6,state);
  digitalWrite(5,state);
  digitalWrite(4,state);
  return 1;

}

//21:27:00-28/04/2023 = 21270028042023
int setTime(String datetime){
   //Aciona o relogio
  //rtc.halt(false);
  datetime = "21270024062023";
   int horas ;
   int minutos;
   int segundos;

  if(datetime.length() > 6 ){
   horas = datetime.substring(0,2).toInt();
   minutos = datetime.substring(2,4).toInt();
   segundos = datetime.substring(4,6).toInt();
  }
  //As linhas abaixo setam a data e hora do modulo
  //e podem ser comentada apos a primeira utilizacao
  rtc.setDOW(FRIDAY);      //Define o dia da semana
  rtc.setTime(16, 45, 00);     //Define o horario
  rtc.setDate(24, 06, 2023);   //Define o dia, mes e ano
   
  //Definicoes do pino SQW/Out
  //rtc.setSQWRate(SQW_RATE_1);
  //rtc.enableSQW(true);
   
  //Serial.begin(115200);

  return 0;    
}

