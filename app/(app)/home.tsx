import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/authContext'
import { useRouter, useSegments } from 'expo-router';

const Home = () => {
    return (
        <View>
            <Text>Homepage</Text>
        </View>
    )
}

export default Home