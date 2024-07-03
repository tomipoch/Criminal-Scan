import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { CriminalsContext } from '../components/ApiCriminales';
import CriminalesMasBuscados from '../components/CriminalesMasBuscados'; // Importa CriminalesMasBuscados
import EscaneosRecientes from '../components/EscaneosRecientes'; // Importa EscaneosRecientes

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

const Inicio = () => {
  const navigation = useNavigation();
  const apiResponse = useContext(CriminalsContext);

  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <StyledView className="p-6">
          <StyledText className="text-black text-5xl font-bold mt-4">Inicio</StyledText>

          <StyledText className="text-black text-2xl font-bold mt-8 mb-4">Criminales más Buscados</StyledText>
          <CriminalesMasBuscados criminals={apiResponse && apiResponse.Datos} />

          
          <StyledTouchableOpacity
            className="bg-green-600 rounded-2xl p-4 mt-6 w-full items-center flex-row justify-center shadow-md"
            onPress={() => navigation.navigate('Asistencia')}
          >
            <Feather name="help-circle" size={24} color="white" className="mr-2" />
            <StyledText className="text-white font-bold text-lg">Asistencia</StyledText>
          </StyledTouchableOpacity>

          <StyledText className="text-black text-2xl font-bold mt-8 mb-4">Escaneos Recientes</StyledText>
          <EscaneosRecientes />
        </StyledView>
      </ScrollView>
    </StyledSafeAreaView>
  );
};

export default Inicio;
