/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  NativeEventEmitter,
  NativeModules
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const { MoEReactBridge } = NativeModules;

const MoEReactBridgeEmitter = new NativeEventEmitter(MoEReactBridge);

const subscriptionNotification = MoEReactBridgeEmitter.addListener(
  'notificationClicked',
  (notificationPayload) => console.log(notificationPayload)
);

subscriptionInAppShown = MoEReactBridgeEmitter.addListener(
  'inAppShown',
  (inAppInfo) => console.log(inAppInfo)
);

subscriptionInAppClicked = MoEReactBridgeEmitter.addListener(
  'inAppClicked',
  (inAppInfo) => console.log(inAppInfo)
);


subscriptionEventTriggeredSelfHandledInApp = MoEReactBridgeEmitter.addListener(
  'eventTriggeredSelfHandledInApp',
  (selfHandledInAppInfo) => console.log(selfHandledInAppInfo)
);


export default class App extends Component<{}> {

  render() {    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }

  componentDidMount(){

    const moeManager = require('react-native-moengage')


    // Tracking INSTALL/UPDATE
    moeManager.isExistingUser(false);

    //For Debugging
    moeManager.setLogLevel(1);

    //For Push Notification
    moeManager.registerForPush();

    //Tracking Event
    moeManager.trackEvent("Purchase", {"quantity":1, "product":"iPhone", "currency":"dollar", "price":699, "new_item" : true});
    moeManager.trackEvent("testEvent",{"attribute1":"attribute1Val"});
    moeManager.trackEvent("testEvent",{"attribute2":900});
    moeManager.trackEvent("testEvent",{"attribute3":false});
    moeManager.trackEvent("testEvent",{"attribute4":200.98});

    //User Attribute
    moeManager.setUserUniqueID("ReactNative@moengage.com");
    moeManager.setUserName("React Native");
    moeManager.setUserFirstName("React");
    moeManager.setUserLastName("Native");
    moeManager.setUserEmailID("ReactNative@moengage.com");
    moeManager.setUserContactNumber("8741020097");
    moeManager.setUserBirthday("05/05/1991");
    moeManager.setUserGender("Male"); //OR Female
    moeManager.setUserLocation(12.34678,45.67890);
    moeManager.setUserAttribute("qazAttribute","qaz123");
    moeManager.setUserAttributeTimestamp("Current Time", 1479362315);
    moeManager.setUserAttributeLocation("Location Attribute", 34.56756, 87.45632);

    //To show inApp
    moeManager.showInApp()

  }


  componentWillUnmount(){
    subscriptionNotification.remove();
    subscriptionInAppShown.remove();
    subscriptionInAppClicked.remove();
    subscriptionEventTriggeredSelfHandledInApp.remove();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});