import React from 'react';
import { StyleSheet, View, Button, StatusBar, Text } from 'react-native';
import { Notifications, Permissions, Constants } from 'expo';
import moment from 'moment';

export default class App extends React.Component {
  async componentDidMount() {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (Constants.isDevice && result.status === 'granted') {
      alert('Notification permissions granted.');
    }

    Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    alert(`Notification (${origin}) with data: ${JSON.stringify(data)}`);
  };

  _sendImmediateNotification() {
    const localNotification = {
      title: 'Então você é uma pessoa apressada...',
      body: 'Apressado come cru, meu consagrado. Melhore isso!',
      data: { type: 'immediate' },
    };

    console.log('Scheduling immediate notification:', { localNotification });

    Notifications.presentLocalNotificationAsync(localNotification)
      .then((id) => console.info(`Immediate notification scheduled (${id})`))
      .catch((err) => console.error(err));
  }
  _sendDelayedNotification() {
    /*const localNotification = {
      title: 'Teste com Delay',
      body: 'Notif imediata ',
      data: { type: 'immediate' },
    };

    console.log('Scheduling immediate notification:', { localNotification });

    Notifications.presentLocalNotificationAsync(localNotification)
      .then((id) => console.info(`Immediate notification scheduled (${id})`))
      .catch((err) => console.error(err));*/

    const localNotification1 = {
      title: 'Então você é uma pessoa calma...',
      body: 'A pressa é inimiga da perfeição. Continue assim!',
      data: { type: 'delayed' },
    };

    const schedulingOptions1 = {
      time: new Date().getTime() + 4000,
    };
    console.log('Scheduling delayed notification:', {
      localNotification1,
      schedulingOptions1,
    });
    Notifications.scheduleLocalNotificationAsync(
      localNotification1,
      schedulingOptions1
    )
      .then((id) =>
        console.info(
          `Delayed notification scheduled (${id}) at ${moment(
            schedulingOptions1.time
          ).format()}`
        )
      )
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <Text style={styles.txt}>QUE TIPO DE PESSOA VOCÊ É?</Text>
        <Button
          title="Calma"
          onPress={() => this._sendDelayedNotification()}
          color="#204969"
        />
        <Text>{'\n'}</Text>
        <Button
          title="Apressada"
          onPress={() =>this._sendImmediateNotification()}
          color="#204969"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08ffc8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontWeight: 'bold',
    fontFamily: 'sans-serif',    height: 50,
    fontSize: 20,
    color: '#204969',
  },
});
