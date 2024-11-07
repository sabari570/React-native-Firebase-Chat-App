import { StatusBar } from 'expo-status-bar'
import React, { useRef, useState } from 'react'
import { Alert, Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import TextFieldComponent from '@/components/TextFieldComponent';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import LoadingComponent from '@/components/LoadingComponent';
import { useAuth } from '../context/authContext';

const SignIn = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Toast.show({
        type: 'error',
        text1: "Input required",
        text2: "Please enter both email and password"
      })
    }
    setIsLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    if (response.success) {
      Toast.show({
        type: "success",
        text1: 'Success',
        text2: "User signed in successfully"
      })
    } else {
      Toast.show({
        type: "error",
        text1: 'Failed',
        text2: response?.msg
      })
    }
    setIsLoading(false);
  }

  return (
    <View className='flex-1 justify-center items-center pt-5 gap-5'>
      <StatusBar style='dark' />
      <View
        className='h-25 w-full items-center'>
        <Image
          style={{
            height: hp(25),
            width: hp(25)
          }}
          resizeMode='contain'
          source={require("../assets/images/login.png")} />
      </View>

      <View className='w-full px-4 gap-4 md:w-[50%] lg:w-[25%]'>
        <Text className='font-bold tracking-wider text-center text-3xl text-neutral-800'>
          Sign In
        </Text>

        <TextFieldComponent
          textFieldIcon={<MaterialIcons name="mail-outline" size={24} color="gray" />}
          placeHolderText='Email address'
          placeHolderTextColor='gray'
          onChange={(value) => emailRef.current = value}
        />

        <TextFieldComponent
          textFieldIcon={<Octicons name="lock" size={24} color="gray" />}
          placeHolderText='Password'
          placeHolderTextColor='gray'
          onChange={(value) => passwordRef.current = value}
        />

        <Pressable>
          <Text
            className='text-right text-neutral-500 font-semibold transition-color hover:underline hover:text-indigo-500'
          >Forgot password?</Text>
        </Pressable>

        <View>
          {
            isLoading ? (
              <View className='flex-row justify-center'>
                <LoadingComponent size={20} />
              </View>
            ) : (<TouchableOpacity
              className='bg-indigo-500 p-3 rounded-xl'
              onPress={handleLogin}
            >
              <Text
                className='font-bold text-white tracking-wider text-center text-lg'
              >Signin</Text>
            </TouchableOpacity>)
          }
        </View>

        <View className='flex-row justify-center gap-1'>
          <Text className='font-semibold text-neutral-500'>Don't have an account?</Text>
          <Pressable onPress={() => router.push('/signup')}>
            <Text className='font-bold text-indigo-500'>Signup</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default SignIn
