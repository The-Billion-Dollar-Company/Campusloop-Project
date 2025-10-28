import { Ionicons } from "@expo/vector-icons";
import "nativewind";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import "../global.css";
import FeaturedItemCard from "../Components/Home/FeaturedItemsCard";

export default function Home() {
  // ✅ Curated images list
  
  // ✅ Track which image is currently showing
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Function to go to next image
  const handleNext = () => {
    if (currentIndex < curated.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // ✅ Function to go to previous image
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const categories = [
    { name: "Marketplace", icon: "storefront-outline" },
    { name: "Academia", icon: "school-outline" },
    { name: "Skills", icon: "build-outline" },
    { name: "Events", icon: "calendar-outline" },
  ];

  return (
    <ScrollView className="flex-1 bg-primary-50">
      {/* 🌲 Green Header Section */}
      <View className="px-6 py-8 bg-campus-forest rounded-b-2xl">
        {/* Header */}
        <View className="mb-8 mt-4">
          <Text className="text-3xl font-bold text-white mb-2 text-center">
            CampusLoop
          </Text>
          <Text className="text-primary-50 text-center">
            Stay connected with your campus community
          </Text>
        </View>

        {/* Search Bar */}
        <View className="mb-6 relative">
          <View className="flex-row items-center bg-white rounded-full px-4 py-3 border border-gray-200">
            <Ionicons name="search-outline" size={20} color="#9CA3AF" />
            <TextInput
              placeholder="Search campus resources..."
              className="flex-1 text-body-md text-gray-800 ml-2"
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity className="ml-2">
              <Ionicons name="mic-outline" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 🧠 Curated Collection Section */}
      <View className="bg-campus-pearl p-4">
        <Text className="text-2xl font-semibold text-gray-800 mb-3">
          Curated Collection
        </Text>

        {/* ✅ Fixed Image Carousel */}
        <View className="w-full rounded-2xl overflow-hidden shadow-sm bg-white relative">
          <ImageBackground
            source={curated[currentIndex].image}
            className="w-full h-48 justify-center"
            imageStyle={{ borderRadius: 16 }}
            resizeMode="cover"
          >
            {/* Transparent overlay */}
            <View className="absolute inset-0 bg-black/10 rounded-2xl" />

            {/* ✅ Left Arrow fixed to left side */}
            {currentIndex > 0 && (
              <TouchableOpacity
                onPress={handlePrev}
                className="absolute left-4 bg-white/90 rounded-full p-2"
              >
                <Ionicons name="chevron-back" size={22} color="#000" />
              </TouchableOpacity>
            )}

            {/* ✅ Right Arrow fixed to right side */}
            {currentIndex < curated.length - 1 && (
              <TouchableOpacity
                onPress={handleNext}
                className="absolute right-4 bg-white/90 rounded-full p-2"
              >
                <Ionicons name="chevron-forward" size={22} color="#000" />
              </TouchableOpacity>
            )}
          </ImageBackground>

          {/* ✅ Title below image */}
          <Text className="text-lg font-semibold text-center text-gray-800 mt-3">
            {curated[currentIndex].title}
          </Text>
        </View>
      </View>

      {/* 🧩 Categories Section */}
      <View className="px-6 pt-5">
        <View className="mb-8">
          <Text className="text-title-md text-campus-forest mb-4">
            Categories
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row"
            contentContainerStyle={{ paddingRight: 24 }}
          >
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white p-4 rounded-campus mr-4 items-center min-w-[100] shadow-campus"
                activeOpacity={0.9}
              >
                <Ionicons name={item.icon} size={28} color="#2D473E" />
                <Text className="text-label-md text-campus-forest mt-2 text-center">
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* 🧱 Featured Items */}
      <View className="flex-1 px-6 pb-10">
        <FeaturedItemCard />
      </View>
    </ScrollView>
  );
}
