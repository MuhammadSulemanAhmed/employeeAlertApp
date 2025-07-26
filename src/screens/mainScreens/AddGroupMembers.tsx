import React, { useState , useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppStack';
import GroupCreateDialog from '../../components/GroupCreateDialog';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

type NavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'AddGroupMembers'
>;

const dummyContacts = [
  {
    id: '1',
    name: 'Jacob Jones',
    avatar: require('../../../assets/images/Jacob.png'),
  },
  {
    id: '2',
    name: 'Eleanor Pena',
    avatar: require('../../../assets/images/Eleanor.png'),
  },
  {
    id: '3',
    name: 'Theresa Webb',
    avatar: require('../../../assets/images/Theresa.png'),
  },
  {
    id: '4',
    name: 'Ronald Richards',
    avatar: require('../../../assets/images/Ronald.png'),
  },
  {
    id: '5',
    name: 'Marvin McKinney',
    avatar: require('../../../assets/images/Marvin.png'),
  },
  {
    id: '6',
    name: 'Ronald Richards',
    avatar: require('../../../assets/images/Ronald.png'),
  },
  {
    id: '7',
    name: 'Eleanor Pena',
    avatar: require('../../../assets/images/Eleanor.png'),
  },
];

const AddGroupMembers = () => {
  const navigation = useNavigation<NavigationProp>();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const [showDialog, setShowDialog] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedIds, setSelectedIds] = useState(['1', '2', '5']);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  const selectedMembers = dummyContacts.filter(item =>
    selectedIds.includes(item.id),
  );

  useFocusEffect(
  useCallback(() => {
    return () => {
      setShowDialog(false); 
    };
  }, [])
);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={40}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            justifyContent: isLandscape ? 'center' : 'flex-start',
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.innerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={24} color="#1E232C" />
          </TouchableOpacity>

          <Text style={styles.title}>Add Members to Group</Text>

          <View style={styles.searchContainer}>
            <Feather
              name="search"
              size={16}
              color={Colors.primary}
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search contact"
              placeholderTextColor="#8391A1"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {selectedMembers.length > 0 && (
            <View style={styles.selectedList}>
              {selectedMembers.map(member => (
                <View key={member.id} style={styles.selectedItem}>
                  <Image source={member.avatar} style={styles.avatar} />
                  <Text style={styles.selectedName}>
                    {member.name.split(' ')[0]}
                  </Text>
                  <TouchableOpacity
                    onPress={() => toggleSelect(member.id)}
                    style={styles.removeIcon}
                  >
                    <Ionicons
                      name="close-circle-outline"
                      size={9}
                      color="#6A707C"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <View>
            {dummyContacts.map((contact, index) => {
              const isLast = index === dummyContacts.length - 1;

              return (
                <TouchableOpacity
                  key={contact.id}
                  style={[styles.contactRow, isLast && { marginBottom: 0 }]}
                  onPress={() => toggleSelect(contact.id)}
                >
                  <View style={styles.contactContainer}>
                    <Image
                      source={contact.avatar}
                      style={styles.contactAvatar}
                    />
                    <Text style={styles.contactName}>{contact.name}</Text>
                  </View>
                  <Ionicons
                    name={
                      selectedIds.includes(contact.id)
                        ? 'checkbox'
                        : 'square-outline'
                    }
                    size={20}
                    color={
                      selectedIds.includes(contact.id)
                        ? Colors.primary
                        : '#1C1C1C'
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0, 0.85]}
            style={styles.gradientButton}
          >
            <TouchableOpacity
              onPress={() => setShowDialog(true)}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>Create</Text>
            </TouchableOpacity>
          </LinearGradient>
          {showDialog && (
            <GroupCreateDialog
              visible={showDialog}
              onClose={() => setShowDialog(false)}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddGroupMembers;

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: Colors.backgroundColor,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 328,
    alignSelf: 'center',
  },
  backButton: {
    width: 41,
    height: 41,
    borderRadius: 12,
    marginBottom: 28,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.semiBold,
    color: Colors.textDark,
    marginBottom: 25,
    letterSpacing: -1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8F9',
    borderRadius: 8,
    paddingHorizontal: 16,
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
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: '#8391A1',
    paddingVertical: 0,
  },
  selectedList: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
    paddingVertical: 10,
  },
  selectedItem: {
    alignItems: 'center',
    marginRight: 20,
    position: 'relative',
  },
  avatar: {
    width: 37.5,
    height: 37.5,
    borderRadius: 26,
    marginBottom: 4,
  },
  selectedName: {
    fontSize: 11,
    fontFamily: Fonts.medium,
    color: Colors.textDark,
  },
  removeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#F7F8F9',
    borderRadius: 9,
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 15,
    paddingHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: '#E8ECF4',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  contactAvatar: {
    width: 22,
    height: 22,
    borderRadius: 20,
    marginRight: 12,
  },
  contactName: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: Colors.textDark,
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
