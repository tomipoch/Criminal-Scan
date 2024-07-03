import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const styles = StyleSheet.create({
  criminalCard: {
    height: 300,
    width: 200,
  },
  criminalImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
});

const CriminalesMasBuscados = ({ criminals }) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="mt-4">
      {criminals && criminals.map((criminal, index) => (
        <StyledView key={index} className="bg-gray-100 p-4 rounded-lg w-60 mr-4" style={styles.criminalCard}>
          <Image
            source={{ uri: `https://wpcpsvb9-8000.brs.devtunnels.ms${criminal.personaConAntecedentes.imagen}` }}
            style={styles.criminalImage}
          />
          <StyledText className="text-black">
            Nombre: {criminal.personaConAntecedentes.persona.nombre}               
          </StyledText>
          <StyledText className="text-black">
            Apellido: {criminal.personaConAntecedentes.persona.apellido}
          </StyledText>
          <StyledText className="text-black">
            Fecha de Nacimiento: {criminal.personaConAntecedentes.persona.fechaDeNacimiento}
          </StyledText>
          <StyledText className="text-black">
            Dirección: {criminal.personaConAntecedentes.persona.direccion}
          </StyledText>
          <StyledText className="text-black">
            Celular: {criminal.personaConAntecedentes.persona.celular}
          </StyledText>
        </StyledView>
      ))}
    </ScrollView>
  );
};

export default CriminalesMasBuscados;