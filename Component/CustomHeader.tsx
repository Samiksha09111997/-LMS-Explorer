import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Scale from './Scale';

const CustomHeader = ({ title, showBack, onBackPress }) => {
  return (
    <>
    <StatusBar
      translucent
      backgroundColor="transparent"
      barStyle="light-content"
    />
    <LinearGradient
      colors={['#4a00e0',  'white']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      <View style={styles.container}>
        {showBack && (
          <TouchableOpacity onPress={onBackPress} style={styles.icon}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
        <View style={styles.iconPlaceholder} />
      </View>
    </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: Scale(150),
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin:Scale(20),
    marginTop:Scale(50),
    justifyContent:'flex-start',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold'
  },
  icon: {
    padding: 5,
    marginRight:Scale(50)
  },
  iconPlaceholder: {
    width: 32,
  },
});

export default CustomHeader;
