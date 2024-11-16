import { LayoutRectangle, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MessageItem from './MessageItem'
import { CollectionReference, doc, DocumentReference, setDoc } from 'firebase/firestore';
import { CHAT_APP_CONSTANTS, MessageDataProp, UserInterface } from '../constants/constants';
import { db, messagesCollectionRef } from '../services/firebaseConfig';

const MessageList: React.FC<MessageListProps> = ({ messages, user, item }) => {
    const scrollPosition = useRef(0);
    const containerHeight = useRef(0);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollPosition.current = event.nativeEvent.contentOffset.y;
    }

    const markMessageAsSeen = async (messageRef: CollectionReference, messageId: string) => {
        try {
            await setDoc(doc(messageRef, messageId), { seen: true }, { merge: true });
        } catch (error) {
            console.log("Error while setting message as seen 2: ", error);
        }
    }

    const handleMessageLayout = async (messageId: string, layout: LayoutRectangle, callSeenMessage: boolean) => {
        const isVisible = layout.y >= scrollPosition.current &&
            layout.y + layout.height <= scrollPosition.current + containerHeight.current;

        if (isVisible) {
            try {
                if (callSeenMessage) {
                    let roomId = CHAT_APP_CONSTANTS.getRoomId(user?.uid, item?.uid);
                    const docRef: DocumentReference = doc(db, CHAT_APP_CONSTANTS.ROOMS_COLLECTION, roomId);
                    const messageRef = messagesCollectionRef(docRef);
                    markMessageAsSeen(messageRef, messageId);
                }
            } catch (error) {
                console.log("'Error while marking message as seen 1: ", error)
            }
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 10 }}
            onScroll={handleScroll}
            onLayout={(event) => {
                containerHeight.current = event.nativeEvent.layout.height;
            }}
        >
            {
                messages.map((message: MessageDataProp, index: number) => {
                    return <View
                        key={index}
                        onLayout={(event) =>
                        (
                            !message.seen && handleMessageLayout(message.id, event.nativeEvent.layout, (message.receiverId === user?.uid))
                        )} >
                        <MessageItem
                            key={index}
                            message={message}
                            currrentUser={user}
                            isMyLastMessage={index === messages.length - 1} />
                    </View>
                })
            }
        </ScrollView>
    )
}

export default MessageList

interface MessageListProps {
    messages: any,
    user: any,
    item: UserInterface,
}