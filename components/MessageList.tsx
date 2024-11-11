import { View, Text } from 'react-native'
import React from 'react'

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <View>
            <Text>MessageList</Text>
        </View>
    )
}

export default MessageList

interface MessageListProps {
    messages: any,
}