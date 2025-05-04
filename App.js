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
import DeptDashboard from './screens/DeptDashboard';
import ClubProfileScreen from './screens/ClubProfile';
import UpdateDashboard from './screens/UpdateDashboard';
import Results from './screens/Results';
import ViewResult from './screens/ViewResult';
import AboutUs from './screens/AboutUs';
import AboutUsDept from './screens/AboutUsDept';
import ContactUs from './screens/ContactUs';
import Splash from './screens/Splash';
import DeptProfileScreen from './screens/DeptProfileScreen';
import CategoryNoticesScreen from './screens/CategoryNoticesScreen';
import UpdateNotice from './screens/UpdateNotice';
import DisplayNotice from './screens/DisplayNotice';
import ContactUsDept from './screens/ContactUsDept';
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

function MainStack({route}) {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#007BFF' }, headerTintColor: '#FFF' }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} initialParams={route.params} />
      <Stack.Screen name="ClubDashboard" component={ClubDashboard} options={{ headerShown: false }} />
      <Stack.Screen name="DeptDashboard" component={DeptDashboard} options={{ headerShown: false }} />
      <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }} initialParams={route.params}/>
      <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} initialParams={route.params} />
      <Stack.Screen name="AboutUsDept" component={AboutUsDept} options={{ headerShown: false }} initialParams={route.params} />
      <Stack.Screen name="ContactUsDept" component={ContactUsDept} options={{ headerShown: false }} initialParams={route.params} />
      <Stack.Screen name="ViewResult" component={ViewResult} options={{ headerShown: false }} />
      <Stack.Screen name="CategoryNoticesScreen" component={CategoryNoticesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DisplayNotice" component={DisplayNotice} options={{ headerShown: false }} initialParams={route.params} />
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
      <Stack.Screen name="UpdateNotice" component={UpdateNotice} options={{ headerShown: false }} initialParams={route.params}/>
      <Stack.Screen name="Results" component={Results} options={{ headerShown: false }} initialParams={route.params}/>
      <Stack.Screen name="UpdateDashboard" component={UpdateDashboard} options={{ headerShown: false }} initialParams={route.params} />
      <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} initialParams={route.params} />
      <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }} initialParams={route.params} />
      <Stack.Screen name="ViewResult" component={ViewResult} options={{ headerShown: false }} initialParams={route.params} />
      <Stack.Screen name="DisplayNotice" component={DisplayNotice} options={{ headerShown: false }} initialParams={route.params} />
    </Stack.Navigator>
  );
}

function DeptStack({ route, navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#007BFF' }, headerTintColor: '#FFF' }}>
      <Stack.Screen name="DeptProfile" component={DeptProfileScreen} options={{ headerShown: false }} initialParams={route.params} />
      <Stack.Screen name="AddNotice" component={AddNotice} options={{ headerShown: false }} initialParams={route.params} />
      <Stack.Screen name="AboutUsDept" component={AboutUsDept} options={{ headerShown: false }} initialParams={route.params} />
      <Stack.Screen name="ViewResult" component={ViewResult} options={{ headerShown: false }} initialParams={route.params} />
      <Stack.Screen name="Results" component={Results} options={{ headerShown: false }} initialParams={route.params}/>
      <Stack.Screen name="UpdateNotice" component={UpdateNotice} options={{ headerShown: false }} initialParams={route.params}/>
      <Stack.Screen name="ContactUsDept" component={ContactUsDept} options={{ headerShown: false }} initialParams={route.params} />
      <Stack.Screen name="DisplayNotice" component={DisplayNotice} options={{ headerShown: false }} initialParams={route.params} />



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
