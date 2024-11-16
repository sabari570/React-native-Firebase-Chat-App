import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { Router } from 'expo-router'
import { CHAT_APP_CONSTANTS, MessageDataProp, UserInterface } from '@/constants/constants'
import { Image } from 'expo-image'
import { doc, getDocs, limit, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore'
import { db, messagesCollectionRef } from '../services/firebaseConfig'

const ChatItem: React.FC<ChatItemProps> = ({ item, index, noBorder, router }) => {
    const [userLastMessage, setUserLastMessage] = useState<MessageDataProp>();

    const formatTimeStamp = (timestamp: Timestamp) => {
        const date = timestamp.toDate();
        const now = new Date();

        // Calculating the time difference
        const timeDiffInMills = now.getTime() - date.getTime();
        const timeDiffInHours = timeDiffInMills / (1000 * 3600);

        let options: Intl.DateTimeFormatOptions = {};

        if (timeDiffInHours < 24) {
            options = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }
            return new Intl.DateTimeFormat('en-US', options).format(date);
        }
        if (timeDiffInHours < 48) {
            return 'Yesterday';
        }

        options = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    const fetchcUserLastMessages = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const roomId = CHAT_APP_CONSTANTS.getRoomId(userId!, item?.uid);
            const docRef = doc(db, CHAT_APP_CONSTANTS.ROOMS_COLLECTION, roomId);
            const q = query(messagesCollectionRef(docRef), orderBy('createdAt', 'desc'), limit(1));
            const unsub = onSnapshot(q, (snapshot) => {
                let allMessages = snapshot.docs.reverse();
                setUserLastMessage(allMessages[0].data() as MessageDataProp);
            });
            return unsub;
        } catch (error) {
            console.log("Error while fetching last user messages: ", error)
        }
    };

    const openChatRoom = () => {
        router.push({
            pathname: '/chatRoom',
            params: {
                ...item
            },
        })
    }

    useEffect(() => {
        fetchcUserLastMessages();
    }, [])

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
                    <View>
                        <Text className='font-sans font-medium text-neutral-500'>{userLastMessage?.createdAt ?
                            formatTimeStamp(userLastMessage?.createdAt) : ""}</Text>
                    </View>
                </View>
                <Text numberOfLines={1} ellipsizeMode='tail' className='font-sans font-medium text-neutral-500 w-[14rem]'>{userLastMessage?.text}</Text>
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