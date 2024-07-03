import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { styled } from 'nativewind';
import Feather from '@expo/vector-icons/Feather';
import CerrarSesionButton from '../components/CerrarSesionButton';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledModal = styled(Modal);
const StyledPressable = styled(Pressable);

const Perfil = ( { navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const usuario = {
    grado: "Coronel",
    codigoDePlaca: "11111111111",
    persona: {
      nombre: "Tomas",
      apellido: "Poblete",
      fechaDeNacimiento: "2001-08-20",
      direccion: "7 oriente 13 norte #2473",
      celular: "+569 79643904"
    }
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-white items-center pt-5">
      <StyledView className="w-11/12 bg-white rounded-2xl shadow-lg mt-6 mb-5">
        <StyledView className="bg-green-600 rounded-t-2xl p-3">
          <StyledText className="text-white text-lg font-bold text-center">Informacion</StyledText>
        </StyledView>
        <StyledView className="p-4">
          <StyledText className="text-black text-lg font-bold mb-2">{`${usuario.persona.nombre} ${usuario.persona.apellido}`}</StyledText>
          <StyledView className="flex-row justify-between mb-1">
            <StyledText className="font-bold">Grado:</StyledText>
            <StyledText className="ml-2 flex-shrink">{usuario.grado}</StyledText>
          </StyledView>
          <StyledView className="flex-row justify-between mb-1">
            <StyledText className="font-bold">Código de Placa:</StyledText>
            <StyledText className="ml-2 flex-shrink">{usuario.codigoDePlaca}</StyledText>
          </StyledView>
          <StyledView className="flex-row justify-between mb-1">
            <StyledText className="font-bold">Fecha de Nacimiento:</StyledText>
            <StyledText className="ml-2 flex-shrink">{usuario.persona.fechaDeNacimiento}</StyledText>
          </StyledView>
          <StyledView className="flex-row justify-between mb-1">
            <StyledText className="font-bold">Dirección:</StyledText>
            <StyledText className="ml-2 flex-shrink">{usuario.persona.direccion}</StyledText>
          </StyledView>
          <StyledView className="flex-row justify-between mb-1">
            <StyledText className="font-bold">Celular:</StyledText>
            <StyledText className="ml-2 flex-shrink">{usuario.persona.celular}</StyledText>
          </StyledView>
        </StyledView>
      </StyledView>

      {/* Botones adicionales */}
      <StyledView className="w-11/12">
        <StyledTouchableOpacity className="flex-row items-center bg-gray-100 rounded-2xl p-4 mb-2">
          <StyledView className="w-10 h-10 bg-green-600 rounded-full items-center justify-center mr-4">
            <Feather name="at-sign" size={24} color="white" />
          </StyledView>
          <StyledView>
            <StyledText className="font-bold">Configuración de Perfil</StyledText>
            <StyledText className="text-gray-600">Ver y modificar usuario</StyledText>
          </StyledView>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity className="flex-row items-center bg-gray-100 rounded-2xl p-4 mb-2">
          <StyledView className="w-10 h-10 bg-green-600 rounded-full items-center justify-center mr-4">
            <Feather name="archive" size={24} color="white" />
          </StyledView>
          <StyledView>
            <StyledText className="font-bold">Privacidad</StyledText>
            <StyledText className="text-gray-600">Cambiar tu contraseña</StyledText>
          </StyledView>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity className="flex-row items-center bg-gray-100 rounded-2xl p-4 mb-2" onPress={() => setModalVisible(true)}>
          <StyledView className="w-10 h-10 bg-green-600 rounded-full items-center justify-center mr-4">
            <Feather name="info" size={24} color="white" />
          </StyledView>
          <StyledView>
            <StyledText className="font-bold">Acerca de</StyledText>
            <StyledText className="text-gray-600">Datos de la aplicación</StyledText>
          </StyledView>
        </StyledTouchableOpacity>
      </StyledView>

      <CerrarSesionButton navigation={navigation} />

      {/* Pop Up Acerca de */}
      <StyledModal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <StyledView className="flex-1 justify-center items-center">
          <StyledView className="bg-white rounded-2xl p-6 w-3/4 items-center shadow-lg">
            <StyledText className="text-black text-xl font-bold mb-4">Acerca de</StyledText>
            <StyledText className="text-gray-800">Criminal Scan Copyright 2024 Cone y sus Zanahorias. All rights reserved.</StyledText>
            <StyledPressable className="bg-green-600 rounded-2xl p-4 mt-6 w-full items-center" onPress={() => setModalVisible(false)}>
              <StyledText className="text-white font-bold">Cerrar</StyledText>
            </StyledPressable>
          </StyledView>
        </StyledView>
      </StyledModal>
    </StyledSafeAreaView>
  );
};

export default Perfil;


