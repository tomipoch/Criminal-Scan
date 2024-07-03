import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

const Privacidad = ({ navigation }) => {
  const [antiguaContrasena, setAntiguaContrasena] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [repetirNuevaContrasena, setRepetirNuevaContrasena] = useState('');

  const handleSave = () => {
    // Aquí puedes agregar la lógica para guardar la nueva contraseña
    if (nuevaContrasena === repetirNuevaContrasena) {
      console.log('Contraseña actualizada:', { antiguaContrasena, nuevaContrasena });
      navigation.goBack(); // Volver a la pantalla anterior
    } else {
      console.log('Las nuevas contraseñas no coinciden');
      // Puedes mostrar un mensaje de error aquí
    }
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <StyledScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 30 }}>
      <StyledView className="mb-6">
          <StyledText className="mt-4 text-gray-700 font-bold text-2xl text-center">Privacidad</StyledText>
        </StyledView>
        <StyledView className="mb-6">
          <StyledText className="text-gray-700 text-lg">Cambia tu contraseña para mantener tu cuenta segura.</StyledText>
        </StyledView>

        <StyledText className="text-gray-700 text-lg mb-2">Antigua Contraseña</StyledText>
        <StyledTextInput
          className="border border-gray-300 rounded-lg p-4 mb-4 text-gray-900"
          secureTextEntry
          value={antiguaContrasena}
          onChangeText={setAntiguaContrasena}
        />

        <StyledText className="text-gray-700 text-lg mb-2">Nueva Contraseña</StyledText>
        <StyledTextInput
          className="border border-gray-300 rounded-lg p-4 mb-4 text-gray-900"
          secureTextEntry
          value={nuevaContrasena}
          onChangeText={setNuevaContrasena}
        />

        <StyledText className="text-gray-700 text-lg mb-2">Repetir Nueva Contraseña</StyledText>
        <StyledTextInput
          className="border border-gray-300 rounded-lg p-4 mb-4 text-gray-900"
          secureTextEntry
          value={repetirNuevaContrasena}
          onChangeText={setRepetirNuevaContrasena}
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

export default Privacidad;
