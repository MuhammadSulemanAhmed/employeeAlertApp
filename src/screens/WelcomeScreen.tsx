import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';

const { width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
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
          style={styles.gradientButton}
        >
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </LinearGradient>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  imgBox: {
    width:290.2506408691406,
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
    width: 328,
    height: 'auto',
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    color: Colors.textDark,
    fontFamily: Fonts.medium,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: 'transparent',
    width: 328,
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  gradientButton: {
    borderRadius: 8,
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
    width: 328,
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
    fontFamily: Fonts.semiBold,
  },
});
