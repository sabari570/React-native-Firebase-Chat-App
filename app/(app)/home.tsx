import { AppState, AppStateStatus, Text, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import LoadingComponent from '@/components/LoadingComponent';
import ChatList from '@/components/ChatList';
import { useAuth } from '@/context/authContext';
import { doc, DocumentData, getDocs, query, QueryDocumentSnapshot, Timestamp, updateDoc, where } from 'firebase/firestore';
import { db, usersCollectionRef } from '@/services/firebaseConfig';
import { CHAT_APP_CONSTANTS, USER_STATUS, UserInterface } from '@/constants/constants';
import { useFocusEffect } from '@react-navigation/native';

const Home = () => {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const { user } = useAuth();
    const [userId, setUserId] = useState<string>('');

    const getUsers = async () => {
        // Fetch users from firebase
        const q = query(usersCollectionRef, where('userId', '!=', user?.uid));
        const querySnapShot = await getDocs(q);
        const data: UserInterface[] = querySnapShot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
            uid: doc.data().userId,
            username: doc.data().username,
            profileUrl: doc.data().profileUrl,
            email: doc.data().email,
            status: doc.data().status,
        }));
        setUsers(data)
    }


    const setUserOnline = async () => {
        if (user) {
            try {
                const userRef = doc(db, CHAT_APP_CONSTANTS.USERS_COLLLECTION, (user?.uid));
                await updateDoc(userRef, {
                    status: USER_STATUS.ONLINE,
                    lastSeen: Timestamp.now(),
                })
            } catch (error) {
                console.error('Error setting user status online: ', error);
            }
        }
    };

    const setUserOffline = async () => {
        try {
            const userRef = doc(db, CHAT_APP_CONSTANTS.USERS_COLLLECTION, (user?.uid));
            await updateDoc(userRef, {
                status: USER_STATUS.OFFLINE,
                lastSeen: Timestamp.now(),
            });
        } catch (error) {
            console.error('Error setting user status offline: ', error);
        }
    };

    // This will get executed when we arrive back to this screen, which means the code
    // gets executed when the screen becomes active
    useFocusEffect(
        React.useCallback(() => {
            if (user?.uid) {
                setUserOnline();
                getUsers();
            }
        }, [user])
    );

    // FOR MOBILE =>
    // Listen for app state changes to handle background/foreground transitions
    useEffect(() => {
        const handleAppStateChange = (nextAppState: AppStateStatus) => {
            if (nextAppState === 'background' || nextAppState === 'inactive') {
                setUserOffline();
            } else if (nextAppState === 'active') {
                setUserOnline();
            }
        }

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        }
    }, [])

    // FOR WEB =>
    // Handle tab visibility change in web
    useEffect(() => {
        const handleVisibilityChange = () => {
            console.log("EXecuted!!!!", document.visibilityState);
            if (document.visibilityState === 'hidden') {
                setUserOffline();
            } else if (document.visibilityState === 'visible') {
                setUserOnline();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <View className='flex-1 bg-white'>
            <StatusBar style='light' />

            {
                users.length > 0 ? (
                    <ChatList users={users} />
                ) : (
                    <View className='flex-1 items-center justify-center'>
                        <LoadingComponent size={30} />
                    </View>
                )
            }
        </View >
    )
}

export default Home