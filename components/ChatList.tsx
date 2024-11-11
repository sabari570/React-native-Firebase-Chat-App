import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'
import { useRouter } from 'expo-router'
import { UserInterface } from '@/constants/constants'

const ChatList: React.FC<ChatListProps> = ({ users }) => {
    // We are passsing the router from ChatList to ChatItem because if we define the router inside ChatItem component,
    // Each time it renders a new object of the router
    const router = useRouter();

    return (
        <View className='flex-1'>
            <FlatList
                data={users}
                contentContainerStyle={{
                    flex: 1,
                    paddingVertical: 25
                }}
                keyExtractor={(item) => Math.random().toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) =>
                    <ChatItem
                        noBorder={(index + 1) == users.length}
                        router={router}
                        item={item} index={index}
                    />}
            />
        </View>
    )
}

export default ChatList

interface ChatListProps {
    users: UserInterface[],
}