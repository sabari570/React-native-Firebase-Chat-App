import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { UserInterface } from '@/constants/constants';
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '@/components/ChatRoomHeader';
import MessageList from '@/components/MessageList';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Feather from '@expo/vector-icons/Feather';

const ChatRoom = () => {
    // Inorder to fetch the params that are passed from one route to another
    const params = useLocalSearchParams();
    const item = params as unknown as UserInterface;
    const router = useRouter();
    const [messages, setMessages] = useState([]);

    return (
        <View className='flex-1 bg-white'>
            <StatusBar style='dark' />
            <ChatRoomHeader item={item} router={router} />
            <View className='h-2 border-b border-neutral-300' />
            <View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
                <View className='flex-1'>
                    <MessageList messages={messages} />
                </View>

                <View style={{ marginBottom: heightPercentageToDP(1.7) }} className='pt-2'>
                    <View className='flex-row justify-between items-center mx-3'>
                        <View className='flex-1 flex-row items-center justify-between bg-red-200 border p-2 border-neutral-300 rounded-full pl-5'>
                            <TextInput
                                className='flex-1 mr-2 font-sans text-md border-none outline-none'
                                placeholder='Type message...'
                                scrollEnabled={true}
                                maxHeight={360}
                                multiline={true}
                                style={{ textAlignVertical: 'top' }}
                            />

                            <TouchableOpacity
                                className='bg-neutral-200 p-2 mr-[1px] rounded-full'
                            >
                                <Feather name="send" size={24} color="#737373" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ChatRoom