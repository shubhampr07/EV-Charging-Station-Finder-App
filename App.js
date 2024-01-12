import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from "react";
import LoginScreen from "./App/Screens/LoginScreen/LoginScreen";
import * as SecureStore from "expo-secure-store";
import TabNavigation from "./App/Navigations/TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import * as Location from 'expo-location';
import { UserLocationContext } from "./App/Context/UserLocationContext";




SplashScreen.preventAutoHideAsync();
export default function App() {

  const [fontsLoaded] = useFonts({
    'rbold': require('./assets/fonts/Raleway-Bold.ttf'),
    'rlight': require('./assets/fonts/Raleway-Light.ttf'),
    'rmedium': require('./assets/fonts/Raleway-Medium.ttf'),
    'rregular': require('./assets/fonts/Raleway-Regular.ttf'),
    'semibold': require('./assets/fonts/Raleway-SemiBold.ttf'),
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      //console.log(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
 
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

  return (
    <ClerkProvider publishableKey={"pk_test_cGlja2VkLWNoYW1vaXMtMTAuY2xlcmsuYWNjb3VudHMuZGV2JA"} tokenCache={tokenCache}>
      <UserLocationContext.Provider value={{location, setLocation}}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </View>
      </UserLocationContext.Provider>
    </ClerkProvider>
    // <View style={styles.container} onLayout={onLayoutRootView}>
    //   <LoginScreen />
    //   <StatusBar style="bar" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 25
  },
});
