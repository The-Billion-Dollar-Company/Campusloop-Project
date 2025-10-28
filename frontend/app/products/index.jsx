import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { privateAPI, publicAPI } from '@/lib/api';
import { Ionicons } from '@expo/vector-icons';

const CATEGORIES = ['ALL', 'ELECTRONICS', 'BOOKS', 'FURNITURE', 'CLOTHING', 'OTHERS'];
const SELLING_CATEGORIES = ['ALL', 'SELL', 'RENT', 'EXCHANGE'];
const SORT_OPTIONS = [
  { label: 'Price: Low to High', value: 'price', order: 'asc' },
  { label: 'Price: High to Low', value: 'price', order: 'desc' },
  { label: 'Newest First', value: 'createdAt', order: 'desc' },
  { label: 'Oldest First', value: 'createdAt', order: 'asc' },
];

export default function ProductsScreen() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Filter states
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [sellingCategory, setSellingCategory] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [search, category, sellingCategory, maxPrice, sortBy, sortOrder]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();
      
      if (search) params.append('search', search);
      if (category !== 'ALL') params.append('category', category);
      if (sellingCategory !== 'ALL') params.append('sellingCategory', sellingCategory);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (sortBy) params.append('sortBy', sortBy);
      if (sortOrder) params.append('sortOrder', sortOrder);

      const response = await publicAPI.get(`/item?${params.toString()}`);

      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.response?.data?.message || 'Failed to load products');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  const resetFilters = () => {
    setSearch('');
    setCategory('ALL');
    setSellingCategory('ALL');
    setMaxPrice('');
    setSortBy('createdAt');
    setSortOrder('desc');
  };

  const handleProductPress = (productId) => {
    router.push(`/products/${productId}`);
  };

  const handleSortChange = (option) => {
    setSortBy(option.value);
    setSortOrder(option.order);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white pt-12 pb-4 px-4 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900 mb-4">All Item</Text>
        
        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2 mb-3">
          <Ionicons name="search" size={20} color="#6b7280" />
          <TextInput
            className="flex-1 ml-2 text-base text-gray-900"
            placeholder="Search products..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#9ca3af"
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={20} color="#6b7280" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Filter Toggle */}
        <TouchableOpacity
          className="flex-row items-center justify-between bg-blue-50 rounded-lg px-4 py-3"
          onPress={() => setShowFilters(!showFilters)}
        >
          <View className="flex-row items-center">
            <Ionicons name="options" size={20} color="#2563eb" />
            <Text className="ml-2 text-blue-600 font-semibold">
              Filters & Sort
            </Text>
          </View>
          <Ionicons
            name={showFilters ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#2563eb"
          />
        </TouchableOpacity>
      </View>

      {/* Filters Panel */}
      {showFilters && (
        <ScrollView className="bg-white border-b border-gray-200 px-4 py-4 max-h-80">
          {/* Max Price */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Max Price
            </Text>
            <TextInput
              className="bg-gray-100 rounded-lg px-4 py-3 text-base text-gray-900"
              placeholder="Enter max price"
              value={maxPrice}
              onChangeText={setMaxPrice}
              keyboardType="numeric"
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Category */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Category
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  className={`mr-2 px-4 py-2 rounded-full ${
                    category === cat ? 'bg-blue-600' : 'bg-gray-100'
                  }`}
                  onPress={() => setCategory(cat)}
                >
                  <Text
                    className={`font-medium ${
                      category === cat ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Selling Category */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Selling Type
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {SELLING_CATEGORIES.map((type) => (
                <TouchableOpacity
                  key={type}
                  className={`mr-2 px-4 py-2 rounded-full ${
                    sellingCategory === type ? 'bg-green-600' : 'bg-gray-100'
                  }`}
                  onPress={() => setSellingCategory(type)}
                >
                  <Text
                    className={`font-medium ${
                      sellingCategory === type ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Sort Options */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Sort By
            </Text>
            {SORT_OPTIONS.map((option) => (
              <TouchableOpacity
                key={`${option.value}-${option.order}`}
                className={`mb-2 px-4 py-3 rounded-lg ${
                  sortBy === option.value && sortOrder === option.order
                    ? 'bg-purple-100 border border-purple-600'
                    : 'bg-gray-100'
                }`}
                onPress={() => handleSortChange(option)}
              >
                <Text
                  className={`font-medium ${
                    sortBy === option.value && sortOrder === option.order
                      ? 'text-purple-700'
                      : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Reset Button */}
          <TouchableOpacity
            className="bg-red-500 rounded-lg py-3 items-center"
            onPress={resetFilters}
          >
            <Text className="text-white font-semibold">Reset Filters</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* Products List */}
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading && !refreshing ? (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color="#2563eb" />
          </View>
        ) : error ? (
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="alert-circle" size={48} color="#ef4444" />
            <Text className="text-red-500 text-center mt-4 px-4">{error}</Text>
            <TouchableOpacity
              className="mt-4 bg-blue-600 px-6 py-3 rounded-lg"
              onPress={fetchProducts}
            >
              <Text className="text-white font-semibold">Retry</Text>
            </TouchableOpacity>
          </View>
        ) : products.length === 0 ? (
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="cube-outline" size={48} color="#9ca3af" />
            <Text className="text-gray-500 text-center mt-4 px-4">
              No products found
            </Text>
          </View>
        ) : (
          <View className="px-4 py-4">
            {products.map((product) => (
              <TouchableOpacity
                key={product._id}
                className="bg-white rounded-xl mb-4 overflow-hidden shadow-sm border border-gray-100"
                onPress={() => handleProductPress(product._id)}
              >
                <View className="flex-row">
                  {/* Product Image */}
                  <View className="w-28 h-28 bg-gray-200">
                    {product.images && product.images.length > 0 ? (
                      <Image
                        source={{ uri: product.images[0] }}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    ) : (
                      <View className="w-full h-full justify-center items-center">
                        <Ionicons name="image-outline" size={32} color="#9ca3af" />
                      </View>
                    )}
                  </View>

                  {/* Product Info */}
                  <View className="flex-1 p-3">
                    <Text
                      className="text-lg font-semibold text-gray-900 mb-1"
                      numberOfLines={1}
                    >
                      {product.title}
                    </Text>
                    <Text
                      className="text-sm text-gray-600 mb-2"
                      numberOfLines={2}
                    >
                      {product.description}
                    </Text>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-xl font-bold text-blue-600">
                        ${product.price}
                      </Text>
                      <View className="flex-row items-center space-x-2">
                        {product.category && (
                          <View className="bg-gray-100 px-2 py-1 rounded">
                            <Text className="text-xs text-gray-700">
                              {product.category}
                            </Text>
                          </View>
                        )}
                        {product.sellingCategory && (
                          <View className="bg-green-100 px-2 py-1 rounded">
                            <Text className="text-xs text-green-700">
                              {product.sellingCategory}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}