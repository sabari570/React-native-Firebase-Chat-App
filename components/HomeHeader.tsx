import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image';
import { useAuth } from '../context/authContext';
import { CHAT_APP_CONSTANTS } from '../constants/constants';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const HomeHeader = () => {
    const { top } = useSafeAreaInsets();
    const { user } = useAuth();

    return (
        <View style={{ paddingTop: top }}
            className='flex-row justify-between items-center px-5 bg-indigo-500 pb-8 shadow rounded-b-3xl'
        >
            <View className='pt-4'>
                <Text className='text-2xl font-medium text-white'>Chats</Text>
            </View>

            <View className='pt-4'>
                <Image
                    style={{ height: heightPercentageToDP(5.3), aspectRatio: 1, borderRadius: 20 }}
                    className='rounded-full'
                    source={user?.profileUrl}
                    placeholder={CHAT_APP_CONSTANTS.blurhash}
                    contentFit="contain"
                    transition={1000}
                />
            </View>
        </View>
    )
}

export default HomeHeader