import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Chatbot = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef();

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { key: String(messages.length), text: inputText, sender: 'user' }]);
      setIsTyping(true);
      setInputText('');

      // Simulate a bot response
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, { key: String(prevMessages.length), text: 'Respuesta automática del bot', sender: 'bot' }]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const renderItem = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <StyledView className={`my-2 p-4 rounded-2xl ${isUser ? 'bg-green-100 self-end' : 'bg-gray-100 self-start'}`}>
        <StyledText className="text-black">{item.text}</StyledText>
      </StyledView>
    );
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <StyledView className="flex-1 p-4">
          <StyledText className="text-black text-4xl font-bold mt-2">Chatbot</StyledText>
          <StyledView className="flex-1 mt-4">
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
            />
            {isTyping && (
              <StyledText className="text-gray-500 mt-2">El bot está escribiendo...</StyledText>
            )}
          </StyledView>
          <StyledView className="flex-row items-center mt-4">
            <StyledTextInput
              className="flex-1 border border-gray-300 rounded p-4 mr-4"
              placeholder="Escribe un mensaje..."
              value={inputText}
              onChangeText={setInputText}
            />
            <StyledTouchableOpacity className="w-10 h-10 bg-green-600 rounded-full items-center justify-center" onPress={handleSend}>
              <Feather name="arrow-right-circle" size={24} color="white" />
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </KeyboardAvoidingView>
    </StyledSafeAreaView>
  );
};

export default Chatbot;