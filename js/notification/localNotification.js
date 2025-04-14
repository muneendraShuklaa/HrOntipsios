import PushNotification, {Importance} from 'react-native-push-notification';
// import PushNotification, {Importance} from 'react-native-push-notification';

class LocalNotificationService {
  configure = onOpenNotification => {
    PushNotification.createChannel(
      {
        channelId: 'firls chaennel', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.warn(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );

    PushNotification.configure({
      onRegister: function (token) {
        console.log('[LocalNotificationService] onRegister:', token);
      },
      // onNotification: function(notification) {
      //     console.log("[LocalNotificationService] onNotification:", notification);
      //     if (!notification?.data) {
      //         return
      //     }
      //     notification.userInteraction = true;
      //     onOpenNotification(notification);
      // },

      onNotification: function (notification) {
        // console.log('** NOTIFICATION: **', notification);

        if (Platform.OS === 'ios') {
          if (notification.alert.length !== 0) {
            //handleNotification(notification)
            // notification.finish(PushNotificationIOS.FetchResult.NoData);
          }
        } else {
          // handleNotification(notification)
        }
      },
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  };

  unregister = () => {
    PushNotification.unregister();
  };

  showNotification = (id, title, message, data = {}, options = {}) => {
    PushNotification.localNotification({
      /* Android Only Properties */
      ...this.buildAndroidNotification(id, title, message, data, options),
      title: title || '',
      message: message || '',
      playSound: options.playSound || false,
      soundName: options.soundName || 'default',
      userInteraction: false, // BOOLEAN : If notification was opened by the user from notification
      channelId: '32',
      badge: true,
    });
  };

  buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
    return {
      id: id,
      autoCancel: true,
      largeIcon: options.largeIcon || 'ic_launcher',
      smallIcon: options.smallIcon || 'ic_notification',
      bigText: message || '',
      subText: title || '',
      vibrate: options.vibrate || true,
      vibration: options.vibration || 300,
      priority: options.priority || 'high',
      importance: options.importance || 'high',
      data: data,
    };
  };

  cancelAllLocalNotifications = () => {
    PushNotification.cancelAllLocalNotifications();
  };

  removeDeliveredNotificationByID = notificationId => {
    // console.log(
    //   '[LocalNotificationService] removeDeliveredNotificationByID:',
    //   notificationId,
    // );
    PushNotification.cancelLocalNotifications({
      id: `${notificationId}`,
    });
  };

  // applicationBadge = () => {
  //     // PushNotification.setApplicationIconBadgeNumber(2);
  //     // const ShortcutBadger = NativeModules.ShortcutBadger;
  //     // let count = 1;
  //     // ShortcutBadger.applyCount(count);
  // }
}

export const localNotificationService = new LocalNotificationService();
