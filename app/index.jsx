import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";

const index = () => {
    return (
        <View className=" flex-1 relative">
            <Image source={images.bg} className="w-full h-full absolute" blurRadius={70} />
            <SafeAreaView className="flex flex-1">
                <View className="h-[5%] mx-4 relative z-50">
                    <View className=" flex-row justify-end items-center rounded-full bg-slate-500/70 mt-2">
                        {showSearch ? (
                            <TextInput placeholder='Search city' placeholderTextColor={'lightgray'} className="pl-6 h-10 flex-1 text-base text-white" />
                        ) : null}
                        <TouchableOpacity onPress={() => toggleSearch(!showSearch)} className=" bg-slate-300/50 rounded-full p-2 m-1">
                            <MagnifyingGlassIcon size="20" color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
            <StatusBar style="white" backgroundColor="#ffffff" />
        </View>
    )
}





export default index
