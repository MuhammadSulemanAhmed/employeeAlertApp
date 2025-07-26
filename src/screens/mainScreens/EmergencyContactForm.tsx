import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import ContactBook from '../../../assets/svg/contactBook.svg';

type NavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'EmergencyContactForm'
>;

const EmergencyContactForm = () => {
  const navigation = useNavigation<NavigationProp>();
  const screen = useWindowDimensions();
  const isLandscape = screen.width > screen.height;

  const [contact, setContact] = useState({
    name: '',
    phone: '',
    projectManager: '',
    productOwner: '',
  });

  const handleSave = () => {
    navigation.navigate('EmergencyContactsList');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: Colors.backgroundColor,
          }}
          keyboardShouldPersistTaps="handled"
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
                <View style={styles.progress} />
                <View style={[styles.progress, { marginLeft: 4 }]} />
                <View style={styles.incomplete} />
              </View>

              <View style={[styles.innerContent, { width: screen.width - 48 }]}>
                <View>
                  <Text style={styles.title}>Add Emergency Contact</Text>
                  <Text style={styles.description}>
                    To instantly alert employers and promote team safety while
                    on site.
                  </Text>

                  <View style={styles.formContainer}>
                    <View style={styles.fieldContainer}>
                      <Text style={styles.label}>Emergent Contact Name *</Text>
                      <TextInput
                        placeholder="Amy Adam"
                        placeholderTextColor="#8391A1"
                        value={contact.name}
                        onChangeText={text =>
                          setContact({ ...contact, name: text })
                        }
                        style={styles.input}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <Text style={styles.label}>
                        Emergent Contact Phone Number *
                      </Text>
                      <View style={styles.phoneInputContainer}>
                        <ContactBook
                          width={20}
                          height={20}
                          style={styles.contactIcon}
                        />
                        <TextInput
                          placeholder="(954) 123 9303"
                          placeholderTextColor="#8391A1"
                          value={contact.phone}
                          onChangeText={text =>
                            setContact({ ...contact, phone: text })
                          }
                          keyboardType="phone-pad"
                          style={styles.input}
                        />
                      </View>
                    </View>

                    <View style={styles.fieldContainer}>
                      <Text style={styles.label}>
                        Project Manager (if applicable)
                      </Text>
                      <TextInput
                        placeholder="Project Manager"
                        placeholderTextColor="#8391A1"
                        value={contact.projectManager}
                        onChangeText={text =>
                          setContact({ ...contact, projectManager: text })
                        }
                        style={styles.input}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <Text style={styles.label}>
                        Product Owner (if applicable)
                      </Text>
                      <TextInput
                        placeholder="Product Owner"
                        placeholderTextColor="#8391A1"
                        value={contact.productOwner}
                        onChangeText={text =>
                          setContact({ ...contact, productOwner: text })
                        }
                        style={styles.input}
                      />
                    </View>
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
                    style={styles.saveButton}
                    onPress={handleSave}
                  >
                    <Text style={styles.saveButtonText}>Add Contact</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EmergencyContactForm;

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
  formContainer: {
    marginTop: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textDark,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F7F8F9',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    height: 44,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    color: '#8391A1',
    fontFamily: Fonts.medium,
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactIcon: {
    position: 'absolute',
    right: 16,
    zIndex: 1,
  },
  saveButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
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
  saveButtonText: {
    fontSize: 16,
    color: Colors.backgroundColor,
    fontFamily: Fonts.semiBold,
  },
});
