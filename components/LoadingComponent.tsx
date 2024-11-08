import { ActivityIndicator, View } from 'react-native'
import React from 'react'

interface LoadingComponetProps {
    size: number,
}

const LoadingComponent: React.FC<LoadingComponetProps> = ({ size }) => {
    return (
        <View style={{
            alignItems: 'center'
        }}>
            <ActivityIndicator color="indigo" size={size} />
        </View>
    )
}

export default LoadingComponent