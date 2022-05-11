import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Sensors from './components/Sensors/Sensors';
import {ThemeContext} from './context/index';
import SplashScreen from './screens/SplashScreen/SplashScreen';
import { Theme } from './constant/Theme/index';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from './screens/Auth/Auth';
import Home from './screens/Home/Home';
const Stack = createNativeStackNavigator();
export default function App() {
  const [theme, setTheme] = React.useState(Theme[0]);
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
       <NavigationContainer>
       <Stack.Navigator  initialRouteName="splash">
        <Stack.Screen 
          options={{
            headerShown: false,
          }}
        name="splash" component={SplashScreen} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="auth" component={Auth} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="sensors" component={Sensors} />
        <Stack.Screen options={{
          headerShown: false,
        }} name="home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeContext.Provider>
  );
}


