import { View, Text, TouchableOpacity, Animated, Pressable } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { FlatList } from 'react-native-gesture-handler'

const CustomDropdownMenu: React.FC<CustomDropdpownProps> = ({ options, onSelect, isOpen }) => {
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(-10)).current;

    useEffect(() => {
        if (isOpen) {
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();

            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();

            Animated.timing(translateYAnim, {
                toValue: -10,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [isOpen]);

    return (
        <View className='relative'>
            <View
                className={`absolute border-slate-200 mt-2 right-5 bg-white p-1.5 shadow-lg rounded-lg min-w-[180px] overflow-auto transition-all duration-300 ease-in-out`}
                style={{
                    opacity: isOpen ? 1 : 0,
                    transform: [{ translateY: isOpen ? 0 : -10 }],
                }}
            >
                <FlatList
                    data={options}
                    keyExtractor={(item) => item.label}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => onSelect(item)}
                            className="p-2 flex-row justify-between items-center hover:bg-slate-100"
                        >
                            <Text className='font-sans text-md font-medium'>{item.label}</Text>
                            {item.icon}
                        </Pressable>
                    )}
                />
            </View>
        </View>
    )
}

export default CustomDropdownMenu

type DropdownItem = {
    label: string,
    icon: React.ReactNode,
}

interface CustomDropdpownProps {
    options: DropdownItem[];
    isOpen: boolean;
    onSelect: (item: DropdownItem) => void;
}