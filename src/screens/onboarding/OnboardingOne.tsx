import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack'
const { width } = Dimensions.get('window');
import Fonts from '../../constants/Fonts';
import LinearGradient from 'react-native-linear-gradient';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;
const OnboardingOne = () => {
  const navigation = useNavigation<NavigationProp>();
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));

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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={19} color="#1E232C" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../../../assets/images/welcome.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <Text style={styles.title}>Welcome to Employee Alert!</Text>
      <Text style={styles.subtitle}>
        know where your employees and colleagues are at all times.
      </Text>
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0, 0.85]}
        style={styles.gradientButton}
      >
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OnboardingTwo')}>


          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
    </ScrollView>
  );
};

export default OnboardingOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    paddingHorizontal: 20,
    padding: 24,
  },
  header: {
    paddingTop: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 270
  },
  backBtn: {
    width: 41,
    height: 41,
    borderRadius: 12,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  skipText: {
    fontSize: 12,
    color: '#8391A1',
    paddingTop: 15.5,

  },
  image: {
    width: 290.25,
    height: 346,
    marginTop: 3,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 72,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 50,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#50CE76',
    width: 12,
    height: 12,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.semiBold,
    color: Colors.textDark,
    textAlign: 'center',
    lineHeight: 20.8,
    letterSpacing : -1,
  },
  subtitle: {
  fontSize: 15,
    color: '#8391A1',
    textAlign: 'center',
    marginTop: 5,
    lineHeight: 22,
    letterSpacing:0,
    fontFamily: Fonts.medium,
  },
  gradientButton: {
    borderRadius: 8,
    width: '100%',
    padding: 2,
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 48,
  },
  button: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.backgroundColor,
    fontFamily: Fonts.semiBold,
    textAlign: 'center'
  },
});
