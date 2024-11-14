import { StatusBar } from 'expo-status-bar'
import React, { useRef, useState } from 'react'
import { Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TextFieldComponent from '@/components/TextFieldComponent';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import LoadingComponent from '@/components/LoadingComponent';
import { Feather } from '@expo/vector-icons';
import CustomKeyboardView from '@/components/CustomKeyboardView';
import { useAuth } from '@/context/authContext';

const SignUp = () => {
  const router = useRouter();
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const profileRef = useRef("")
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!usernameRef.current || !emailRef.current || !passwordRef.current || !profileRef.current) {
      Toast.show({
        type: 'error',
        text1: "Input required",
        text2: "Please fill in all the fields"
      })
    }

    setIsLoading(true);
    let response = await register(emailRef.current, passwordRef.current, usernameRef.current, profileRef.current);
    setIsLoading(false);
    if (response.success) {
      Toast.show({
        type: "success",
        text1: 'Success',
        text2: "User registered successfully"
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
    <CustomKeyboardView inChat={false}>
      <View className=' mt-[20%] flex-1 justify-center items-center pt-5 pb-5 gap-5'>
        <StatusBar style='dark' />
        <View
          className='h-25 w-full items-center'>
          <Image
            style={{
              height: hp(25),
              width: hp(25)
            }}
            resizeMode='contain'
            source={require("../assets/images/register.png")} />
        </View>

        <View className='w-full px-4 gap-4 md:w-[50%] lg:w-[40%]'>
          <Text className='font-bold tracking-wider text-center text-3xl text-neutral-800'>
            Sign Up
          </Text>

          <TextFieldComponent
            textFieldIcon={<FontAwesome name="user-o" size={24} color="gray" />}
            placeHolderText='Username'
            placeHolderTextColor='gray'
            onChange={(value) => usernameRef.current = value}
          />

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

          <TextFieldComponent
            textFieldIcon={<Feather name="image" size={24} color="gray" />}
            placeHolderText='Profile url'
            placeHolderTextColor='gray'
            onChange={(value) => profileRef.current = value}
          />

          <View>
            {
              isLoading ? (
                <View className='flex-row justify-center'>
                  <LoadingComponent size={20} />
                </View>
              ) : (<TouchableOpacity
                className='bg-indigo-500 p-3 rounded-xl'
                onPress={handleRegister}
              >
                <Text
                  className='font-bold text-white tracking-wider text-center text-lg'
                >Signup</Text>
              </TouchableOpacity>)
            }
          </View>

          <View className='flex-row justify-center gap-1'>
            <Text className='font-semibold text-neutral-500'>Already have an account?</Text>
            <Pressable onPress={() => router.push('/signIn')}>
              <Text className='font-bold text-indigo-500'>Signin</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  )
}

export default SignUp
