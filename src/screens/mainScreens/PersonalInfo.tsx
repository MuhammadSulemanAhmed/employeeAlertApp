import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppStack';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

type NavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'PersonalInfo'
>;

const PersonalInfo = () => {
  const navigation = useNavigation<NavigationProp>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dobDate, setDobDate] = useState<Date | null>(null);
  const [dob, setDob] = useState('');
  const [isContractor, setIsContractor] = useState(false);
  const [address, setAddress] = useState('');
  const screen = useWindowDimensions();
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    dob?: string;
  }>({});

  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get('window'),
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (event?.type === 'set' && selectedDate) {
      setDobDate(selectedDate);
      const formatted = selectedDate.toLocaleDateString('en-Us');
      setDob(formatted);
      if (errors.dob) {
        setErrors(prev => ({ ...prev, dob: undefined }));
      }
    }
  };
  const validate = () => {
    const newErrors: { firstName?: string; lastName?: string; dob?: string } =
      {};
    if (!firstName.trim()) newErrors.firstName = 'Required *';
    if (!dob.trim()) newErrors.dob = 'Required *';
    if (!lastName.trim()) newErrors.lastName = 'Required *';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNext = () => {
    if (validate()) {
      navigation.navigate('Tabs',{screen:'Account'});
    }
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
            minHeight: screenDimensions.height,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.container, { minHeight: screenDimensions.height }]}>
            <View style={styles.content}>
              <View style={styles.topContent}>
                <TouchableOpacity
                  style={styles.backBtn}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="chevron-back" size={19} color="#1E232C" />
                </TouchableOpacity>

                <Text style={styles.heading}>Personal Information</Text>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>First Name *</Text>
                  <TextInput
                    placeholder={errors.firstName ? '' : 'Tuna'}
                    placeholderTextColor="#8391A1"
                    value={firstName}
                    onChangeText={text => {
                      setFirstName(text);
                      if (errors.firstName)
                        setErrors(prev => ({ ...prev, firstName: undefined }));
                    }}
                    style={[
                      styles.input,
                      {
                        borderWidth: 1,
                        borderColor: errors.firstName
                          ? '#FF000080'
                          : Colors.borderColor,
                      },
                    ]}
                  />
                  {errors.firstName && (
                    <Text style={styles.errorMessage}>{errors.firstName}</Text>
                  )}
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Last Name *</Text>
                  <View
                    style={[
                      styles.passwordContainer,
                      {
                        borderColor: errors.lastName
                          ? '#FF000080'
                          : Colors.borderColor,
                      },
                    ]}
                  >
                    <TextInput
                      placeholder={errors.lastName ? ' ' : 'Valentine'}
                      placeholderTextColor="#8391A1"
                      value={lastName}
                      onChangeText={text => {
                        setLastName(text);
                        if (errors.lastName)
                          setErrors(prev => ({ ...prev, lastName: undefined }));
                      }}
                      style={styles.passwordInput}
                    />
                    <Ionicons
                      name="lock-closed-outline"
                      size={18}
                      color="#8391A1"
                    />
                  </View>
                  {errors.lastName && (
                    <Text style={styles.errorMessage}>{errors.lastName}</Text>
                  )}
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>DOB (mm/dd/yyyy) *</Text>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    activeOpacity={0.8}
                  >
                    <TextInput
                      editable={false}
                      placeholder={errors.dob ? '' : '02/14/2024'}
                      placeholderTextColor="#8391A1"
                      value={dob}
                      style={[
                        styles.input,
                        {
                          borderWidth: 1,
                          borderColor: errors.dob
                            ? '#FF000080'
                            : Colors.borderColor,
                        },
                      ]}
                    />
                  </TouchableOpacity>
                  {errors.dob && (
                    <Text style={styles.errorMessage}>{errors.dob}</Text>
                  )}
                  {showDatePicker && (
                    <DateTimePicker
                      value={dobDate || new Date()}
                      mode="date"
                      display="spinner"
                      maximumDate={new Date()}
                      onChange={handleDateChange}
                    />
                  )}
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Address</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Morton Campus, Tauton, MA"
                    placeholderTextColor="#8391A1"
                    value={address}
                    onChangeText={setAddress}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={[styles.label, { fontSize: 18, marginTop: 25 }]}>
                    Contact Info
                  </Text>
                  <View style={styles.contactContainer}>
                    <View style={styles.contactItem}>
                      <Text style={styles.contactText}>+1 300-2123-2222</Text>
                      <TouchableOpacity>
                        <Text style={styles.contacteditText}>Edit</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.contactItem}>
                      <Text style={styles.contactText}>
                        tuna.valen@gmail.com
                      </Text>
                      <TouchableOpacity>
                        <Text style={styles.contacteditText}>Edit</Text>
                      </TouchableOpacity>
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
                    style={styles.loginButton}
                    onPress={handleNext}
                  >
                    <Text style={styles.loginText}>Update</Text>
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

export default PersonalInfo;

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
  heading: {
    fontSize: 30,
    color: Colors.textDark,
    marginVertical: 20,
    fontFamily: Fonts.bold,
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
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: '#F7F8F9',
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#8391A1',
    width: '100%',
    height: 46,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#8391A1',
    fontFamily: Fonts.medium,
    paddingVertical: 0,
  },
  errorMessage: {
    color: '#FB7C7D',
    marginTop: 4,
    fontSize: 10,
    fontFamily: Fonts.semiBold,
  },
  contactContainer: {
    backgroundColor: Colors.backgroundColor,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    color: '#8391A1',
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 14,
    borderBottomColor: '#EFEFEF',
  },
  contactText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.textDark,
  },
  contacteditText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.primary,
    textDecorationLine: 'underline',
    textDecorationColor: Colors.primary,
    textDecorationStyle: 'solid',
  },
  loginButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  gradientButton: {
    marginTop: 40,
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
});