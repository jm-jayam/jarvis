import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as AppAuth from 'expo-app-auth';
import { StatusBar } from 'expo-status-bar';
import google from '../../assets/logo/google.png';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Google from 'expo-google-app-auth';
export default function Signin({parentnavigation}) {
//   const { colors } = useTheme();
    const [authState, setAuthState] = React.useState(null);
    const [showPassword, setShowPassword] = React.useState(false);
    // React.useEffect(() => {
    //     (async () => {
    //         let cachedAuth = await getCachedAuthAsync();
    //         if (cachedAuth && !authState) {
    //           setAuthState(cachedAuth);
    //         }
    //       })();
    // }, []);
    async function signInWithGoogleAsync() {
        try {
          const result = await Google.logInAsync({
            behavior: 'web',
            iosClientId: IOS_CLIENT_ID,
            //androidClientId: AND_CLIENT_ID,
            scopes: ['profile', 'email'],
          });
    
          if (result.type === 'success') {
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    
      <TouchableOpacity 
        onPress={
            async () => {
          const _authState = await signInAsync();
          setAuthState(_authState);
        }
    }
      style={{ 
        display: 'flex',
        width: wp('90%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: wp('4%'),
        borderRadius: wp('3%'),
        margin: wp('3%'),
        backgroundColor: '#fff',
    }} 
      >
        <View style={{
          marginRight: wp('3%'),
        }} >
        <Image source={google}
          style={{
            width:25,
            height:25
          }} />
        </View>
        <View>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold'
          }}> Login With Google</Text>
        </View>
      </TouchableOpacity>

    </View>
  )
}

  let config = {
    issuer: 'https://accounts.google.com',
    scopes: ['openid', 'profile'],
    clientId: '222886019212-98tnaffqrj2bms511b3kr0oi6lq6icg9.apps.googleusercontent.com',
  };
  
  let StorageKey = '@MyApp:CustomGoogleOAuthKey';
  
  export async function signInAsync() {
    let authState = await AppAuth.authAsync(config);
    await cacheAuthAsync(authState);
    console.log('signInAsync', authState);
    return authState;
  }
  
  async function cacheAuthAsync(authState) {
    return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
  }
  
  export async function getCachedAuthAsync() {
    let value = await AsyncStorage.getItem(StorageKey);
    let authState = JSON.parse(value);
    console.log('getCachedAuthAsync', authState);
    if (authState) {
      if (checkIfTokenExpired(authState)) {
        return refreshAuthAsync(authState);
      } else {
        return authState;
      }
    }
    return null;
  }
  
  function checkIfTokenExpired({ accessTokenExpirationDate }) {
    return new Date(accessTokenExpirationDate) < new Date();
  }
  
  async function refreshAuthAsync({ refreshToken }) {
    let authState = await AppAuth.refreshAsync(config, refreshToken);
    console.log('refreshAuth', authState);
    await cacheAuthAsync(authState);
    return authState;
  }
  
  export async function signOutAsync({ accessToken }) {
    try {
      await AppAuth.revokeAsync(config, {
        token: accessToken,
        isClientIdProvided: true,
      });
      await AsyncStorage.removeItem(StorageKey);
      return null;
    } catch (e) {
      alert(`Failed to revoke token: ${e.message}`);
    }
  }