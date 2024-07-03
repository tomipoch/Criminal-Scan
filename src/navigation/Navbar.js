import React, { useContext, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

// Screens
import Inicio from '../screens/Inicio';
import Busqueda from '../screens/Busqueda';
import Camara from '../screens/Camara';
import Perfil from '../screens/Perfil';
import Asistencia from '../screens/Asistencia';
import Login from '../screens/Login';
import Bienvenida from '../screens/Bienvenida';
import ConfiguracionPerfil from '../screens/ConfiguracionPerfil';
import Privacidad from '../screens/Privacidad';

// Iconos
import Feather from '@expo/vector-icons/Feather';

// API
import ApiKey, { ApiKeyContext } from '../components/ApiKey';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function InicioStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: true }} />
      <Stack.Screen 
        name="Asistencia" 
        component={Asistencia} 
        options={{
          headerTitle: '',
          headerBackTitle: 'Volver',
          headerTransparent: true,
        }} 
      />
    </Stack.Navigator>
  );
}

function PerfilStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PerfilMain" component={Perfil} options={{ headerShown: false }} />
      <Stack.Screen 
        name="ConfiguracionPerfil" 
        component={ConfiguracionPerfil} 
        options={{
          headerTitle: '',
          headerBackTitle: 'Volver',
          headerTransparent: true,
        }} 
      />
      <Stack.Screen 
        name="Privacidad" 
        component={Privacidad} 
        options={{
          headerTitle: '',
          headerBackTitle: 'Volver',
          headerTransparent: true,
        }} 
      />
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
        name="InicioStackTab"
        component={InicioStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'green' : 'gray' }}>Inicio</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Feather name="home" size={24} color={focused ? 'green' : 'gray'} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="BusquedaTab"
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
        name="CamaraTab"
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
        name="PerfilStackTab"
        component={PerfilStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'green' : 'gray' }}>Perfil</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Feather name="user" size={24} color={focused ? 'green' : 'gray'} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function MainStack() {
  const { apiKey } = useContext(ApiKeyContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (apiKey) {
      setIsLoggedIn(true);
    }
  }, [apiKey]);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Bienvenida" component={Bienvenida} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <ApiKey>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </ApiKey>
  );
}
