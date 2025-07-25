import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Group from '../../../assets/svg/Group.svg';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

type NavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'CreateGroup'
>;

const CreateGroup = () => {
  const navigation = useNavigation<NavigationProp>();
  const [groupName, setGroupName] = useState('');
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const handleSubmit = () => {
    navigation.navigate('AddGroupMembers');
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
              <View>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
                >
                  <Ionicons name="chevron-back" size={24} color="#1E232C" />
                </TouchableOpacity>

                <Text style={styles.title}>Create Group</Text>
                <Text style={styles.label}>Enter Group Name</Text>

                <View style={styles.inputContainer}>
                  <Group width={20} height={20} style={{ marginRight: 10 }} />
                  <TextInput
                    placeholder="Please name your group"
                    placeholderTextColor="#8391A1"
                    value={groupName}
                    onChangeText={setGroupName}
                    style={styles.input}
                  />
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
                  onPress={handleSubmit}
                  style={styles.saveButton}
                >
                  <Text style={styles.saveButtonText}>Add Members</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreateGroup;

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
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.semiBold,
    color: Colors.textDark,
    marginBottom: 25,
    letterSpacing: -1,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textDark,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8F9',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    fontFamily: Fonts.medium,
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: '#8391A1',
    paddingVertical: 0,
  },
  gradientButton: {
    marginTop: 30,
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
  saveButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 16,
    color: Colors.backgroundColor,
    fontFamily: Fonts.semiBold,
  },
});
