import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'

interface TextFieldComponentProps {
    textFieldIcon: React.ReactElement,
    placeHolderText: string,
    placeHolderTextColor: string,
    onChange: (value: string) => void,
}

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({ textFieldIcon, placeHolderText, placeHolderTextColor, onChange }) => {
    return (
        <View className='p-2 h-auto flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl'>
            {textFieldIcon}
            <TextInput
                onChangeText={onChange}
                placeholder={placeHolderText}
                placeholderTextColor={placeHolderTextColor}
                secureTextEntry={placeHolderText === 'Password'}
                className='flex-1 font-semibold text-neutral-700 border-none outline-none h-10' />
        </View>
    )
}

export default TextFieldComponent