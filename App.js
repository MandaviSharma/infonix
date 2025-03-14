//import React from 'react';
//import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
//import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import auth from '@react-native-firebase/auth';
//
//// Import Screens
//import HomeScreen from './screens/HomeScreen';
//import AddNotice from './screens/AddNotice';
//import ProfileScreen from './screens/ProfileScreen';
//import ProfileEditScreen from './screens/ProfileEditScreen';
//import Signup from './screens/Signup';
//import Login from './screens/Login';
//import ClubDashboard from './screens/ClubDashboard';
//import ClubProfileScreen from './screens/ClubProfile';
//import UpdateDashboard from './screens/UpdateDashboard';
//import AboutUs from './screens/AboutUs';
//import ContactUs from './screens/ContactUs';
//import Splash from './screens/Splash';
//
//// Creating Stack and Drawer Navigators
//const Stack = createNativeStackNavigator();
//const Drawer = createDrawerNavigator();
//
//// Theme for the App
//const BlueTheme = {
//  ...DefaultTheme,
//  colors: {
//    ...DefaultTheme.colors,
//    primary: '#007BFF',
//    background: '#f0f8ff',
//    text: '#000',
//    card: '#0056b3',
//    border: '#00A3E0',
//    notification: '#007BFF',
//  },
//};
//
//// Main Stack for Home & Club Dashboard
//function MainStack() {
//  return (
//    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#007BFF' }, headerTintColor: '#FFF' }}>
//      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
//      <Stack.Screen name="ClubDashboard" component={ClubDashboard} options={{ headerShown: false }} />
//      <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }} />
//      <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} />
//    </Stack.Navigator>
//  );
//}
//
//// Profile Stack for Student
//function ProfileStack() {
//  return (
//    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#007BFF' }, headerTintColor: '#FFF' }}>
//      <Stack.Screen name="ProfileView" component={ProfileScreen} options={{ headerShown: false }} />
//      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} options={{ headerShown: false }} />
//    </Stack.Navigator>
//  );
//}
//
//// Club Stack for Club-related pages
//function ClubStack() {
//  return (
//    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#007BFF' }, headerTintColor: '#FFF' }}>
//      <Stack.Screen name="ClubProfile" component={ClubProfileScreen} options={{ headerShown: false }} />
//      <Stack.Screen name="AddNotice" component={AddNotice} options={{ headerShown: false }} />
//      <Stack.Screen name="UpdateDashboard" component={UpdateDashboard} options={{ headerShown: false }} />
//      <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} />
//      <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }} />
//    </Stack.Navigator>
//  );
//}
//
//// Custom Drawer Content with Logout Button
//function CustomDrawerContent(props) {
//  return (
//    <DrawerContentScrollView {...props}>
//      <DrawerItemList {...props} />
//      <DrawerItem
//        label="Sign Out"
//        labelStyle={{ color: '#000', fontWeight: 'bold' }}
//        onPress={() => {
//          auth()
//            .signOut()
//            .then(() => console.log('User signed out!'));
//          props.navigation.reset({ index: 0, routes: [{ name: 'Signup' }] });
//        }}
//      />
//    </DrawerContentScrollView>
//  );
//}
//
//// Drawer Navigator for Students & Clubs
//function DrawerNavigator({ route }) {
//  const { userType } = route.params;
//
//  return (
//    <Drawer.Navigator
//      initialRouteName="Home"
//      drawerContent={(props) => <CustomDrawerContent {...props} />}
//      screenOptions={{
//        drawerActiveTintColor: '#FFF',
//        drawerActiveBackgroundColor: '#007BFF',
//        drawerInactiveTintColor: '#000',
//        headerStyle: { backgroundColor: '#0056b3' },
//        headerTintColor: '#FFF',
//      }}
//    >
//      <Drawer.Screen name="Home" component={MainStack} options={{ title: 'Infonix Home', headerShown: false }} />
//      {userType === 'student' && (
//        <Drawer.Screen name="StudentProfile" component={ProfileStack} options={{ title: 'Student Profile', headerShown: false }} />
//      )}
//      {userType === 'club' && (
//        <Drawer.Screen name="ClubSection" component={ClubStack} options={{ title: 'Club Profile', headerShown: false }} />
//      )}
//    </Drawer.Navigator>
//  );
//}
//
//// Main Stack Flow (Signup -> Main App)
//function MainStackFlow() {
//  return (
//    <Stack.Navigator initialRouteName="Splash">
//      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
//      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
//      <Stack.Screen name="MainApp" component={DrawerNavigator} options={{ headerShown: false }} />
//      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
//
//    </Stack.Navigator>
//  );
//}
//
//// Main App Component
//export default function App() {
//  return (
//    <NavigationContainer theme={BlueTheme}>
//      <MainStackFlow />
//    </NavigationContainer>
//  );
//}


import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import AddNotice from './screens/AddNotice';
import ProfileScreen from './screens/ProfileScreen';
import ProfileEditScreen from './screens/ProfileEditScreen';
import Signup from './screens/Signup';
import Login from './screens/Login';
import ClubDashboard from './screens/ClubDashboard';
import ClubProfileScreen from './screens/ClubProfile';
import UpdateDashboard from './screens/UpdateDashboard';
import AboutUs from './screens/AboutUs';
import ContactUs from './screens/ContactUs';
import Splash from './screens/Splash';
import DeptProfileScreen from './screens/DeptProfileScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const BlueTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007BFF',
    background: '#f0f8ff',
    text: '#000',
    card: '#0056b3',
    border: '#00A3E0',
    notification: '#007BFF',
  },
};

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#007BFF' }, headerTintColor: '#FFF' }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ClubDashboard" component={ClubDashboard} options={{ headerShown: false }} />
      <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }} />
      <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#007BFF' }, headerTintColor: '#FFF' }}>
      <Stack.Screen name="ProfileView" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function ClubStack({ route, navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#007BFF' }, headerTintColor: '#FFF' }}>
      <Stack.Screen name="ClubProfile" component={ClubProfileScreen} options={{ headerShown: false  }} initialParams={route.params} />
      <Stack.Screen name="AddNotice" component={AddNotice} options={{ headerShown: false }} initialParams={route.params}/>
      <Stack.Screen name="UpdateDashboard" component={UpdateDashboard} options={{ headerShown: false }} initialParams={route.params} />
      <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} initialParams={route.params} />
      <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }} initialParams={route.params} />
    </Stack.Navigator>
  );
}

function DeptStack({ route, navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#007BFF' }, headerTintColor: '#FFF' }}>
      <Stack.Screen name="DeptProfile" component={DeptProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddNotice" component={AddNotice} options={{ headerShown: false }} initialParams={route.params} />
      
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sign Out"
        labelStyle={{ color: '#000', fontWeight: 'bold' }}
        onPress={() => {
          auth()
            .signOut()
            .then(() => console.log('User signed out!'));
          props.navigation.reset({ index: 0, routes: [{ name: 'Signup' }] });
        }}
      />
    </DrawerContentScrollView>
  );
}

function DrawerNavigator({ route }) {
  console.log("DrawerNavigator - Received params:", route.params);

  const { userType, userId } = route.params;

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#FFF',
        drawerActiveBackgroundColor: '#007BFF',
        drawerInactiveTintColor: '#000',
        headerStyle: { backgroundColor: '#0056b3' },
        headerTintColor: '#FFF',
      }}
    >
      <Drawer.Screen name="Home" component={MainStack} options={{ title: 'Infonix Home', headerShown: false }} initialParams={{ userType, userId }}/>
      {userType === 'student' && (
        <Drawer.Screen name="StudentProfile" component={ProfileStack} options={{ title: 'Student Profile', headerShown: false }} initialParams={{ userType, userId }} />
      )}
      {userType === 'club' && (
        <Drawer.Screen name="ClubSection" component={ClubStack} options={{ title: 'Club Profile', headerShown: false }} initialParams={{ userType, userId }}/>
      )}
      {userType === 'department' && (
        <Drawer.Screen name="DeptSection" component={DeptStack} options={{ title: 'Department Profile', headerShown: false }} initialParams={{ userType, userId }}/>
      )}
      
    </Drawer.Navigator>
  );
}

function MainStackFlow() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="MainApp" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={BlueTheme}>
      <MainStackFlow />
    </NavigationContainer>
  );
}
