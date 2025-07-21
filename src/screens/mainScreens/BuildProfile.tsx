import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppStack';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

interface BuildProfileProps {
  setIsLoggedIn: (value: boolean) => void;
}
const BuildProfile = ({ setIsLoggedIn }: BuildProfileProps) => {
  const navigation = useNavigation<NavigationProp>();
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get('window'),
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions(window);
    });
    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Colors.backgroundColor,
        minHeight: screenDimensions.height,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={[styles.container, { minHeight: screenDimensions.height }]}>
        <View style={styles.content}>
          <View style={styles.topContent}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => {
                setIsLoggedIn(false); 
              }}
            >
              <Ionicons name="chevron-back" size={19} color="#1E232C" />
            </TouchableOpacity>

            <View style={styles.messageContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.firstContent}>
                  Let's build Your{'\n'}
                  <Text style={styles.profileText}>Profile</Text>
                </Text>
              </View>
              <Text style={styles.subtitle}>
                To instantly alert employers and promote team safety while on
                site.
              </Text>
            </View>
          </View>

          <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0, 0.85]}
            style={styles.gradientButton}
          >
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => navigation.navigate('BasicInfo')}
            >
              <Text style={styles.createButtonText}>Create Profile</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </ScrollView>
  );
};

export default BuildProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    maxWidth: 328,
    flex: 1,
    justifyContent: 'space-between',
  },
  topContent: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 40,
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
  messageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  titleContainer: {
    marginTop: 28,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  firstContent: {
    fontSize: 34.5,
    fontFamily: Fonts.regular,
    color: Colors.textDark,
    lineHeight: 50,
  },
  profileText: {
    fontFamily: Fonts.semiBold,
    fontSize: 47.97,
    color: Colors.primary,
    lineHeight: 50,
  },
  subtitle: {
    marginTop: 10,
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 22,
    color: '#8391A1',
  },
  createButton: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
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
  },
  createButtonText: {
    fontSize: 16,
    color: Colors.backgroundColor,
    fontFamily: Fonts.semiBold,
  },
});
