import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { ScrollView } from 'react-native'

// This component is created inorder to avoid the keyboard covering up the input fields
const CustomKeyboardView = ({ children }: PropsWithChildren) => {
  return (
    <KeyboardAvoidingView
      behavior={'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CustomKeyboardView