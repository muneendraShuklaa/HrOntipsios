import { useEffect, useState } from "react";
import { Platform, ToastAndroid } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const useNetworkStatus = (knowInternet = false) => {
  const [isConnected, setIsConnected] = useState(null);
let mount=true;
  useEffect(() => {

    const unsubscribe = NetInfo.addEventListener((state) => {
      const message = state.isConnected
        ? "Internet Connected"
        : "No Internet Connection";
      const messages = "No Internet Connection";
      if (Platform.OS === 'android') {
        ToastAndroid.show(knowInternet ? messages : message, ToastAndroid.SHORT);
      }
      else if(Platform.OS==='ios' && mount){
        alert(knowInternet?messages:message)
        mount=false; 
      }
      setIsConnected(state.isConnected);
    });

      return () => {
      unsubscribe();
    };
  }, []);

  return isConnected;
};

export default useNetworkStatus


