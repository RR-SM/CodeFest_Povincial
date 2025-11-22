import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "./contexts/ThemeContext";

export default function ReportIssue() {
  const { theme } = useTheme();
  const router = useRouter();

  const [issueType, setIssueType] = useState("");
  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);

  const issueTypes = [
    { id: "delay", label: "Project Delay", icon: "time-outline", color: "#F59E0B" },
    { id: "quality", label: "Poor Quality", icon: "warning-outline", color: "#EF4444" },
    { id: "corruption", label: "Corruption", icon: "alert-circle-outline", color: "#DC2626" },
    { id: "budget", label: "Budget Misuse", icon: "cash-outline", color: "#8B5CF6" },
    { id: "safety", label: "Safety Issue", icon: "shield-outline", color: "#F97316" },
    { id: "other", label: "Other", icon: "ellipsis-horizontal", color: "#6B7280" },
  ];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Required", "Please allow access to your photo library");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: 5,
    });

    if (!result.canceled && result.assets) {
      const newPhotos = result.assets.map((asset: ImagePicker.ImagePickerAsset) => asset.uri);
      setPhotos([...photos, ...newPhotos].slice(0, 5));
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Required", "Please allow access to your camera");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });

    if (!result.canceled && result.assets) {
      setPhotos([...photos, result.assets[0].uri].slice(0, 5));
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!issueType || !projectName || !location || !description) {
      Alert.alert("Missing Information", "Please fill in all required fields");
      return;
    }

    Alert.alert(
      "Report Submitted",
      "Thank you for your report. We will investigate this issue and take appropriate action.",
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <LinearGradient
        colors={["#DC2626", "#EF4444", "#F87171"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: 60,
          paddingBottom: 24,
          paddingHorizontal: 24,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          <Text style={{ color: "#FFFFFF", fontSize: 16, marginLeft: 8 }}>Back</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 32, fontWeight: "800", color: "#FFFFFF", marginBottom: 8 }}>
              Report an Issue
            </Text>
            <Text style={{ fontSize: 16, color: "#FEE2E2", fontWeight: "500" }}>
              Help us improve transparency
            </Text>
          </View>
          <View style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            borderRadius: 16,
            padding: 12,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.2)"
          }}>
            <Ionicons name="megaphone" size={28} color="#FFFFFF" />
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Issue Type Selection */}
        <Text style={{ fontSize: 16, fontWeight: "700", color: theme.colors.text, marginBottom: 12 }}>
          Issue Type *
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
          {issueTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              onPress={() => setIssueType(type.id)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: issueType === type.id ? type.color : theme.colors.card,
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: issueType === type.id ? type.color : theme.colors.border,
              }}
            >
              <Ionicons
                name={type.icon as any}
                size={18}
                color={issueType === type.id ? "#FFFFFF" : type.color}
              />
              <Text style={{
                marginLeft: 6,
                fontSize: 13,
                fontWeight: "600",
                color: issueType === type.id ? "#FFFFFF" : theme.colors.text
              }}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Project Name */}
        <Text style={{ fontSize: 16, fontWeight: "700", color: theme.colors.text, marginBottom: 8 }}>
          Project Name *
        </Text>
        <TextInput
          value={projectName}
          onChangeText={setProjectName}
          placeholder="e.g., Kathmandu-Terai Fast Track"
          placeholderTextColor={theme.colors.textSecondary}
          style={{
            backgroundColor: theme.colors.card,
            borderRadius: 12,
            padding: 14,
            fontSize: 14,
            color: theme.colors.text,
            borderWidth: 1,
            borderColor: theme.colors.border,
            marginBottom: 20,
          }}
        />

        {/* Location */}
        <Text style={{ fontSize: 16, fontWeight: "700", color: theme.colors.text, marginBottom: 8 }}>
          Location *
        </Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          placeholder="e.g., Kathmandu, Ward 5"
          placeholderTextColor={theme.colors.textSecondary}
          style={{
            backgroundColor: theme.colors.card,
            borderRadius: 12,
            padding: 14,
            fontSize: 14,
            color: theme.colors.text,
            borderWidth: 1,
            borderColor: theme.colors.border,
            marginBottom: 20,
          }}
        />

        {/* Description */}
        <Text style={{ fontSize: 16, fontWeight: "700", color: theme.colors.text, marginBottom: 8 }}>
          Description *
        </Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Describe the issue in detail..."
          placeholderTextColor={theme.colors.textSecondary}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          style={{
            backgroundColor: theme.colors.card,
            borderRadius: 12,
            padding: 14,
            fontSize: 14,
            color: theme.colors.text,
            borderWidth: 1,
            borderColor: theme.colors.border,
            marginBottom: 20,
            minHeight: 120,
          }}
        />

        {/* Photo Upload */}
        <Text style={{ fontSize: 16, fontWeight: "700", color: theme.colors.text, marginBottom: 8 }}>
          Upload Photos (Optional)
        </Text>
        <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginBottom: 12 }}>
          Add up to 5 photos to support your report
        </Text>

        {/* Photo Grid */}
        {photos.length > 0 && (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
            {photos.map((photo, index) => (
              <View key={index} style={{ position: "relative" }}>
                <Image
                  source={{ uri: photo }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 12,
                    backgroundColor: theme.colors.card,
                  }}
                />
                <TouchableOpacity
                  onPress={() => removePhoto(index)}
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    backgroundColor: "#EF4444",
                    borderRadius: 12,
                    width: 24,
                    height: 24,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="close" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Upload Buttons */}
        {photos.length < 5 && (
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
            <TouchableOpacity
              onPress={pickImage}
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.colors.card,
                borderRadius: 12,
                padding: 14,
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderStyle: "dashed",
              }}
            >
              <Ionicons name="images-outline" size={20} color="#3B82F6" />
              <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: "600", color: "#3B82F6" }}>
                Gallery
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={takePhoto}
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.colors.card,
                borderRadius: 12,
                padding: 14,
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderStyle: "dashed",
              }}
            >
              <Ionicons name="camera-outline" size={20} color="#3B82F6" />
              <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: "600", color: "#3B82F6" }}>
                Camera
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Anonymous Toggle */}
        <TouchableOpacity
          onPress={() => setAnonymous(!anonymous)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.colors.card,
            padding: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: theme.colors.border,
            marginBottom: 24,
          }}
        >
          <View style={{
            width: 48,
            height: 28,
            borderRadius: 14,
            backgroundColor: anonymous ? "#10B981" : theme.colors.border,
            padding: 2,
            justifyContent: "center",
            marginRight: 12,
          }}>
            <View style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: "#FFFFFF",
              transform: [{ translateX: anonymous ? 20 : 0 }],
            }} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: theme.colors.text, marginBottom: 2 }}>
              Submit Anonymously
            </Text>
            <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>
              Your identity will be protected
            </Text>
          </View>
        </TouchableOpacity>

        {/* Info Box */}
        <View style={{
          backgroundColor: "#EFF6FF",
          borderRadius: 12,
          padding: 16,
          borderLeftWidth: 4,
          borderLeftColor: "#3B82F6",
          marginBottom: 24,
        }}>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <Ionicons name="information-circle" size={20} color="#3B82F6" style={{ marginRight: 10, marginTop: 2 }} />
            <Text style={{ flex: 1, fontSize: 12, color: "#1E40AF", lineHeight: 18 }}>
              Your report will be reviewed by our team and forwarded to the relevant authorities. We take all reports seriously and ensure appropriate action is taken.
            </Text>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: "#DC2626",
            borderRadius: 16,
            padding: 18,
            alignItems: "center",
            shadowColor: "#DC2626",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#FFFFFF" }}>
            Submit Report
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
