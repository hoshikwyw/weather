import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import { CalendarDaysIcon, MagnifyingGlassIcon, MapPinIcon } from "react-native-heroicons/solid";
import { debounce } from 'lodash';
import { fetchLocation, fetchWeatherForecast } from '../api/weather';

const index = () => {
    const [showSearch, setShowSearch] = useState(false)
    const [locations, setLocations] = useState([])

    const handleLocation = (location) => {
        console.log('location : ', location);
        setLocations([])
        fetchWeatherForecast({
            city: location.name,
            day: 7
        }).then(data => {
            console.log('got data: ', data);
        })
    }

    const handleSearch = value => {
        // console.log('value :', value);
        if (value.length > 2) {
            fetchLocation({ city: value }).then(data => {
                setLocations(data)
                console.log('got locations: ', data.name);
            })
        }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 1000), [])

    return (
        <View className=" flex-1 relative">
            <Image source={images.bg} className="w-full h-full absolute" blurRadius={70} />
            <SafeAreaView className="flex flex-1 mx-4">
                {/* search bar */}
                <View className="h-[5%] relative z-50">
                    <View className=" flex-row justify-end items-center rounded-full mt-2" style={{ backgroundColor: showSearch ? '#6F6F70' : 'transparent' }}>
                        {showSearch ? (
                            <TextInput onChangeText={handleTextDebounce} placeholder='Search city' placeholderTextColor={'lightgray'} className="pl-6 h-10 flex-1 text-base text-white" />
                        ) : null}
                        <TouchableOpacity onPress={() => setShowSearch(!showSearch)} className=" bg-slate-300/50 rounded-full p-2 m-1">
                            <MagnifyingGlassIcon size="20" color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* location  */}
                {locations.length > 0 && showSearch ? (
                    <View className=" absolute w-full bg-gray-300 top-20 mt-1 rounded-3xl z-20">
                        {locations.map((location, index) => {
                            let showBorder = index + 1 != locations.length
                            let borderClass = showBorder ? ' border-b-2 border-b-gray-400' : ''
                            return (
                                <TouchableOpacity onPress={() => handleLocation(location)} key={index} className={" flex-row items-center border-0 p-3 px-4 mb-1 " + borderClass}>
                                    <MapPinIcon size="20" color="gray" />
                                    <Text className=" text-black text-lg ml-2">{location?.name}, {location?.country} </Text>
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
                        <Image source={require('../assets/images/sun.png')} className=" w-48 h-48" />
                    </View>
                    {/* degree celcius  */}
                    <View className=" space-y-2">
                        <Text className=" text-center font-bold text-white text-3xl ml-5">
                            23&#176;
                        </Text>
                        <Text className=" text-center font-bold text-white text-xl tracking-widest ml-5">
                            Sunny
                        </Text>
                    </View>
                    {/* other states  */}
                    <View className=" flex-row justify-between mx-4">
                        <View className=" flex-row space-x-2 items-center">
                            <Image source={require('../assets/icons/wind.png')} className=" h-6 w-6 " />
                            <Text className=" text-white font-semibold text-base">22km</Text>
                        </View>
                        <View className=" flex-row space-x-2 items-center">
                            <Image source={require('../assets/icons/drop.png')} className=" h-6 w-6 " />
                            <Text className=" text-white font-semibold text-base">23%</Text>
                        </View>
                        <View className=" flex-row space-x-2 items-center">
                            <Image source={require('../assets/icons/sun.png')} className=" h-6 w-6 " />
                            <Text className=" text-white font-semibold text-base">6 : 05 AM</Text>
                        </View>
                    </View>
                    {/* daily forecasts for whole week  */}
                    <View className=" mb-2 space-y-3">
                        <View className=" flex-row items-center mx-5 space-x-2">
                            <CalendarDaysIcon size="22" color="white" />
                            <Text className=" text-white text-base">Daily Forecast</Text>
                        </View>
                        <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 15 }} showsHorizontalScrollIndicator={false}>
                            <View className=" flex justify-center items-center  w-24 rounded-3xl py-3 space-y-1 mr-4 bg-slate-300/50">
                                <Image source={require('../assets/images/heavyrain.png')} className=" h-11 w-11" />
                                <Text className=" text-white">Monday</Text>
                                <Text className=" text-white text-xl font-semibold">23&#176;</Text>
                            </View>
                            <View className=" flex justify-center items-center  w-24 rounded-3xl py-3 space-y-1 mr-4 bg-slate-300/50">
                                <Image source={require('../assets/images/heavyrain.png')} className=" h-11 w-11" />
                                <Text className=" text-white">Tuesday</Text>
                                <Text className=" text-white text-xl font-semibold">23&#176;</Text>
                            </View>
                            <View className=" flex justify-center items-center  w-24 rounded-3xl py-3 space-y-1 mr-4 bg-slate-300/50">
                                <Image source={require('../assets/images/heavyrain.png')} className=" h-11 w-11" />
                                <Text className=" text-white">Wednesday</Text>
                                <Text className=" text-white text-xl font-semibold">23&#176;</Text>
                            </View>
                            <View className=" flex justify-center items-center  w-24 rounded-3xl py-3 space-y-1 mr-4 bg-slate-300/50">
                                <Image source={require('../assets/images/heavyrain.png')} className=" h-11 w-11" />
                                <Text className=" text-white">Thursday</Text>
                                <Text className=" text-white text-xl font-semibold">23&#176;</Text>
                            </View>
                            <View className=" flex justify-center items-center  w-24 rounded-3xl py-3 space-y-1 mr-4 bg-slate-300/50">
                                <Image source={require('../assets/images/heavyrain.png')} className=" h-11 w-11" />
                                <Text className=" text-white">Friday</Text>
                                <Text className=" text-white text-xl font-semibold">23&#176;</Text>
                            </View>
                            <View className=" flex justify-center items-center  w-24 rounded-3xl py-3 space-y-1 mr-4 bg-slate-300/50">
                                <Image source={require('../assets/images/heavyrain.png')} className=" h-11 w-11" />
                                <Text className=" text-white">Saturaday</Text>
                                <Text className=" text-white text-xl font-semibold">23&#176;</Text>
                            </View>
                            <View className=" flex justify-center items-center  w-24 rounded-3xl py-3 space-y-1 mr-4 bg-slate-300/50">
                                <Image source={require('../assets/images/heavyrain.png')} className=" h-11 w-11" />
                                <Text className=" text-white">Sunday</Text>
                                <Text className=" text-white text-xl font-semibold">23&#176;</Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
            <StatusBar style="white" backgroundColor="#ffffff" />
        </View>
    )
}





export default index
