import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importing Screens
import HomeScreen from './screens/HomeScreen';
import ClubDashboard from './screens/ClubDashboard';
import AddNotice from './screens/AddNotice';
import ProfileScreen from './screens/ProfileScreen';
import ProfileEditScreen from './screens/ProfileEditScreen';
import Signup from './screens/Signup';

// Creating Stack and Drawer Navigators
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Main Stack (Handles Home and other main screens like Add Notice, Club Dashboard)
function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }} // Hides header for Home screen
      />
      <Stack.Screen
        name="ClubDashboard"
        component={ClubDashboard}
        options={{ headerShown: false }} // Hides header for Club Dashboard screen
      />
      <Stack.Screen
        name="AddNotice"
        component={AddNotice}
        options={{ headerShown: false }} // Hides header for Add Notice screen
      />
    </Stack.Navigator>
  );
}

// Profile Stack (Handles Profile View & Edit)
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileView"
        component={ProfileScreen}
        options={{ headerShown: false }} // Hides header for Profile screen
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEditScreen}
        options={{ headerShown: false }} // Hides header for Profile Edit screen
      />
    </Stack.Navigator>
  );
}

// Drawer Navigator (Main App after Signup)
function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={MainStack}
        options={{ title: 'Infonix Home', headerShown: false }} // Ensures no header in Home
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{ title: 'Student Profile', headerShown: false }} // Hides header for Profile
      />
      <Drawer.Screen
        name="Sign Out"
        component={SignOut} // Sign Out functionality remains the same
        options={{ title: 'Sign Out' }}
      />
    </Drawer.Navigator>
  );
}

// SignOut Function: Handle sign-out and navigate to Signup
function SignOut({ navigation }) {
  React.useEffect(() => {
    navigation.navigate("Signup");
  }, []);

  return null;
}

// Main Stack (Handles Signup -> Main App)
function MainStackFlow() {
  return (
    <Stack.Navigator initialRouteName="Signup">
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }} // Hides header for Signup screen
      />
      <Stack.Screen
        name="MainApp"
        component={DrawerNavigator}
        options={{ headerShown: false }} // Hides header for the main app
      />
    </Stack.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <MainStackFlow />
    </NavigationContainer>
  );
}
