import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppStack';
import ContactBook from '../../../assets/svg/contactBook.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

type NavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'MonitoredContacts'
>;

const MonitoredContacts = () => {
  const navigation = useNavigation<NavigationProp>();
  const screen = useWindowDimensions();
  const isLandscape = screen.width > screen.height;
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Colors.backgroundColor,
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={[
              styles.backbtnContainer,
              isLandscape && {
                alignSelf: 'center',
                width: 328,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={24} color="#1E232C" />
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.progressBarWrapper,
              isLandscape && {
                alignSelf: 'center',
                width: 328,
              },
            ]}
          >
            <View style={[styles.progress, { marginRight: 4 }]} />
            <View style={[styles.progress, { marginRight: 4 }]} />
            <View style={styles.progress} />
          </View>

          <View style={[styles.innerContent, { width: screen.width - 48 }]}>
            <View>
              <Text style={styles.title}>Add Monitored Contacts</Text>
              <Text style={styles.description}>
                Monitor and be notified when these individuals trigger a
                hospital alert.
              </Text>

              <View style={styles.noContactsContainer}>
                <ContactBook width={54} height={54} />
                <Text style={styles.noContactsText}>No contact found</Text>
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
                style={styles.addButton}
                onPress={() => navigation.navigate('CreateGroup')}
              >
                <Ionicons name="add-circle" size={22} color="#fff" />
                <Text style={styles.addbuttonText}>Add Contact</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MonitoredContacts;

const styles = StyleSheet.create({
  backbtnContainer: {
    paddingTop: 24,
    paddingLeft: 24,
    paddingBottom: 17,
    width: '100%',
  },
  backButton: {
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
  progressBarWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 6,
  },
  progress: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  innerContent: {
    width: '100%',
    maxWidth: 328,
    margin: 'auto',
    flexGrow: 1,
    paddingTop: 41,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.semiBold,
    letterSpacing: -1,
    color: Colors.textDark,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textLight,
  },
  noContactsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  noContactsText: {
    fontSize: 18,
    fontFamily: Fonts.medium,
    color: Colors.textDark,
    marginTop: 16.4,
  },

  addButton: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientButton: {
    marginBottom: 26,
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
  addbuttonText: {
    marginLeft: 8,
    fontSize: 16,
    color: Colors.backgroundColor,
    fontFamily: Fonts.semiBold,
  },
});
