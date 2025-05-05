

import * as React from 'react';
import {
  View,
  Text,
  Image,
  useColorScheme,
  PermissionsAndroid,
  LogBox,
  ToastAndroid
} from 'react-native';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Login } from './js/Screens/Auth/login';
import { Dashboard } from './js/Screens/Home/Dashboard';
import { DailyLogs } from './js/Screens/Home/dailyLog';
import { Forgot } from './js/Screens/Auth/forgot';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HrOnTips } from './js/Screens/Home/hrontips';
import { DSR } from './js/Screens/Home/dsr';
import { RequestLeave } from './js/Screens/Home/requestLeave';
import { LeaveBalance } from './js/Screens/Home/leavebalence';
import { leaveStatus } from './js/Screens/Home/leavestatus';
import { Goal } from './js/Screens/Home/goals';
import { ApproveLeaves } from './js/Screens/Home/approveLeave';
import { Done } from './js/Screens/Home/done';
import { WEJoin } from './js/Screens/Home/welcomeEjoin';
import { EJoin } from './js/Screens/Home/eJoin';
import { DsrDetail } from './js/Screens/Home/dsrDetail';
import { DailylogDetail } from './js/Screens/Home/dailylogDetail';
import { Welcome } from './js/Screens/Auth/welcome';
import { NewTask } from './js/Screens/Home/newTask';
import { MyTask } from './js/Screens/Home/myTask';
import { AddDSR } from './js/Screens/Home/addDsr';
import { Profile } from './js/Screens/Home/profile';
import { Notification } from './js/Screens/Home/notification';
import { Commenting } from './js/Screens/Home/Comment';
import { Reminder } from './js/Screens/Home/reminder';
import { Announcement } from './js/Screens/Home/announcement';
// const Stack = createNativeStackNavigator();
import utils from './js/Utils';
import { vh, vw, normalize } from './js/Utils/dimentions';
import { Team } from './js/Screens/Home/team';
import { ImageView } from './js/Screens/Home/imageView';

// const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
import { EditDSR } from './js/Screens/Home/editDsr';
import { createStackNavigator } from '@react-navigation/stack';
import { fcmService } from './js/notification/FCMNotification';
import { localNotificationService } from './js/notification/localNotification';
import NetInfo from "@react-native-community/netinfo"
import AddRimbursement from'./js/Screens/Home/addReimbursement/addReimbursement.js';
// console.warn =()=>{}
// console.error =()=>{}

  ErrorUtils.setGlobalHandler((error, isFatal) => {
    // Send error to your server or logging service
    console.log(error, isFatal);
  });

if (__DEV__) {
  require("./ReactotronConfig.js");
}

LogBox.ignoreLogs([
  'new NativeEventEmitter()',
  "EventEmitter.removeListener",
]);
// AppRegistry.registerHeadlessTask('myapp',()=>{console.log("testing 123")})
// AppRegistry.run
// const firebaseConfig={
//   apiKey:'AIzaSyDuWI0CpY9QUHq9gCZ46wpOgr-HkLb4twY',
//   authDomain:'hrontips-cda03.firebaseapp.com',
//   projectId:'hrontips-cda03',
//   storageBucket:'hrontips-cda03.firebasestorage.app',
//   messagingSenderId:'758960097793',
//   appId:'1:758960097793:ios:1818affe310dc97bcb0e00'
// }

const firebaseConfig = {
  apiKey:'AIzaSyDuWI0CpY9QUHq9gCZ46wpOgr-HkLb4twY',
  projectId:'hrontips-cda03',
  storageBucket:'hrontips-cda03.firebasestorage.app',
  messagingSenderId:'758960097793',
  authDomain:'hrontips-cda03.firebaseapp.com',
  ...(Platform.OS === 'ios'
    ? {
       appId:'1:758960097793:ios:1818affe310dc97bcb0e00'
      }
    : {
        appId: '1:758960097793:android:11cbd9a8f2c16beccb0e00',
      }),
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


const onRegister = async token => {
  console.log('s Token=======>', token);
};

const onNotification = notify => {
  console.log('[App] local onNotification', notify);
  const options = {
    soundName: 'default',
    playSound: true,
    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
    smallIcon: 'ic_launcher', // (optional) default:  "ic_notification" with fallback for "ic_launcher"
  };

  localNotificationService.showNotification(
    0,
    notify.notification.title,
    notify.notification.body,
    notify,
    options,
  );
};




const onOpenNotification = async notify => {
  // console.log('************ Is notify----->', notify);
  if (notify) {
    NavigationContainer.navigate('Home', notify.data);
  } else if (notify && notify.data && notify.data.page == 'today') {
    navigate('Today', notify.data);
  }
};
fcmService.registerAppWithFCM();
fcmService.register(onRegister, onNotification, onOpenNotification);
localNotificationService.configure(onOpenNotification);
import OneSignal from 'react-native-onesignal';

import RegularizationApproval from './js/Screens/Home/regularizationApproval/regularizationApproval.js';
import RegularizationStatus from './js/Screens/Home/regularizationStatus/regularizationStatus.js';
import ManageAttendance from './js/Screens/Home/manageAttendance/manageAttendance.js';
import styles from './js/Components/Header/styles.js';
import useNetworkStatus from './js/Utils/useNetworkStatus.js';
import { AttendanceReport } from './js/Screens/Home/attendanceReport/attendanceReport.js';
import ViewReimbursement from './js/Screens/Home/reimbursement/viewReimbursement.js';
import { navigationRef } from './js/Components/Common/NavigationService.js';
import { firebase } from '@react-native-firebase/messaging';
import axios from 'axios';
import Endpoint from './js/Utils/Endpoint.js';
// OneSignal.init("f7924110-6e36-4b81-a8d0-83eac5d15f63");
OneSignal.setNotificationWillShowInForegroundHandler(
  notificationReceivedEvent => {
    // console.log(
    //   'OneSignal: notification will show in foreground:',
    //   notificationReceivedEvent,
    // );
    let notification = notificationReceivedEvent.getNotification();
    // console.log('notification: ', notification);
    const data = notification.additionalData;
    // console.log('additionalData: ', data);
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification);
  },
);

// // //Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  // console.log('OneSignal: notification opened:', notification);
});
// PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

const BottomTabBarr = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <BottomTabs.Navigator
      initialRouteName="HrOnTipsRequestLeave"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: vh(75),
          backgroundColor: isDarkMode ? '#000' : '#fff',
          // backgroundColor: 'black',
        },
      }}>
      <BottomTabs.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                position: 'absolute',
                top: 0,

                paddingHorizontal: vw(5),
              }}>

              <Image
                source={utils.icons.noti}
                style={{
                  height: vh(30),
                  width: vh(30),
                  alignSelf: 'center',
                  marginTop: vh(10),
                  tintColor: focused ? '#3083ef' : '#525252',
                }}
              />

              <Text
                style={{
                  color: focused ? '#3083ef' : '#525252',
                  fontWeight: focused ? 'bold' : '300',
                  fontSize: normalize(14),
                  margin: normalize(-2),
                  width: 150,
                  textAlign: 'center',
                }}>
                Notification
              </Text>
            </View>
          ),
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <BottomTabs.Screen
        name="HrOnTipsRequestLeave"
        component={HrOnTips}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                position: 'absolute',
                top: 0,
                paddingHorizontal: vw(5),
              }}>
              {focused ? (
                <Image
                  source={utils.icons.Plus}
                  style={{
                    height: vh(80),
                    width: vh(80),
                    alignSelf: 'center',
                    marginTop: vh(-20),
                    borderColor: 'red',
                  }}
                />
              ) : (
                <Image
                  source={utils.icons.PhusHide}
                  style={{
                    height: vh(80),
                    width: vh(80),
                    alignSelf: 'center',
                    marginTop: vh(-20),
                    borderColor: 'red',
                  }}
                />
              )}

            </View>
          ),
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                position: 'absolute',
                top: 0,
                paddingHorizontal: vw(5),
              }}>
              <Image
                source={utils.icons.Profile}
                style={{
                  height: vh(30),
                  width: vh(30),
                  alignSelf: 'center',
                  marginTop: vh(10),
                  tintColor: focused ? '#3083ef' : '#525252',
                }}
              />

              <Text
                style={{
                  color: focused ? '#3083ef' : '#525252',
                  fontWeight: focused ? 'bold' : '300',
                  fontSize: normalize(14),
                  margin: normalize(-2),
                  width: 110,
                  textAlign: 'center',
                }}>
                Profile
              </Text>
            </View>
          ),
          tabBarLabel: () => {
            return null;
          },
        }}
      />
    </BottomTabs.Navigator>
  );
};

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Forgot"
        component={Forgot}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function EjoinStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WEJoin"
        component={WEJoin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EJoin"
        component={EJoin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Done"
        component={Done}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="SelectCompany"
        component={SelectCompany}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="BottomTabBarr"
        component={BottomTabBarr}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Done"
        component={Done}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="DailyLogs"
        component={DailyLogs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="DSR" component={DSR} options={{ headerShown: false }} />
      <Stack.Screen
        name="DailylogDetail"
        component={DailylogDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DsrDetail"
        component={DsrDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddDSR"
        component={AddDSR}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Team"
        component={Team}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RequestLeave"
        component={RequestLeave}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LeaveBalance"
        component={LeaveBalance}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="leaveStatus"
        component={leaveStatus}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Goal"
        component={Goal}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="WEJoin"
        component={WEJoin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EJoin"
        component={EJoin}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ApproveLeaves"
        component={ApproveLeaves}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditDSR"
        component={EditDSR}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyTask"
        component={MyTask}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewTask"
        component={NewTask}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegularizationStatus"
        component={RegularizationStatus}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="RegularizationApproval"
        component={RegularizationApproval}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ViewReimbursement"
        component={ViewReimbursement}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="AddReimbursement"
        component={AddRimbursement}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ManageAttendance"
        component={ManageAttendance}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='AttendanceReport'
        component={AttendanceReport}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Commenting"
        component={Commenting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Reminder"
        component={Reminder}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ImageView"
        component={ImageView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Announcement"
        component={Announcement}
        options={{ headerShown: false }}
      />

      {/* <Stack.Screen name="AddVendor" component={AddVendor} options={{ headerShown: false }} />
      <Stack.Screen name="PdfFile" component={PdfFile} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
  );
}


const App = () => {
  const [isConnected, setIsConnected] = React.useState(null);
  axios.get(Endpoint.baseUrl)
  .catch(error => {
    console.log("AXIOS ERROR", error.message);
    console.log(error.config);
    if (error.response) {
      console.log("RESPONSE ERROR", error.response.status);
    }
  });

  // React.useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener((state) => {
  //     if (state.isConnected) {
  //       ToastAndroid.show("Internet Connected", ToastAndroid.SHORT);
  //     } else {
  //       ToastAndroid.show("No Internet Connection", ToastAndroid.LONG);
  //     }
  //     setIsConnected(state.isConnected);
  //   });

  //   return () => {
  //     unsubscribe(); 
  //   };
  // }, []);
  useNetworkStatus();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EjoinStack"
          component={EjoinStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

// function App() {
//   const Stack = createNativeStackNavigator();
//   const scheme = useColorScheme();
//   console.log(scheme, 'colorrr');
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{
//           headerShown: false,
//         }}
//         initialRouteName="Login">
//         <Stack.Screen name="Welcome" component={Welcome} />
//         <Stack.Screen name="Login" component={Login} />
//         // <Stack.Screen name="Forgot" component={Forgot} />
//         <Stack.Screen name="bottomTabBarr" component={bottomTabBarr} />
//         <Stack.Screen name="Done" component={Done} />
//         <Stack.Screen name="DailyLogs" component={DailyLogs} />
//         <Stack.Screen name="DSR" component={DSR} />
//         <Stack.Screen name="DailylogDetail" component={DailylogDetail} />
//         <Stack.Screen name="DsrDetail" component={DsrDetail} />
//         <Stack.Screen name="AddDSR" component={AddDSR} />
//         <Stack.Screen name="Team" component={Team} />
//         <Stack.Screen name="RequestLeave" component={RequestLeave} />
//         <Stack.Screen name="Dashboard" component={Dashboard} />
//         <Stack.Screen name="LeaveBalance" component={LeaveBalance} />
//         <Stack.Screen name="leaveStatus" component={leaveStatus} />
//         <Stack.Screen name="Goal" component={Goal} />
//         <Stack.Screen name="WEJoin" component={WEJoin} />
//         <Stack.Screen name="EJoin" component={EJoin} />
//         <Stack.Screen name="Notification" component={Notification} />
//         <Stack.Screen name="ApproveLeaves" component={ApproveLeaves} />
//         <Stack.Screen name="EditDSR" component={EditDSR} />
//         <Stack.Screen name="MyTask" component={MyTask} />
//         <Stack.Screen name="NewTask" component={NewTask} />
//         <Stack.Screen name="Commenting" component={Commenting} />
//         <Stack.Screen name="Reminder" component={Reminder} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// // export default App;
