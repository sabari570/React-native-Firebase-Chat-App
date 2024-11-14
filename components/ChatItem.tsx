import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Router } from 'expo-router'
import { CHAT_APP_CONSTANTS, UserInterface } from '@/constants/constants'
import { Image } from 'expo-image'

const ChatItem: React.FC<ChatItemProps> = ({ item, index, noBorder, router }) => {

    const openChatRoom = () => {
        router.push({
            pathname: '/chatRoom',
            params: {
                ...item
            },
        })
    }

    console.log("user item obtained: ", item)

    return (
        <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-4 ${noBorder ? '' : 'border-b'} border-b-neutral-200`}>
            <Image
                style={{ height: heightPercentageToDP(7.3), aspectRatio: 1, borderRadius: 20 }}
                className='rounded-full'
                source={item?.profileUrl}
                placeholder={CHAT_APP_CONSTANTS.blurhash}
                contentFit="contain"
                transition={1000}
            />
            <View className='flex-1 gap-1'>
                <View className='flex-row justify-between'>
                    <Text className='font-sans font-semibold text-neutral-800'>{item.username}</Text>
                    <Text className='font-sans font-medium text-neutral-500'>Time</Text>
                </View>
                <Text className='font-sans font-medium text-neutral-500'>Last message</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatItem


interface ChatItemProps {
    item: UserInterface,
    index: number,
    noBorder: boolean,
    router: Router,
}