import React, { useContext } from 'react';
import { styled } from 'nativewind';
import { View, Text, Image } from 'react-native';
import { ScanContext } from '../components/ScanProvider';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const EscaneosRecientes = () => {
  const { scans } = useContext(ScanContext);

  return (
    <StyledView className="space-y-4">
      {scans.map((scan, index) => (
        <StyledView key={index} className="p-4 bg-gray-100 rounded-2xl flex-row">
          <StyledImage
            source={{ uri: scan.imageUri }}
            className="w-36 h-36 rounded-lg mr-2"
          />
          <StyledView className="flex-1">
            <StyledText className="text-black text-lg font-semibold mb-1">Antecedentes:</StyledText>
            <StyledText className="mb-1 text-black">
              <StyledText className="font-bold text-black">Nombre:</StyledText> {scan.apiResponse.personaconantecedentes.persona.nombre} {scan.apiResponse.personaconantecedentes.persona.apellido}
            </StyledText>
            <StyledText className="mb-1 text-black">
              <StyledText className="font-bold text-black">Fecha de Nacimiento:</StyledText> {scan.apiResponse.personaconantecedentes.persona.fechaDeNacimiento}
            </StyledText>
            <StyledText className="mb-1 text-black">
              <StyledText className="font-bold text-black">Dirección:</StyledText> {scan.apiResponse.personaconantecedentes.persona.direccion}
            </StyledText>
            <StyledText className="mb-1 text-black">
              <StyledText className="font-bold text-black">Antecedentes:</StyledText>
            </StyledText>
            {scan.apiResponse.antecedentes.map((antecedente, idx) => (
              <StyledText key={idx} className="mb-1 text-black">{antecedente.descripcion}</StyledText>
            ))}
          </StyledView>
        </StyledView>
      ))}
    </StyledView>
  );
};

export default EscaneosRecientes;
