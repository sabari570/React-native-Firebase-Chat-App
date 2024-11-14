import { ScrollView } from 'react-native'
import React from 'react'
import MessageItem from './MessageItem'

const MessageList: React.FC<MessageListProps> = ({ messages, user }) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 10 }}
        >
            {
                messages.map((message: object, index: number) => {
                    return <MessageItem key={index} message={message} currrentUser={user} />
                })
            }
        </ScrollView>
    )
}

export default MessageList

interface MessageListProps {
    messages: any,
    user: any,
}