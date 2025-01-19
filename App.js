import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ClubDashboard from './screens/ClubDashboard';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Infonix Home' }} />
        <Stack.Screen name="ClubDashboard" component={ClubDashboard} options={{ title: 'Club Dashboard' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
