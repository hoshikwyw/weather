import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import { MagnifyingGlassIcon, MapPinIcon } from "react-native-heroicons/solid";

const index = () => {
    const [showSearch, setShowSearch] = useState(false)
    const [locations, setLocations] = useState([1, 2, 3])

    const handleLocation = (location) => {
        console.log('location : ', location);
    }
    return (
        <View className=" flex-1 relative">
            <Image source={images.bg} className="w-full h-full absolute" blurRadius={70} />
            <SafeAreaView className="flex flex-1 mx-4">
                {/* search bar */}
                <View className="h-[5%] relative z-50">
                    <View className=" flex-row justify-end items-center rounded-full mt-2" style={{ backgroundColor: showSearch ? '#6F6F70' : 'transparent' }}>
                        {showSearch ? (
                            <TextInput placeholder='Search city' placeholderTextColor={'lightgray'} className="pl-6 h-10 flex-1 text-base text-white" />
                        ) : null}
                        <TouchableOpacity onPress={() => setShowSearch(!showSearch)} className=" bg-slate-300/50 rounded-full p-2 m-1">
                            <MagnifyingGlassIcon size="20" color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* location  */}
                {locations.length > 0 && showSearch ? (
                    <View className=" absolute w-full bg-gray-300 top-24 rounded-3xl">
                        {locations.map((location, index) => {
                            let showBorder = index + 1 != locations.length
                            let borderClass = showBorder ? ' border-b-2 border-b-gray-400' : ''
                            return (
                                <TouchableOpacity onPress={() => hadleLocation(location)} key={index} className={" flex-row items-center border-0 p-3 px-4 mb-1 " + borderClass}>
                                    <MapPinIcon size="20" color="gray" />
                                    <Text className=" text-black text-lg ml-2">London </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                ) : null}
                {/* forecast section  */}
                <View className=" flex justify-around flex-1 mb-2">
                    {/* location  */}
                    <Text className=" text-white text-center text-2xl font-bold">
                        London , 
                        <Text className=" text-lg font-semibold text-gray-300">
                            United Kingdom
                        </Text>
                    </Text>
                    {/* weather image  */}
                    <View className=" flex-row justify-center">
                        <Image source={require('../assets/images/sun.png')} className=" w-40 h-40" />
                    </View>
                    {/* degree celcius  */}
                    <View className=" space-y-2">
                        <Text className=" text-center font-bold text-white text-3xl ml-5">
                            23
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
            <StatusBar style="white" backgroundColor="#ffffff" />
        </View>
    )
}





export default index
