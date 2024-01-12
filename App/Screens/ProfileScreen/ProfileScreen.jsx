import { View, Text, Image, FlatList, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import {  useClerk, useUser } from '@clerk/clerk-expo'
import Colors from './../../Utils/Colors.js'


export default function ProfileScreen() {

  const {user} = useUser();
  const {signOut} = useClerk();

  const profileMenu = [
    {
      id: 1,
      name: 'Home',
      icon: 'home'
    }, 
    {
      id: 2,
      name: 'My Favorite',
      icon: 'bookmark-sharp'
    },
    {
      id: 3,
      name: 'Contact Us',
      icon: 'mail',
      onPress: () => onMessageBtn(),
    },
    {
      id: 4,
      name: 'Logout',
      icon: 'log-out',
      onPress: () => handleLogout(),
    }
  ]


  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  const onMessageBtn = () => {
    Linking.openURL('mailto:shubhampaul756@gmail.com?subject=Reaching Out for an issue faced in HomelyHero service app')
  }

  return (
    <View>
    <View style={{padding: 20, paddingTop: 30, backgroundColor: Colors.PRIMARY, marginTop: 5}}>
      <Text style={{fontSize: 25, fontFamily: 'rbold', color: Colors.WHITE}}>Profile</Text>
      <View style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        }}>
        <Image source={{uri: user.imageUrl}} style={{width:90, height:90, borderRadius: 99}} />
        <Text style={{fontSize: 25, marginTop: 8, fontFamily: 'rregular', color: Colors.WHITE}}>{user.fullName}</Text>
        <Text style={{fontSize: 18, marginTop: 8, fontFamily: 'rregular', color: Colors.WHITE}}>{user?.primaryEmailAddress.emailAddress}</Text>
      </View>
    </View>

    <View style={{paddingTop: 60, marginLeft: 20}}>
      <FlatList data={profileMenu}
      renderItem={({item, index}) => (
        <TouchableOpacity onPress={item.onPress}
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap : 10, marginBottom: 40, paddingHorizontal: 80}}>
          <Ionicons name={item.icon} size={35} color={Colors.PRIMARY} />
          <Text style={{fontFamily: 'rbold', fontSize: 20}}>{item.name}</Text>
        </TouchableOpacity>
      )} />
    </View>
    </View>
  )
}