# Smartcabinet
## Projeto que conecta um aplicativo a um IoT utilizando Arduino, para criar um armário inteligente que auxilia seus usuários a administrar os horários de ingestão de medicamentos.

### Comandos para o aplicativo
***Ter previamente o aplicativo Expo go instalado em seu dispositivo ou emulador utilizado***

`git clone https://github.com/httpsucla/tcc-app.git`

`npm install`

`npm install -g expo cli`

`npm start` ou `npx expo start`

### Integração entre o aplicativo e o Arduino
- Todos os dispositivos devem estar conectados na mesma rede local;
- Inserir na rota tcc-app/tcc-front/src/services/ipArduino.js o IP fornecido pelo Arduino.
### Configurar armario/arduino
- Adicionar a extensão PlataformIO no Visual Studio Code
- Buildar codigo e enviar para o arduino, verificar as portas "COM"
- Abrir o Serial monitor e verificar o ip atribuido ao armario.
- Configurar hora com a URL responsavel definida na documentaçao. 
