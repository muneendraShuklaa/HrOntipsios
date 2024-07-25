import React, { Component } from 'react';
import { View,Text,StatusBar,ActivityIndicator,StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview'
import utils from '../../../Utils';
import { Header } from "../../../Components/Header"
import { withMyHook } from "../../../Utils/Dark"

import { SafeAreaView } from 'react-native-safe-area-context';
const ActivityIndicatorElement = () => {
  return (
    <ActivityIndicator
      color="#009688"
      size="large"
      style={styles.activityIndicatorStyle}
    />
  );
};
class forgot extends Component {
  
  render() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: utils.color.HeaderColor }}>
        <View style={{ flex: 1, backgroundColor: '#fff', }}>
            <StatusBar
                hidden={false}
                backgroundColor={utils.color.HeaderColor}
            />
            <Header
                title="Forgot Password"
                lefticon={utils.icons.Back} leftFunction={() => { this.props.navigation.goBack() }}
            // rightIcon={utils.icons.splashLogo} rightFunctionality={() => { this.props.navigation.navigate("Profile") }}
            />
      <WebView
          // startInLoadingState={true}
          renderLoading={ActivityIndicatorElement}
          javaScriptEnabled={true}
          //For the Cache
          domStorageEnabled={true}
          //View to show while loading the webpage
          //Want to show the view or not
          startInLoadingState={true}
        source={{
          
          uri: 'https://login.hrontips.com/ForgotPassword_C1.aspx'
        }}
        style={{  }}
      />
      </View>
      </SafeAreaView>
    );
  }
}
export const Forgot = withMyHook(forgot)
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
});
