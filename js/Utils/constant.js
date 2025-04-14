import { PermissionsAndroid, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const FractionEnum = Object.freeze({
  QUARTER: "0.25",
  HALF: "0.5",
  FULL: "1",
});

export const NamedLeave = Object.freeze({
  QUARTER: "Short Day",
  HALF: "Half Day",
  FULL: "Full Day"
})



export async function getDeviceDetails() {
  let imei = '';
  let macAddress = '';
  let deviceId = DeviceInfo.getDeviceId();     // e.g., "Pixel 5"
  let uniqueId = DeviceInfo.getUniqueId();     // e.g., UUID

  // Get MAC Address (may return placeholder on Android 6+)
  try {
    macAddress = await DeviceInfo.getMacAddress();
  } catch (e) {
    macAddress = '';
  }

  // Get IMEI on Android with permission
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        imei = ''
        // imei = await DeviceInfo.getImei(); // 
      }
    } catch (err) {
      console.warn('Error fetching IMEI:', err);
      imei = '';
    }
  }

  return {
    imei: imei || '',
    deviceId,
    uniqueId,
    macAddress: macAddress || '',
  };
}
