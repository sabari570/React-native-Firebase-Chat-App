import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image';
import { useAuth } from '../context/authContext';
import { CHAT_APP_CONSTANTS } from '../constants/constants';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import CustomDropdownMenu from './CustomDropdownMenu';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

const HomeHeader = () => {
    const { top } = useSafeAreaInsets();
    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = (e: GestureResponderEvent) => setIsDropdownOpen(!isDropdownOpen);
    const closeDropdown = () => setIsDropdownOpen(false);

    const dropdownOptions = [
        { label: 'Profile', icon: <FontAwesome name="user" size={19} color="gray" /> },
        { label: 'Logout', icon: <View className='-mr-1'><Ionicons name="exit" size={19} color="gray" /></View> },
    ];

    useEffect(() => {
        if (typeof document !== "undefined") {
            const handleClickOutside = (event: MouseEvent) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    closeDropdown();
                }
            }
            document.addEventListener('mousedown', handleClickOutside);

            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    const handleSelect = async ({ label }: { label: string }) => {
        if (label === 'Logout') {
            const response = await logout();
            if (response.success) {
                Toast.show({
                    type: "success",
                    text1: 'Sucess',
                    text2: "Logged out successfully"
                })
            } else {
                Toast.show({
                    type: "error",
                    text1: 'Failed',
                    text2: response?.msg
                })
            }
        } else {
            // TODO: Go to profile page
        }
    }

    return (
        <View style={{ paddingTop: top }}
            className='flex-row justify-between items-center px-5 bg-indigo-500 pb-8 shadow rounded-b-3xl'
        >
            <View className='pt-4'>
                <Text className='font-sans text-2xl font-medium text-white'>Chats</Text>
            </View>

            <View className='pt-4'>
                <TouchableOpacity onPress={toggleDropdown}>
                    <Image
                        style={{ height: heightPercentageToDP(5.3), aspectRatio: 1, borderRadius: 20 }}
                        className='rounded-full'
                        source={user?.profileUrl}
                        placeholder={CHAT_APP_CONSTANTS.blurhash}
                        contentFit="contain"
                        transition={1000}
                    />
                </TouchableOpacity>

                {/* <View ref={dropdownRef}> */}
                <CustomDropdownMenu
                    options={dropdownOptions}
                    onSelect={handleSelect}
                    isOpen={isDropdownOpen}
                />
                {/* </View> */}
            </View>
        </View>
    )
}

export default HomeHeader