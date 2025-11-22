import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Modal, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { useUser } from "../contexts/UserContext";

export default function Settings() {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { user, isLoggedIn, signOut } = useUser();
  const router = useRouter();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: () => {
            signOut();
            Alert.alert("Success", "You have been signed out");
          },
        },
      ]
    );
  };

  const settingsItems = [
    {
      title: t("darkMode"),
      subtitle: t("darkModeDesc"),
      icon: "moon",
      type: "toggle" as const,
      toggleValue: isDarkMode,
      onPress: toggleTheme,
    },
    {
      title: t("notifications"),
      subtitle: t("notificationsDesc"),
      icon: "notifications",
      type: "arrow" as const,
      onPress: () => {},
    },
    {
      title: t("language"),
      subtitle: t("languageDesc"),
      icon: "language",
      type: "arrow" as const,
      displayValue: language === 'en' ? 'English' : 'नेपाली',
      onPress: () => setShowLanguageModal(true),
    },
    {
      title: t("privacy"),
      subtitle: t("privacyDesc"),
      icon: "shield-checkmark",
      type: "arrow" as const,
      onPress: () => {},
    },
    {
      title: t("about"),
      subtitle: t("aboutDesc"),
      icon: "information-circle",
      type: "arrow" as const,
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
              {t("settings")}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
              <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: "#E5E7EB", marginRight: 8 }} />
              <Text style={{ fontSize: 14, color: "#E5E7EB", fontWeight: "500" }}>
                {t("customizeExp")}
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
        {/* User Profile Section */}
        {isLoggedIn ? (
          <View style={{
            backgroundColor: theme.colors.card,
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            shadowColor: theme.isDark ? "#000" : "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: theme.isDark ? 0.3 : 0.08,
            shadowRadius: 12,
            elevation: 4,
          }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: theme.colors.primary + "20",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                }}
              >
                <Text style={{ fontSize: 28, fontWeight: "700", color: theme.colors.primary }}>
                  {user?.fullName.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: "700", color: theme.colors.text, marginBottom: 4 }}>
                  {user?.fullName}
                </Text>
                <Text style={{ fontSize: 14, color: theme.colors.textSecondary }}>
                  {user?.email}
                </Text>
              </View>
            </View>

            <View style={{
              paddingTop: 16,
              borderTopWidth: 1,
              borderTopColor: theme.colors.border,
              flexDirection: "row",
              gap: 12,
            }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: theme.colors.surface,
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                }}
                onPress={() => router.push("/profile")}
              >
                <Ionicons name="person-outline" size={20} color={theme.colors.primary} />
                <Text style={{ fontSize: 12, fontWeight: "600", color: theme.colors.text, marginTop: 4 }}>
                  Edit Profile
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: theme.colors.surface,
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                }}
                onPress={handleSignOut}
              >
                <Ionicons name="log-out-outline" size={20} color="#EF4444" />
                <Text style={{ fontSize: 12, fontWeight: "600", color: "#EF4444", marginTop: 4 }}>
                  Sign Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{
            backgroundColor: theme.colors.card,
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
            shadowColor: theme.isDark ? "#000" : "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: theme.isDark ? 0.3 : 0.08,
            shadowRadius: 12,
            elevation: 4,
          }}>
            <View style={{ alignItems: "center", marginBottom: 16 }}>
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: theme.colors.border,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                }}
              >
                <Ionicons name="person-outline" size={32} color={theme.colors.textSecondary} />
              </View>
              <Text style={{ fontSize: 18, fontWeight: "700", color: theme.colors.text, marginBottom: 4 }}>
                Not Signed In
              </Text>
              <Text style={{ fontSize: 14, color: theme.colors.textSecondary, textAlign: "center" }}>
                Sign in to access your profile and personalized features
              </Text>
            </View>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: theme.colors.primary,
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: "center",
                }}
                onPress={() => router.push("/signin")}
              >
                <Text style={{ fontSize: 14, fontWeight: "600", color: "#FFFFFF" }}>
                  Sign In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: theme.colors.surface,
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                }}
                onPress={() => router.push("/signup")}
              >
                <Text style={{ fontSize: 14, fontWeight: "600", color: theme.colors.text }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

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
                  value={item.toggleValue}
                  onValueChange={item.onPress}
                  trackColor={{ false: theme.colors.border, true: theme.colors.primary + "40" }}
                  thumbColor={item.toggleValue ? theme.colors.primary : theme.colors.textSecondary}
                />
              ) : (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {item.displayValue && (
                    <Text style={{ fontSize: 14, color: theme.colors.textSecondary, marginRight: 8 }}>
                      {item.displayValue}
                    </Text>
                  )}
                  <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                </View>
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
            <Image
                          source={require("../../assets/images/logo.png")}
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 50,
                            resizeMode: "contain",
                          }}
                        />
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

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPress={() => setShowLanguageModal(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: theme.colors.card,
              borderRadius: 20,
              padding: 24,
              width: "80%",
              maxWidth: 400,
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: 20, fontWeight: "700", color: theme.colors.text, marginBottom: 20 }}>
              {t("language")}
            </Text>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
                borderRadius: 12,
                backgroundColor: language === 'en' ? theme.colors.primary + "15" : theme.colors.surface,
                marginBottom: 12,
                borderWidth: language === 'en' ? 2 : 1,
                borderColor: language === 'en' ? theme.colors.primary : theme.colors.border,
              }}
              onPress={() => {
                setLanguage('en');
                setShowLanguageModal(false);
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: theme.colors.text }}>
                  English
                </Text>
              </View>
              {language === 'en' && (
                <Ionicons name="checkmark-circle" size={24} color={theme.colors.primary} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
                borderRadius: 12,
                backgroundColor: language === 'ne' ? theme.colors.primary + "15" : theme.colors.surface,
                borderWidth: language === 'ne' ? 2 : 1,
                borderColor: language === 'ne' ? theme.colors.primary : theme.colors.border,
              }}
              onPress={() => {
                setLanguage('ne');
                setShowLanguageModal(false);
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: theme.colors.text }}>
                  नेपाली (Nepali)
                </Text>
              </View>
              {language === 'ne' && (
                <Ionicons name="checkmark-circle" size={24} color={theme.colors.primary} />
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
