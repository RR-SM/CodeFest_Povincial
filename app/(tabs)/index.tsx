import { Text, View, TextInput, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import "../globals.css";

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/bg1.jpeg")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        resizeMode="cover"
      >
        {/* Overlay for better text readability */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        />
      </ImageBackground>

      <ScrollView style={{ flex: 1 }}>
        {/* Hero Content */}
        <View
          style={{
            paddingTop: 60,
            paddingBottom: 40,
            zIndex: 1,
            paddingHorizontal: 20,
            alignItems: "center",
          }}
        >
          {/* Title */}
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              color: "#FFFFFF",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Making Nepal's{" "}
            <Text style={{ color: "#4A90E2" }}>Public</Text>
            {"\n"}
            <Text style={{ color: "#E23D69" }}>Spending</Text> Transparent
          </Text>
          {/* Subtitle */}
          <Text
            style={{
              fontSize: 16,
              color: "#E0E0E0",
              textAlign: "center",
              marginBottom: 30,
              lineHeight: 24,
            }}
          >
            Track budgets, monitor tenders, follow projects, and verify
            documents with AI and blockchain technology
          </Text>
          {/* Search Bar */}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              backgroundColor: "#FFFFFF",
              borderRadius: 8,
              overflow: "hidden",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <TextInput
              placeholder="Search budgets, tenders, or projects..."
              placeholderTextColor="#999999"
              style={{
                flex: 1,
                paddingVertical: 16,
                paddingHorizontal: 10,
                fontSize: 16,
                color: "#333333",
              }}
            />
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#1E6FD9",
                paddingHorizontal: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="search" size={20} color="#FFFFFF" />
              <Text
                style={{
                  display: "flex",
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: "600",
                  marginLeft: 8,
                }}
              >
                Search
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      {/* Featured Project Section */}
      <View
          style={{
          paddingHorizontal: 20,
          paddingTop: 30,
          paddingBottom: 100,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "white",
            marginBottom: 8,
          }}
        >
          Featured Project
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#999",
            marginBottom: 20,
          }}
        >
          Track real-time progress of major infrastructure projects
        </Text>

        {/* Featured Project Card with Progress */}
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
          {/* Project Title */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#1a1a1a",
              marginBottom: 16,
            }}
          >
            Kathmandu-Terai Fast Track
          </Text>

          {/* Budget Section */}
          <View style={{ marginBottom: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
              <Ionicons name="cash-outline" size={18} color="#1E6FD9" />
              <Text style={{ fontSize: 13, color: "#666", marginLeft: 6 }}>
                Budget Allocated
              </Text>
            </View>
            <Text style={{ fontSize: 22, fontWeight: "700", color: "#1E6FD9" }}>
              NPR 140 Billion
            </Text>
          </View>

          {/* Timeline Section */}
          <View style={{ marginBottom: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <Ionicons name="calendar-outline" size={18} color="#666" />
              <Text style={{ fontSize: 13, color: "#666", marginLeft: 6 }}>
                Project Timeline
              </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
              <View>
                <Text style={{ fontSize: 11, color: "#999", marginBottom: 2 }}>Start Date</Text>
                <Text style={{ fontSize: 14, fontWeight: "600", color: "#333" }}>
                  Jan 2021
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 11, color: "#999", marginBottom: 2 }}>End Date</Text>
                <Text style={{ fontSize: 14, fontWeight: "600", color: "#333" }}>
                  April 2027
                </Text>
              </View>
            </View>
          </View>

          {/* Progress Section */}
          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <Text style={{ fontSize: 13, color: "#666" }}>Progress</Text>
              <Text style={{ fontSize: 16, fontWeight: "700", color: "#F57C00" }}>
                68%
              </Text>
            </View>

            {/* Progress Bar */}
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
                  width: "68%",
                  backgroundColor: "#FF9800",
                  borderRadius: 4,
                }}
              />
            </View>
          </View>
        </View>

        {/* View All Projects Link */}
        <TouchableOpacity
          style={{
            backgroundColor: "#0F0D23",
            paddingVertical: 14,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            View All Projects
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
}
