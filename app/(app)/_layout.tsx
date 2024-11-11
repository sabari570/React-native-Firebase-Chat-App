import React from 'react'
import { Stack } from 'expo-router'
import HomeHeader from '../../components/HomeHeader'
import ChatRoomHeader from '@/components/ChatRoomHeader'

const _layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='home'
                options={{
                    header: () => <HomeHeader />
                }}
            />

            <Stack.Screen
                name='chatRoom'
                options={{
                    title: '',
                    headerShadowVisible: false,
                    headerShown: false,
                }}
            />
        </Stack>
    )
}

export default _layout