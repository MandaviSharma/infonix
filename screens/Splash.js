import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Specify the type for navigation
// type SplashNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const Splash = ({navigation}) => {
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      
      checkLogin()// Navigate to the Login screen
    }, 3000);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [navigation]);
  const checkLogin=async()=>{
    const email=await AsyncStorage.getItem('EMAIL');
    const userId=await AsyncStorage.getItem('USERID');
    console.log(email);
    if(email && userId){
      navigation.navigate('Login');
    }else{
      navigation.navigate('Login');
    }

  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold',color:'#007BFF' }}>Infonix</Text>
    </View>
  );
};

export default Splash;