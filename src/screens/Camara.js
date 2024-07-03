import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styled } from 'nativewind';
import { ApiKeyContext } from '../components/ApiKey';
import { ScanContext } from '../components/ScanProvider';
import { useFocusEffect } from '@react-navigation/native';

const Camara = () => {
  const StyledSafeAreaView = styled(SafeAreaView);
  const StyledView = styled(View);
  const StyledText = styled(Text);
  const StyledTouchableOpacity = styled(TouchableOpacity);
  const StyledImage = styled(Image);

  const [selectedImage, setSelectedImage] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);

  //API
  const { apiKey } = useContext(ApiKeyContext);
  const { addScan } = useContext(ScanContext);

  useEffect(() => {
    const requestPermissions = async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setCameraPermission(cameraStatus.granted);
      setGalleryPermission(galleryStatus.granted);
    };
    requestPermissions();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Limpia los datos cuando la pantalla se enfoca
      setSelectedImage(null);
      setApiResponse(null);
    }, [])
  );

  const uploadImage = async (option) => {
    try {
      let result;
      if (option === 1) {
        if (!galleryPermission) {
          Alert.alert("Permisos de galería no concedidos");
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        });
      } else {
        if (!cameraPermission) {
          Alert.alert("Permisos de cámara no concedidos");
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 1,
        });
      }

      if (result && !result.canceled && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const renderApiResponse = () => {
    if (!apiResponse) {
      return null;
    }
    
    if (apiResponse.error || !apiResponse.personaconantecedentes) {
      return <StyledText className="text-red-600">Imagen no encontrada</StyledText>;
    }

    return (
      <>
        <StyledText className="text-gray-800">
          <Text className="font-bold">Nombre:</Text> {apiResponse.personaconantecedentes.persona?.nombre || 'N/A'} {apiResponse.personaconantecedentes.persona?.apellido || ''}
        </StyledText>
        <StyledText className="text-gray-800">
          <Text className="font-bold">Fecha de Nacimiento:</Text> {apiResponse.personaconantecedentes.persona?.fechaDeNacimiento || 'N/A'}
        </StyledText>
        <StyledText className="text-gray-800">
          <Text className="font-bold">Dirección:</Text> {apiResponse.personaconantecedentes.persona?.direccion || 'N/A'}
        </StyledText>
        <StyledText className="text-gray-800">
          <Text className="font-bold">Antecedentes:</Text>
          {apiResponse.antecedentes?.length > 0
            ? apiResponse.antecedentes.map((antecedente, idx) => (
              <Text key={idx}>{antecedente.descripcion}{'\n'}</Text>
            ))
            : 'N/A'}
        </StyledText>
      </>
    );
  };

  return (
    <ScrollView>
      <StyledSafeAreaView className="flex-1 justify-center items-center p-6 w-full bg-white">
        <StyledImage className='mt-6'
          source={selectedImage ? { uri: selectedImage } : null}
          style={{
            width: 225,
            height: 225,
            marginBottom: 20,
            borderRadius: 200,
            backgroundColor: selectedImage ? 'transparent' : '#e0e0e0',
          }}
        />
        <StyledView className="mt-6 p-6 bg-gray-100 rounded-lg  w-10/12">
          <StyledText className="text-black text-lg text-center font-semibold mb-2">Antecedentes:</StyledText>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            renderApiResponse()
          )}
        </StyledView>
        <StyledView className="flex flex-column justify-around w-full p-6 rounded-2xl gap-6">
          <StyledTouchableOpacity onPress={() => uploadImage(0)} className="bg-green-600 p-4 rounded-lg shadow-lg">
            <StyledText className="text-white text-lg font-semibold text-center">Tomar Foto</StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity onPress={() => uploadImage(1)} className="bg-green-600 p-4 rounded-lg shadow-lg">
            <StyledText className="text-white text-lg font-semibold text-center">Usar Galería</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledSafeAreaView>
    </ScrollView>
  );
};

export default Camara;

