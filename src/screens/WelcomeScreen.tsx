import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get('window'),
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Colors.backgroundColor,
        minHeight: screenDimensions.height,
      }}
    >
      <View style={[styles.container, { minHeight: screenDimensions.height }]}>
        <View style={styles.content}>
          <View style={styles.imgBox}>
            <Image
              source={require('../../assets/images/welcome.png')}
              style={styles.img}
              resizeMode="contain"
            />
          </View>

          <View style={styles.contentBox}>
            <Text style={styles.title}>Employee Alert</Text>
            <LinearGradient
              colors={[Colors.gradientStart, Colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              locations={[0, 0.85]}
              style={styles.gradientButton}
            >
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </LinearGradient>

            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    maxWidth: 328,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBox: {
    width: '100%',
    maxWidth: 290.25,
    height: 346,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 10.45,
  },
  contentBox: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    color: Colors.textDark,
    fontFamily: Fonts.medium,
    marginBottom: 20,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  gradientButton: {
    borderRadius: 8,
    width: '100%',
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  loginText: {
    fontSize: 16,
    color: Colors.backgroundColor,
    fontFamily: Fonts.semiBold,
  },
  registerButton: {
    backgroundColor: '#E8ECF4',
    width: '100%',
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 10,
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  registerText: {
    fontSize: 15,
    color: Colors.textDark,
    fontFamily: Fonts.medium,
  },
});
