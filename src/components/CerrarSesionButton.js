// Archivo: CerrarSesionButton.js

import React, { useContext, navigation  } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styled } from 'nativewind';
import { ApiKeyContext } from '../components/ApiKey';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

const CerrarSesionButton = ({ navigation }) => {
  const { logout } = useContext(ApiKeyContext);

  const handleLogout = () => {
    console.log('handleLogout called');
    logout();
    console.log('logout called');
    navigation.replace('Login');
    console.log('navigation.replace called');
  };
  

  return (
    <StyledTouchableOpacity
      className={`rounded-2xl p-3 mb-4 w-11/12 items-center bg-green-600`}
      onPress={handleLogout}
    >
      <StyledText className="text-white font-bold">Cerrar Sesión</StyledText>
    </StyledTouchableOpacity>
  );
};

export default CerrarSesionButton;
