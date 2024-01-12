import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../../hooks/warmUpBrowser';
import Colors from './../../Utils/Colors'


WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {

    useWarmUpBrowser();
 
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
   
    const onPress = React.useCallback(async () => {
      try {
        const { createdSessionId, signIn, signUp, setActive } =
          await startOAuthFlow();
   
        if (createdSessionId) {
          setActive({ session: createdSessionId });
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
    }, []);

  return (
    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
      <Image source={require('./../../../assets/images/ev.png')} style={styles.logoImg} />
      <Image source={require('./../../../assets/images/car.png')} style={styles.bgImg} />

      <View style={{padding: 20}}>
        <Text style={styles.heading}>Your Ultimate EV Charging Companion for Seamless Power Access Anywhere, Anytime!</Text>
        <Text style={styles.desc}>Navigate, Plug in, and Go Green with Real-time Charging Station Availability and User-friendly Maps.</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={{color: Colors.WHITE, textAlign: 'center', fontFamily: 'rmedium', fontSize: 17}}>
                Login With Google
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    logoImg: {
        width: 100,
        height: 90,
        objectFit: 'contain',
    },
    bgImg: {
        width: '100%',
        height: 260,
        marginTop: -10,
        objectFit: 'contain',
    },
    heading: {
        fontSize: 20,
        fontFamily: 'semibold',
        textAlign: 'center',
        marginTop: 10
    },
    desc: {
        fontSize: 17,
        fontFamily: 'rregular',
        marginTop: 15,
        textAlign: 'center',
        color: Colors.GRAY,
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        display: 'flex',
        borderRadius: 99,
        marginTop: 40
    }
})