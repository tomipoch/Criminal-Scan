import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Feather from '@expo/vector-icons/Feather';

// Screens
import Inicio from '../screens/Inicio';
import Busqueda from '../screens/Busqueda';
import Camara from '../screens/Camara';
import Perfil from '../screens/Perfil';
import Asistencia from '../screens/Asistencia';
import Login from '../screens/Login';

// API
import { ApiCriminales } from '../components/ApiCriminales';
import ApiKey from '../components/ApiKey';
import {ScanProvider} from '../components/ScanProvider'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function InicioStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: true }} />
      <Stack.Screen name="Asistencia" component={Asistencia} options={{ headerTitle: 'Asistencia' }} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'white' },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={InicioStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'green' : 'gray' }}>Inicio</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Feather name="home" size={24} color={focused ? 'green' : 'gray'} />
          ),
          headerShown: false, // Oculta el header de Inicio en la navegación de pestañas
        }}
      />
      <Tab.Screen
        name="Busqueda"
        component={Busqueda}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'green' : 'gray' }}>Busqueda</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Feather name="search" size={24} color={focused ? 'green' : 'gray'} />
          ),
        }}
      />
      <Tab.Screen
        name="Camara"
        component={Camara}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'green' : 'gray' }}>Camara</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Feather name="camera" size={24} color={focused ? 'green' : 'gray'} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'green' : 'gray' }}>Perfil</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Feather name="user" size={24} color={focused ? 'green' : 'gray'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={MyTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <ApiKey>
      <NavigationContainer>
        <ApiCriminales>
            <ScanProvider>
              <MainStack />
            </ScanProvider>
        </ApiCriminales>
      </NavigationContainer>
    </ApiKey>
  );
}
