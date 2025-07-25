import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native';


type Props = {
  isOn: boolean;
  onToggle: () => void;
};

const CustomToggle:React.FC<Props> = ({isOn , onToggle}) => {
  return (
     <TouchableOpacity
      style={[
        styles.track,
        { backgroundColor: isOn ? '#3FC06A' : '#ccc' },
      ]}
      activeOpacity={0.8}
      onPress={onToggle}
    >
      <View
        style={[
          styles.thumb,
          { marginLeft: isOn ? 14 : 1 },
        ]}
      />
    </TouchableOpacity>
  )
}

export default CustomToggle


const styles = StyleSheet.create({
  track: {
    width: 32,
    height: 18,
    paddingVertical:6,
    alignItems:'center',
    borderRadius: 20,
    justifyContent: 'center',
  },
  thumb: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
});