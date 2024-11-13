import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { CHAT_APP_CONSTANTS, UserInterface } from '@/constants/constants';
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '@/components/ChatRoomHeader';
import MessageList from '@/components/MessageList';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Feather from '@expo/vector-icons/Feather';
import { AutoGrowTextInput } from 'react-native-auto-grow-textinput';
import CustomKeyboardView from '@/components/CustomKeyboardView';
import { useAuth } from '@/context/authContext';
import { addDoc, collection, doc, DocumentData, getDoc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { db, messagesCollectionRef } from '@/services/firebaseConfig';
import Toast from 'react-native-toast-message';

const ChatRoom = () => {
    // Inorder to fetch the params that are passed from one route to another
    const params = useLocalSearchParams();
    const item = params as unknown as UserInterface;
    const { user } = useAuth();
    const router = useRouter();
    const [messages, setMessages] = useState<DocumentData[]>([]);
    const [inputHeight, setInputHeight] = useState(50);
    const [inputText, setInputText] = useState('');
    const minHeight = 50;
    const maxHeight = 200;

    // This is the Logic for resizing the textInput component
    useEffect(() => {
        const lines = inputText.split('\n').length;

        const newHeight = Math.min(Math.max(minHeight, lines * 20), maxHeight);
        setInputHeight(newHeight);
    }, [inputText]);

    const createRoomIfNotExists = async () => {
        let roomId = CHAT_APP_CONSTANTS.getRoomId(user?.userId, item.userId);
        const docRef = doc(db, CHAT_APP_CONSTANTS.ROOMS_COLLECTION, roomId);
        const documentExists = await getDoc(docRef);
        if (!documentExists.exists()) {
            await setDoc(doc(db, CHAT_APP_CONSTANTS.ROOMS_COLLECTION, roomId), {
                roomId,
                createdAt: Timestamp.fromDate(new Date())
            })
        } else {
            // This is where we are listening to the messages in the firebase
            const messagesRef = messagesCollectionRef(docRef);
            const q = query(messagesRef, orderBy('createdAt', 'asc'));
            // The onSnapShot is the listener it listens to the messageCollectionRef
            const unsub = onSnapshot(q, (snapshot) => {
                let allMessages = snapshot.docs.map((message) => {
                    return message.data();
                });
                setMessages([...allMessages]);
            });
            return unsub;
        }
    }

    useEffect(() => {
        createRoomIfNotExists();
    }, [])

    const handleSendMessage = async () => {
        let message = inputText.trim();
        if (!message) return;
        try {
            setInputText("");
            let roomId = CHAT_APP_CONSTANTS.getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, CHAT_APP_CONSTANTS.ROOMS_COLLECTION, roomId);
            const messageRef = messagesCollectionRef(docRef);
            const messageDoc = await addDoc(messageRef, {
                userId: user?.userId,
                text: message,
                profileUrl: user?.profileUrl,
                senderName: user?.username,
                createdAt: Timestamp.fromDate(new Date())
            });
        } catch (error) {
            console.log("Error while sending message: ", error)
            Toast.show({
                type: "error",
                text1: 'Failed',
                text2: "Something went wrong"
            })
        }
    }

    return (
        <CustomKeyboardView inChat={true}>
            <View className='flex-1 bg-white'>
                <StatusBar style='dark' />
                <ChatRoomHeader item={item} router={router} />
                <View className='h-2 border-b border-neutral-300' />
                <View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
                    <View className='flex-1'>
                        <MessageList user={user} messages={messages} />
                    </View>

                    <View style={{ marginBottom: heightPercentageToDP(1.7) }} className='pt-2'>
                        <View className='mx-3 flex-1 flex-row items-center justify-between bg-white border p-2 border-neutral-300 rounded-2xl pl-5 max-h-[210px]'>
                            <TextInput
                                className='overflow-hidden flex-1 mr-2 font-sans text-md border-none outline-none'
                                placeholder='Type message...'
                                scrollEnabled={false}
                                multiline={true}
                                value={inputText}
                                onChangeText={(text) => {
                                    setInputText(text);
                                }}
                                style={{
                                    minHeight: minHeight,
                                    height: inputHeight,
                                    maxHeight: maxHeight
                                }}
                            />

                            <TouchableOpacity
                                onPress={handleSendMessage}
                                className='bg-neutral-200 p-2 mr-[1px] rounded-full'
                            >
                                <Feather name="send" size={24} color="#737373" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    )
}

export default ChatRoom