import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import "../globals.css";

export default function Home() {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("goodMorning");
    if (hour < 18) return t("goodAfternoon");
    return t("goodEvening");
  };

  const getGreetingEmoji = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "👋";
    if (hour < 18) return "☀️";
    return "🌙";
  };

  const quickStats = [
    { label: t("activeProjects"), value: "24", icon: "construct", color: "#3B82F6" },
    { label: t("totalBudget"), value: "₹203B", icon: "wallet", color: "#10B981" },
    { label: t("openTenders"), value: "12", icon: "document-text", color: "#8B5CF6" },
    { label: t("completionRate"), value: "68%", icon: "trending-up", color: "#F59E0B" },
  ];

  const shortcuts = [
    {
      title: t("budgetTracker"),
      subtitle: t("monitorSpending"),
      icon: "wallet",
      color: "#10B981",
      route: "/budget",
      stats: "₹203B " + t("total")
    },
    {
      title: t("projects"),
      subtitle: t("trackProgress"),
      icon: "construct",
      color: "#3B82F6",
      route: "/projects",
      stats: "24 " + t("activeProjects")
    },
    {
      title: t("tenders"),
      subtitle: t("govProcurement"),
      icon: "document-text",
      color: "#8B5CF6",
      route: "/tenders",
      stats: "12 " + t("openTenders")
    },
    {
      title: "Transparency Reports",
      subtitle: "Audit & Accountability",
      icon: "shield-checkmark",
      color: "#DC2626",
      route: "/transparency-reports",
      stats: "8 Reports"
    },
    {
      title: "Legal Framework",
      subtitle: "Laws & Regulations",
      icon: "book",
      color: "#F59E0B",
      route: "/legal-framework",
      stats: "View Laws"
    },
    {
      title: t("settings"),
      subtitle: t("appPreferences"),
      icon: "settings",
      color: "#6B7280",
      route: "/settings",
      stats: t("configure")
    }
  ];

  const recentActivity = [
    {
      title: "Kathmandu-Terai Fast Track",
      type: "Project Update",
      status: "68% Complete",
      time: "2 hours ago",
      color: "#3B82F6"
    },
    {
      title: "Mid-Hill Highway Tender",
      type: "New Tender",
      status: "Open for Bids",
      time: "5 hours ago",
      color: "#8B5CF6"
    },
    {
      title: "Health Budget Allocation",
      type: "Budget Update",
      status: "₹45M Released",
      time: "1 day ago",
      color: "#10B981"
    }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Modern Header */}
      <LinearGradient
        colors={["#1E40AF", "#3B82F6", "#60A5FA"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: 60,
          paddingBottom: 32,
          paddingHorizontal: 24,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 28, fontWeight: "800", color: "#FFFFFF", marginBottom: 4 }}>
              {getGreeting()}! {getGreetingEmoji()}
            </Text>
            <Text style={{ fontSize: 16, color: "#DBEAFE", fontWeight: "500" }}>
              {t("portalName")}
            </Text>
          </View>

          {/* Logo */}
          <View style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: "rgba(255,255,255,0.15)",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: "rgba(255,255,255,0.2)",
            overflow: "hidden",
          }}>
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
        </View>

        {/* Quick Stats Row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 24 }}
        >
          {quickStats.map((stat, index) => (
            <View
              key={index}
              style={{
                backgroundColor: theme.isDark ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)",
                borderRadius: 16,
                padding: 16,
                marginRight: 12,
                minWidth: 120,
                borderWidth: 1,
                borderColor: theme.isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)",
              }}
            >
              <Ionicons name={stat.icon as any} size={24} color="#FFFFFF" style={{ marginBottom: 8 }} />
              <Text style={{ fontSize: 20, fontWeight: "700", color: "#FFFFFF", marginBottom: 2 }}>
                {stat.value}
              </Text>
              <Text style={{ fontSize: 12, color: "#DBEAFE", fontWeight: "500" }}>
                {stat.label}
              </Text>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        nestedScrollEnabled={true}
        removeClippedSubviews={true}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", color: theme.colors.text, marginBottom: 16 }}>
            {t("quickActions")}
          </Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            {shortcuts.map((shortcut, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => router.push(shortcut.route as any)}
                style={{
                  width: "48%",
                  backgroundColor: theme.colors.card,
                  borderRadius: 20,
                  padding: 20,
                  marginBottom: 12,
                  shadowColor: theme.isDark ? "#000" : "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: theme.isDark ? 0.3 : 0.08,
                  shadowRadius: 12,
                  elevation: 4,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: shortcut.color + "15",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                  }}
                >
                  <Ionicons
                    name={shortcut.icon as any}
                    size={24}
                    color={shortcut.color}
                  />
                </View>
                <Text style={{ fontSize: 16, fontWeight: "600", color: theme.colors.text, marginBottom: 4 }}>
                  {shortcut.title}
                </Text>
                <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginBottom: 8 }}>
                  {shortcut.subtitle}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: "600", color: shortcut.color }}>
                  {shortcut.stats}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={{ paddingHorizontal: 24, paddingTop: 32 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "700", color: theme.colors.text }}>
              {t("recentActivity")}
            </Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#3B82F6" }}>
                {t("viewAll")}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: theme.colors.card, borderRadius: 16, overflow: "hidden", shadowColor: theme.isDark ? "#000" : "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: theme.isDark ? 0.3 : 0.08, shadowRadius: 12, elevation: 4 }}>
            {recentActivity.map((activity, index) => (
              <View
                key={index}
                style={{
                  padding: 16,
                  borderBottomWidth: index < recentActivity.length - 1 ? 1 : 0,
                  borderBottomColor: theme.colors.border,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: activity.color + "15",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                    }}
                  >
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: activity.color,
                      }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: "600", color: theme.colors.text, marginBottom: 2 }}>
                      {activity.title}
                    </Text>
                    <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginBottom: 2 }}>
                      {activity.type}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: "500", color: activity.color }}>
                      {activity.status}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 11, color: theme.colors.textSecondary }}>
                    {activity.time}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Featured Insight */}
        <View style={{ paddingHorizontal: 24, paddingTop: 32 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", color: theme.colors.text, marginBottom: 16 }}>
            {t("todaysInsight")}
          </Text>

          <LinearGradient
            colors={["#7C3AED", "#A855F7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 20,
              padding: 24,
              shadowColor: "#7C3AED",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
              <Ionicons name="trending-up" size={24} color="#FFFFFF" />
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#FFFFFF", marginLeft: 8 }}>
                {t("budgetUtilization")}
              </Text>
            </View>
            <Text style={{ fontSize: 32, fontWeight: "800", color: "#FFFFFF", marginBottom: 4 }}>
              73.2%
            </Text>
            <Text style={{ fontSize: 14, color: "#E9D5FF", marginBottom: 16 }}>
              Government budget utilization is up 5.2% from last quarter, showing improved efficiency in public spending.
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: theme.isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)",
                borderRadius: 12,
                paddingVertical: 8,
                paddingHorizontal: 16,
                alignSelf: "flex-start",
                borderWidth: 1,
                borderColor: theme.isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)",
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: "600", color: "#FFFFFF" }}>
                {t("viewDetails")}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>

      {/* Floating Vote Button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 90,
          right: 20,
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: "#3B82F6",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#3B82F6",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.4,
          shadowRadius: 16,
          elevation: 8,
        }}
        onPress={() => {
          // Add vote functionality here
          alert("Vote feature coming soon!");
        }}
      >
        <Ionicons name="thumbs-up" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}
