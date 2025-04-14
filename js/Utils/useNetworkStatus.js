import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const useNetworkStatus = (knowInternet=false) => {
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const message = state.isConnected
        ? "Internet Connected"
        : "No Internet Connection";
        const messages="No Internet Connection"
      ToastAndroid.show(knowInternet ? messages:message, ToastAndroid.SHORT);
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected;
};

export default useNetworkStatus;
