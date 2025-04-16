import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      checkLogin(); // Navigate to the Login screen
    }, 3000);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [navigation]);

  const checkLogin = async () => {
    const email = await AsyncStorage.getItem('EMAIL');
    const userId = await AsyncStorage.getItem('USERID');
    console.log(email);
    if (email && userId) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      {/* Logo Image */}
      <Image
        source={require('../assets/logo.png')}
        style={{ width: 150, height: 150, borderRadius: 50, marginBottom: 20 }} // Adjust size as needed
        resizeMode="contain"
      />
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#007BFF' }}>Infonix</Text>
    </View>
  );
};

export default Splash;
