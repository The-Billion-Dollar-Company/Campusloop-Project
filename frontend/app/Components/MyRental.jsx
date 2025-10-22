import React from "react";
import { View, Text } from "react-native";

const MyRental = () => {
  return (
    <View className="flex-1 items-center justify-center bg-campus-pearl">
      <Text className="text-lg font-semibold text-gray-800">
        My Rentals
      </Text>
      <Text className="text-gray-500 mt-2">
        Your rented items will appear here
      </Text>
    </View>
  );
};

export default MyRental;