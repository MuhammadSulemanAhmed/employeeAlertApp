import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, } from 'react-native';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';


const AlertScreen = () => {
  const fakeAlerts = [
    { id: 1, date: 'Today', time: '3:22', name: 'Tuna ' },
    { id: 2, date: 'May 9', time: '3:24', name: 'Amy' },
    { id: 3, date: 'Today', time: '3:26', name: 'Adan' },
    { id: 4, date: 'July 2', time: '3:28', name: 'Amy Adan' },
    { id: 5, date: 'Today', time: '3:30', name: 'Jhon' },
  ];
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions(window);
    });
    return () => subscription?.remove();
  }, []);


  return (
 <ScrollView>
      <View style={[styles.container, { minHeight: screenDimensions.height }]}>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.header}>Hi Tuna</Text>
            <Text style={styles.clear}>Clear all</Text>
          </View>
          <View style={styles.alertHeaderRow}>
            <View>
              <Text style={styles.alertHistory}>Alert History</Text>
              <Text style={styles.hours}>Past 48 hours</Text>
            </View>
            <View style={styles.icon}>
              <View style={styles.line} />
              <View style={styles.lines} />
              <View style={styles.liness} />
            </View>
          </View>
          {fakeAlerts.map((item) => (
            <View key={item.id} style={styles.fakeBox}>
              <View
                style={[
                  styles.dateBox,
                  {
                    backgroundColor:
                      item.id === 1 || item.id === 3
                        ? '#FF6D6D'
                        : item.id === 2 || item.id === 4
                          ? '#FFB845'
                          : '#FF6D6D',
                  },
                ]}
              >
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.monthText}>{item.time}</Text>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.fakeText}>at Morton Hospital, MA 02023</Text>
              </View>
            </View>
          ))}
          <Text style={styles.updated}>No More Updates</Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default AlertScreen

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
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 36,
    marginTop: 26,
  },
  header: {
    fontFamily: Fonts.semiBold,
    fontSize: 28,
    lineHeight: 16 * 1.3,
    letterSpacing: -1,
    marginBottom: 2,
    color: Colors.textDark,
  },
  clear: {
    fontFamily: Fonts.medium,
    color: '#FF6D6D',
    fontSize: 16,
    letterSpacing: -.5,
    lineHeight: 16 * 1.3,
    marginBottom: 2,
  },
  alertHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
  },
  alertHistory: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    marginBottom: 2,
    lineHeight: 16 * 1.3,
    color: Colors.textDark,
  },
  hours: {
    fontFamily: Fonts.medium,
    lineHeight: 16 * 1.3,
    fontSize: 16,
    color: '#6A707C',
    marginBottom: 2,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    height: 24,
    width: 24,
  },
  line: {
    backgroundColor: Colors.textDark,
    width: 22,
    height: 2,
    borderRadius: 1.5,
  },
  lines: {
    width: 17,
    height: 2,
    borderRadius: 1.5,
    backgroundColor: Colors.textDark,
  },
  liness: {
    width: 12,
    height: 2,
    borderRadius: 1.5,
    backgroundColor: Colors.textDark,
  },
  fakeBox: {
    width: 328,
    height: 62,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.backgroundColor,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  dateBox: {
    width: 41,
    height: 42,
    borderRadius: 3.7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:8,
  },
  dateText: {
    fontSize: 10,
    fontFamily: Fonts.semiBold,
    letterSpacing: 0,
    marginBottom: 1.48,
    color: Colors.backgroundColor,
  },
  monthText: {
    fontSize: 10,
    fontFamily: Fonts.semiBold,
    letterSpacing: 0,
    marginBottom: 1.48,
    color: Colors.backgroundColor,
  },
  name: {
    fontSize: 16,
    color: Colors.textDark,
    fontFamily: Fonts.bold,
    lineHeight: 14 * 1.3,
  },
  fakeText: {
    fontSize: 14,
    color: '#8391A1',
    lineHeight: 14 * 1.3,
    marginBottom: 2,
  },
  updated: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    lineHeight: 14 * 1.3,
    color: '#CCCCCC',
    marginTop: 20,
    alignSelf: 'center'
  }
});