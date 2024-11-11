import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Router, Stack, } from 'expo-router';
import { CHAT_APP_CONSTANTS, UserInterface } from '@/constants/constants';
import Entypo from '@expo/vector-icons/Entypo';
import { Image } from 'expo-image';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';

const ChatRoomHeader: React.FC<ChatRoomHeaderProps> = ({ item, router }) => {
    return (
        <View className='flex-row items-center justify-between'>
            <View className='my-2 mx-3 flex-row items-center gap-3'>
                <TouchableOpacity onPress={() => router.back()}>
                    <Entypo name="chevron-left" size={24} color="#737373" />
                </TouchableOpacity>

                <View className='flex-row items-center gap-3'>
                    <Image
                        style={{
                            height: heightPercentageToDP(5.3),
                            aspectRatio: 1, borderRadius: 20
                        }}
                        className='rounded-full'
                        source={item?.profileUrl}
                        placeholder={CHAT_APP_CONSTANTS.blurhash}
                        contentFit="contain"
                        transition={300}
                    />
                    <Text className='text-neutral-700 font-medium font-sans'>{item?.username}</Text>

                </View>
            </View>

            <View className='m-3 flex-row gap-5'>
                <Ionicons name="call" size={24} color="#737373" />
                <Ionicons name="videocam" size={24} color="#737373" />
            </View>
        </View >
    )
}

export default ChatRoomHeader

interface ChatRoomHeaderProps {
    item: UserInterface,
    router: Router,
}