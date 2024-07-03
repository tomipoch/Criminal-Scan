import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

const ConfiguracionPerfil = ({ navigation }) => {
  const [nombre, setNombre] = useState('Matías Jesús');
  const [apellido, setApellido] = useState('Varas Aquín');
  const [fechaDeNacimiento, setFechaDeNacimiento] = useState('1990-01-01');
  const [direccion, setDireccion] = useState('Calle Falsa 123');
  const [celular, setCelular] = useState('123456789');

  const handleSave = () => {
    // Aquí puedes agregar la lógica para guardar los datos actualizados
    console.log('Datos guardados:', { nombre, apellido, fechaDeNacimiento, direccion, celular });
    navigation.goBack(); // Volver a la pantalla anterior
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <StyledScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 30 }}>
      <StyledView className="items-center mb-6">
          <StyledText className="mt-4 text-gray-700 font-bold text-2xl text-center">Configuracion de Perfil</StyledText>
        </StyledView>
        <StyledView className="items-center mb-6">
          <StyledText className="text-gray-700 text-lg">Aquí puedes modificar la configuración de tu perfil.</StyledText>
        </StyledView>

        <StyledText className="text-gray-700 text-lg mb-2">Nombre</StyledText>
        <StyledTextInput
          className="border border-gray-300 rounded-lg p-4 mb-4 text-gray-900"
          value={nombre}
          onChangeText={setNombre}
        />

        <StyledText className="text-gray-700 text-lg mb-2">Apellido</StyledText>
        <StyledTextInput
          className="border border-gray-300 rounded-lg p-4 mb-4 text-gray-900"
          value={apellido}
          onChangeText={setApellido}
        />

        <StyledText className="text-gray-700 text-lg mb-2">Fecha de Nacimiento</StyledText>
        <StyledTextInput
          className="border border-gray-300 rounded-lg p-4 mb-4 text-gray-900"
          value={fechaDeNacimiento}
          onChangeText={setFechaDeNacimiento}
        />

        <StyledText className="text-gray-700 text-lg mb-2">Dirección</StyledText>
        <StyledTextInput
          className="border border-gray-300 rounded-lg p-4 mb-4 text-gray-900"
          value={direccion}
          onChangeText={setDireccion}
        />

        <StyledText className="text-gray-700 text-lg mb-2">Celular</StyledText>
        <StyledTextInput
          className="border border-gray-300 rounded-lg p-4 mb-4 text-gray-900"
          value={celular}
          onChangeText={setCelular}
        />

        <StyledTouchableOpacity
          className="bg-green-600 rounded-2xl p-4 mt-6 w-full items-center"
          onPress={handleSave}
        >
          <StyledText className="text-white font-bold">Guardar</StyledText>
        </StyledTouchableOpacity>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};

export default ConfiguracionPerfil;
