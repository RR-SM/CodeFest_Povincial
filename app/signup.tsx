import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "./contexts/ThemeContext";
import { useUser } from "./contexts/UserContext";

export default function SignUp() {
  const { theme } = useTheme();
  const router = useRouter();
  const { signUp } = useUser();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignUp = () => {
    // Validation
    if (!formData.fullName.trim()) {
      Alert.alert("Error", "Please enter your full name");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    if (!formData.phone.trim()) {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }
    if (formData.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (!agreedToTerms) {
      Alert.alert("Error", "Please agree to the Terms and Conditions");
      return;
    }

    // Success
    signUp({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });

    Alert.alert(
      "Success",
      "Account created successfully!",
      [
        {
          text: "OK",
          onPress: () => router.push("/(tabs)"),
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <LinearGradient
        colors={["#1E40AF", "#3B82F6", "#60A5FA"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: 60,
          paddingBottom: 24,
          paddingHorizontal: 24,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          <Text style={{ color: "#FFFFFF", fontSize: 16, marginLeft: 8 }}>Back</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 32, fontWeight: "800", color: "#FFFFFF", marginBottom: 8 }}>
          Create Account
        </Text>
        <Text style={{ fontSize: 16, color: "#DBEAFE", fontWeight: "500" }}>
          Join the transparency movement
        </Text>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Full Name */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: theme.colors.text, marginBottom: 8 }}>
              Full Name
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: theme.colors.surface,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: theme.colors.border,
                paddingHorizontal: 16,
              }}
            >
              <Ionicons name="person-outline" size={20} color={theme.colors.textSecondary} />
              <TextInput
                placeholder="Enter your full name"
                placeholderTextColor={theme.colors.textSecondary}
                value={formData.fullName}
                onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  paddingHorizontal: 12,
                  fontSize: 16,
                  color: theme.colors.text,
                }}
              />
            </View>
          </View>

          {/* Email */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: theme.colors.text, marginBottom: 8 }}>
              Email Address
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: theme.colors.surface,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: theme.colors.border,
                paddingHorizontal: 16,
              }}
            >
              <Ionicons name="mail-outline" size={20} color={theme.colors.textSecondary} />
              <TextInput
                placeholder="your.email@example.com"
                placeholderTextColor={theme.colors.textSecondary}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  paddingHorizontal: 12,
                  fontSize: 16,
                  color: theme.colors.text,
                }}
              />
            </View>
          </View>

          {/* Phone */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: theme.colors.text, marginBottom: 8 }}>
              Phone Number
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: theme.colors.surface,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: theme.colors.border,
                paddingHorizontal: 16,
              }}
            >
              <Ionicons name="call-outline" size={20} color={theme.colors.textSecondary} />
              <TextInput
                placeholder="+977 98XXXXXXXX"
                placeholderTextColor={theme.colors.textSecondary}
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                keyboardType="phone-pad"
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  paddingHorizontal: 12,
                  fontSize: 16,
                  color: theme.colors.text,
                }}
              />
            </View>
          </View>

          {/* Password */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: theme.colors.text, marginBottom: 8 }}>
              Password
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: theme.colors.surface,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: theme.colors.border,
                paddingHorizontal: 16,
              }}
            >
              <Ionicons name="lock-closed-outline" size={20} color={theme.colors.textSecondary} />
              <TextInput
                placeholder="At least 6 characters"
                placeholderTextColor={theme.colors.textSecondary}
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                secureTextEntry={!showPassword}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  paddingHorizontal: 12,
                  fontSize: 16,
                  color: theme.colors.text,
                }}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: theme.colors.text, marginBottom: 8 }}>
              Confirm Password
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: theme.colors.surface,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: theme.colors.border,
                paddingHorizontal: 16,
              }}
            >
              <Ionicons name="lock-closed-outline" size={20} color={theme.colors.textSecondary} />
              <TextInput
                placeholder="Re-enter your password"
                placeholderTextColor={theme.colors.textSecondary}
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                secureTextEntry={!showConfirmPassword}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  paddingHorizontal: 12,
                  fontSize: 16,
                  color: theme.colors.text,
                }}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms and Conditions */}
          <TouchableOpacity
            onPress={() => setAgreedToTerms(!agreedToTerms)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: agreedToTerms ? theme.colors.primary : theme.colors.border,
                backgroundColor: agreedToTerms ? theme.colors.primary : "transparent",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              {agreedToTerms && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
            </View>
            <Text style={{ flex: 1, fontSize: 14, color: theme.colors.textSecondary, lineHeight: 20 }}>
              I agree to the{" "}
              <Text style={{ color: theme.colors.primary, fontWeight: "600" }}>Terms and Conditions</Text>
              {" "}and{" "}
              <Text style={{ color: theme.colors.primary, fontWeight: "600" }}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSignUp}
            style={{
              backgroundColor: theme.colors.primary,
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: "center",
              marginBottom: 16,
              shadowColor: theme.colors.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "700" }}>
              Create Account
            </Text>
          </TouchableOpacity>

          {/* Sign In Link */}
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 14, color: theme.colors.textSecondary }}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/signin")}>
              <Text style={{ fontSize: 14, color: theme.colors.primary, fontWeight: "600" }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social Sign Up */}
          <View style={{ marginTop: 32 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
              <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border }} />
              <Text style={{ marginHorizontal: 16, fontSize: 14, color: theme.colors.textSecondary }}>
                Or continue with
              </Text>
              <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border }} />
            </View>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: theme.colors.surface,
                  borderRadius: 12,
                  paddingVertical: 14,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                }}
              >
                <Ionicons name="logo-google" size={20} color="#EA4335" />
                <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: "600", color: theme.colors.text }}>
                  Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: theme.colors.surface,
                  borderRadius: 12,
                  paddingVertical: 14,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                }}
              >
                <Ionicons name="logo-facebook" size={20} color="#1877F2" />
                <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: "600", color: theme.colors.text }}>
                  Facebook
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

