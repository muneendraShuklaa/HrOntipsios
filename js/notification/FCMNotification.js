import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {localNotificationService} from '../notification/localNotification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


class FCMService {
  register = (onRegister, onNotification, onOpenNotification) => {
    // console.log(onNotification,'register fun--');
    
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      // await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
      const apnsToken = await messaging().getAPNSToken();
      // console.log(apnsToken,'apnsToken==');
      
    }
  };

  checkPermission = onRegister => {
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          // User has permission
          this.getToken(onRegister);
        } else {
          // User don't have permission
          this.requestPermission(onRegister);
        }
      })
      .catch(error => {
        console.log('[FCMService] Permission Rejected', error);
      });
  };

  getToken = onRegister => {
    messaging()
      .getToken()

      .then(async fcmToken => {
        console.log('fcmtakennnnn======>', fcmToken);
        // alert(fcmToken);
        await AsyncStorage.setItem('NotiToken', fcmToken);

        if (fcmToken) {
          if (typeof onRegister === 'function') {
            onRegister(fcmToken);
          }
          // onRegister(fcmToken);
        } else {
          console.log('[FCMService] User does not have a devices token');
        }
      })
      .catch(error => {
        console.log('[FCMService] getToken Rejected', error);
      });
  };

  requestPermission = onRegister => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch(error => {
        console.log('[FCMService] Request Permission Rejected', error);
      });
  };

  deleteToken = () => {
    console.log('[FCMService] Delete Token');
    messaging()
      .deleteToken()
      .catch(error => {
        console.log('[FCMService] Delete Token Error', error);
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    // console.log('create notifi listneers wrign====');
    
    // When Application Running on Background
    messaging().onNotificationOpenedApp(remoteMessage => {
      // console.log(
      //   '[FCMService] OnNotificationOpenedApp getInitialNotification',
      //   remoteMessage,
      // );
  
      if (remoteMessage) {
        const notification = remoteMessage;
        onOpenNotification(notification);

      }
    });

    //When Application open from quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(
          '[FCMService] getInitialNotification getInitialNotification',
          remoteMessage,
        );
        if (remoteMessage) {
          const notification = remoteMessage;
          localNotificationService.cancelAllLocalNotifications();
          onOpenNotification(notification);
        }
      });

    //Forground state message
    this.messageListener = messaging().onMessage(async remoteMessage => {
      // console.log('[FCMService] A new FCm message arrived', remoteMessage);
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = remoteMessage;
        } else {
          notification = remoteMessage;
        }
        // console.log(typeof onNotification,'typeof onnot--');
        if (typeof onNotification === 'function') {
          // console.log(notification,'nti--');
          
          onNotification(notification);
        }
      }
    });

    // Triggered when have new Token
    messaging().onTokenRefresh(fcmToken => {
      console.log('[FCMService] New token refresh', fcmToken);
      if (typeof onRegister =='function') {
        onRegister(fcmToken);
      }
    });
  };

  unRegister = () => {
    this.messageListener();
  };

  stopAlarmRing = async () => {
    if (Platform.OS != 'ios') {
      await messaging().stopAlarmRing();
      // console.log('sdfghjkldfgh', 'stopAlarmRing');
    }
  };
}
export const fcmService = new FCMService();
