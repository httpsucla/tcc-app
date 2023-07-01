import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Text, View, FlatList, RefreshControl, Button, LogBox, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styles from './style'
import Box from './components/Box'
import Database from '../../services/database'
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import GavetaService from '../../services/gavetaService'
import moment from 'moment'
LogBox.ignoreAllLogs(); // Ignore log notification by message



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Gavetas({ navigation }) {
  const [gavetas, setGavetas] = useState([])
  const [refreshing, setRefresh] = useState(false)
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [gavetaAtrasada, setGavetaAtrasada] = useState(false);
  const [gavetaZerada, setGavetaZerada] = useState(false);
  const [gavetasAtt, setGavetasAtt] = useState([]);

  useEffect(() => {
    carregarGavetas();

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

  }, [])

  useEffect(() => {
    isGavetaAtrasada();
  },  [gavetaAtrasada]);


  useEffect(() => {
    const interval = setInterval(() => {
      setGavetaAtrasada((gavetaAtrasada) => !gavetaAtrasada);
    }, 50000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const isMedicamentoZerado = () => {
    for (let i = 1; i<4; i++){
      GavetaService.isMedicamentoZerado(i, response => {
        let nroGaveta = "Gaveta" + i
          if ((response[nroGaveta].Quantidade_de_remedio !== null && response[nroGaveta].Quantidade_de_remedio !== undefined)){
            if (response[nroGaveta].Quantidade_de_remedio === "0"){
              const dadosGaveta = {
                id_medicamento: '',
                datahora_abertura: '',
                is_ocupado: false,
                is_atrasado: '',
                id: i
              }

              Database.updateGaveta(dadosGaveta, () => {
                GavetaService.retirarRemedioArduino(dadosGaveta.id)        
              })
            }
          }
      })
    }

  }

  const isGavetaAtrasada = () => {
    getGavetasAtt();
    console.log(gavetasAtt[0])
    console.log(gavetasAtt[1])
    console.log(gavetasAtt[2])
    console.log(gavetasAtt[3])
    if (gavetasAtt.length > 1){
      for (let i = 1; i<4; i++){
        GavetaService.isGavetaAtrasada(i, response => {
          if (gavetasAtt[i].is_ocupado == 1){
            let nroGaveta = "Gaveta" + i
            let dataAtual = new Date();
            dataAtual.setMinutes(dataAtual.getMinutes() + 1);
            let proximoHorario = response[nroGaveta].Proximo_horario;
              if (proximoHorario !== null 
                && proximoHorario !== undefined 
                && moment(proximoHorario , 'HH:mm DD/MM/YYYY', true).format("HH:mm DD/MM/YYYY") === proximoHorario )
                {
                if (moment(proximoHorario, 'HH:mm DD/MM/YYYY') < moment(dataHoraAtual, 'HH:mm DD/MM/YYYY')){
                  sendNotification();
                }
              }
            }
        })
      }
    }
  }

  const getGavetasAtt = () => {
    Database.getGavetas2((response) => {
        setGavetasAtt(response);
      });
  }

  const carregarGavetas = useCallback(() => {
    setRefresh(true)
    Database.addGavetaTeste()
    Database.leftJoinGavetaMedicamento(gavetas => {
      setGavetas(gavetas)
      console.log(gavetas)
      setRefresh(false)
    })
  }, [])

  const forceRefresh = () => {
    carregarGavetas();
    isMedicamentoZerado();
  }

  const sendNotification = async () => {
    console.log('mudou status, entrou no send!')
    await schedulePushNotification();
  }

  return (
    <LinearGradient
      start={{ x: 1, y: 1 }}
      end={{ x: 1, y: 0 }}
      locations={[0, 1]}
      colors={['#ffffff', '#569099']}
      style={styles.container}
    >
      {gavetas.length > 0 ? (
        <FlatList
          style={styles.lista}
          data={gavetas}
          numColumns={2}
          keyExtractor={(item, index) => 'Index do item' + index}
          renderItem={({ item }) => (
            <View style={styles.gaveta}>
              <View style={styles.unidadeGaveta}>
                <Text style={styles.title}>
                  {item.id_medicamento === ''
                    ? `Gaveta ${item.id + 1}`
                    : item.nome}
                </Text>
                <Box
                  todasGavetas={gavetas}
                  gavetasExistentes={item}
                  navigation={navigation}
                  medicamentoSelecionadoLista={item.id_medicamento}
                />
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={forceRefresh} />
          }
        />
      ) : null
      }
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </LinearGradient>
  )
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Você ainda não abriu a gaveta",
      body: 'Certifique-se de tomar o remédios',
    },
    trigger: { seconds: 2
     },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
