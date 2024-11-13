import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { ScrollView } from 'react-native'

// This component is created inorder to avoid the keyboard covering up the input fields
const CustomKeyboardView: React.FC<PropsWithChildren<CustomKeyboardViewProps>> = ({ children, inChat }) => {
  let keyConfig = {};
  let scrollViewConfig = {};

  if (inChat) {
    keyConfig = {
      // It is the vertical distance between the top of the screen and top of the keyboardAvoidingView
      keyboardVerticalOffset: 90,
    }
    scrollViewConfig = {
      contentContainerStyle: { flex: 1 }
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={'height'}
      style={{ flex: 1 }}
      {...keyConfig}
    >
      <ScrollView
        style={{ flex: 1 }}
        {...scrollViewConfig}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CustomKeyboardView

interface CustomKeyboardViewProps {
  inChat: boolean,
}