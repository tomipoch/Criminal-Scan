import React, { useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { CriminalsContext } from '../components/ApiCriminales';
import CriminalesMasBuscados from '../components/CriminalesMasBuscados';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);

const styles = StyleSheet.create({
  criminalCard: {
    height: 300,
    width: 200,
  },
});

const Busqueda = () => {
  const apiResponse = useContext(CriminalsContext);

  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <StyledView className="p-4">
          <StyledText className="text-black text-3xl font-bold">Busqueda</StyledText>
          <StyledText className="text-black text-xl font-bold mt-4">Criminales más Buscados</StyledText>
          <CriminalesMasBuscados criminals={apiResponse && apiResponse.Datos} />
        </StyledView>
      </ScrollView>
    </StyledSafeAreaView>
  );
};

export default Busqueda;