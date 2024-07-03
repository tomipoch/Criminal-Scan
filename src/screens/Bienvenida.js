import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import { StatusBar } from 'expo-status-bar';

const Bienvenida = ({ navigation }) => {
  return (
    <View className='flex-1 justify-center items-center flex-col'>
      <View className='items-center'>
        <Image
          className='w-32 h-32 mt-6'
          source={require('../../assets/icon.png')}
        />
        <Text className='text-[#007328] text-[50px] font-bold'>Criminal</Text>
        <Text className='text-[40px]'>Scan</Text>
      </View>
      <View className='mt-[200px] items-end'>
        <TouchableOpacity
          className='bg-[#007328] py-3 px-6 rounded-lg'
          onPress={() => navigation.navigate('Login')} // Navega a la pantalla de Login
        >
          <Text className='text-white text-lg font-semibold'>Iniciar Sesion</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default Bienvenida;
