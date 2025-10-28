import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { publicAPI } from "@/lib/api";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@/Context/UserContext";  


const { width } = Dimensions.get("window");

export default function ProductDetailScreen() {
  const { productId } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useUser();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await publicAPI.get(`/item/${productId}`);
      if (response.data.success) setProduct(response.data.data);
      else setError("Failed to load product");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleContactSeller = () => {
    if (product?.ownerId?.email) {
      Linking.openURL(`mailto:${product.ownerId.email}`);
    }
  };

  const handleAddToCart = () => {
    Alert.alert("Added to cart!");
  };

  const handleRentNow = () => {
    Alert.alert("Rent request sent!");
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Ionicons name="alert-circle" size={64} color="#ef4444" />
        <Text className="text-red-500 mt-3 text-base">{error}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Ionicons name="cube-outline" size={64} color="#9ca3af" />
        <Text className="text-gray-500 mt-4 text-lg">Product not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* HEADER */}
      <View className="pt-12 pb-4 px-4 bg-white border-b border-gray-200 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={26} color="#111" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 flex-1">
          Product Details
        </Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="#111" />
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* IMAGE */}
        <View className="bg-white shadow-sm">
          <Image
            source={{ uri: product.picture }}
            style={{ width: "100%", height: 380 }}
            resizeMode="cover"
          />
        </View>

        {/* PRODUCT INFO */}
        <View className="bg-white px-4 py-5 mt-2 rounded-t-2xl shadow-sm">
          <Text className="text-2xl font-bold text-gray-900 mb-1">
            {product.title}
          </Text>
          <Text className="text-gray-700 text-3xl font-bold mb-4">
            ${product.price}
          </Text>

          {/* Tags */}
          <View className="flex-row flex-wrap mb-4">
            {product.objectCategory && (
              <View className="bg-blue-100 px-3 py-1.5 rounded-full mr-2 mb-2">
                <Text className="text-blue-700 font-medium text-sm">
                  {product.objectCategory}
                </Text>
              </View>
            )}
            {product.condition && (
              <View className="bg-purple-100 px-3 py-1.5 rounded-full mr-2 mb-2">
                <Text className="text-purple-700 font-medium text-sm">
                  {product.condition}
                </Text>
              </View>
            )}
            {product.sellingCategory && (
              <View className="bg-green-100 px-3 py-1.5 rounded-full mr-2 mb-2">
                <Text className="text-green-700 font-medium text-sm">
                  {product.sellingCategory}
                </Text>
              </View>
            )}
          </View>

          {/* Description */}
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Description
          </Text>
          <Text className="text-gray-600 leading-6 mb-5">
            {product.description || "No description available."}
          </Text>

          {/* Seller Info */}
          <View className="border-t border-gray-100 pt-4">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              Seller Information
            </Text>
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-green-600 rounded-full items-center justify-center">
                <Text className="text-white font-bold text-lg">
                  {product.ownerId?.name?.[0]?.toUpperCase() || "U"}
                </Text>
              </View>
              <View className="ml-3">
                <Text className="text-base font-semibold text-gray-900">
                  {product.ownerId?.name || "Unknown Seller"}
                </Text>
                <Text className="text-sm text-gray-600">
                  {product.ownerId?.email}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ACTION BAR */}
      <View className="flex-row bg-white border-t border-gray-200 px-4 py-4 gap-3">
        <TouchableOpacity
          className="flex-1 bg-gray-100 py-4 rounded-xl flex-row justify-center items-center"
          onPress={handleContactSeller}
        >
          <Ionicons name="chatbubble-ellipses" size={20} color="#43A047" />
          <Text className="text-green-600 font-bold text-md ml-1">Contact</Text>
        </TouchableOpacity>

        {product.sellingCategory === "SELL" ? (
          <TouchableOpacity
            className="flex-1 bg-blue-600 py-2 rounded-xl flex-row justify-center items-center"
            onPress={handleAddToCart}
          >
            <Ionicons name="cart-outline" size={20} color="#fff" />
            <Text className="text-white font-bold text-md ml-1">
              Add to Cart
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="flex-1 bg-green-600 py-4 rounded-xl flex-row justify-center items-center"
            onPress={handleRentNow}
          >
            <Ionicons name="cash-outline" size={20} color="#fff" />
            <Text className="text-white font-bold text-md ml-1">Rent Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
