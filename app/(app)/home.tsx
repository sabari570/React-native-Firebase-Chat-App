import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'
import Toast from 'react-native-toast-message';

const Home = () => {
    const { logout, user } = useAuth();

    const handleLogout = async () => {
        const response = await logout();
        console.log("response after logout: ", response)
        if (response.success) {
            Toast.show({
                type: "success",
                text1: 'Successfully',
                text2: "Logged out successfully"
            })
        } else {
            Toast.show({
                type: "error",
                text1: 'Failed',
                text2: response?.msg
            })
        }
    }
    return (
        <View className='flex-1 bg-white'>
        </View>
    )
}

export default Home