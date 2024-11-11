import { Text, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import LoadingComponent from '@/components/LoadingComponent';
import ChatList from '@/components/ChatList';
import { useAuth } from '@/context/authContext';
import { DocumentData, getDocs, query, QueryDocumentSnapshot, where } from 'firebase/firestore';
import { usersCollectionRef } from '@/services/firebaseConfig';
import { User } from 'firebase/auth';
import { UserInterface } from '@/constants/constants';

const Home = () => {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const { user } = useAuth();

    const getUsers = async () => {
        // Fetch users from firebase
        const q = query(usersCollectionRef, where('userId', '!=', user?.uid));
        const querySnapShot = await getDocs(q);
        const data: UserInterface[] = querySnapShot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
            userId: doc.data().userId,
            username: doc.data().username,
            profileUrl: doc.data().profileUrl,
            email: doc.data().email,
        }));
        setUsers(data)
    }

    useEffect(() => {
        if (user?.uid) {
            getUsers();
        }
    }, [user]);

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