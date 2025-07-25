// EmergencyContactsList.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppStack';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type NavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'EmergencyContactsList'
>;

const EmergencyContactsList = () => {
  const navigation = useNavigation<NavigationProp>();
  const screen = useWindowDimensions();
  const isLandscape = screen.width > screen.height;
  const [contacts, setContacts] = useState([
    { id: '1', name: 'Amy Adam' },
    { id: '2', name: 'Amy Adam' },
  ]);

  const handleDelete = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={[
          styles.headerRow,
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
        <TouchableOpacity
          onPress={() => navigation.navigate('MonitoredContacts')}
        >
          <Text style={styles.nextText}>Next</Text>
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
        <View style={styles.progress} />
        <View style={[styles.progress, { marginLeft: 4 }]} />
        <View style={styles.incomplete} />
      </View>
      <View style={[styles.innerContent, { width: screen.width - 48 }]}>
        <View style={styles.topContent}>
          <Text style={styles.title}>Add Emergency Contacts</Text>
          <Text style={styles.description}>
            To instantly alert employers and promote team safety while on site.
          </Text>

          <View>
            {contacts.map(contact => (
              <View key={contact.id} style={styles.contactItem}>
                <View style={styles.userIconWrapper}>
                  <View style={styles.userIconInner}>
                    <Ionicons name="person" size={16} color="#50CE76" />
                  </View>
                </View>
                <Text style={styles.contactName}>{contact.name}</Text>
                <TouchableOpacity onPress={() => handleDelete(contact.id)}>
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={20}
                    color="#FF6D6D"
                    style={{ paddingVertical: 5 }}
                  />
                </TouchableOpacity>
              </View>
            ))}
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
            style={styles.addMoreButton}
            onPress={() => navigation.navigate('EmergencyContactForm')}
          >
            <Ionicons name="add-circle" size={22} color="#fff" />
            <Text style={styles.addMoreText}>Add More</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

export default EmergencyContactsList;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.backgroundColor,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 24,
    paddingLeft: 24,
    paddingBottom: 17,
    paddingRight: 23,
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
  nextText: {
    fontSize: 20,
    fontFamily: Fonts.medium,
    color: '#6A707C',
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
  incomplete: {
    flex: 1,
    backgroundColor: '#EEF0F3',
    marginLeft: 4,
  },
  innerContent: {
    width: '100%',
    maxWidth: 328,
    margin: 'auto',
    flexGrow: 1,
    paddingTop: 41,
    justifyContent: 'space-between',
  },
  topContent: {
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.semiBold,
    color: Colors.textDark,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textLight,
    marginBottom: 25,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8F9',
    width: '100%',
    maxWidth: 328,
    height: 52,
    paddingVertical: 10.5,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8ECF4',
    justifyContent: 'space-between',
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  userIconWrapper: {
    marginRight: 15,
    width: 31,
    height: 31,
    paddingVertical: 5,
  },
  userIconInner: {
    backgroundColor: '#50CE7612',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 27.11,
    height: 27.13,
    padding: 3,
  },
  contactName: {
    flex: 1,
    fontSize: 17,
    fontFamily: Fonts.medium,
    color: Colors.textDark,
    paddingVertical: 5,
  },
  addMoreButton: {
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
  addMoreText: {
    marginLeft: 8,
    fontSize: 16,
    color: Colors.backgroundColor,
    fontFamily: Fonts.semiBold,
  },
});
