import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const CriminalesMasBuscados = ({ criminals }) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="mt-4">
      {criminals && criminals.map((criminal, index) => (
        <StyledView key={index} className="bg-green-600 rounded-2xl overflow-hidden mr-4 w-52 shadow-lg">
          <StyledImage
            source={{ uri: `https://wpcpsvb9-8000.brs.devtunnels.ms${criminal.personaConAntecedentes.imagen}` }}
            className="w-full h-56"
          />
          <StyledView className="p-4">
            <StyledText className="text-white text-lg font-bold mb-2">
              {criminal.personaConAntecedentes.persona.nombre} {criminal.personaConAntecedentes.persona.apellido}
            </StyledText>
            <StyledText className="text-white text-sm">
              Fecha de Nacimiento: {criminal.personaConAntecedentes.persona.fechaDeNacimiento}
            </StyledText>
            <StyledText className="text-white text-sm">
              Dirección: {criminal.personaConAntecedentes.persona.direccion}
            </StyledText>
            <StyledText className="text-white text-sm">
              Celular: {criminal.personaConAntecedentes.persona.celular}
            </StyledText>
          </StyledView>
        </StyledView>
      ))}
    </ScrollView>
  );
};

export default CriminalesMasBuscados;
