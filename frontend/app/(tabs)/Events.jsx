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
          <Text className="absolute left-1/2 -translate-x-1/2 text-3xl font-semibold text-[#2D473E]">
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
            source={require("../../assets/images/Resistor.jpg")}
            className="h-40 w-full rounded-xl mb-3"
            resizeMode="cover"
          />
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold text-gray-900">Resistor</Text>
            <Text className="text-sm text-gray-500">28 Oct 2025, 10:00 AM</Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#electronics</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#resistance</Text>
            </View>
          </View>
        </View>

        {/* Card 2 */}
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-5">
          <Image
            source={require("../../assets/images/Capacitor.jpg")}
            className="h-40 w-full rounded-xl mb-3"
            resizeMode="cover"
          />
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold text-gray-900">Capacitor</Text>
            <Text className="text-sm text-gray-500">29 Oct 2025, 3:00 PM</Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#charge</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#storage</Text>
            </View>
          </View>
        </View>

        {/* Card 3 */}
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-5">
          <Image
            source={require("../../assets/images/Diode.jpg")}
            className="h-40 w-full rounded-xl mb-3"
            resizeMode="cover"
          />
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold text-gray-900">Diode</Text>
            <Text className="text-sm text-gray-500">30 Oct 2025, 5:30 PM</Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#semiconductor</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#current</Text>
            </View>
          </View>
        </View>

        {/* Card 4 */}
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-5">
          <Image
            source={require("../../assets/images/Transistor.jpg")}
            className="h-40 w-full rounded-xl mb-3"
            resizeMode="cover"
          />
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold text-gray-900">Transistor</Text>
            <Text className="text-sm text-gray-500">31 Oct 2025, 11:15 AM</Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#amplifier</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#switch</Text>
            </View>
          </View>
        </View>

        {/* Card 5 */}
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-5">
          <Image
            source={require("../../assets/images/Inductor.jpg")}
            className="h-40 w-full rounded-xl mb-3"
            resizeMode="cover"
          />
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold text-gray-900">Inductor</Text>
            <Text className="text-sm text-gray-500">1 Nov 2025, 9:00 AM</Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#coil</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#magnetic</Text>
            </View>
          </View>
        </View>

        {/* Card 6 */}
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-5">
          <Image
            source={require("../../assets/images/LED Light.jpg")}
            className="h-40 w-full rounded-xl mb-3"
            resizeMode="cover"
          />
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold text-gray-900">LED Light</Text>
            <Text className="text-sm text-gray-500">2 Nov 2025, 7:45 PM</Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#light</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-lg">
              <Text className="text-sm text-gray-700">#energy</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Events;
