import React from 'react'
import { View, Text, Button } from 'react-native';
const BasicInfo = () => {
  return (
     <View>
      <Text>Basic Info Screen</Text>
      <Button title="Next" onPress={() => navigation.navigate('EmergencyContacts')} />
    </View>
  )
}

export default BasicInfo