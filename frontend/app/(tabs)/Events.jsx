import React from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Events = () => {
  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 pt-8 pb-3 shadow-sm">
        {/* Top Bar */}
        <View className="flex-row items-center justify-between mb-3 relative">
          <Text className="absolute left-1/2 -translate-x-1/2 text-3xl font-semibold bg-campus-forest text-white">
            Events
          </Text>
          <TouchableOpacity className="p-1 ml-auto">
            <Ionicons name="menu-outline" size={26} color="#2D473E" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 px-3 py-2 rounded-full">
          <Ionicons name="search-outline" size={18} color="#6B7280" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-2 text-gray-800"
          />
          <Ionicons name="mic-outline" size={18} color="#6B7280" />
        </View>
      </View>

      {/* Scrollable Cards */}
      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={true}>

        {/* Card 1 */}
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-5">
          <Image
            source={require("../../assets/images/bubt-hackathon.jpg")}
            className="h-40 w-full rounded-xl mb-3"
            resizeMode="cover"
          />

          {/* Title and Date */}
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-lg font-semibold text-gray-900">
            InnovateX National Hackathon 2025
            </Text>
            <Text className="text-sm text-gray-500">8 Oct 2025</Text>
          </View>

          {/* Tags */}
          <View className="flex-row flex-wrap gap-2 mb-3">
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#Workshop</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#AI</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#Education</Text>
            </View>
          </View>

          {/* Button */}
          <TouchableOpacity className="bg-[#2D473E] py-2 rounded-full items-center">
            <Text className="text-white font-semibold text-base">View Event</Text>
          </TouchableOpacity>
        </View>

        {/* Card 2 */}
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-5">
          <Image
            source={require("../../assets/images/Programming-Camp-bubt.jpg")}
            className="h-40 w-full rounded-xl mb-3"
            resizeMode="cover"
          />

          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-lg font-semibold text-gray-900">
            BAPS National Programming Camp 2025
            </Text>
            <Text className="text-sm text-gray-500">15 July 2025</Text>
          </View>

          <View className="flex-row flex-wrap gap-2 mb-3">
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#Music</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#Festival</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#Cultural</Text>
            </View>
          </View>

          <TouchableOpacity className="bg-[#2D473E] py-2 rounded-full items-center">
            <Text className="text-white font-semibold text-base">View Event</Text>
          </TouchableOpacity>
        </View>

        {/* Card 3 */}
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-5">
          <Image
            source={require("../../assets/images/May-day-2025.jpg")}
            className="h-40 w-full rounded-xl mb-3"
            resizeMode="cover"
          />

          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-lg font-semibold text-gray-900">Labor Day-2025</Text>
            <Text className="text-sm text-gray-500">1 May 2025</Text>
          </View>

          <View className="flex-row flex-wrap gap-2 mb-3">
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#Sports</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#Marathon</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#Health</Text>
            </View>
          </View>

          <TouchableOpacity className="bg-[#2D473E] py-2 rounded-full items-center">
            <Text className="text-white font-semibold text-base">View Event</Text>
          </TouchableOpacity>
        </View>

        {/* Card 4 */}
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-5">
          <Image
            source={require("../../assets/images/noboborsho-2025.jpg")}
            className="h-40 w-full rounded-xl mb-3"
            resizeMode="cover"
          />

          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-lg font-semibold text-gray-900">Pohela Boishakh 2025</Text>
            <Text className="text-sm text-gray-500">15 April 2025</Text>
          </View>

          <View className="flex-row flex-wrap gap-2 mb-3">
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#Corporate</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#Launch</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#Business</Text>
            </View>
          </View>

          <TouchableOpacity className="bg-[#2D473E] py-2 rounded-full items-center">
            <Text className="text-white font-semibold text-base">View Event</Text>
          </TouchableOpacity>
        </View>

        {/* Card 5 */}
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-5">
          <Image
            source={require("../../assets/images/Pitha-utsop.jpg")}
            className="h-40 w-full rounded-xl mb-3"
            resizeMode="cover"
          />

          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-lg font-semibold text-gray-900">Pitha Utshop-2025</Text>
            <Text className="text-sm text-gray-500">18 April 2025</Text>
          </View>

          <View className="flex-row flex-wrap gap-2 mb-3">
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#Birthday</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#Party</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#Personal</Text>
            </View>
          </View>

          <TouchableOpacity className="bg-[#2D473E] py-2 rounded-full items-center">
            <Text className="text-white font-semibold text-base">View Event</Text>
          </TouchableOpacity>
        </View>

        {/* Card 6 */}
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-5">
          <Image
            source={require("../../assets/images/convocation.jpg")}
            className="h-40 w-full rounded-xl mb-3"
            resizeMode="cover"
          />

          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-lg font-semibold text-gray-900">6th Convocation-2025</Text>
            <Text className="text-sm text-gray-500">26 Feb 2025</Text>
          </View>

          <View className="flex-row flex-wrap gap-2 mb-3">
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#Charity</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#Community</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#Social</Text>
            </View>
          </View>

          <TouchableOpacity className="bg-[#2D473E] py-2 rounded-full items-center">
            <Text className="text-white font-semibold text-base">View Event</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default Events;
