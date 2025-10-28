import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { publicAPI } from "@/lib/api";
import { Ionicons } from "@expo/vector-icons";

export default function FeaturedItemCard() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await publicAPI.get(
        `/item?limit=6&sortBy=createdAt&sortOrder=desc`
      );

      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        setError("Failed to fetch featured products");
      }
    } catch (err) {
      console.error("Error fetching featured products:", err);
      setError(
        err.response?.data?.message || "Failed to load featured products"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleProductPress = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <View className="p-6 ">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-title-md text-campus-forest mb-4">
          Featured Items
        </Text>
        <TouchableOpacity onPress={() => router.push("/products")}>
          <Text className="text-green-600 font-semibold mb-4">See All</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="py-10 justify-center items-center">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : error ? (
        <View className="py-10 justify-center items-center">
          <Ionicons name="alert-circle" size={40} color="#ef4444" />
          <Text className="text-red-500 mt-2">{error}</Text>
        </View>
      ) : products.length === 0 ? (
        <View className="py-10 justify-center items-center">
          <Ionicons name="cube-outline" size={40} color="#9ca3af" />
          <Text className="text-gray-500 mt-2">No featured products</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap justify-between">
            {products.map((product) => (
              <TouchableOpacity
                key={product._id}
                className="bg-white w-[48%] mb-4 rounded-lg overflow-hidden"
                onPress={() => handleProductPress(product._id)}
              >
                {/* Image */}
                <View className="w-full h-32 bg-gray-200">
                  {product.picture ? (
                    <Image
                      source={{ uri: product.picture }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  ) : (
                    <View className="w-full h-full justify-center items-center">
                      <Ionicons
                        name="image-outline"
                        size={32}
                        color="#9ca3af"
                      />
                    </View>
                  )}
                </View>

                {/* Info */}
                <View className="p-2 flex flex-row items-start justify-between">
                  <View>
                    <Text
                      className="text-sm font-semibold text-gray-900"
                      numberOfLines={1}
                    >
                      {product.title.length > 17
                        ? product.title.slice(0, 17) + "..."
                        : product.title}
                    </Text>
                    <Text className="text-xs text-gray-500" numberOfLines={1}>
                      {product.objectCategory || "General"}
                    </Text>
                  </View>
                  <View className="">
                    <Text className="text-base font-bold text-green-600 mt-1">
                      ${product.price}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
