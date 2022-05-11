import React,{useEffect,useState,useCallback} from 'react'
import { ThemeContext } from '../../context/index';
import { StyleSheet,ActivityIndicator,Animated,Dimensions, Text, View,StatusBar } from 'react-native';
import AnimatedSplash from "react-native-animated-splash-screen";

export default function SplashScreen({navigation}) {
    const [theme, setTheme] = React.useContext(ThemeContext);
    const [loading, setLoading] = useState(false);
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(true);
            navigation.navigate('home');
        }, 5000);
    }, []);

  return (
      <AnimatedSplash
        translucent={true}
        isLoaded={loading}
        animationDuration={3000}
        backgroundColor={theme.primary}
        logoImage={require('../../assets/logo/logo.png')}
        logoHeight={300}
        logoWidth={300}
        children={
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Text>Loading...</Text>
                <ActivityIndicator size="large" color={theme.secondary} />
            </View>
        }
      >
          <View 
        style={styles.container}
          
          >
          <ActivityIndicator size={60} color={theme.decenary} />
          </View>
    </AnimatedSplash>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });