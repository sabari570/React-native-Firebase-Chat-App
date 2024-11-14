import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { CHAT_APP_CONSTANTS } from '@/constants/constants'


const CustomMessageRenderer = (isMe: boolean, messageText?: string, profilePicUrl?: string) => {
    const screenWidth = Dimensions.get('window').width;
    return (
        <View className={`flex-row ${isMe ? "justify-end mr-2" : "justify-start ml-2"}`}>
            <View className={`${!isMe ? "flex-row" : "flex-row-reverse"} justify-center items-end`}>
                <Image
                    style={{
                        height: heightPercentageToDP(3.3),
                        aspectRatio: 1, borderRadius: 20
                    }}
                    className='rounded-full '
                    source={profilePicUrl}
                    placeholder={CHAT_APP_CONSTANTS.blurhash}
                    contentFit="contain"
                    transition={300}
                />
                <View className={`flex-row ${isMe ? "justify-end" : "justify-start"} mb-3`}>
                    <View
                        className='flex-1'
                        style={{
                            maxWidth: screenWidth * 0.85
                        }}
                    >
                        <View
                            className={`p-3 ${isMe ? "bg-blue-500 rounded-tl-md rounded-bl-md rounded-tr-md" : "bg-indigo-200 rounded-tl-md rounded-br-md rounded-tr-md"} 
                                ${isMe ? "mr-3 self-end" : "ml-3 self-start"} shadow`}
                        >
                            <Text className={`font-sans text-sm ${isMe ? "text-white" : "text-gray-800"}`}>
                                {messageText}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const MessageItem: React.FC<MessageItemProps> = ({ message, currrentUser }) => {
    const isMe: boolean = currrentUser?.uid == message?.userId;
    return CustomMessageRenderer(isMe, message?.text, message?.profileUrl);

}

export default MessageItem

interface MessageItemProps {
    message: any,
    currrentUser: any
}