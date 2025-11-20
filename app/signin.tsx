import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "./contexts/ThemeContext";
import { useUser } from "./contexts/UserContext";

export default function SignIn() {
  const { theme } = useTheme();
  const router = useRouter();
  const { signIn } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Error", "Please enter your password");
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
      router.push("/(tabs)");
    } catch (error: any) {
      Alert.alert("Sign In Failed", error.message || "Please check your credentials and try again");
    } finally {
      setIsLoading(false);
    }
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
          Welcome Back
        </Text>
        <Text style={{ fontSize: 16, color: "#DBEAFE", fontWeight: "500" }}>
          Sign in to continue
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
                value={email}
                onChangeText={setEmail}
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

          {/* Password */}
          <View style={{ marginBottom: 16 }}>
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
                placeholder="Enter your password"
                placeholderTextColor={theme.colors.textSecondary}
                value={password}
                onChangeText={setPassword}
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

          {/* Remember Me & Forgot Password */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <TouchableOpacity
              onPress={() => setRememberMe(!rememberMe)}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: rememberMe ? theme.colors.primary : theme.colors.border,
                  backgroundColor: rememberMe ? theme.colors.primary : "transparent",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 8,
                }}
              >
                {rememberMe && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
              </View>
              <Text style={{ fontSize: 14, color: theme.colors.text }}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={{ fontSize: 14, color: theme.colors.primary, fontWeight: "600" }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            onPress={handleSignIn}
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? theme.colors.border : theme.colors.primary,
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
              {isLoading ? "Signing In..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 14, color: theme.colors.textSecondary }}>
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/signup")}>
              <Text style={{ fontSize: 14, color: theme.colors.primary, fontWeight: "600" }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social Sign In */}
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
