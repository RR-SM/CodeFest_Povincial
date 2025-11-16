import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import "./globals.css";

export default function ProjectDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { title, budget, progress, startDate, endDate } = params;
  const progressNum = parseInt(Array.isArray(progress) ? progress[0] : progress);

  // Sample data for progress over time
  const progressData = [
    { month: "Jan", progress: 10 },
    { month: "Feb", progress: 18 },
    { month: "Mar", progress: 25 },
    { month: "Apr", progress: 32 },
    { month: "May", progress: 40 },
    { month: "Jun", progress: 48 },
    { month: "Jul", progress: 55 },
    { month: "Aug", progress: 62 },
    { month: "Sep", progress: progressNum },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: "#0F0D23",
          paddingTop: 60,
          paddingBottom: 24,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          <Text style={{ color: "#FFFFFF", fontSize: 16, marginLeft: 8 }}>
            Back to Projects
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#FFFFFF",
          }}
        >
          {title}
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 100,
        }}
      >
        {/* Main Info Card */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          {/* Budget */}
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <Ionicons name="cash-outline" size={20} color="#1E6FD9" />
              <Text style={{ fontSize: 14, color: "#666", marginLeft: 8 }}>
                Total Budget
              </Text>
            </View>
            <Text style={{ fontSize: 32, fontWeight: "700", color: "#1E6FD9" }}>
              {budget}
            </Text>
          </View>

          {/* Timeline */}
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
              <Ionicons name="calendar-outline" size={20} color="#666" />
              <Text style={{ fontSize: 14, color: "#666", marginLeft: 8 }}>
                Project Timeline
              </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: "#999", marginBottom: 4 }}>Start Date</Text>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>
                  {startDate}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text style={{ fontSize: 12, color: "#999", marginBottom: 4 }}>End Date</Text>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>
                  {endDate}
                </Text>
              </View>
            </View>
          </View>

          {/* Current Progress */}
          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <Text style={{ fontSize: 14, color: "#666" }}>Overall Progress</Text>
              <Text style={{ fontSize: 24, fontWeight: "700", color: progressNum >= 75 ? "#2E7D32" : progressNum >= 50 ? "#F57C00" : "#E23D69" }}>
                {progress}%
              </Text>
            </View>
            <View
              style={{
                height: 12,
                backgroundColor: "#E0E0E0",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: typeof progress === 'string' ? `${progress}%` : `${progress}%`,
                  backgroundColor: progressNum >= 75 ? "#4CAF50" : progressNum >= 50 ? "#FF9800" : "#E23D69",
                  borderRadius: 6,
                } as any}
              />
            </View>
          </View>
        </View>

        {/* Progress Chart */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <Ionicons name="stats-chart" size={20} color="#1E6FD9" />
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#1a1a1a", marginLeft: 8 }}>
              Progress Over Time
            </Text>
          </View>

          {/* Simple Progress Chart */}
          <View style={{ marginTop: 10 }}>
            {progressData.map((item, index) => (
              <View key={index} style={{ marginBottom: 12 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                  <Text style={{ fontSize: 13, color: "#666" }}>{item.month}</Text>
                  <Text style={{ fontSize: 13, fontWeight: "600", color: "#333" }}>{item.progress}%</Text>
                </View>
                <View
                  style={{
                    height: 8,
                    backgroundColor: "#E0E0E0",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      height: "100%",
                      width: `${item.progress}%`,
                      backgroundColor: "#1E6FD9",
                      borderRadius: 4,
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Additional Details */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <Ionicons name="information-circle" size={20} color="#1E6FD9" />
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#1a1a1a", marginLeft: 8 }}>
              Additional Details
            </Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>Project Type</Text>
            <Text style={{ fontSize: 15, color: "#333", fontWeight: "500" }}>
              Infrastructure Development
            </Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>Implementing Agency</Text>
            <Text style={{ fontSize: 15, color: "#333", fontWeight: "500" }}>
              Department of Roads, Government of Nepal
            </Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>Status</Text>
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 12,
                backgroundColor: progressNum === 100 ? "#E8F5E9" : "#FFF3E0",
                alignSelf: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: progressNum === 100 ? "#2E7D32" : "#F57C00",
                }}
              >
                {progressNum === 100 ? "Completed" : "In Progress"}
              </Text>
            </View>
          </View>

          <View>
            <Text style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>Description</Text>
            <Text style={{ fontSize: 15, color: "#333", lineHeight: 22 }}>
              This project aims to improve transportation infrastructure and connectivity,
              facilitating economic growth and regional development. The project includes
              construction of roads, bridges, and related facilities.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
