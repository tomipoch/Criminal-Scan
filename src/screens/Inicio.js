import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { CriminalsContext } from '../components/ApiCriminales';
import { ScanContext } from '../components/ScanProvider';
import CriminalesMasBuscados from '../components/CriminalesMasBuscados'; // Importa CriminalesMasBuscados

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

const Inicio = () => {
  const navigation = useNavigation();
  const apiResponse = useContext(CriminalsContext);
  const { scans } = useContext(ScanContext);

  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <StyledView className="p-4">
          <StyledText className="text-black text-5xl font-bold mt-4">Inicio</StyledText>

          <StyledTouchableOpacity
            className="bg-green-600 rounded-2xl p-4 mt-6 w-full items-center flex-row justify-center"
            onPress={() => navigation.navigate('Asistencia')}
          >
            <Feather name="help-circle" size={24} color="white" className="mr-2" />
            <StyledText className="text-white font-bold">Asistencia</StyledText>
          </StyledTouchableOpacity>

          <StyledText className="text-black text-2xl font-bold mt-4">Criminales más Buscados</StyledText>
          <CriminalesMasBuscados criminals={apiResponse && apiResponse.Datos} />

          <StyledText className="text-black text-2xl font-bold mt-4">Escaneos Recientes</StyledText>
          <StyledView>
            {scans.map((scan, index) => (
              <StyledView key={index} className="mt-4 p-4 bg-gray-100 rounded-lg shadow-lg">
                <StyledImage
                  source={{ uri: scan.imageUri }}
                  style={{ width: 100, height: 100, marginBottom: 10, borderRadius: 10 }}
                />
                <StyledText className="text-black text-lg font-semibold">Antecedentes:</StyledText>
                <StyledText> Nombre: {scan.apiResponse.personaconantecedentes.persona.nombre} </StyledText>
                <StyledText> Apellido: {scan.apiResponse.personaconantecedentes.persona.apellido}</StyledText>
                <StyledText> Fecha de Nacimiento: {scan.apiResponse.personaconantecedentes.persona.fechaDeNacimiento}</StyledText>
                <StyledText> Dirección: {scan.apiResponse.personaconantecedentes.persona.direccion}</StyledText>
                <StyledText> Antecedentes: {scan.apiResponse.antecedentes.map((antecedente, idx) => (
                  <Text key={idx}>{antecedente.descripcion}{'\n'}</Text>
                ))}</StyledText>
              </StyledView>
            ))}
          </StyledView>

        </StyledView>
      </ScrollView>



      
    </StyledSafeAreaView>
  );
};

export default Inicio;