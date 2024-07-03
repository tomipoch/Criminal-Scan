import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styled } from 'nativewind';
import { ApiKeyContext } from '../components/ApiKey';
import { ScanContext } from '../components/ScanProvider';

const Camara = () => {
  const StyledSafeAreaView = styled(SafeAreaView);
  const StyledView = styled(View);
  const StyledText = styled(Text);
  const StyledTouchableOpacity = styled(TouchableOpacity);
  const StyledImage = styled(Image);

  const [selectedImage, setSelectedImage] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  //API
  const { apiKey } = useContext(ApiKeyContext);
  const { addScan } = useContext(ScanContext);

  const uploadImage = async (option) => {
    try {
      let result;
      if (option === 1) {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        });
      } else {
        let cameraResult = await ImagePicker.requestCameraPermissionsAsync({
          allowsEditing: true,
          quality: 1,
        });
        if (cameraResult.granted) {
          result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
          });
        } else {
          throw new Error("Permisos de cámara no concedidos");
        }
      }

      if (result && !result.cancelled && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        await sendImageToApi(imageUri);
      } else {
        console.log("La selección de imagen fue cancelada o no se seleccionó ninguna imagen");
      }
    } catch (error) {
      console.error("Error al cargar la imagen:", error.message);
    }
  };

  const sendImageToApi = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      const response = await fetch('https://wpcpsvb9-8000.brs.devtunnels.ms/carabinero/analizar_imagen/', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'APIKEY': apiKey
        },
      });

      const json = await response.json();
      setApiResponse(json);
      addScan({ imageUri, apiResponse: json });
    } catch (error) {
      console.error('Error al enviar la imagen a la API:', error.message);
    }
  };

  return (
    <ScrollView>
      <StyledSafeAreaView className="flex-1 justify-center items-center p-6 w-full bg-gray-100">
        {selectedImage && (
          <StyledImage
            source={{ uri: selectedImage }}
            style={{ width: 200, height: 200, marginBottom: 20, borderRadius: 10 }}
          />
        )}
        <StyledView className="flex flex-column justify-around w-full p-6 rounded-lg gap-6">
          <StyledTouchableOpacity onPress={() => uploadImage(0)} className="bg-green-600 p-4 rounded-lg shadow-lg">
            <StyledText className="text-white text-lg font-semibold text-center">Tomar Foto</StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity onPress={() => uploadImage(1)} className="bg-green-600 p-4 rounded-lg shadow-lg">
            <StyledText className="text-white text-lg font-semibold text-center">Usar Galería</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
        {apiResponse && (
          <StyledView className="mt-6 p-4 bg-white rounded-lg shadow-lg w-full">
            <StyledText className="text-black text-lg font-semibold">Antecedentes:</StyledText>
            <StyledText> Nombre: {apiResponse.personaconantecedentes.persona.nombre} </StyledText>
            <StyledText> Apellido: {apiResponse.personaconantecedentes.persona.apellido}</StyledText>
            <StyledText> Fecha de Nacimiento: {apiResponse.personaconantecedentes.persona.fechaDeNacimiento}</StyledText>
            <StyledText> Dirección: {apiResponse.personaconantecedentes.persona.direccion}</StyledText>
            <StyledText> Antecedentes: {apiResponse.antecedentes.map((antecedente, idx) => (
              <Text key={idx}>{antecedente.descripcion}{'\n'}</Text>
            ))}</StyledText>
          </StyledView>
        )}
      </StyledSafeAreaView>
    </ScrollView>
  );
};

export default Camara;