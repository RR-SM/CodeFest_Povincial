import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export default function Settings() {
  const { theme, toggleTheme, isDarkMode } = useTheme();

  const settingsItems = [
    {
      title: "Dark Mode",
      subtitle: "Switch between light and dark themes",
      icon: "moon",
      type: "toggle",
      value: isDarkMode,
      onPress: toggleTheme,
    },
    {
      title: "Notifications",
      subtitle: "Manage notification preferences",
      icon: "notifications",
      type: "arrow",
      onPress: () => {},
    },
    {
      title: "Language",
      subtitle: "Change app language",
      icon: "language",
      type: "arrow",
      onPress: () => {},
    },
    {
      title: "Privacy",
      subtitle: "Privacy and security settings",
      icon: "shield-checkmark",
      type: "arrow",
      onPress: () => {},
    },
    {
      title: "About",
      subtitle: "App version and information",
      icon: "information-circle",
      type: "arrow",
      onPress: () => {},
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <LinearGradient
        colors={theme.isDark ? ["#374151", "#4B5563", "#6B7280"] : ["#6B7280", "#9CA3AF", "#D1D5DB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: 60,
          paddingBottom: 24,
          paddingHorizontal: 24,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 8,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 36, fontWeight: "800", color: "#FFFFFF", letterSpacing: -0.5 }}>
              Settings
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
              <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: "#E5E7EB", marginRight: 8 }} />
              <Text style={{ fontSize: 14, color: "#E5E7EB", fontWeight: "500" }}>
                Customize your app experience
              </Text>
            </View>
          </View>
          <View style={{
            backgroundColor: theme.isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)",
            borderRadius: 16,
            padding: 12,
            borderWidth: 1,
            borderColor: theme.isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)"
          }}>
            <Ionicons name="settings" size={28} color="#FFFFFF" />
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 100 }}
        nestedScrollEnabled={true}
        removeClippedSubviews={true}
        scrollEventThrottle={16}
      >
        {/* Settings Items */}
        <View style={{
          backgroundColor: theme.colors.card,
          borderRadius: 16,
          overflow: "hidden",
          shadowColor: theme.isDark ? "#000" : "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: theme.isDark ? 0.3 : 0.08,
          shadowRadius: 12,
          elevation: 4,
        }}>
          {settingsItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
                borderBottomWidth: index < settingsItems.length - 1 ? 1 : 0,
                borderBottomColor: theme.colors.border,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: theme.colors.primary + "15",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                }}
              >
                <Ionicons name={item.icon as any} size={20} color={theme.colors.primary} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: theme.colors.text, marginBottom: 2 }}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                  {item.subtitle}
                </Text>
              </View>

              {item.type === "toggle" ? (
                <Switch
                  value={item.value}
                  onValueChange={item.onPress}
                  trackColor={{ false: theme.colors.border, true: theme.colors.primary + "40" }}
                  thumbColor={item.value ? theme.colors.primary : theme.colors.textSecondary}
                />
              ) : (
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* App Info */}
        <View style={{
          backgroundColor: theme.colors.card,
          borderRadius: 16,
          padding: 20,
          marginTop: 24,
          alignItems: "center",
          shadowColor: theme.isDark ? "#000" : "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: theme.isDark ? 0.3 : 0.08,
          shadowRadius: 12,
          elevation: 4,
        }}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: theme.colors.primary + "15",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <Ionicons name="shield-checkmark" size={30} color={theme.colors.primary} />
          </View>

          <Text style={{ fontSize: 18, fontWeight: "700", color: theme.colors.text, marginBottom: 4 }}>
            Nepal Transparency Portal
          </Text>
          <Text style={{ fontSize: 14, color: theme.colors.textSecondary, textAlign: "center", marginBottom: 16 }}>
            Version 1.0.0
          </Text>
          <Text style={{ fontSize: 12, color: theme.colors.textSecondary, textAlign: "center", lineHeight: 18 }}>
            Making government spending transparent and accessible to all citizens of Nepal.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
