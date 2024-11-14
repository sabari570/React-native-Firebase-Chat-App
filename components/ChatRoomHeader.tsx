import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Router, Stack, } from 'expo-router';
import { CHAT_APP_CONSTANTS, USER_STATUS, UserInterface } from '@/constants/constants';
import Entypo from '@expo/vector-icons/Entypo';
import { Image } from 'expo-image';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

const ChatRoomHeader: React.FC<ChatRoomHeaderProps> = ({ item, router }) => {
    const [userOnlineStatus, setUserOnlineStatus] = useState<boolean>(item?.status === USER_STATUS.ONLINE);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(db, CHAT_APP_CONSTANTS.USERS_COLLLECTION, item?.uid),
            (snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.data();
                    setUserOnlineStatus(userData.status === USER_STATUS.ONLINE);
                }
            },
            (error) => console.error("Error listening to the user status change: ", error)
        )

        return () => unsubscribe();
    }, [item?.uid])
    return (
        <View className='flex-row items-center justify-between'>
            <View className='my-2 mx-3 flex-row items-center gap-3'>
                <TouchableOpacity onPress={() => router.back()}>
                    <Entypo name="chevron-left" size={24} color="#737373" />
                </TouchableOpacity>

                <View className='flex-row items-center gap-3 relative'>
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
                    <View
                        className={`absolute -bottom-[1.5px] left-6 w-[13px] h-[13px] rounded-full ${userOnlineStatus ? "bg-green-500" : "bg-red-500"} border-2 border-white`}
                    />
                    <Text className='text-neutral-700 font-medium font-sans'>{item?.username}</Text>
                </View>
            </View>

            <View className='m-3 flex-row gap-5'>
                <Ionicons className='cursor-pointer' name="call" size={24} color="#737373" />
                <Ionicons className='cursor-pointer' name="videocam" size={24} color="#737373" />
            </View>
        </View >
    )
}

export default ChatRoomHeader

interface ChatRoomHeaderProps {
    item: UserInterface,
    router: Router,
}